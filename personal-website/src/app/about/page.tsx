"use client";

import React, { useState } from 'react';
import { Button } from '@/components/Button';

export default function About() {
    const [activeTab, setActiveTab] = useState(0);

    // Easy to change border width here!
    const borderWidth = 2;

    return (
        <div className="min-h-screen bg-black p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                {/* Tab Container */}
                <div className="relative flex w-full">
                    {/* Left Tab */}
                    <div
                        className={`relative flex-1 h-8 cursor-pointer ${
                            activeTab === 0 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(0)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                // fix background colors to use airbus gray later
                                background: activeTab === 0 ? 'black' : 'var(--color-airbus-gray)',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 102%, 0% 102%)',
                                borderBottom: activeTab === 0 ? 'none' : `${borderWidth}px solid white`,
                            }}
                        >
                            <span className="text-green-400 font-medium text-sm">HOME</span>
                        </div>

                        {/* SVG Border Overlay */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            width="100%"
                            height="32"
                            viewBox="0 0 200 32"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 8 0 L 192 0 L 200 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />

                            <path
                                d="M 0.3 32.25 L 8 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    {/* Right Tab */}
                    <div
                        className={`relative flex-1 h-8 cursor-pointer -ml-6 ${
                            activeTab === 1 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(1)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                background: activeTab === 1 ? 'black' : 'var(--color-airbus-gray)',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 102%, 0% 102%)',
                                borderBottom: activeTab === 1 ? 'none' : `${borderWidth}px solid white`,
                            }}
                        >
                            <span className="text-green-400 font-medium text-sm">MY PORTFOLIO</span>
                        </div>

                        {/* SVG Border Overlay */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            width="100%"
                            height="32"
                            viewBox="0 0 200 32"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 8 0 L 192 0 L 199.7 32.25"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />
                            />
                            <path
                                d="M 0 32 L 8 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>
                </div>

                {/* Main Display Rectangle */}
                <div
                    className="relative bg-black overflow-hidden shadow-2xl"
                    style={{
                        border: `${borderWidth}px solid white`,
                        borderTop: 'none',
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
