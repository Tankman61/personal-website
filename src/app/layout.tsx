import './globals.css';
import type { Metadata } from 'next';
import CursorOverlayClient from '@/components/CursorOverlayClient';
import Navbar from '@/components/Navbar';
import { SplashScreenWrapper } from '@/components/SplashScreenWrapper';
import Footer from '@/components/Footer';
import ScalingWrapper from '@/components/ScalingWrapper';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'William Yang',
  description: 'welcome to my portfolio :)',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-198STVPVYX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-198STVPVYX');
          `}
        </Script>
        <SplashScreenWrapper>
          <ScalingWrapper>
            <main className="flex flex-col items-center min-h-screen relative z-10 selection:bg-yellow-200 dark:selection:bg-yellow-800">
              <div className="container mx-auto">
                <Navbar />
                <div>{children}</div>
                <Footer />
              </div>
            </main>
          </ScalingWrapper>
        </SplashScreenWrapper>
        <CursorOverlayClient />
      </body>
    </html>
  );
}
