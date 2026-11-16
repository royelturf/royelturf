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
          <Link href="/" className="s-brand" onClick={closeMobile}>
            <Image
              src={mainLogo}
              alt="ভূশ্চি রয়েল টার্ফ লোগো"
              className="s-logo-img"
              width={38}
              height={38}
              priority
            />
            <span>ভূশ্চি রয়েল টার্ফ</span>
          </Link>

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
