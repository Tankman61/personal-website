import "./globals.css";
import type { Metadata } from "next";
import CursorOverlayClient from "@/components/CursorOverlayClient";
import Navbar from "@/components/Navbar";
import {SplashScreenWrapper} from "@/components/SplashScreenWrapper";
import Footer from "@/components/Footer";
import ScalingWrapper from "@/components/ScalingWrapper";

export const metadata: Metadata = {
    title: "William Yang",
    description: "ill do this later :)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ScalingWrapper>
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
        </ScalingWrapper>
        </body>
        </html>
    );
}
