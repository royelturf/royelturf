"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

import galleryOne from "@/public/images/1.jpg";
import timeupTurf from "@/public/images/timeupturf.webp";
import galleryFour from "@/public/images/4.jpg";
import galleryThree from "@/public/images/3.jpg";
import galleryFive from "@/public/images/5.jpg";
import gallerySix from "@/public/images/6.jpeg";

const HOME_GALLERY_ITEMS = [
  {
    id: 1,
    src: galleryOne,
    title: "প্রিমিয়াম কৃত্রিম টার্ফ ও বল",
    category: "টার্ফ গ্রাউন্ড",
    badge: "আন্তর্জাতিক মান",
  },
  {
    id: 2,
    src: timeupTurf,
    title: "উজ্জ্বল ফ্লাডলাইটে নাইট ফুটবল",
    category: "নাইট ম্যাচ",
    badge: "২৪/৭ খোলা",
  },
  {
    id: 3,
    src: galleryFour,
    title: "গ্রিন পিচ ও শক্তিশালী গোলপোস্ট",
    category: "টার্ফ গ্রাউন্ড",
    badge: "সুরক্ষিত নেট",
  },
  {
    id: 4,
    src: galleryThree,
    title: "ওয়াইড অ্যারেনা ও খোলামেলা পরিবেশ",
    category: "টার্ফ গ্রাউন্ড",
    badge: "প্রাকৃতিক আলো",
  },
  {
    id: 5,
    src: galleryFive,
    title: "সেন্টার সার্কেল ও ম্যাচ ভিউ",
    category: "টার্ফ গ্রাউন্ড",
    badge: "প্রিমিয়াম সারফেস",
  },
  {
    id: 6,
    src: gallerySix,
    title: "গ্র্যান্ড ওপেনিং ও টার্ফ আয়োজন",
    category: "ইভেন্ট",
    badge: "অফিশিয়াল",
  },
];

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState(null);

  const openLightbox = (index) => setActiveIdx(index);
  const closeLightbox = () => setActiveIdx(null);

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : HOME_GALLERY_ITEMS.length - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev < HOME_GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (activeIdx === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIdx]);

  return (
    <section className="s-gallery-sec s-wrap" id="gallery" aria-labelledby="gal-h">
      {/* Header Row */}
      <div className="s-gallery-header">
        <div className="s-gallery-header-info">
          <div className="s-gallery-tag">
            <span>ফটো গ্যালারি</span>
          </div>
          <h2 className="s-h2" id="gal-h">
            এক নজরে রয়েল টার্ফ
          </h2>
          <p className="s-lede">
            দিন কিংবা রাতে সেরা ফুটবল ও সুইমিং অভিজ্ঞতার বাস্তব খণ্ডচিত্র। কুমিল্লার লালমাইয়ে আন্তর্জাতিক মানের কৃত্রিম টার্ফে খেলুন বন্ধুদের সাথে।
          </p>
        </div>

        <div className="s-gallery-header-cta">
          <Link href="/gallery" className="s-btn s-btn-ghost s-gal-all-btn">
            <span>সম্পূর্ণ গ্যালারি দেখুন</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="s-gallery-grid">
        {HOME_GALLERY_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`s-gal-card ${index === 0 || index === 1 ? "s-gal-card--featured" : ""}`}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            aria-label={`${item.title} বড় করে দেখুন`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <div className="s-gal-img-wrap">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="s-gal-img"
              />
              <div className="s-gal-gradient" />
            </div>

            <div className="s-gal-card-badge">{item.badge}</div>

            <div className="s-gal-overlay">
              <div className="s-gal-meta">
                <span className="s-gal-category">{item.category}</span>
                <h3 className="s-gal-title">{item.title}</h3>
              </div>

              <div className="s-gal-zoom-btn" title="বড় করে দেখুন">
                <Maximize2 size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Bar */}
      <div className="s-gallery-bottom-bar">
        <div className="s-gbb-text">
          <strong>পছন্দের স্লটে ম্যাচ খেলতে চান?</strong>
          <span>দেরি না করে অনলাইনে স্লট দেখে এখনই কনফার্ম করুন।</span>
        </div>
        <div className="s-gbb-actions">
          <Link href="/#booking" className="s-btn s-btn-primary">
            স্লট বুক করুন
          </Link>
          <Link href="/gallery" className="s-btn s-btn-ghost">
            আরও ছবি দেখুন
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="s-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="ছবি ভিউয়ার"
        >
          <div className="s-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="s-lightbox-close"
              onClick={closeLightbox}
              aria-label="বন্ধ করুন"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="s-lightbox-nav s-lightbox-prev"
              onClick={prevImage}
              aria-label="পূর্ববর্তী ছবি"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              className="s-lightbox-nav s-lightbox-next"
              onClick={nextImage}
              aria-label="পরবর্তী ছবি"
            >
              <ChevronRight size={28} />
            </button>

            <div className="s-lightbox-image-wrap">
              <Image
                src={HOME_GALLERY_ITEMS[activeIdx].src}
                alt={HOME_GALLERY_ITEMS[activeIdx].title}
                className="s-lightbox-img"
                priority
              />
            </div>

            <div className="s-lightbox-caption">
              <div>
                <span className="s-lb-cat">{HOME_GALLERY_ITEMS[activeIdx].category}</span>
                <h4 className="s-lb-title">{HOME_GALLERY_ITEMS[activeIdx].title}</h4>
              </div>
              <div className="s-lb-counter">
                {activeIdx + 1} / {HOME_GALLERY_ITEMS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
