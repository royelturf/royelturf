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
  Play,
  Film,
  Camera,
} from "lucide-react";

import img1 from "@/public/images/gallry/image-1.jpeg";
import img2 from "@/public/images/gallry/image-2.jpeg";
import img3 from "@/public/images/gallry/image-3.jpeg";
import img4 from "@/public/images/gallry/image-4.jpeg";
import img5 from "@/public/images/gallry/image-5.jpeg";
import img6 from "@/public/images/gallry/image-6.jpeg";
import img7 from "@/public/images/gallry/image-7.jpeg";
import img8 from "@/public/images/gallry/image-8.jpeg";
import img9 from "@/public/images/gallry/image-9.jpeg";
import img10 from "@/public/images/gallry/image-10.jpeg";
import img11 from "@/public/images/gallry/image-11.jpeg";
import img12 from "@/public/images/gallry/image-12.jpeg";
import img13 from "@/public/images/gallry/image-13.jpeg";
import img14 from "@/public/images/gallry/image-14.jpeg";
import img15 from "@/public/images/gallry/image-15.jpeg";

const GALLERY_VIDEOS = [
  {
    id: "v1",
    src: "/images/gallry/video-1.mp4",
    title: "ভূশ্চি রয়েল টার্ফ ও অ্যারেনা ভিডিও ট্যুর",
    badge: "ভিডিও ১ · টার্ফ ট্যুর",
    desc: "আন্তর্জাতিক মানের কৃত্রিম ঘাসের খেলার মাঠ ও ভেন্যুর মনোরম পরিবেশের বাস্তব ভিডিও ক্লিপ।",
  },
  {
    id: "v2",
    src: "/images/gallry/video-2.mp4",
    title: "নাইট ফুটবল ম্যাচ ও অ্যারেনা হাইলাইটস",
    badge: "ভিডিও ২ · নাইট ম্যাচ",
    desc: "উজ্জ্বল ফ্লাডলাইটের আলোয় রোমাঞ্চকর রাতের ম্যাচ ও খেলোয়াড়দের জমজমাট ফুটবল মুহূর্ত।",
  },
];

const ALL_GALLERY_IMAGES = [
  {
    id: 1,
    src: img1,
    title: "প্রিমিয়াম কৃত্রিম টার্ফ ও গ্রিন পিচ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "আন্তর্জাতিক মান",
    desc: "উচ্চমানের নরম কৃত্রিম ঘাস এবং ইনজুরি-মুক্ত মসৃণ আন্তর্জাতিক মানের ফুটবল পিচ।",
  },
  {
    id: 2,
    src: img2,
    title: "অ্যারেনা বাউন্ডারি ও প্লেয়ার্স জোন",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "সুরক্ষিত চারপাশ",
    desc: "চারপাশে উঁচু সেফটি নেট ও আরামদায়ক খেলোয়াড়দের বিশ্রামের সুব্যবস্থা।",
  },
  {
    id: 3,
    src: img3,
    title: "ওয়াইড ফুল পিচ ও গোলপোস্ট ভিউ",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "ফুল অ্যারেনা",
    desc: "আন্তর্জাতিক মাপের মজবুত গোলপোস্ট ও পুরো মাঠের নয়নাভিরাম ল্যান্ডস্কেপ দৃশ্য।",
  },
  {
    id: 4,
    src: img4,
    title: "উজ্জ্বল ফ্লাডলাইটে নাইট ফুটবল",
    category: "night",
    categoryLabel: "নাইট ম্যাচ",
    badge: "২৪/৭ ম্যাচ",
    desc: "উচ্চ ক্ষমতাসম্পন্ন ফ্লাডলাইটের আলোয় দিন ও রাত সার্বক্ষণিক খেলার সুবিধা।",
  },
  {
    id: 5,
    src: img5,
    title: "টার্ফ সারফেস ও নিখুঁত মার্কার লাইন",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "প্রিমিয়াম সারফেস",
    desc: "আন্তর্জাতিক নিয়মে নিখুঁত মার্কার লাইন ও পরিচ্ছন্ন গ্রিন সারফেস।",
  },
  {
    id: 6,
    src: img6,
    title: "নাইট অ্যারেনা আলো ও সান্ধ্য আবহ",
    category: "night",
    categoryLabel: "নাইট ম্যাচ",
    badge: "নাইট ফ্লাডলাইট",
    desc: "রাতের আলোয় উদ্ভাসিত ভূশ্চি রয়েল টার্ফের রোমাঞ্চকর খেলার আবহ।",
  },
  {
    id: 7,
    src: img7,
    title: "রয়েল সুইমিং জোন ও রিল্যাক্স এরিয়া",
    category: "swimming",
    categoryLabel: "সুইমিং জোন",
    badge: "সুইমিং পুল",
    desc: "পরিচ্ছন্ন ও সতেজ পানির আধুনিক সুইমিং পুল এবং রিল্যাক্সেশন এরিয়া।",
  },
  {
    id: 8,
    src: img8,
    title: "সুইমিং পুল ও খোলামেলা স্পেস",
    category: "swimming",
    categoryLabel: "সুইমিং জোন",
    badge: "পরিচ্ছন্ন পানি",
    desc: "ম্যাচের পর ক্লান্তি দূর করতে বন্ধু ও পরিবারের সাথে সাঁতার কাটার সেরা সুবিধা।",
  },
  {
    id: 9,
    src: img9,
    title: "টার্ফ ও প্যাভিলিয়ন ভিউ",
    category: "venue",
    categoryLabel: "ভেন্যু ও পরিবেশ",
    badge: "মনোরম পরিবেশ",
    desc: "প্রাকৃতিক আলো-বাতাসে ঘেরা কুমিল্লার লালমাইয়ে সেরা স্পোর্টস কমপ্লেক্স।",
  },
  {
    id: 10,
    src: img10,
    title: "ম্যাচ প্রস্তুতি ও সাইডলাইন এরিয়া",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "টিম প্রস্তুত",
    desc: "ম্যাচের আগে ওয়ার্ম-আপ এবং টিম স্ট্র্যাটেজির জন্য প্রশস্ত সাইডলাইন।",
  },
  {
    id: 11,
    src: img11,
    title: "রাতের টার্ফ ও ঝলমলে ম্যাচ",
    category: "night",
    categoryLabel: "নাইট ম্যাচ",
    badge: "আলোকিত মাঠ",
    desc: "রাতের বেলা বন্ধু ও কলিগদের সাথে তীব্র প্রতিদ্বন্দ্বিতাপূর্ণ ফুটবলের আসর।",
  },
  {
    id: 12,
    src: img12,
    title: "টার্ফ গোল এরিয়া ও পেনাল্টি বক্স",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "গোলপোস্ট",
    desc: "প্রতিটি শট, সেভ ও গোলের উন্মাদনা উপভোগ করার আন্তর্জাতিক স্ট্যান্ডার্ড।",
  },
  {
    id: 13,
    src: img13,
    title: "রয়েল টার্ফ অ্যারেনা সান্ধ্য ভিউ",
    category: "venue",
    categoryLabel: "ভেন্যু ও পরিবেশ",
    badge: "অ্যারেনা ভিউ",
    desc: "বিকেল ও সন্ধ্যার মনোমুগ্ধকর পরিবেশে খেলাধুলার অপার্থিব আনন্দ।",
  },
  {
    id: 14,
    src: img14,
    title: "টার্ফ মাঠের প্যানোরামিক দৃশ্য",
    category: "pitch",
    categoryLabel: "টার্ফ ও খেলার মাঠ",
    badge: "প্যানোরামা",
    desc: "সম্পূর্ণ টার্ফের আধুনিক অবকাঠামো, সেফটি বাউন্ডারি ও মনোরম পরিবেশ।",
  },
  {
    id: 15,
    src: img15,
    title: "ভূশ্চি রয়েল টার্ফ সামগ্রিক ভেন্যু",
    category: "venue",
    categoryLabel: "ভেন্যু ও পরিবেশ",
    badge: "রয়েল স্পোর্টস",
    desc: "খেলা, বিনোদন ও সুইমিংয়ের সেরা আন্তর্জাতিক মানের স্পোর্টস ভেন্যু।",
  },
];

const CATEGORIES = [
  { key: "all", label: "সব ছবি ও ভিডিও" },
  { key: "video", label: "ভিডিও ক্লিপস" },
  { key: "pitch", label: "টার্ফ ও মাঠ" },
  { key: "night", label: "নাইট ম্যাচ" },
  { key: "swimming", label: "সুইমিং জোন" },
  { key: "venue", label: "ভেন্যু ও পরিবেশ" },
];

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filteredImages =
    selectedCategory === "all" || selectedCategory === "video"
      ? ALL_GALLERY_IMAGES
      : ALL_GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const showVideos = selectedCategory === "all" || selectedCategory === "video";
  const showPhotos = selectedCategory !== "video";

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
                ভূশ্চি রয়েল টার্ফ <span>ফটো ও ভিডিও গ্যালারি</span>
              </h1>

              <p className="s-gal-page-desc">
                কুমিল্লার লালমাইয়ে আন্তর্জাতিক মানের কৃত্রিম টার্ফ, শক্তিশালী ফ্লাডলাইট, আধুনিক সুইমিং জোন এবং খোলামেলা পরিবেশে ফুটবল ও ক্রিকেট খেলার বাস্তব চিত্র ও ভিডিও হাইলাইটস।
              </p>

              {/* Filter Tabs */}
              <div className="s-gal-filters" role="tablist" aria-label="গ্যালারি ক্যাটাগরি">
                {CATEGORIES.map((cat) => {
                  let count = 0;
                  if (cat.key === "all") {
                    count = ALL_GALLERY_IMAGES.length + GALLERY_VIDEOS.length;
                  } else if (cat.key === "video") {
                    count = GALLERY_VIDEOS.length;
                  } else {
                    count = ALL_GALLERY_IMAGES.filter((img) => img.category === cat.key).length;
                  }

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

        {/* Top Featured Videos Section */}
        {showVideos && (
          <section className="s-wrap s-gal-videos-section">
            <div className="s-gal-section-title-wrap">
              <div className="s-gallery-tag">
                <Film size={14} className="s-sparkle-icon" />
                <span>ভিডিও হাইলাইটস</span>
              </div>
              <h2 className="s-gal-section-title">টার্ফ ও অ্যারেনা রিয়েল ভিডিও</h2>
              <p className="s-gal-section-desc">
                সরাসরি দেখুন রয়েল টার্ফের আন্তর্জাতিক মানের কৃত্রিম মাঠ ও রাতের আলোকিত ম্যাচের চমৎকার ভিডিও ক্লিপ।
              </p>
            </div>

            <div className="s-gal-videos-grid">
              {GALLERY_VIDEOS.map((video) => (
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
          </section>
        )}

        {/* Gallery Grid Section */}
        {showPhotos && (
          <section className="s-wrap s-gal-grid-section">
            <div className="s-gal-section-title-wrap">
              <div className="s-gallery-tag">
                <Camera size={14} className="s-sparkle-icon" />
                <span>ফটো অ্যালবাম</span>
              </div>
              <h2 className="s-gal-section-title">
                {selectedCategory === "all" ? "রয়েল টার্ফ ফটো গ্যালারি" : CATEGORIES.find(c => c.key === selectedCategory)?.label || "ফটো গ্যালারি"}
              </h2>
              <p className="s-gal-section-desc">
                দিন ও রাতের রোমাঞ্চকর ম্যাচ, বিশ্বমানের গ্রিন টার্ফ ও আধুনিক সুইমিং জোনের বাস্তব ছবিসমূহ।
              </p>
            </div>

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
        )}

        {/* Bottom Booking Banner */}
        <section className="s-wrap s-gal-cta-section">
          <div className="s-gal-cta-card">
            <div className="s-gal-cta-content">
              <div className="s-gallery-tag">
                <span>সহজ অনলাইন বুকিং</span>
              </div>
              <h2>ছবি দেখে খেলতে ইচ্ছে করছে?</h2>
              <p>
                পছন্দের সময়ে আপনার টিম নিয়ে আসুন! অনলাইনে স্লট দেখে মাত্র ৫০০ টাকা দিয়ে সহজে বুকিং নিশ্চিত করুন।
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
