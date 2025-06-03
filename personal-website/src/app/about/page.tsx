"use client";

import React, { useState } from 'react';
import { Button } from '@/components/Button';

export default function About() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-h-screen bg-black p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                {/* Tab Container */}
                <div className="relative flex justify-start -mb-1">
                    {/* Left Tab */}
                    <div
                        className={`relative w-48 h-12 cursor-pointer ${
                            activeTab === 0 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(0)}
                    >
                        {/* Outer border - 60° sides */}
                        <div
                            className="absolute inset-0 bg-white"
                            style={{
                                clipPath: 'polygon(27.7px 0%, calc(100% - 27.7px) 0%, 100% 100%, 0% 100%)'
                            }}
                        ></div>
                        {/* Inner fill - inset with same 60° sides */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                top: '4px',
                                bottom: '4px',
                                left: '4px',
                                right: '4px',
                                clipPath: 'polygon(23.1px 0%, calc(100% - 23.1px) 0%, 100% 100%, 0% 100%)',
                                background: activeTab === 0 ? 'var(--color-airbus-gray)' : 'black'
                            }}
                        >
                            <span className="text-airbus-green">MCDU LEFT</span>
                        </div>
                    </div>

                    {/* Right Tab */}
                    <div
                        className={`relative w-48 h-12 cursor-pointer -ml-6 ${
                            activeTab === 1 ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setActiveTab(1)}
                    >
                        {/* Outer border - 60° sides */}
                        <div
                            className="absolute inset-0 bg-white"
                            style={{
                                clipPath: 'polygon(27.7px 0%, calc(100% - 27.7px) 0%, 100% 100%, 0% 100%)'
                            }}
                        ></div>
                        {/* Inner fill - inset with same 60° sides */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                top: '4px',
                                bottom: '4px',
                                left: '4px',
                                right: '4px',
                                clipPath: 'polygon(23.1px 0%, calc(100% - 23.1px) 0%, 100% 100%, 0% 100%)',
                                background: activeTab === 1 ? 'var(--color-airbus-gray)' : 'black'
                            }}
                        >
                            <span className="text-airbus-green">MCDU RIGHT</span>
                        </div>
                    </div>
                </div>

                {/* Main Display Rectangle */}
                <div className="relative bg-black border-4 border-white overflow-hidden shadow-2xl">
                    {/* Screen bezel effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-transparent to-gray-800 pointer-events-none"></div>

                    {/* Main content area */}
                    <div className="relative bg-black min-h-96 p-8">
                        {activeTab === 0 && (
                            <div className="flex flex-col space-y-4">
                                <div className="text-airbus-blue text-lg font-medium">INIT</div>

                                <Button>
                                    FROM/TO
                                </Button>

                                <Button>
                                    <span className="text-airbus-yellow">INIT REQ</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">PERF</span>
                                </Button>

                                <div className="text-airbus-blue text-lg font-medium">NAV</div>

                                <Button>
                                    <span className="text-airbus-green">F-PLN</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">RAD NAV</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">GPS</span>
                                </Button>

                                <div className="text-center py-2 mt-4">
                                    <span className="text-airbus-yellow">READY FOR TAXI</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="flex flex-col space-y-4">
                                <div className="text-airbus-blue text-lg font-medium">DATA</div>

                                <Button>
                                    <span className="text-airbus-green">STATUS</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">POS MONITOR</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">IRS MONITOR</span>
                                </Button>

                                <div className="text-airbus-blue text-lg font-medium">FUEL PRED</div>

                                <Button>
                                    <span className="text-airbus-green">SEC F-PLN</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">ATC COMM</span>
                                </Button>

                                <Button>
                                    <span className="text-airbus-green">MCDU MENU</span>
                                </Button>

                                <div className="text-center py-2 mt-4">
                                    <span className="text-airbus-yellow">STANDBY</span>
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
