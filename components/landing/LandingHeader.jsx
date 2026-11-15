"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import mainLogo from "@/public/images/main-logo.png";

// You can replace this tutorial video URL with your own YouTube video link at any time
const TUTORIAL_VIDEO_URL = "https://youtu.be/qrlQqVRXedo?si=7aiWXkFqdtGBtUTn";

export default function LandingHeader() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  // Lock body scroll and handle Escape key for the video modal
  useEffect(() => {
    if (videoModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setVideoModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [videoModalOpen]);

  return (
    <>
      <header className="s-nav">
        <div className="s-wrap s-nav-in">
          <Link href="/" className="s-brand" onClick={closeMobile}>
            <Image
              src={mainLogo}
              alt="রয়েল টার্ফ লোগো"
              className="s-logo-img"
              width={38}
              height={38}
              priority
            />
            <span>রয়েল টার্ফ</span>
          </Link>

          <nav className="s-links" aria-label="পেজের অংশ">
            <Link href="/#booking">স্লট</Link>
            <Link href="/#prices">দাম</Link>
            <Link href="/#amenities">সুবিধা</Link>
            <Link href="/#visit">ঠিকানা</Link>

            {/* How to Book video button */}
            <button
              type="button"
              className="s-nav-video-btn"
              onClick={() => setVideoModalOpen(true)}
              title="কীভাবে স্লট বুক করবেন ভিডিও দেখুন"
            >
              <span className="s-video-icon-circle" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>কীভাবে বুক করবেন</span>
            </button>
          </nav>

          <div className="s-actions">
            {session?.user ? (
              <Link href="/dashboard" className="s-btn s-btn-ghost s-btn-sm">
                {session.user.name}
              </Link>
            ) : (
              <Link href="/signin" className="s-btn s-btn-ghost s-btn-sm">
                লগইন
              </Link>
            )}

            <Link href="/#booking" className="s-btn s-btn-primary s-btn-sm">
              বুক করুন
            </Link>

            <button
              type="button"
              className="s-mobile-toggle"
              onClick={toggleMobile}
              aria-label="মেনু খুলুন/বন্ধ করুন"
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="s-mobile-drawer">
            <Link href="/#booking" onClick={closeMobile}>স্লট বুকিং</Link>
            <Link href="/#prices" onClick={closeMobile}>দাম ও প্যাকেজ</Link>
            <Link href="/#amenities" onClick={closeMobile}>টার্ফ সুবিধা</Link>
            <Link href="/#visit" onClick={closeMobile}>ঠিকানা ও যোগাযোগ</Link>

            {/* Mobile How to Book button */}
            <button
              type="button"
              className="s-mobile-video-btn"
              onClick={() => {
                closeMobile();
                setVideoModalOpen(true);
              }}
            >
              <span className="s-video-icon-circle" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>কীভাবে বুক করবেন (ভিডিও)</span>
            </button>

            {session?.user ? (
              <Link href="/dashboard" onClick={closeMobile}>
                ড্যাশবোর্ড ({session.user.name})
              </Link>
            ) : (
              <Link href="/signin" onClick={closeMobile}>
                লগইন
              </Link>
            )}
            <Link href="/#booking" className="s-btn s-btn-primary" onClick={closeMobile} style={{ marginTop: '10px' }}>
              এখনই বুক করুন
            </Link>
          </div>
        )}
      </header>

      {/* How to Book Video Modal */}
      {videoModalOpen && (
        <div
          className="s-video-modal-backdrop"
          onClick={() => setVideoModalOpen(false)}
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
                onClick={() => setVideoModalOpen(false)}
                aria-label="ভিডিও বন্ধ করুন"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                    বিকাশে মাত্র ৳৫০০ অগ্রিম প্রদান করলেই স্লট নিশ্চিত হয়ে যাবে।
                  </div>
                </div>
              </div>

              <div className="s-video-modal-footer">
                <button
                  type="button"
                  className="s-btn s-btn-ghost"
                  onClick={() => setVideoModalOpen(false)}
                >
                  বন্ধ করুন
                </button>
                <Link
                  href="/#booking"
                  className="s-btn s-btn-primary"
                  onClick={() => setVideoModalOpen(false)}
                >
                  এখনই বুক করুন →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
