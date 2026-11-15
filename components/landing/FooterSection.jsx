"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import mainLogo from "@/public/images/main-logo.png";

export default function FooterSection() {
  const phoneNumber = "01616753671";
  const displayPhone = "০১৬১৬-৭৫৩৬৭১";
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    toast.success("ফোন নম্বর কপি করা হয়েছে!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="s-visit" id="visit">
      <div className="s-wrap">
        {/* 4-Column Main Footer Grid */}
        <div className="s-foot-grid">
          {/* Column 1: Brand Info */}
          <div className="s-foot-col s-foot-brand">
            <Link href="/" className="s-brand-header">
              <div className="s-brand-logo-wrap">
                <Image
                  src={mainLogo}
                  alt="রয়েল টার্ফ লোগো"
                  width={38}
                  height={38}
                  priority
                />
              </div>
              <div className="s-brand-titles">
                <strong>রয়েল টার্ফ</strong>
                <span>এন্ড সুইমিং জোন</span>
              </div>
            </Link>

            <p className="s-brand-desc">
              কুমিল্লার লালমাইয়ে প্রিমিয়াম কৃত্রিম টার্ফে দিন-রাত ফুটবল ও ক্রিকেট
              খেলার আধুনিক প্ল্যাটফর্ম। রয়েছে আন্তর্জাতিক মানের ফ্লাডলাইট, নিরাপদ
              পরিবেশ ও আধুনিক সুইমিং জোন।
            </p>

            <div className="s-social-row">
              <a
                href="https://web.facebook.com/profile.php?id=61593199868148"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="fb"
                title="ফেসবুক পেজ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>

              <a
                href={`https://wa.me/88${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="wa"
                title="হোয়াটসঅ্যাপে চ্যাট করুন"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M187.58,144.84l-25-12a16,16,0,0,0-19,3.67l-9.67,11.82a96.67,96.67,0,0,1-47.16-47.16l11.82-9.67a16,16,0,0,0,3.67-19l-12-25a16.12,16.12,0,0,0-18.73-8.86l-24,6A16,16,0,0,0,32,60c0,92.64,75.36,168,168,168a16,16,0,0,0,15.86-14.49l6-24A16.12,16.12,0,0,0,187.58,144.84Z"></path>
                </svg>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                aria-label="Call Now"
                title="সরাসরি কল করুন"
              >
                <Phone size={18} />
              </a>

              <a
                href="https://maps.google.com/?q=23.3024058,91.1892033"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                title="গুগল ম্যাপে লোকেশন"
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="s-foot-col">
            <h4>দ্রুত লিংক</h4>
            <ul className="s-foot-links-list">
              <li>
                <Link href="/#booking">
                  <ChevronRight size={15} />
                  <span>স্লট বুকিং</span>
                </Link>
              </li>
              <li>
                <Link href="/#prices">
                  <ChevronRight size={15} />
                  <span>প্যাকেজ ও রেট</span>
                </Link>
              </li>
              <li>
                <Link href="/#amenities">
                  <ChevronRight size={15} />
                  <span>টার্ফ সুবিধাসমূহ</span>
                </Link>
              </li>
              <li>
                <Link href="/signin">
                  <ChevronRight size={15} />
                  <span>মেম্বার লগইন</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Timings & Schedule */}
          <div className="s-foot-col">
            <h4>খেলার সময়সূচী</h4>
            <div className="s-foot-hours-card">
              <div className="s-hour-item">
                <Clock className="s-hour-icon" size={18} />
                <div className="s-hour-text">
                  <span>প্রতিদিন খোলা</span>
                  <strong>২৪ ঘণ্টা সার্বক্ষণিক (দিন ও রাত)</strong>
                </div>
              </div>

              <div className="s-night-pill">
                🌙 নাইট ম্যাচ ও আন্তর্জাতিক মানের ফ্লাডলাইট সুবিধা সার্বক্ষণিক উপলব্ধ।
              </div>

              <div style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
                💡 রাত ১২:০০ টার পরের স্লটের জন্য পরবর্তী তারিখ নির্বাচন করুন।
              </div>
            </div>
          </div>

          {/* Column 4: Location & Helpline */}
          <div className="s-foot-col">
            <h4>ঠিকানা ও হেল্পলাইন</h4>
            <div className="s-foot-contact-card">
              <div className="s-contact-block">
                <div className="s-cb-icon">
                  <MapPin size={18} />
                </div>
                <div className="s-cb-info">
                  <span>টার্ফ লোকেশন</span>
                  <address>
                    চেয়ারম্যান বাড়ি, গোসাই পুষ্করিণী, লালমাই, কুমিল্লা
                  </address>
                  <a
                    href="https://maps.google.com/?q=23.3024058,91.1892033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="s-map-btn"
                  >
                    <span>গুগল ম্যাপে দেখুন</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="s-phone-box">
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "var(--dim)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: "2px",
                    }}
                  >
                    হটলাইন ও হোয়াটসঅ্যাপ
                  </span>
                  <a href={`tel:${phoneNumber}`} className="s-phone-num">
                    {displayPhone}
                  </a>
                </div>

                <button
                  type="button"
                  className="s-phone-copy-btn"
                  onClick={handleCopyPhone}
                  title="নম্বর কপি করুন"
                >
                  {copied ? (
                    <>
                      <Check size={13} style={{ color: "var(--ok)" }} />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--muted)" }}>
                <Mail size={15} style={{ color: "var(--accent)" }} />
                <a
                  href="mailto:royelturf@gmail.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  royelturf@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Legal Bar */}
        <div className="s-foot-bottom">
          <div className="s-foot-copy">
            <span>© ২০২৬ রয়েল টার্ফ এন্ড সুইমিং জোন। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          <nav className="s-foot-legal-links" aria-label="নীতিমালা লিংক">
            <Link href="/#">গোপনীয়তা নীতি</Link>
            <Link href="/#">ব্যবহারের শর্তাবলী</Link>
            <Link href="/#">রিফান্ড পলিসি</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
