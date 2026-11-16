import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { TIME_SLOTS } from "@/lib/pricing";

function parseTimeSlot(timeStr) {
  const match = timeStr.match(/(\d+):(\d+)(am|pm)/i);
  if (!match) return null;

  let hour = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toLowerCase();

  if (period === "pm" && hour !== 12) {
    hour += 12;
  } else if (period === "am" && hour === 12) {
    hour = 0;
  }

  return { hour, minutes };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const arenaName = searchParams.get("arena");
    const dateParam = searchParams.get("date");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (!arenaName || (!dateParam && !startDateParam)) {
      return NextResponse.json(
        { error: "Missing arena or date/startDate" },
        { status: 400 }
      );
    }

    await connectDB();

    // Cleanup abandoned pending bookings (older than 15 minutes)
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    await Booking.deleteMany({
      status: "pending",
      createdAt: { $lt: fifteenMinsAgo },
    });

    // Bangladesh timezone helpers
    const dhakaTodayStr = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Dhaka",
    });
    const dhakaNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );
    const dhakaHour = dhakaNow.getHours();
    const dhakaMinute = dhakaNow.getMinutes();
    const currentMins = dhakaHour * 60 + dhakaMinute;

    // Mode 1: Date Range Summary (returns available slot counts for each date)
    if (startDateParam && endDateParam) {
      const [sYear, sMonth, sDay] = startDateParam.split("-").map(Number);
      const [eYear, eMonth, eDay] = endDateParam.split("-").map(Number);

      const startUTC = new Date(Date.UTC(sYear, sMonth - 1, sDay, 0, 0, 0));
      const endUTC = new Date(Date.UTC(eYear, eMonth - 1, eDay + 1, 0, 0, 0));

      const bookings = await Booking.find({
        arenaName,
        bookingDate: {
          $gte: startUTC,
          $lt: endUTC,
        },
        status: { $in: ["pending", "confirmed"] },
      }).select("timeSlot status bookingDate");

      // Group booked slots by YYYY-MM-DD
      const bookedByDate = {};
      for (const b of bookings) {
        if (!b.bookingDate) continue;
        const bDate = new Date(b.bookingDate);
        const y = bDate.getUTCFullYear();
        const m = String(bDate.getUTCMonth() + 1).padStart(2, "0");
        const d = String(bDate.getUTCDate()).padStart(2, "0");
        const dStr = `${y}-${m}-${d}`;
        if (!bookedByDate[dStr]) {
          bookedByDate[dStr] = new Set();
        }
        bookedByDate[dStr].add(b.timeSlot);
      }

      // Calculate available slot counts for all dates in range
      const counts = {};
      let cur = new Date(startUTC);
      while (cur < endUTC) {
        const y = cur.getUTCFullYear();
        const m = String(cur.getUTCMonth() + 1).padStart(2, "0");
        const d = String(cur.getUTCDate()).padStart(2, "0");
        const curDateStr = `${y}-${m}-${d}`;

        const bookedSlots = bookedByDate[curDateStr] || new Set();
        const isToday = curDateStr === dhakaTodayStr;
        const isPastDate = curDateStr < dhakaTodayStr;

        let freeCount = 0;
        if (!isPastDate) {
          for (const slot of TIME_SLOTS) {
            if (bookedSlots.has(slot)) continue;
            if (isToday) {
              const [startTime] = slot.split(" to ");
              const parsed = parseTimeSlot(startTime);
              if (parsed && parsed.hour * 60 + parsed.minutes <= currentMins) {
                continue;
              }
            }
            freeCount++;
          }
        }

        counts[curDateStr] = freeCount;
        cur.setUTCDate(cur.getUTCDate() + 1);
      }

      return NextResponse.json({ counts });
    }

    // Mode 2: Single Date Slots Details
    const [year, month, day] = dateParam.split("-").map(Number);
    const selectedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const nextDay = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0));

    const bookings = await Booking.find({
      arenaName,
      bookingDate: {
        $gte: selectedDate,
        $lt: nextDay,
      },
      status: { $in: ["pending", "confirmed"] },
    }).select("timeSlot status bookingDate");

    const bookedSlots = new Set(bookings.map((b) => b.timeSlot));
    const isToday = dateParam === dhakaTodayStr;
    const isPastDate = dateParam < dhakaTodayStr;

    const slots = TIME_SLOTS.map((slot) => {
      let status = "available";

      if (bookedSlots.has(slot)) {
        status = "booked";
      } else if (isPastDate) {
        status = "past";
      } else if (isToday) {
        const [startTime] = slot.split(" to ");
        const parsed = parseTimeSlot(startTime);

        if (parsed) {
          const slotMins = parsed.hour * 60 + parsed.minutes;
          if (slotMins <= currentMins) {
            status = "past";
          }
        }
      }

      return { slot, status };
    });

    const availableCount = slots.filter((s) => s.status === "available").length;

    return NextResponse.json({ slots, availableCount });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
