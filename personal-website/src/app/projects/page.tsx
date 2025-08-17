"use client";
import React, { useState } from 'react';
import  { Button } from '@/components/Button';
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
                <span className="text-sm px-[40px] rounded-none group-hover:outline group-hover:outline-2 group-hover:outline-airbus-blue outline-airbus-blue transition-none">
                    {['A', 'A', 'A', 'A', 'A'][index]}
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

                    {/* replace the second panel with a  TLDR SECTION*/}
                    <div className="relative bg-black h-full p-3 overflow-y-auto">
                        {activeTab === 0 && (
                            <div className="flex flex-col h-full space-y-6">
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    CCCSOLUTIONS
                                </div>
                                {/* Status Row - Boxed */}
                                <div className="mb-2">
                                    <div className="border p-1.5 inline-block" style={{ borderColor: '#454647' }}>
                                        <div className="flex space-x-8 items-center">
                                            <div className="flex items-center">
                                                {/* TODO: make this automatically update */}
                                                <span className="text-white mr-4 text-[17px]">COMMITS</span>
                                                <span className="text-airbus-green text-[17px]">+0.0</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-white mr-4 text-[17px]">PULL RQUESTS</span>
                                                <span className="text-airbus-green text-[17px]">+0.0</span>
                                            </div>
                                            <Button height={30} width={100} fontSize={17} className="ml-4 mr-6 flex justify-start items-center w-full">
                                                <span className="ml-2">GITHUB</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Fuel Penalty */}
                                <div className="mb-1">
                                    <div className="inline-block border" style={{ borderColor: '#454647' }}>
                                        <div className="flex items-center px-3 py-2">
                                            <span className="text-white mr-2 text-[17px]">EDUCATION:</span>
                                            <span className="text-airbus-blue text-[17px]">UWATERLOO SOFTWARE ENGINEERING</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Separator Line */}
                                <div className="mb-1" style={{ borderTop: '1px solid #454647' }}></div>

                                {/* Nav Database */}
                                <div className="flex items-center mb-8">
                                    <span className="text-white mr-4 text-[17px]">CURRENTLY</span>
                                    <span className="text-airbus-green text-[17px]">WORKING ON:</span>
                                </div>

                                {/* make this jobs later */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="text-center">
                                        <div className="border" style={{ borderColor: '#454647', borderWidth: '2px' }}>
                                            <div className="bg-black text-white px-6 py-2 text-[17px]">
                                                ACTIVE
                                            </div>
                                            <div className="text-airbus-green px-6 py-2 text-[17px]">
                                                DFD A350X
                                            </div>
                                        </div>
                                    </div>
                                    {/* TODO: BOMBOCLAT FIX THE CENTERING ON THIS BEACUSE IT AINT LOOKING GOOD*/}
                                    <div className="flex flex-col items-center justify-center mt-4 mr-8">
                                        <div className="text-white text-[16px] mb-2">
                                            SECOND
                                        </div>
                                        <div className="text-airbus-green text-[16px]">
                                            CCCSOLUTIONS
                                        </div>
                                    </div>
                                </div>

                                {/* Separator Line */}
                                <div className="mb-4" style={{ borderTop: '1px solid #454647' }}></div>

                                {/* Pilot Stored Elements */}
                                <div>
                                    <div className="text-white text-[17px] mb-4">
                                        STATS:
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-white text-[17px]">PROJECTS</span>
                                            <span className="text-airbus-green text-[17px]">00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white text-[17px]">BLOGS</span>
                                            <span className="text-airbus-green text-[17px]">00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white text-[17px]">LANGUAGES</span>
                                            <span className="text-airbus-green text-[17px]">04</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white text-[17px]">AGE</span>
                                            <span className="text-airbus-green text-[17px]">17</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    A350 PORTFOLIO
                                </div>
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    PAWDITOR
                                </div>
                            </div>
                        )}

                        {activeTab === 3 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    MATHIFY
                                </div>
                            </div>
                        )}

                        {activeTab === 4 && (
                            <div className="flex flex-col space-y-6">
                                {/** FIXME: fix  +format this description lol */}
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    SATDUEL
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
