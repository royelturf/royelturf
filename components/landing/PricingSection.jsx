"use client";

import React from "react";
import Link from "next/link";
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
} from "lucide-react";

const SHIFTS = [
  {
    id: "open",
    title: "ওপেন শিফট",
    time: "সকাল ০৬:০০ - ১১:০০",
    icon: Sunrise,
    price: "৳১,২০০",
    regularPrice: "৳১,৫০০",
    saveAmount: "৳৩০০",
    desc: "দিনের ফ্রেশ আবহে ফিটনেস রুটিন, একাডেমি ড্রিল এবং মর্নিং ফ্রেন্ডলি ম্যাচের জন্য আদর্শ।",
    popular: false,
    features: [
      "৫০ মিমি ফিফা সার্টিফাইড সিন্থেটিক টার্ফ",
      "হাই-লাক্স এলইডি ফ্লাডলাইট সুবিধা",
      "বিবস ও কোয়ালিটি ম্যাচ বল সরবরাহ",
      "ডাগআউট, ড্রেসিং ও ওয়াশরুম সুবিধা",
    ],
  },
  {
    id: "mid",
    title: "মিড শিফট",
    time: "সকাল ১১:০০ - দুপুর ০৩:০০",
    icon: Sun,
    price: "৳১,০০০",
    regularPrice: "৳১,৫০০",
    saveAmount: "৳৫০০",
    desc: "ফুল ফিল্ড টার্ফে সর্বোচ্চ সেভিংস। স্টুডেন্ট স্কোয়াড ও ক্যাজুয়াল ফ্রেন্ডলি ম্যাচের সেরা বাজেট চয়েস।",
    popular: false,
    features: [
      "৫০ মিমি ফিফা সার্টিফাইড সিন্থেটিক টার্ফ",
      "হাই-লাক্স এলইডি ফ্লাডলাইট সুবিধা",
      "বিবস ও কোয়ালিটি ম্যাচ বল সরবরাহ",
      "ডাগআউট, ড্রেসিং ও ওয়াশরুম সুবিধা",
    ],
  },
  {
    id: "afternoon",
    title: "আফটারনুন শিফট",
    time: "দুপুর ০৩:০০ - বিকাল ০৫:০০",
    icon: Sunset,
    price: "৳১,৪০০",
    regularPrice: "৳১,৮০০",
    saveAmount: "৳৪০০",
    desc: "সূর্যাস্তের আগের মনোরম আবহাওয়া, শীতল বাতাস ও চমৎকার প্রাকৃতিক আলোতে সেরা ফুটবল উপভোগ করুন।",
    popular: false,
    features: [
      "৫০ মিমি ফিফা সার্টিফাইড সিন্থেটিক টার্ফ",
      "হাই-লাক্স এলইডি ফ্লাডলাইট সুবিধা",
      "বিবস ও কোয়ালিটি ম্যাচ বল সরবরাহ",
      "ডাগআউট, ড্রেসিং ও ওয়াশরুম সুবিধা",
    ],
  },
  {
    id: "night",
    title: "নাইট শিফট",
    time: "বিকাল ০৫:০০ - সকাল ০১:০০",
    icon: Moon,
    price: "৳২,০০০",
    regularPrice: "৳২,৫০০",
    saveAmount: "৳৫০০",
    desc: "আন্তর্জাতিক মানের এলইডি ফ্লাডলাইটে উৎসবমুখর টুর্নামেন্ট ও পিক আওয়ারের জমজমাট ম্যাচ।",
    popular: true,
    popularBadge: "সবচেয়ে জনপ্রিয় শিফট",
    features: [
      "৫০ মিমি ফিফা সার্টিফাইড সিন্থেটিক টার্ফ",
      "হাই-লাক্স এলইডি ফ্লাডলাইট সুবিধা",
      "বিবস ও কোয়ালিটি ম্যাচ বল সরবরাহ",
      "ডাগআউট, ড্রেসিং ও ওয়াশরুম সুবিধা",
    ],
  },
  {
    id: "closed",
    title: "ক্লোজড শিফট",
    time: "বিকাল ০১:০০ - সকাল ০৬:০০",
    icon: Moon,
    price: "৳১,৮০০",
    regularPrice: "৳২,৫০০",
    saveAmount: "৳৭০০",
    desc: "আন্তর্জাতিক মানের এলইডি ফ্লাডলাইটে উৎসবমুখর টুর্নামেন্ট ও পিক আওয়ারের জমজমাট ম্যাচ।",
    popular: false,
    popularBadge: "সবচেয়ে জনপ্রিয় শিফট",
    features: [
      "৫০ মিমি ফিফা সার্টিফাইড সিন্থেটিক টার্ফ",
      "হাই-লাক্স এলইডি ফ্লাডলাইট সুবিধা",
      "বিবস ও কোয়ালিটি ম্যাচ বল সরবরাহ",
      "ডাগআউট, ড্রেসিং ও ওয়াশরুম সুবিধা",
    ],
  },
];

export default function PricingSection() {
  const renderCard = (shift) => {
    const IconComponent = shift.icon;

    return (
      <div
        key={shift.id}
        className={`s-shift-card ${shift.popular ? "is-popular" : ""}`}
      >
        {shift.popular && (
          <div className="s-shift-badge">
            <span>{shift.popularBadge}</span>
          </div>
        )}

        <div className="s-shift-card-top">
          {/* Header Row: Icon + Title + Time */}
          <div className="s-shift-head">
            <div className="s-shift-icon-wrap">
              <IconComponent size={21} />
            </div>
            <div className="s-shift-title-box">
              <div className="s-shift-title-row">
                <h3>{shift.title}</h3>
              </div>
              <div className="s-shift-time-pill">
                <span>{shift.time}</span>
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="s-shift-pricebox">
            <div className="s-shift-price-main">
              <span className="s-shift-amount">{shift.price}</span>
              <span className="s-shift-unit">টাকা / স্লট</span>
            </div>
            <div className="s-shift-price-sub">
              <span className="s-shift-reg">রেগুলার: {shift.regularPrice}</span>
              <span className="s-shift-save">সাশ্রয় {shift.saveAmount}</span>
            </div>
          </div>

          {/* Description */}
          <p className="s-shift-desc">{shift.desc}</p>
        </div>

        {/* CTA Button */}
        <div className="s-shift-card-bot">
          <Link
            href="/#booking"
            className={`s-shift-btn ${
              shift.popular ? "s-shift-btn--popular" : ""
            }`}
          >
            <span>এই শিফট বুক করুন</span>
            <ChevronRight size={17} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="s-prices" id="prices" aria-labelledby="pr-h">
      <div className="s-wrap">
        <div className="s-prices-header">
          <span className="s-tag-pill">প্যাকেজ ও রেট</span>
          <h2 className="s-h2" id="pr-h">
            দাম ও শিফট রেট
          </h2>
          <p className="s-lede">
            স্বচ্ছ ও সাশ্রয়ী শিফট প্যাকেজ — আপনার সুবিধাজনক সময়ে মাঠ বুক করে
            উপভোগ করুন সেরা খেলা
          </p>
        </div>

        {/* 4 Shift Cards Grid */}
        <div className="s-shifts-grid">
          {SHIFTS.map(renderCard)}
        </div>
      </div>
    </section>
  );
}
