"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const TUTORIAL_VIDEO_URL = "https://www.youtube-nocookie.com/embed/qrlQqVRXedo?autoplay=1&rel=0";

export default function TutorialVideoModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="s-video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="s-video-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="s-video-modal-head">
          <div className="s-video-modal-title">
            <div className="s-v-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <h3 id="video-modal-title">কীভাবে স্লট বুক করবেন?</h3>
              <span>সহজ ৩টি ধাপে স্লট নির্বাচন ও কনফার্মেশন গাইড</span>
            </div>
          </div>

          <button
            type="button"
            className="s-video-modal-close"
            onClick={onClose}
            aria-label="ভিডিও বন্ধ করুন"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="s-video-modal-body">
          <div className="s-video-frame-wrap">
            <iframe
              src={TUTORIAL_VIDEO_URL}
              title="কীভাবে বুক করবেন - ভিডিও টিউটোরিয়াল"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="s-video-steps">
            <div className="s-v-step">
              <div className="s-v-step-num">১</div>
              <div className="s-v-step-text">
                <strong>স্লট নির্বাচন</strong>
                ক্যালেন্ডার থেকে আপনার পছন্দের তারিখ ও ফাঁকা স্লট বেছে নিন।
              </div>
            </div>

            <div className="s-v-step">
              <div className="s-v-step-num">২</div>
              <div className="s-v-step-text">
                <strong>তথ্য ও কুপন</strong>
                আপনার নাম, মোবাইল নম্বর দিন এবং কুপন কোড থাকলে প্রয়োগ করুন।
              </div>
            </div>

            <div className="s-v-step">
              <div className="s-v-step-num">৩</div>
              <div className="s-v-step-text">
                <strong>বিকাশ অগ্রিম পেমেন্ট</strong>
                বিকাশে মাত্র ৳১ অগ্রিম প্রদান করলেই স্লট নিশ্চিত হয়ে যাবে।
              </div>
            </div>
          </div>

          <div className="s-video-modal-footer">
            <button
              type="button"
              className="s-btn s-btn-ghost"
              onClick={onClose}
            >
              বন্ধ করুন
            </button>
            <button
              type="button"
              className="s-btn s-btn-primary"
              onClick={() => {
                onClose();
                const el = document.getElementById("booking");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              এখনই বুক করুন →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
