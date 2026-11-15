import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import BookingSection from "@/components/landing/BookingSection";
import PricingSection from "@/components/landing/PricingSection";
import AmenitiesSection from "@/components/landing/AmenitiesSection";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = {
  title: "রয়েল টার্ফ এন্ড সুইমিং জোন · প্রতিদ্বন্দ্বিতায় নামো, সেরাটা দেখাও!",
  description: "কুমিল্লার লালমায়ে প্রিমিয়াম কৃত্রিম টার্ফ ও আধুনিক সুইমিং জোন। অনলাইনে স্লট দেখুন এবং সহজে বুক করুন।",
};

export default function Home() {
  return (
    <div className="site">
      <LandingHeader />
      <main>
        <HeroSection />
        <BookingSection />
        <PricingSection />
        <AmenitiesSection />
      </main>
      <FooterSection />
    </div>
  );
}
