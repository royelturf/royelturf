"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import mainLogo from "@/public/images/main-logo.png";
import TutorialVideoModal from "./TutorialVideoModal";

export default function LandingHeader() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="s-nav">
        <div className="s-wrap s-nav-in">
          <div className="s-nav-left">
            <Link href="/" className="s-brand" onClick={closeMobile}>
              <Image
                src={mainLogo}
                alt="ভূশ্চি রয়েল টার্ফ লোগো"
                className="s-logo-img"
                width={38}
                height={38}
                priority
              />
              <span className="s-brand-title">ভূশ্চি রয়েল টার্ফ</span>
            </Link>

            {/* Mobile How to Book button - right next to logo */}
            <button
              type="button"
              className="s-mobile-nav-video-btn"
              onClick={() => setVideoModalOpen(true)}
              title="কীভাবে স্লট বুক করবেন ভিডিও দেখুন"
            >
              <span className="s-video-icon-circle" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>কীভাবে বুক করবেন</span>
            </button>
          </div>

          <nav className="s-links" aria-label="পেজের অংশ">
            <Link href="/#booking">স্লট</Link>
            <Link href="/#prices">দাম</Link>
            <Link href="/#amenities">সুবিধা</Link>
            <Link href="/gallery">গ্যালারি</Link>
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
            {/* Desktop Auth / Book buttons (hidden on mobile devices) */}
            <div className="s-desktop-actions">
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
            </div>

            {/* Mobile quick icons (Facebook & Map) to the left of the mobile menu */}
            <div className="s-mobile-quick-actions">
              <a
                href="https://maps.google.com/?q=23.3024058,91.1892033"
                target="_blank"
                rel="noopener noreferrer"
                className="s-mobile-icon-btn s-map-icon-btn"
                aria-label="Google Maps"
                title="গুগল ম্যাপে লোকেশন"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>

              <a
                href="https://web.facebook.com/profile.php?id=61593199868148"
                target="_blank"
                rel="noopener noreferrer"
                className="s-mobile-icon-btn s-fb-icon-btn"
                aria-label="Facebook Page"
                title="ফেসবুক পেজ"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              
            </div>

            <button
              type="button"
              className="s-mobile-toggle"
              onClick={toggleMobile}
              aria-label="মেনু খুলুন/বন্ধ করুন"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <Link href="/gallery" onClick={closeMobile}>ফটো গ্যালারি</Link>
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
      <TutorialVideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </>
  );
}
