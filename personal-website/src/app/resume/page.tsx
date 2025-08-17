"use client";

import Printer from '@/components/Printer';

export default function Resume() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 relative">
            <h1>PRINT RESUME BY PRESSING TEST -(FURTHER FUNCTIONALITY LATER) </h1>
            <div className="relative z-10">
                <Printer />
            </div>
        </main>
    );
}
