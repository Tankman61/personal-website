import "./globals.css";
import type { Metadata } from "next";
import CursorOverlayClient from "@/components/CursorOverlayClient";
import Navbar from "@/components/Navbar";
import {SplashScreenWrapper} from "@/components/SplashScreenWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "William Yang",
    description: "ill do this later :)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased relative bg-stone-100 dark:bg-stone-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
        <SplashScreenWrapper>
            <main className="flex flex-col items-center min-h-screen relative z-10 selection:bg-yellow-200 dark:selection:bg-yellow-800">
                <div className="container mx-auto">
                    <Navbar />
                    <div>{children}</div>
                    <Footer />
                </div>
                <CursorOverlayClient />
            </main>
        </SplashScreenWrapper>
        </body>
        </html>
    );
}
