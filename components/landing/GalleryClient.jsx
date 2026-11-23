"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Filter,
} from "lucide-react";

import galleryOne from "@/public/images/1.jpg";
import galleryTwo from "@/public/images/2.jpg";
import galleryThree from "@/public/images/3.jpg";
import galleryFour from "@/public/images/4.jpg";
import galleryFive from "@/public/images/5.jpg";
import gallerySix from "@/public/images/6.jpeg";
import timeupTurf from "@/public/images/timeupturf.webp";
import heroBg from "@/public/images/hero-turf-bg.jpg";

const ALL_GALLERY_IMAGES = [
  {
    id: 1,
    src: galleryOne,
    title: "প্রিমিয়াম কৃত্রিম টার্ফ ও ফুটবল",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "আন্তর্জাতিক মান",
    desc: "উন্নত ফাইবার ও নিখুঁত গ্রিপ সম্বলিত বিশ্বমানের কৃত্রিম ঘাসের ফুটবল পিচ।",
  },
  {
    id: 2,
    src: timeupTurf,
    title: "উজ্জ্বল ফ্লাডলাইটে নাইট ম্যাচ",
    category: "night",
    categoryLabel: "নাইট ম্যাচ",
    badge: "২৪/৭ খোলা",
    desc: "উচ্চ ক্ষমতাসম্পন্ন ফ্লাডলাইটের আলোয় দিন ও রাত সার্বক্ষণিক খেলার সুবিধা।",
  },
  {
    id: 3,
    src: galleryFour,
    title: "টার্ফ পিচ ও সুরক্ষিত গোলপোস্ট",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "সুরক্ষিত নেট",
    desc: "উভয় প্রান্তে আন্তর্জাতিক মানের গোলপোস্ট ও চারপাশ জুড়ে সেফটি বাউন্ডারি নেট।",
  },
  {
    id: 4,
    src: galleryThree,
    title: "ওয়াইড অ্যারেনা ও গ্রাউন্ড ভিউ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "প্রাকৃতিক আলো",
    desc: "খোলামেলা ও মনোরম প্রাকৃতিক পরিবেশে ফুটবল ও ক্রিকেট খেলার সেরা আবহ।",
  },
  {
    id: 5,
    src: galleryFive,
    title: "সেন্টার সার্কেল ও ফুল পিচ ভিউ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "প্রিমিয়াম সারফেস",
    desc: "আন্তর্জাতিক নিয়মে আঁকা নিখুঁত মার্কার লাইন ও পরিচ্ছন্ন সারফেস।",
  },
  {
    id: 6,
    src: galleryTwo,
    title: "ক্লোজ-আপ টার্ফ ফাইবার ও বল গ্রিপ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "ইনজুরি ফ্রি",
    desc: "নরম কুশনযুক্ত টার্ফ ফাইবার যা পড়ে গেলেও খেলোয়াড়দের আঘাত পাওয়া রোধ করে।",
  },
  {
    id: 7,
    src: gallerySix,
    title: "গ্র্যান্ড ওপেনিং ও টার্ফ আয়োজন",
    category: "event",
    categoryLabel: "টার্ফ ইভেন্ট",
    badge: "অফিশিয়াল",
    desc: "টুর্নামেন্ট, ম্যাচ ও ফ্রেন্ডলি ফুটবল আয়োজনের জন্য কুমিল্লার প্রিয় ঠিকানা।",
  },
  {
    id: 8,
    src: heroBg,
    title: "রয়েল টার্ফ সামগ্রিক পরিবেশ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "সবুজ পরিবেশ",
    desc: "পেশাদার খেলা, আধুনিক সুযোগ-সুবিধা এবং সুইমিং জোনের দারুণ সমাহার।",
  },
];

const CATEGORIES = [
  { key: "all", label: "সব ছবি" },
  { key: "pitch", label: "টার্ফ ও মাঠ" },
  { key: "night", label: "নাইট ম্যাচ" },
  { key: "event", label: "টার্ফ ইভেন্ট" },
];

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filteredImages =
    selectedCategory === "all"
      ? ALL_GALLERY_IMAGES
      : ALL_GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const openLightbox = (index) => setLightboxIdx(index);
  const closeLightbox = () => setLightboxIdx(null);

  const prevImage = (e) => {
    e?.stopPropagation();
    setLightboxIdx((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setLightboxIdx((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  // Lock scroll and handle keyboard navigation for modal
  useEffect(() => {
    if (lightboxIdx === null) {
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
  }, [lightboxIdx, filteredImages.length]);

  return (
    <div className="site">
      <main className="s-gallery-page-main">
        {/* Gallery Hero Banner */}
        <section className="s-gal-hero">
          <div className="s-wrap">
            <div className="s-gal-hero-content">
              <h1 className="s-gal-page-title">
                ভূশ্চি রয়েল টার্ফ <span>ফটো গ্যালারি</span>
              </h1>

              <p className="s-gal-page-desc">
                কুমিল্লার লালমাইয়ে আন্তর্জাতিক মানের কৃত্রিম টার্ফ, শক্তিশালী ফ্লাডলাইট, আধুনিক সুইমিং জোন এবং খোলামেলা পরিবেশে ফুটবল ও ক্রিকেট খেলার বাস্তব চিত্র দেখুন।
              </p>

              {/* Filter Tabs */}
              <div className="s-gal-filters" role="tablist" aria-label="গ্যালারি ক্যাটাগরি">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.key === "all"
                      ? ALL_GALLERY_IMAGES.length
                      : ALL_GALLERY_IMAGES.filter((img) => img.category === cat.key).length;

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      role="tab"
                      aria-selected={selectedCategory === cat.key}
                      className={`s-gal-filter-btn ${
                        selectedCategory === cat.key ? "is-active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setLightboxIdx(null);
                      }}
                    >
                      <span>{cat.label}</span>
                      <span className="s-gal-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="s-wrap s-gal-grid-section">
          <div className="s-gal-full-grid">
            {filteredImages.map((item, index) => (
              <div
                key={item.id}
                className="s-gal-full-card"
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
                <div className="s-gal-full-img-wrap">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="s-gal-full-img"
                  />
                  <div className="s-gal-full-gradient" />
                </div>

                <div className="s-gal-card-badge">{item.badge}</div>

                <div className="s-gal-full-overlay">
                  <div className="s-gal-full-meta">
                    <span className="s-gal-category">{item.categoryLabel}</span>
                    <h3 className="s-gal-full-title">{item.title}</h3>
                    <p className="s-gal-full-desc">{item.desc}</p>
                  </div>

                  <div className="s-gal-zoom-btn" title="বড় করে দেখুন">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Booking Banner */}
        <section className="s-wrap s-gal-cta-section">
          <div className="s-gal-cta-card">
            <div className="s-gal-cta-content">
              <div className="s-gallery-tag">
                <span>সহজ অনলাইন বুকিং</span>
              </div>
              <h2>ছবি দেখে খেলতে ইচ্ছে করছে?</h2>
              <p>
                পছন্দের সময়ে আপনার টিম নিয়ে আসুন! অনলাইনে স্লট দেখে মাত্র ১ টাকা দিয়ে সহজে বুকিং নিশ্চিত করুন।
              </p>
              <div className="s-gal-cta-actions">
                <Link href="/#booking" className="s-btn s-btn-primary">
                  স্লট বুক করুন
                </Link>
                <a href="tel:01616753671" className="s-btn s-btn-ghost">
                  <Phone size={16} />
                  <span>০১৬১৬-৭৫৩৬৭১</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && filteredImages[lightboxIdx] && (
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
                src={filteredImages[lightboxIdx].src}
                alt={filteredImages[lightboxIdx].title}
                className="s-lightbox-img"
                priority
              />
            </div>

            <div className="s-lightbox-caption">
              <div>
                <span className="s-lb-cat">
                  {filteredImages[lightboxIdx].categoryLabel}
                </span>
                <h4 className="s-lb-title">{filteredImages[lightboxIdx].title}</h4>
                <p className="s-lb-desc">{filteredImages[lightboxIdx].desc}</p>
              </div>
              <div className="s-lb-counter">
                {lightboxIdx + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
