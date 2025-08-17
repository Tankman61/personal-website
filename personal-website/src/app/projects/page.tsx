"use client";
import React, { useState } from 'react';

// TODO: I NEED TO ADD THE ABILITY TO ADD MORE PROJECTS BY ADDING A LEFT/RIGHT BUTTON  OR SOMETHING
export default function Projects() {
    const [activeTab, setActiveTab] = useState(0);
    // TODO: FIX COLORS FOR LIGHT GRAY LINES AND BOLDING + text should be end not start for Waypoints, Routes, Navaids, Runways
    // MAKE THE BORDERS MORE ROUNDED!!!
    const borderWidth = 2;

    return (
        <main className="px-8 flex items-start justify-center">
            <div className="w-full" style={{ maxWidth: '612px' }}>
                {/* Tab Container */}
                <div className="relative flex w-full">
                    <div className="relative flex w-full">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <div
                                key={index}
                                className={`relative h-8 cursor-pointer ${index > 0 ? '-ml-6' : ''} ${
                                    activeTab === index ? 'z-20' : 'z-10'
                                } group`}
                                onClick={() => setActiveTab(index)}
                                style={{width: '142px'}}

                            >
                                <div
                                    className="relative h-full flex items-center justify-center"
                                    style={{
                                        background: activeTab === index ? 'black' : 'var(--color-airbus-gray)',
                                        clipPath: activeTab === index ? 'polygon( 11.5% 0%, 88.5% 0%, 100% 110%, 0% 100%)' : 'polygon( 11.5% 0%, 88.5% 0%, 100% 99%, 0% 99%)',
                                        borderBottom: activeTab === index ? 'none' : `${borderWidth}px solid white`,
                                    }}
                                >
                <span className="text-sm px-[10px] rounded-none group-hover:outline group-hover:outline-2 group-hover:outline-airbus-blue outline-airbus-blue transition-none">
{['CCC', 'A350', 'PAWDITOR', 'MATHIFY', 'SATDUEL'][index]}
                </span>
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
                                        d="M 1 31.5 L 25 0 L 175 0 L 199.5 31 L"

                                        fill="none"
                                        stroke="white"
                                        strokeWidth={borderWidth}
                                        strokeLinejoin="miter"
                                        vectorEffect="non-scaling-stroke"
                                    />

                                </svg>
                            </div>
                        ))}
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
                    {/* Screen bezel effect (TODO: Figure out if this does really anything) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-transparent to-gray-800 pointer-events-none"></div>


                    <div className="relative bg-black h-full p-3 overflow-y-auto">
                        {activeTab === 0 && (
                            <div className="flex flex-col h-full space-y-6">
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    CCCSOLUTIONS
                                </div>
                                {/* Status Row - Boxed */}
                                TO BE FINISHED :)
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    A350 PORTFOLIO
                                </div>
                                TO BE FINISHED :)
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    PAWDITOR
                                </div>
                                TO BE FINISHED :)
                            </div>
                        )}

                        {activeTab === 3 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    MATHIFY
                                </div>
                                TO BE FINISHED :)
                            </div>
                        )}

                        {activeTab === 4 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    SATDUEL
                                </div>
                                STILL TO BE FINISHED :)
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
