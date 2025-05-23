import type { Metadata } from "next";
import "./globals.css";
import CursorOverlayClient from '../components/CursorOverlayClient';

export const metadata: Metadata = {
    title: "William Yang",
    description: "my personal website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="antialiased">
        {children}
        <CursorOverlayClient />
        </body>
        </html>
    );
}