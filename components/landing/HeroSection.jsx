"use client";

import React from "react";
import Image from "next/image";
import heroBg from "@/public/images/hero-turf-bg.jpg";

export default function HeroSection() {
  return (
    <section className="s-hero" aria-labelledby="hero-h">
      <div className="s-hero-scene" aria-hidden="true">
        <div className="s-hero-bg-wrap">
          <Image
            src={heroBg}
            alt="রয়েল টার্ফ ও সুইমিং জোন এর ফুটবল মাঠ"
            fill
            priority
            quality={90}
            className="s-hero-bg-img"
            sizes="100vw"
          />
        </div>
        <div className="s-scrim"></div>
      </div>

      <div className="s-wrap s-hero-copy">
        <p className="s-eyebrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
          </svg>
          <span>চেয়ারম্যান বাড়ি, গোসাই পুষ্করিণী, লালমাই, কুমিল্লা</span>
        </p>

        <h1 className="s-hero-h" id="hero-h">
          <span>প্রতিদ্বন্দ্বিতায় নামো,</span>
          <span className="accent">সেরাটা দেখাও!</span>
        </h1>

        <p className="s-hero-sub">
          আন্তর্জাতিক মানের কৃত্রিম টার্ফ, পাওয়ারফুল ফ্লাডলাইট এবং আধুনিক সুইমিং
          জোন নিয়ে কুমিল্লার লালমায়ে সেরা স্পোর্টস অভিজ্ঞতা।
        </p>

        <div className="s-hero-ctas">
          <a href="#booking" className="s-btn s-btn-primary">
            স্লট বুক করুন
          </a>
          <a href="#prices" className="s-btn s-btn-ghost">
            দাম দেখুন
          </a>
        </div>
      </div>
    </section>
  );
}
