export const TIME_SLOTS = [
  "12:00am to 01:00am",
  "01:00am to 02:00am",
  "02:00am to 03:00am",
  "03:00am to 04:00am",
  "04:00am to 05:00am",
  "05:00am to 06:00am",
  "06:00am to 07:00am",
  "07:00am to 08:00am",
  "08:00am to 09:00am",
  "09:00am to 10:00am",
  "10:00am to 11:00am",
  "11:00am to 12:00pm",
  "12:00pm to 01:00pm",
  "01:00pm to 02:00pm",
  "02:00pm to 03:00pm",
  "03:00pm to 04:00pm",
  "04:00pm to 05:00pm",
  "05:00pm to 06:00pm",
  "06:00pm to 07:00pm",
  "07:00pm to 08:00pm",
  "08:00pm to 09:00pm",
  "09:00pm to 10:00pm",
  "10:00pm to 11:00pm",
  "11:00pm to 12:00am"
];

/**
 * Determine the day type from a booking date.
 * Returns: "friday" | "saturday" | "regular"
 *
 * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday,
 * 5 = Friday, 6 = Saturday
 */
export function getDayType(dateInput) {
  if (!dateInput) return "regular";

  let dayOfWeek;
  if (typeof dateInput === "string") {
    const match = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      dayOfWeek = new Date(year, month, day).getDay();
    } else {
      dayOfWeek = new Date(dateInput).getDay();
    }
  } else if (dateInput instanceof Date) {
    dayOfWeek = dateInput.getDay();
  }

  if (dayOfWeek === 5) return "friday";
  if (dayOfWeek === 6) return "saturday";
  return "regular";
}

/**
 * Calculate the effective slot price considering day-specific overrides,
 * day-specific default prices, and baseline regular prices.
 */
export function calculateSlotPrice(arenaPricing, bookingDate, timeSlot) {
  if (!arenaPricing) return 2000;

  const dayType = bookingDate ? getDayType(bookingDate) : "regular";

  if (dayType === "friday") {
    const override = arenaPricing.fridayTimeSlots?.find((s) => s.slot === timeSlot);
    if (override && typeof override.price === "number" && !isNaN(override.price) && override.price > 0) {
      return override.price;
    }
    if (typeof arenaPricing.fridayDefaultPrice === "number" && !isNaN(arenaPricing.fridayDefaultPrice) && arenaPricing.fridayDefaultPrice > 0) {
      return arenaPricing.fridayDefaultPrice;
    }
  } else if (dayType === "saturday") {
    const override = arenaPricing.saturdayTimeSlots?.find((s) => s.slot === timeSlot);
    if (override && typeof override.price === "number" && !isNaN(override.price) && override.price > 0) {
      return override.price;
    }
    if (typeof arenaPricing.saturdayDefaultPrice === "number" && !isNaN(arenaPricing.saturdayDefaultPrice) && arenaPricing.saturdayDefaultPrice > 0) {
      return arenaPricing.saturdayDefaultPrice;
    }
  }

  // Regular (Sun-Thu) or Fallback
  const override = arenaPricing.timeSlots?.find((s) => s.slot === timeSlot);
  if (override && typeof override.price === "number" && !isNaN(override.price) && override.price > 0) {
    return override.price;
  }

  if (typeof arenaPricing.defaultPrice === "number" && !isNaN(arenaPricing.defaultPrice) && arenaPricing.defaultPrice > 0) {
    return arenaPricing.defaultPrice;
  }

  return 2000;
}

/**
 * Baseline standard regular prices (before shift discounts)
 * Matches PricingSection.jsx shifts:
 * - Open shift (06am - 11am): 1500
 * - Mid shift (11am - 03pm): 1500
 * - Afternoon shift (03pm - 05pm): 1800
 * - Night shift (05pm - 01am): 2500
 * - Closed / Late night shift (01am - 06am): 2500
 */
export const DEFAULT_SLOT_REGULAR_PRICES = {
  "12:00am to 01:00am": 2500,
  "01:00am to 02:00am": 2500,
  "02:00am to 03:00am": 2500,
  "03:00am to 04:00am": 2500,
  "04:00am to 05:00am": 2500,
  "05:00am to 06:00am": 2500,
  "06:00am to 07:00am": 1500,
  "07:00am to 08:00am": 1500,
  "08:00am to 09:00am": 1500,
  "09:00am to 10:00am": 1500,
  "10:00am to 11:00am": 1500,
  "11:00am to 12:00pm": 1500,
  "12:00pm to 01:00pm": 1500,
  "01:00pm to 02:00pm": 1500,
  "02:00pm to 03:00pm": 1500,
  "03:00pm to 04:00pm": 1800,
  "04:00pm to 05:00pm": 1800,
  "05:00pm to 06:00pm": 2500,
  "06:00pm to 07:00pm": 2500,
  "07:00pm to 08:00pm": 2500,
  "08:00pm to 09:00pm": 2500,
  "09:00pm to 10:00pm": 2500,
  "10:00pm to 11:00pm": 2500,
  "11:00pm to 12:00am": 2500,
};

/**
 * Calculate the original / regular price for a slot.
 */
export function calculateSlotRegularPrice(arenaPricing, bookingDate, timeSlot) {
  const dayType = bookingDate ? getDayType(bookingDate) : "regular";

  if (dayType === "friday") {
    const override = arenaPricing?.fridayTimeSlots?.find((s) => s.slot === timeSlot);
    if (override && typeof override.regularPrice === "number" && !isNaN(override.regularPrice) && override.regularPrice > 0) {
      return override.regularPrice;
    }
    if (typeof arenaPricing?.fridayDefaultRegularPrice === "number" && !isNaN(arenaPricing.fridayDefaultRegularPrice) && arenaPricing.fridayDefaultRegularPrice > 0) {
      return arenaPricing.fridayDefaultRegularPrice;
    }
  } else if (dayType === "saturday") {
    const override = arenaPricing?.saturdayTimeSlots?.find((s) => s.slot === timeSlot);
    if (override && typeof override.regularPrice === "number" && !isNaN(override.regularPrice) && override.regularPrice > 0) {
      return override.regularPrice;
    }
    if (typeof arenaPricing?.saturdayDefaultRegularPrice === "number" && !isNaN(arenaPricing.saturdayDefaultRegularPrice) && arenaPricing.saturdayDefaultRegularPrice > 0) {
      return arenaPricing.saturdayDefaultRegularPrice;
    }
  }

  // Regular (Sun-Thu) or Fallback
  const override = arenaPricing?.timeSlots?.find((s) => s.slot === timeSlot);
  if (override && typeof override.regularPrice === "number" && !isNaN(override.regularPrice) && override.regularPrice > 0) {
    return override.regularPrice;
  }

  if (typeof arenaPricing?.defaultRegularPrice === "number" && !isNaN(arenaPricing.defaultRegularPrice) && arenaPricing.defaultRegularPrice > 0) {
    return arenaPricing.defaultRegularPrice;
  }

  if (timeSlot && DEFAULT_SLOT_REGULAR_PRICES[timeSlot]) {
    return DEFAULT_SLOT_REGULAR_PRICES[timeSlot];
  }

  return 2500;
}

/**
 * Get both active offer price and regular price for a slot.
 */
export function getSlotPricing(arenaPricing, bookingDate, timeSlot) {
  const price = calculateSlotPrice(arenaPricing, bookingDate, timeSlot);
  const regularPrice = calculateSlotRegularPrice(arenaPricing, bookingDate, timeSlot);
  return { price, regularPrice };
}

/**
 * Format a number as a localized Bengali currency string with Indian-style comma grouping.
 * E.g., 2000 -> "২,০০০", 1500 -> "১,৫০০"
 */
export function formatPriceBn(num) {
  if (num === null || num === undefined || isNaN(num)) return "";
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const formatted = Number(num).toLocaleString("en-IN");
  return formatted.replace(/[0-9]/g, (d) => bn[parseInt(d, 10)]);
}
