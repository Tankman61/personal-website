"use client";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
    const [loading, setLoading] = useState(
        typeof window === "undefined"
            ? false
            : !localStorage.getItem("hasSeenSplash")
    )

    useEffect(() => {
        const hasSeenSplash = localStorage.getItem("hasSeenSplash");
        if (!hasSeenSplash) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem("hasSeenSplash", "true");
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-7xl">
                {/* Header */}
                <div className="text-right mb-4">
                    <span className="text-airbus-gray text-sm">Portfolio Progress - @YourHandle</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Left Panel - Personal Info */}
                    <div className="bg-gray-800 border border-gray-600" style={{clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'}}>
                        {/* Header Tabs */}
                        <div className="flex border-b border-gray-600">
                            <div className="bg-gray-700 px-4 py-2 text-airbus-white text-sm border-r border-gray-600">PERS 1</div>
                            <div className="flex-1 px-4 py-2 text-airbus-white text-sm text-center">PROFILE</div>
                            <div className="bg-gray-700 px-4 py-2 text-airbus-white text-sm">DATA</div>
                        </div>

                        {/* Sub Navigation */}
                        <div className="bg-gray-750 border-b border-gray-600 px-4 py-2">
                            <span className="text-airbus-white text-sm">INFO/BACKGROUND</span>
                        </div>

                        {/* Content Area */}
                        <div className="p-6">
                            {/* Profile Section */}
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-airbus-blue text-black px-2 py-1 text-sm font-bold mr-4">DEV</div>
                                </div>

                                <div className="text-airbus-green text-xl mb-2">JOHN DEVELOPER</div>
                                <div className="text-airbus-white text-sm mb-4">25°15.2N/055°21.9E</div>

                                {/* Navigation Controls */}
                                <div className="flex items-center mb-4">
                                    <span className="text-airbus-white text-sm mr-4">EXP 3Y</span>
                                    <span className="text-airbus-gray text-sm mr-4">1/4</span>
                                    <div className="flex gap-2">
                                        <button className="bg-gray-600 text-airbus-white px-3 py-1 text-xs">◀◀</button>
                                        <button className="bg-gray-600 text-airbus-white px-3 py-1 text-xs">▶▶</button>
                                    </div>
                                </div>

                                <div className="text-airbus-white text-sm mb-2">
                                    <span className="text-airbus-yellow">LAT/LONG</span> 25°15.9N/055°21.0E
                                </div>
                                <div className="text-airbus-white text-sm mb-2">
                                    <span className="text-airbus-yellow">EDUCATION</span> <span className="text-airbus-green">10 FT</span>
                                </div>
                                <div className="text-airbus-white text-sm mb-2">
                                    <span className="text-airbus-yellow">STACK</span> <span className="text-airbus-green">FULL</span> <span className="text-airbus-white ml-8">ROLE</span> <span className="text-airbus-green">119°</span>
                                </div>
                                <div className="text-airbus-white text-sm mb-4">
                                    <span className="text-airbus-yellow">SPEC</span> <span className="text-airbus-green">REACT</span>
                                </div>
                            </div>

                            {/* Bottom Button */}
                            <button className="bg-gray-600 text-airbus-white px-4 py-2 text-sm">
                                PROJ LIST
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Skills/Status */}
                    <div className="bg-gray-800 border border-gray-600" style={{clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'}}>
                        {/* Header Tabs */}
                        <div className="flex border-b border-gray-600">
                            <div className="bg-gray-700 px-4 py-2 text-airbus-white text-sm border-r border-gray-600">TECH 2</div>
                            <div className="flex-1 px-4 py-2 text-airbus-white text-sm text-center">SKILLS</div>
                            <div className="bg-gray-700 px-4 py-2 text-airbus-white text-sm">DATA</div>
                        </div>

                        {/* Sub Navigation */}
                        <div className="bg-gray-750 border-b border-gray-600 px-4 py-2">
                            <span className="text-airbus-white text-sm">DATA/STATUS</span>
                        </div>

                        {/* Content Area */}
                        <div className="p-6">
                            {/* Status Section */}
                            <div className="mb-6">
                                <div className="bg-gray-700 p-4 mb-4" style={{clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'}}>
                                    <div className="text-airbus-white text-sm mb-2">TECH STATUS</div>
                                    <div className="text-airbus-green text-lg">REACT-18.0 / NEXTJS 14</div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="flex justify-between mb-4">
                                    <div className="text-airbus-white text-sm">
                                        <span className="text-airbus-yellow">LEARN</span> <span className="text-airbus-green">-2.0</span>
                                    </div>
                                    <div className="text-airbus-white text-sm">
                                        <span className="text-airbus-yellow">PERF</span> <span className="text-airbus-green">+1.1</span>
                                    </div>
                                    <button className="bg-gray-600 text-airbus-white px-3 py-1 text-xs">MODIFY</button>
                                </div>

                                <div className="mb-6">
                                    <span className="text-airbus-white text-sm">CODE QUALITY </span>
                                    <span className="text-airbus-blue border border-airbus-blue px-2 py-1 text-xs">+95.0 %</span>
                                </div>

                                {/* Database Section */}
                                <div className="mb-6">
                                    <div className="text-airbus-white text-sm mb-2">
                                        <span className="text-airbus-yellow">TECH DATABASE</span> <span className="text-airbus-green ml-8">STACK</span>
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <div className="bg-gray-700 px-4 py-2 text-airbus-green text-sm">
                                            ACTIVE<br/>
                                            18FEB-15JUN
                                        </div>
                                        <button className="bg-gray-600 text-airbus-white px-4 py-2 text-sm">SWAP</button>
                                        <div className="text-airbus-green text-sm">
                                            SECOND<br/>
                                            18FEB-15JUN
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Elements */}
                                <div className="mb-4">
                                    <div className="text-airbus-white text-sm mb-3">TECH STACK ELEMENTS</div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-airbus-yellow">FRONTEND</span> <span className="text-airbus-green">08</span>
                                        </div>
                                        <div>
                                            <span className="text-airbus-yellow">BACKEND</span> <span className="text-airbus-green">06</span>
                                        </div>
                                        <div>
                                            <span className="text-airbus-yellow">DATABASE</span> <span className="text-airbus-green">04</span>
                                        </div>
                                        <div>
                                            <span className="text-airbus-yellow">DEVOPS</span> <span className="text-airbus-green">05</span>
                                        </div>
                                    </div>

                                    <button className="bg-gray-600 text-airbus-white px-4 py-2 text-sm mt-4">
                                        VIEW ALL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Indicators */}
                <div className="flex justify-end mt-4 space-x-4">
                    <div className="text-airbus-yellow text-sm">●</div>
                    <div className="text-airbus-green text-sm">●</div>
                    <div className="text-airbus-yellow text-xs">
                        HIRE<br/>
                        F/O OIS<br/>
                        CENTER<br/>
                        AVAIL<br/>
                        <span className="text-airbus-blue">ON</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
