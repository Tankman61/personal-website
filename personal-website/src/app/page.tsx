"use client";
import React, { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState(0);

    // Easy to change border width here!
    const borderWidth = 2;

    return (
        <main className="min-h-screen bg-black p-8 flex items-center justify-center">
            <div className="w-full" style={{ maxWidth: '612px' }}>
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
                                background: activeTab === 0 ? 'black' : 'var(--color-airbus-gray)',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 102%, 0% 102%)',
                                borderBottom: activeTab === 0 ? 'none' : `${borderWidth}px solid white`,
                            }}
                        >
                            <span className="text-green-400 font-medium text-sm">PROJECTS</span>
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
                                d="M 11 0 L 189 0 L 200 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />

                            <path
                                d="M 0.3 33 L 11 0"
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
                            <span className="text-green-400 font-medium text-sm">ABOUT</span>
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
                                d="M 11 0 L 189 0 L 200 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                                vectorEffect="non-scaling-stroke"
                            />

                            <path
                                d="M 0.3 33 L 11 0"
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
                        height: '600px'
                    }}
                >
                    {/* Screen bezel effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-transparent to-gray-800 pointer-events-none"></div>

                    {/* Main content area */}
                    <div className="relative bg-black h-full p-8 overflow-y-auto">
                        {activeTab === 0 && (
                            <div className="flex flex-col space-y-6">
                                <div className="text-blue-400 text-xl font-medium mb-4">MY PROJECTS</div>

                                <div className="space-y-4">
                                    <div className="border border-gray-600 p-4 rounded">
                                        <h3 className="text-green-400 font-medium mb-2">Web Application</h3>
                                        <p className="text-gray-300 text-sm">Full-stack application built with React and Node.js</p>
                                    </div>

                                    <div className="border border-gray-600 p-4 rounded">
                                        <h3 className="text-green-400 font-medium mb-2">Mobile App</h3>
                                        <p className="text-gray-300 text-sm">Cross-platform mobile application using React Native</p>
                                    </div>

                                    <div className="border border-gray-600 p-4 rounded">
                                        <h3 className="text-green-400 font-medium mb-2">Data Analysis</h3>
                                        <p className="text-gray-300 text-sm">Machine learning project for predictive analytics</p>
                                    </div>
                                </div>

                                <div className="text-center py-4 mt-8">
                                    <span className="text-yellow-400 text-lg">VIEW MORE PROJECTS →</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="flex flex-col space-y-6">
                                <div className="text-blue-400 text-xl font-medium mb-4">ABOUT ME</div>

                                <div className="space-y-4 text-gray-300">
                                    <p>
                                        I'm a passionate developer with expertise in modern web technologies.
                                        I love creating elegant solutions to complex problems and building
                                        applications that make a difference.
                                    </p>

                                    <div className="text-blue-400 text-lg font-medium mt-6 mb-3">SKILLS</div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-green-400">• JavaScript/TypeScript</div>
                                        <div className="text-green-400">• React/Next.js</div>
                                        <div className="text-green-400">• Node.js/Express</div>
                                        <div className="text-green-400">• Python/Django</div>
                                        <div className="text-green-400">• Database Design</div>
                                        <div className="text-green-400">• Cloud Platforms</div>
                                    </div>

                                    <div className="text-blue-400 text-lg font-medium mt-6 mb-3">EXPERIENCE</div>
                                    <p>
                                        Over 5 years of experience in software development, working with
                                        startups and established companies to deliver high-quality solutions.
                                    </p>
                                </div>

                                <div className="text-center py-4 mt-8">
                                    <span className="text-yellow-400 text-lg">DOWNLOAD RESUME →</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Screen reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-5 pointer-events-none"></div>
                </div>
            </div>
        </main>
    );
}
