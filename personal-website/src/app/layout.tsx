import type { Metadata } from "next";
import "./globals.css";
import CursorOverlayClient from '@/components/CursorOverlayClient';
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "William Yang",
    description: "my personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className="antialiased relative bg-stone-100 dark:bg-stone-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"
        >
        <main className="flex justify-center min-h-screen relative z-10 selection:bg-yellow-200 dark:selection:bg-yellow-800">
            <Navbar />
            <div className="w-full">{children}</div>
            <CursorOverlayClient />
        </main>
        </body>
        </html>
    );
}
