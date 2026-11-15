"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import LandingHeader from "@/components/landing/LandingHeader";
import FooterSection from "@/components/landing/FooterSection";

const isValidBDPhone = (phone) => {
  const bdRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
  return bdRegex.test(phone);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("আপনার পূর্ণ নাম লিখুন");
      return;
    }

    if (!isValidBDPhone(form.phone)) {
      toast.error(
        "১১ ডিজিটের সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)"
      );
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন");
      return;
    }

    if (form.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি, আবার চেক করুন");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।");
        setTimeout(() => router.push("/signin"), 1200);
      } else {
        toast.error(data?.error || "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("সার্ভারে সমস্যা হয়েছে, কিছুক্ষণ পর চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site">
      {/* Same Website Navbar */}
      <LandingHeader />

      {/* Main Form Center Card */}
      <main className="rt-auth-main">
        <div className="rt-auth-card rt-auth-card--signup">
          <div className="rt-card-header">
            <h1>নতুন অ্যাকাউন্ট তৈরি করুন</h1>
            <p>সহজে স্লট বুকিং ও আপনার খেলার হিস্ট্রি দেখতে রেজিস্টার করুন</p>
          </div>

          <form className="rt-form" onSubmit={handleSubmit}>
            {/* Row 1: Name and Phone */}
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="signup-name">
                  পূর্ণ নাম <span className="req">*</span>
                </label>
                <div className="rt-input-wrap">
                  <User className="rt-icon" size={18} />
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="আপনার পুরো নাম"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="rt-field">
                <label htmlFor="signup-phone">
                  মোবাইল নম্বর <span className="req">*</span>
                </label>
                <div className="rt-input-wrap">
                  <Phone className="rt-icon" size={18} />
                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    maxLength={11}
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="rt-field">
              <label htmlFor="signup-email">
                ইমেইল ঠিকানা <span className="req">*</span>
              </label>
              <div className="rt-input-wrap">
                <Mail className="rt-icon" size={18} />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Row 3: Password and Confirm Password */}
            <div className="rt-grid-2">
              <div className="rt-field">
                <label htmlFor="signup-pass">
                  পাসওয়ার্ড <span className="req">*</span>
                </label>
                <div className="rt-input-wrap">
                  <Lock className="rt-icon" size={18} />
                  <input
                    id="signup-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="rt-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="rt-field">
                <label htmlFor="signup-confirm-pass">
                  পাসওয়ার্ড নিশ্চিত করুন <span className="req">*</span>
                </label>
                <div className="rt-input-wrap">
                  <Lock className="rt-icon" size={18} />
                  <input
                    id="signup-confirm-pass"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                    required
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="rt-eye-btn"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "পাসওয়ার্ড লুকান"
                        : "পাসওয়ার্ড দেখান"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="rt-submit-btn"
              disabled={loading}
            >
              {loading ? (
                "অ্যাকাউন্ট তৈরি হচ্ছে..."
              ) : (
                <>
                  <span>অ্যাকাউন্ট তৈরি করুন</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="rt-divider">
              <span>অথবা</span>
            </div>

            {/* Switch to Sign In */}
            <p className="rt-switch">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/signin">
                লগইন করুন →
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* Same Website Footer */}
      <FooterSection />
    </div>
  );
}
