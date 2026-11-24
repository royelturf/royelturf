"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2, ChevronLeft, ChevronRight, X, Play, Film, Camera } from "lucide-react";

import img1 from "@/public/images/gallry/image-1.jpeg";
import img2 from "@/public/images/gallry/image-2.jpeg";
import img3 from "@/public/images/gallry/image-3.jpeg";
import img4 from "@/public/images/gallry/image-4.jpeg";
import img7 from "@/public/images/gallry/image-7.jpeg";
import img11 from "@/public/images/gallry/image-11.jpeg";

const HOME_GALLERY_VIDEOS = [
  {
    id: "v1",
    src: "/images/gallry/video-1.mp4",
    title: "ভূশ্চি রয়েল টার্ফ ও অ্যারেনা ভিডিও ট্যুর",
    badge: "ভিডিও ১ · টার্ফ ট্যুর",
    desc: "আন্তর্জাতিক মানের কৃত্রিম ঘাসের খেলার মাঠ ও ভেন্যুর মনোরম পরিবেশের বাস্তব ভিডিও চিত্র।",
  },
  {
    id: "v2",
    src: "/images/gallry/video-2.mp4",
    title: "নাইট ফুটবল ম্যাচ ও অ্যারেনা হাইলাইটস",
    badge: "ভিডিও ২ · নাইট ম্যাচ",
    desc: "উজ্জ্বল ফ্লাডলাইটের আলোয় রোমাঞ্চকর রাতের ম্যাচ ও খেলোয়াড়দের জমজমাট ফুটবল মুহূর্ত।",
  },
];

const HOME_GALLERY_ITEMS = [
  {
    id: 1,
    src: img1,
    title: "প্রিমিয়াম কৃত্রিম টার্ফ ও গ্রিন পিচ",
    category: "টার্ফ গ্রাউন্ড",
    badge: "আন্তর্জাতিক মান",
  },
  {
    id: 2,
    src: img4,
    title: "উজ্জ্বল ফ্লাডলাইটে নাইট ফুটবল",
    category: "নাইট ম্যাচ",
    badge: "২৪/৭ ম্যাচ",
  },
  {
    id: 3,
    src: img3,
    title: "ওয়াইড ফুল পিচ ও গোলপোস্ট ভিউ",
    category: "টার্ফ গ্রাউন্ড",
    badge: "ফুল অ্যারেনা",
  },
  {
    id: 4,
    src: img2,
    title: "অ্যারেনা বাউন্ডারি ও প্লেয়ার্স জোন",
    category: "টার্ফ গ্রাউন্ড",
    badge: "সুরক্ষিত নেট",
  },
  {
    id: 5,
    src: img7,
    title: "রয়েল সুইমিং জোন ও রিল্যাক্স এরিয়া",
    category: "সুইমিং জোন",
    badge: "সুইমিং পুল",
  },
  {
    id: 6,
    src: img11,
    title: "রাতের টার্ফ ও ঝলমলে ম্যাচ",
    category: "নাইট ম্যাচ",
    badge: "আলোকিত মাঠ",
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
            <span>ফটো ও ভিডিও গ্যালারি</span>
          </div>
          <h2 className="s-h2" id="gal-h">
            এক নজরে রয়েল টার্ফ
          </h2>
          <p className="s-lede">
            দিন কিংবা রাতে সেরা ফুটবল ও সুইমিং অভিজ্ঞতার বাস্তব খণ্ডচিত্র ও ভিডিও। কুমিল্লার লালমাইয়ে আন্তর্জাতিক মানের কৃত্রিম টার্ফে খেলুন বন্ধুদের সাথে।
          </p>
        </div>

        <div className="s-gallery-header-cta">
          <Link href="/gallery" className="s-btn s-btn-ghost s-gal-all-btn">
            <span>সম্পূর্ণ গ্যালারি দেখুন (১৫টি ছবি ও ২টি ভিডিও)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Top 2 Featured Videos */}
      <div className="s-gal-section-title-wrap" style={{ marginTop: "12px", marginBottom: "20px" }}>
        <div className="s-gallery-tag">
          <Film size={14} className="s-sparkle-icon" />
          <span>ভিডিও হাইলাইটস</span>
        </div>
      </div>

      <div className="s-gal-videos-grid" style={{ marginBottom: "40px" }}>
        {HOME_GALLERY_VIDEOS.map((video) => (
          <div key={video.id} className="s-gal-video-card">
            <div className="s-gal-video-player-wrap">
              <video
                src={video.src}
                controls
                preload="metadata"
                playsInline
                className="s-gal-video-player"
              />
            </div>
            <div className="s-gal-video-info">
              <div className="s-gal-video-badge">
                <Play size={12} fill="currentColor" />
                <span>{video.badge}</span>
              </div>
              <h3 className="s-gal-video-title">{video.title}</h3>
              <p className="s-gal-video-desc">{video.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Header */}
      <div className="s-gal-section-title-wrap" style={{ marginBottom: "20px" }}>
        <div className="s-gallery-tag">
          <Camera size={14} className="s-sparkle-icon" />
          <span>ফটো গ্যালারি</span>
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
            আরও ছবি ও ভিডিও দেখুন
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
