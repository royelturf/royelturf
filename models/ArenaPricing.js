import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    arenaName: {
      type: String,
      required: true,
      unique: true,
    },
    defaultPrice: {
      type: Number,
      required: true,
      default: 2000,
    },
    defaultRegularPrice: {
      type: Number,
      default: 2500,
    },
    timeSlots: [
      {
        slot: { type: String, required: true }, // e.g. "06:00am to 07:30am"
        price: { type: Number, required: true },
        regularPrice: { type: Number, default: null },
      },
    ],
    // Friday pricing configuration
    fridayDefaultPrice: {
      type: Number,
      default: null,
    },
    fridayDefaultRegularPrice: {
      type: Number,
      default: null,
    },
    fridayTimeSlots: [
      {
        slot: { type: String, required: true },
        price: { type: Number, required: true },
        regularPrice: { type: Number, default: null },
      },
    ],
    // Saturday pricing configuration
    saturdayDefaultPrice: {
      type: Number,
      default: null,
    },
    saturdayDefaultRegularPrice: {
      type: Number,
      default: null,
    },
    saturdayTimeSlots: [
      {
        slot: { type: String, required: true },
        price: { type: Number, required: true },
        regularPrice: { type: Number, default: null },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Pricing ||
  mongoose.model("Pricing", pricingSchema);