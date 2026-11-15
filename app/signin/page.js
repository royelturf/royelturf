"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LandingHeader from "@/components/landing/LandingHeader";
import FooterSection from "@/components/landing/FooterSection";

export default function SigninPage() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.phone || !form.password) {
      toast.error("মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        phone: form.phone.trim(),
        password: form.password,
        redirect: false,
      });

      if (!res?.error) {
        toast.success("লগইন সফল হয়েছে!");
        window.location.href = "/dashboard";
      } else {
        toast.error("মোবাইল নম্বর বা পাসওয়ার্ড সঠিক নয়");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("লগইন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      icon: "info",
      title: "পাসওয়ার্ড ভুলে গেছেন?",
      html: `
        <div style="color: #94a3b8; font-size: 14.5px; line-height: 1.6; text-align: center;">
          পাসওয়ার্ড রিসেট বা রিকভারির জন্য অনুগ্রহ করে রয়েল টার্ফের হেল্পলাইনে যোগাযোগ করুন:
          <br /><br />
          <strong style="color: #0096c7; font-size: 20px; letter-spacing: 0.5px;">০১৬১৬-৭৫৩৬৭১</strong>
          <br />
          <span style="color: #64748b; font-size: 13px;">চেয়ারম্যান বাড়ি, গোসাই পুষ্করিণী, লালমাই, কুমিল্লা</span>
        </div>
      `,
      confirmButtonColor: "#0096c7",
      confirmButtonText: "ঠিক আছে",
      background: "#0e172e",
      color: "#f0f6fc",
    });
  };

  return (
    <div className="site">
      {/* Same Website Navbar */}
      <LandingHeader />

      {/* Main Form Center Card */}
      <main className="rt-auth-main">
        <div className="rt-auth-card">
          <div className="rt-card-header">
            <h1>লগইন করুন</h1>
            <p>আপনার অ্যাকাউন্ট দিয়ে সাইন ইন করে বুকিং পরিচালনা করুন</p>
          </div>

          <form className="rt-form" onSubmit={handleLogin}>
            {/* Phone Field */}
            <div className="rt-field">
              <label htmlFor="auth-phone">
                মোবাইল নম্বর <span className="req">*</span>
              </label>
              <div className="rt-input-wrap">
                <Phone className="rt-icon" size={18} />
                <input
                  id="auth-phone"
                  name="phone"
                  type="tel"
                  placeholder="০১XXXXXXXXX"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\s+/g, ""),
                    })
                  }
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="rt-field">
              <label htmlFor="auth-password">
                পাসওয়ার্ড <span className="req">*</span>
              </label>
              <div className="rt-input-wrap">
                <Lock className="rt-icon" size={18} />
                <input
                  id="auth-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  autoComplete="current-password"
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

            {/* Forgot Password */}
            <div className="rt-forgot-row">
              <button type="button" onClick={handleForgotPassword}>
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="rt-submit-btn"
              disabled={loading}
            >
              {loading ? (
                "লগইন হচ্ছে..."
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="rt-divider">
              <span>অথবা</span>
            </div>

            {/* Switch to Sign Up */}
            <p className="rt-switch">
              নতুন মেম্বার?{" "}
              <Link href="/signup">
                নতুন অ্যাকাউন্ট তৈরি করুন (সাইন আপ) →
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
