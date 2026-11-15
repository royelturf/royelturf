import '../styles/scss/main.scss';
import Header from '@/components/Header'
import Footer from '@/components/Footer';

import { Providers } from './Providers/providers';
import ToastProvider from './Providers/ToastProvider';
import PaymentStatusHandler from '@/components/PaymentStatusHandler';
import { Suspense } from 'react';

export const metadata = {
  title: "রয়েল টার্ফ এন্ড সুইমিং জোন · প্রতিদ্বন্দ্বিতায় নামো, সেরাটা দেখাও!",
  description: "কুমিল্লার লালমায়ে প্রিমিয়াম কৃত্রিম টার্ফ ও আধুনিক সুইমিং জোন। অনলাইনে স্লট দেখুন এবং সহজে বুক করুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <Suspense fallback={null}>
            <PaymentStatusHandler />
          </Suspense>
          {children}
          <ToastProvider />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
