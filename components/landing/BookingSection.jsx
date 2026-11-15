"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { calculateSlotPrice } from "@/lib/pricing";

export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return "";
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bn[parseInt(d, 10)]);
};

export const formatSlotTimeBn = (slot) => {
  if (!slot) return "";
  const parts = slot.split(" to ");
  if (parts.length !== 2) return slot;

  const parsePart = (part) => {
    const m = part.trim().match(/^0?(\d+):(\d+)(am|pm)$/i);
    if (!m) return { period: "", timeStr: part };
    const h = parseInt(m[1], 10);
    const mins = m[2];
    const ampm = m[3].toLowerCase();

    let period = "";
    if (ampm === "am") {
      if (h >= 4 && h < 7) period = "ভোর";
      else if (h >= 7 && h < 12) period = "সকাল";
      else period = "রাত";
    } else {
      if (h === 12 || (h >= 1 && h < 3)) period = "দুপুর";
      else if (h >= 3 && h < 6) period = "বিকাল";
      else if (h >= 6 && h < 8) period = "সন্ধ্যা";
      else period = "রাত";
    }
    const hBn = toBengaliDigits(h);
    const mBn = toBengaliDigits(mins);
    return { period, timeStr: `${hBn}:${mBn}` };
  };

  const p1 = parsePart(parts[0]);
  const p2 = parsePart(parts[1]);
  return `${p1.period} ${p1.timeStr} - ${p2.timeStr}`;
};

export default function BookingSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const datesContainerRef = useRef(null);

  // Generate 21 upcoming dates in Dhaka timezone
  const [datesList, setDatesList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [arenaPricing, setArenaPricing] = useState(null);

  // Selected slot for inline booking panel
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [paymentType, setPaymentType] = useState("advance");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill logged in user info
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setBookingName(session.user.name);
      if (session.user.phone) setBookingPhone(session.user.phone);
    }
  }, [session]);

  // Initialize dates
  useEffect(() => {
    const list = [];
    const today = new Date();
    const dayNames = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

    for (let i = 0; i < 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      list.push({
        dateStr,
        dayOfWeek: i === 0 ? "আজ" : dayNames[d.getDay()],
        dayNum: toBengaliDigits(d.getDate()),
        isToday: i === 0,
        fullDate: d,
      });
    }

    setDatesList(list);
    if (list.length > 0) {
      setSelectedDate(list[0].dateStr);
    }
  }, []);

  // Fetch pricing
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(
          `/api/pricing?arena=${encodeURIComponent("Royel Turf & Swimming Zone")}`
        );
        const data = await res.json();
        if (res.ok) setArenaPricing(data);
      } catch (err) {
        console.error("Error fetching pricing:", err);
      }
    };
    fetchPricing();
  }, []);

  // Fetch slots whenever selectedDate changes
  const fetchSlots = async (date) => {
    if (!date) return;
    setLoadingSlots(true);
    try {
      const res = await fetch(
        `/api/bookings/slots?arena=${encodeURIComponent("Royel Turf & Swimming Zone")}&date=${date}`
      );
      const data = await res.json();
      if (res.ok) {
        setSlots(data.slots || []);
      } else {
        setSlots([]);
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setSelectedSlot(null);
      fetchSlots(selectedDate);
    }
  }, [selectedDate]);

  // Scroll controls for date bar
  const scrollDates = (direction) => {
    if (datesContainerRef.current) {
      const offset = direction === "left" ? -280 : 280;
      datesContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Current slot price calculation
  const getSlotPrice = (slotName) => {
    return calculateSlotPrice(arenaPricing, selectedDate, slotName);
  };

  const availableSlotsCount = slots.filter((s) => s.status === "available").length;

  const allowedCODRoles = ["SUPER_ADMIN", "GENERAL_ADMIN", "MANAGER", "VIEWER"];
  const canUseCOD = Boolean(
    session?.user?.role && allowedCODRoles.includes(session.user.role)
  );

  const closeModal = () => {
    setSelectedSlot(null);
  };

  const handleSlotClick = (slotObj) => {
    if (slotObj.status !== "available") return;
    if (!canUseCOD) {
      setPaymentType("advance");
    }
    setSelectedSlot(slotObj);
  };

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    if (selectedSlot) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedSlot]);

  // Submit quick booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) {
      toast.error("অনুগ্রহ করে একটি স্লট নির্বাচন করুন");
      return;
    }

    if (!bookingName.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (!bookingPhone.trim()) {
      toast.error("আপনার মোবাইল নম্বর লিখুন");
      return;
    }

    const currentPrice = getSlotPrice(selectedSlot.slot);
    const advanceAmount = 500;
    const activePaymentType = canUseCOD ? paymentType : "advance";
    const isAdvance = activePaymentType === "advance";

    const confirmTitle = isAdvance
      ? "বুকিং ও বিকাশ পেমেন্ট নিশ্চিতকরণ"
      : "ক্যাশ বুকিং নিশ্চিতকরণ";

    const confirmText = isAdvance
      ? `বিকাশের মাধ্যমে ৳${advanceAmount} অগ্রিম প্রদান করে স্লটটি নিশ্চিত করতে চান?`
      : `আপনি কি ভেন্যুতে ৳${currentPrice.toLocaleString()} পরিশোধের শর্তে স্লটটি বুক করতে চান?`;

    const result = await Swal.fire({
      title: confirmTitle,
      html: `
        <div style="text-align: left; font-size: 14.5px; line-height: 1.6; color: #1e293b;">
          <p><strong>তারিখ:</strong> ${selectedDate}</p>
          <p><strong>সময়:</strong> ${formatSlotTimeBn(selectedSlot.slot)}</p>
          <p><strong>নাম:</strong> ${bookingName}</p>
          <p><strong>মোবাইল:</strong> ${bookingPhone}</p>
          <p style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 16px;">
            <strong>${isAdvance ? "অগ্রিম প্রদেয় (বিকাশ):" : "ভেন্যুতে প্রদেয়:"}</strong>
            <span style="color: #0096c7; font-weight: bold;">৳${isAdvance ? advanceAmount : currentPrice.toLocaleString()}</span>
          </p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isAdvance ? "বিকাশ পেমেন্টে যান →" : "হ্যাঁ, বুকিং কনফার্ম করুন",
      cancelButtonText: "বাতিল",
      confirmButtonColor: isAdvance ? "#e2136e" : "#0096c7",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    setSubmitting(true);

    try {
      const bookingData = {
        arenaName: "Royel Turf & Swimming Zone",
        bookingDate: selectedDate,
        timeSlot: selectedSlot.slot,
        notes: bookingNotes,
        paymentType: activePaymentType,
        bookingForName: bookingName,
        bookingForPhone: bookingPhone,
        advanceAmount: advanceAmount,
        paidAmount: isAdvance ? advanceAmount : 0,
        totalAmount: isAdvance ? advanceAmount : currentPrice,
        finalPrice: currentPrice,
        originalAmount: currentPrice,
        discountAmount: 0,
        bookingByRole: session?.user?.role || "GUEST",
      };

      if (activePaymentType === "cod") {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingData,
            paymentMethod: "COD",
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "বুকিং সম্পন্ন করা যায়নি");
        }

        await Swal.fire({
          icon: "success",
          title: "বুকিং সফল হয়েছে!",
          text: "আপনার স্লটটি সফলভাবে বুক করা হয়েছে। ধন্যবাদ!",
          confirmButtonColor: "#0096c7",
          confirmButtonText: "ঠিক আছে",
        });

        setSelectedSlot(null);
        fetchSlots(selectedDate);
      } else {
        // bKash Advance
        const response = await fetch("/api/bkash/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: advanceAmount,
            bookingData: bookingData,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "বিকাশ পেমেন্ট শুরু করা যায়নি");
        }

        if (data.bkashURL) {
          window.location.href = data.bkashURL;
          return;
        }
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.message || "বুকিং ব্যর্থ হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDateObj = datesList.find((d) => d.dateStr === selectedDate);

  return (
    <section className="s-book s-wrap" id="booking" aria-labelledby="book-h">
      <h2 className="s-h2" id="book-h">
        কখন খেলবেন?
      </h2>
      <p className="s-lede">
        আপনার পছন্দের তারিখ ও সময় বেছে নিন এবং সহজেই বুকিং সম্পন্ন করুন
      </p>

      {/* Date Carousel */}
      <div className="s-dates-bar">
        <button
          type="button"
          className="s-dates-arrow"
          aria-label="আগের তারিখ"
          onClick={() => scrollDates("left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
          </svg>
        </button>

        <div
          className="s-dates"
          ref={datesContainerRef}
          role="group"
          aria-label="তারিখ বেছে নিন"
        >
          {datesList.map((d) => {
            const isSelected = selectedDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                className={`s-date ${isSelected ? "is-active" : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedDate(d.dateStr)}
              >
                <span className="dw">{d.dayOfWeek}</span>
                <span className="dd">{d.dayNum}</span>
                <span className="df">
                  {isSelected && loadingSlots
                    ? "খুঁজছি..."
                    : isSelected
                    ? `${toBengaliDigits(availableSlotsCount)}টি খালি`
                    : "তারিখ"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="s-dates-arrow"
          aria-label="পরের তারিখ"
          onClick={() => scrollDates("right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
          </svg>
        </button>
      </div>

      <div className="s-notice-banner">
        <span>⚠️</span>
        <span>
          <strong>বিশেষ দ্রষ্টব্য:</strong> রাত ১২:০০ টার পরের স্লটের জন্য পরবর্তী তারিখ নির্বাচন করুন।
        </span>
      </div>

      {/* Slots Grid */}
      <div className="s-slots-wrap">
        {loadingSlots ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
            স্লট লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
          </div>
        ) : slots.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
            এই তারিখের জন্য কোনো স্লট পাওয়া যায়নি।
          </div>
        ) : (
          <div className="s-slots-grid">
            {slots.map((item) => {
              const price = getSlotPrice(item.slot);
              const isSelected = selectedSlot?.slot === item.slot;
              const formattedTime = formatSlotTimeBn(item.slot);

              let statusLabel = "খালি";
              let dotClass = "s-seg-dot-free";

              if (item.status === "booked") {
                statusLabel = "বুকড";
                dotClass = "s-seg-dot-booked";
              } else if (item.status === "past") {
                statusLabel = "সময় শেষ";
                dotClass = "s-seg-dot-past";
              }

              return (
                <button
                  key={item.slot}
                  type="button"
                  className={`s-seg ${item.status} ${isSelected ? "is-sel" : ""}`}
                  onClick={() => handleSlotClick(item)}
                  disabled={item.status !== "available"}
                  aria-pressed={isSelected}
                >
                  <span className="s-seg-in">
                    <span className="s-seg-main">
                      <span className="s-seg-range">{formattedTime}</span>
                      <span className="s-seg-note">
                        <span className={`s-seg-dot ${dotClass}`} aria-hidden="true"></span>
                        <span className="s-seg-state">{statusLabel}</span>
                        <span>· ৬০ মিনিট</span>
                      </span>
                    </span>

                    <span className="s-seg-prices">
                      <span className="s-seg-p">৳{toBengaliDigits(price)}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Slot Booking Modal */}
      {selectedSlot && (
        <div
          className="s-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-booking-title"
        >
          <div className="s-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="s-modal-header">
              <h3 id="modal-booking-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--accent)" }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                স্লট বুকিং কনফার্মেশন
              </h3>
              <button
                type="button"
                className="s-modal-close"
                onClick={closeModal}
                aria-label="বন্ধ করুন"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="s-modal-body">
              <div className="s-panel-grid">
                <div className="s-sum">
                  <h3>বুকিং সারাংশ</h3>
                  <div className="s-sum-list">
                    <div className="s-sum-row">
                      <span>তারিখ:</span>
                      <span>
                        {selectedDateObj?.dayOfWeek}, {toBengaliDigits(selectedDate)}
                      </span>
                    </div>
                    <div className="s-sum-row">
                      <span>সময়:</span>
                      <span>{formatSlotTimeBn(selectedSlot.slot)}</span>
                    </div>
                    <div className="s-sum-row">
                      <span>সময়কাল:</span>
                      <span>৬০ মিনিট</span>
                    </div>
                    <div className="s-sum-row">
                      <span>ভেন্যু:</span>
                      <span>রয়েল টার্ফ এন্ড সুইমিং জোন</span>
                    </div>
                  </div>

                  <div className="s-sum-price">
                    <span>মোট ভাড়া:</span>
                    <b>৳{toBengaliDigits(getSlotPrice(selectedSlot.slot))}</b>
                  </div>

                  <div style={{ marginTop: "18px", fontSize: "13px", color: "var(--muted)" }}>
                    💡 অগ্রিম পেমেন্টে মাত্র ৳৫০০ প্রদান করে স্লট কনফার্ম করতে পারবেন।
                  </div>
                </div>

                <form className="s-form" onSubmit={handleBookingSubmit}>
                  <div className="s-form-row">
                    <div className="s-field">
                      <label htmlFor="customer-name">
                        আপনার নাম <span style={{ color: "var(--err)" }}>*</span>
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        required
                        placeholder="পুরো নাম লিখুন"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                      />
                    </div>

                    <div className="s-field">
                      <label htmlFor="customer-phone">
                        মোবাইল নম্বর <span style={{ color: "var(--err)" }}>*</span>
                      </label>
                      <input
                        id="customer-phone"
                        type="tel"
                        required
                        placeholder="০১XXXXXXXXX"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {canUseCOD ? (
                    <div className="s-field">
                      <label>পেমেন্ট পদ্ধতি</label>
                      <div className="s-payment-choice">
                        <label className={paymentType === "advance" ? "is-selected" : ""}>
                          <input
                            type="radio"
                            name="paymentType"
                            value="advance"
                            checked={paymentType === "advance"}
                            onChange={(e) => setPaymentType(e.target.value)}
                          />
                          <span>বিকাশ অগ্রিম (৳৫০০)</span>
                        </label>

                        <label className={paymentType === "cod" ? "is-selected" : ""}>
                          <input
                            type="radio"
                            name="paymentType"
                            value="cod"
                            checked={paymentType === "cod"}
                            onChange={(e) => setPaymentType(e.target.value)}
                          />
                          <span>ক্যাশ বুকিং (ভেন্যুতে পরিশোধ)</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="s-field">
                      <label>পেমেন্ট পদ্ধতি</label>
                      <div className="s-payment-single">
                        <div className="s-payment-single-in">
                          <span className="s-pay-dot"></span>
                          <div className="s-pay-text">
                            <strong>বিকাশ অনলাইন পেমেন্ট (অগ্রিম ৳৫০০)</strong>
                            <small>বিকাশের মাধ্যমে মাত্র ৳৫০০ অগ্রিম প্রদান করে স্লট নিশ্চিত করুন</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="s-field">
                    <label htmlFor="booking-notes">বিশেষ কোনো অনুরোধ (ঐচ্ছিক)</label>
                    <input
                      id="booking-notes"
                      type="text"
                      placeholder="যেমন: অতিরিক্ত ফুটবল বা কিট প্রয়োজন"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      type="submit"
                      className="s-btn s-btn-primary"
                      disabled={submitting}
                    >
                      {submitting
                        ? "প্রসেস হচ্ছে..."
                        : canUseCOD && paymentType === "cod"
                        ? "ক্যাশ বুকিং নিশ্চিত করুন"
                        : "বিকাশে অগ্রিম পে করুন (৳৫০০)"}
                    </button>

                    <button
                      type="button"
                      className="s-btn s-btn-ghost"
                      onClick={closeModal}
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
