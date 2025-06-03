"use client";

import React, { useState } from 'react';
import { Button } from '@/components/Button';

export default function About() {
    const [activeTab, setActiveTab] = useState(0);

    // Easy to change border width here!
    const borderWidth = 3;

    return (
        <div className="min-h-screen bg-black p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                {/* Tab Container */}
                <div className="relative flex justify-start">
                    {/* Left Tab */}
                    <div
                        className={`relative w-48 h-8 cursor-pointer ${
                            activeTab === 0 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(0)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                background: activeTab === 0 ? 'black' : '#4a5568',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 100%, 0% 100%)',
                                borderBottom: activeTab !== 0 ? `${borderWidth}px solid white` : 'none'
                            }}
                        >
                            <span className="text-green-400 font-medium text-sm">MCDU LEFT</span>
                        </div>

                        {/* SVG Border Overlay */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            width="192"
                            height="32"
                            viewBox="0 0 192 32"
                        >
                            <path
                                d="M 18.5 0 L 173.5 0 L 192 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                            <path
                                d="M 0 32 L 18.5 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Right Tab */}
                    <div
                        className={`relative w-48 h-8 cursor-pointer -ml-6 ${
                            activeTab === 1 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(1)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                background: activeTab === 1 ? 'black' : '#4a5568',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 100%, 0% 100%)',
                                borderBottom: activeTab !== 1 ? `${borderWidth}px solid white` : 'none'
                            }}
                        >
                            <span className="text-green-400 font-medium text-sm">MCDU RIGHT</span>
                        </div>

                        {/* SVG Border Overlay */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            width="192"
                            height="32"
                            viewBox="0 0 192 32"
                        >
                            <path
                                d="M 18.5 0 L 173.5 0 L 192 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                            <path
                                d="M 0 32 L 18.5 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>
                </div>

                {/* Main Display Rectangle */}
                <div
                    className="relative bg-black overflow-hidden shadow-2xl"
                    style={{
                        border: `${borderWidth}px solid white`,
                        marginTop: `-${borderWidth}px` // Overlap with tabs
                    }}
                >
                    {/* Screen bezel effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-transparent to-gray-800 pointer-events-none"></div>

                    {/* Main content area */}
                    <div className="relative bg-black min-h-96 p-8">
                        {activeTab === 0 && (
                            <div className="flex flex-col space-y-4">
                                <div className="text-blue-400 text-lg font-medium">INIT</div>

                                <Button>
                                    FROM/TO
                                </Button>

                                <Button>
                                    INIT REQ
                                </Button>

                                <Button>
                                    PERF
                                </Button>
                                <div className="text-blue-400 text-lg font-medium">NAV</div>
                                <Button>
                                    F-PLN
                                </Button>

                                <Button>
                                    RAD NAV
                                </Button>

                                <Button>
                                    GPS
                                </Button>

                                <div className="text-center py-2 mt-4">
                                    <span className="text-yellow-400">READY FOR TAXI</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="flex flex-col space-y-4">
                                <div className="text-blue-400 text-lg font-medium">DATA</div>

                                <Button>
                                    STATUS
                                </Button>

                                <Button>
                                    POS
                                </Button>

                                <Button>
                                    IRS
                                </Button>

                                <div className="text-blue-400 text-lg font-medium">FUEL PRED</div>

                                <Button>
                                    SEC F-PLN
                                </Button>

                                <Button>
                                    ATC COMM
                                </Button>

                                <Button>
                                    MCDU MENU
                                </Button>

                                <div className="text-center py-2 mt-4">
                                    <span className="text-yellow-400">STANDBY</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Screen reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-5 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}
