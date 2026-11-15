import React from "react";

export default function PricingSection() {
  return (
    <section className="s-prices" id="prices" aria-labelledby="pr-h">
      <div className="s-wrap">
        <h2 className="s-h2" id="pr-h">
          দাম
        </h2>
        <p className="s-lede">
          স্বচ্ছ ও সাশ্রয়ী প্যাকেজ — আপনার খেলার সময় অনুযায়ী সেরা রেট
        </p>

        <div className="s-ladder">
          <div className="s-step">
            <span className="nm">স্টার্টার প্যাকেজ</span>
            <b>৳২,০০০</b>
            <span className="tm">৬০ মিনিট · ডে ও রেগুলার স্লট</span>
          </div>

          <div className="s-step">
            <span className="nm">প্রো প্যাকেজ</span>
            <b>৳৩,০০০</b>
            <span className="tm">৯০ মিনিট · ফ্রেন্ডলি ম্যাচ</span>
          </div>

          <div className="s-step peak">
            <span className="nm">এলিট প্যাকেজ</span>
            <b>৳৪,০০০</b>
            <span className="tm">১২০ মিনিট · টুর্নামেন্ট ও ফুল গেম</span>
          </div>

          <div className="s-step">
            <span className="nm">মাসিক সদস্যপদ প্যাকেজ</span>
            <b style={{ fontSize: "21px", marginTop: "16px" }}>প্রতিটি বুকিংয়ে ১০% ছাড়</b>
            <span className="tm">নিয়মিত প্র্যাকটিস ও টিম মেম্বারশিপ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
