// Add this to your Home component
"use client";
import React, { useState, useEffect } from 'react';
import  { Button } from '@/components/Button';
import PhotoDeck from '@/components/PhotoDeck';
import Image1 from '../../public/assets/images/gallery1.jpg';
import Image2 from '../../public/assets/images/gallery2.jpg';
import Image3 from '../../public/assets/images/gallery3.jpg';
import Image4 from '../../public/assets/images/gallery4.jpg';
import Image5 from '../../public/assets/images/gallery5.jpg';
import SEWebRingLogo from "../../public/assets/icons/logo_w.svg";

export default function Home() {
    const [activeTab, setActiveTab] = useState(0);

    // Preload PhotoDeck images immediately when component mounts
    useEffect(() => {
        const imagesToPreload = [Image1, Image2, Image3, Image4, Image5];

        imagesToPreload.forEach((img) => {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        });
    }, []); // Empty dependency array - runs once on mount

    const borderWidth = 2;

    return (
        <main className="px-8 flex items-start justify-center overflow-x-hidden">
            <div className="w-full overflow-hidden" style={{ maxWidth: '612px' }}>
                {/* Tab Container */}
                <div className="relative flex w-full">
                    {/* Left Tab */}
                    <div
                        className={`relative flex-1 h-8 cursor-pointer ${
                            activeTab === 0 ? 'z-20' : 'z-10'
                        } group`}
                        onClick={() => setActiveTab(0)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                background: activeTab === 0 ? 'black' : 'var(--color-airbus-gray)',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 0%, 100% 102%, 0% 102%)',
                                boxShadow: activeTab === 0 ? '0 0 2px 2px black' : undefined,
                                borderBottom: activeTab === 0 ? 'none' : `${borderWidth}px solid white`,
                            }}
                        >
                                <span className="text-sm px-[80px] rounded-none group-hover:outline group-hover:outline-2 group-hover:outline-airbus-blue outline-airbus-blue transition-none">
                                    STATUS
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
                            {/* Top horizontal line */}
                            <path
                                d="M 11 0 L 189 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                            {/* Left diagonal line */}
                            <path
                                d="M 0.3 33 L 11 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth * 0.7}
                                strokeLinejoin="miter"
                            />
                            {/* Right diagonal line */}
                            <path
                                d="M 189 0 L 200 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth * 0.7}
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Right Tab */}
                    <div
                        className={`relative flex-1 h-8 cursor-pointer -ml-6 ${
                            activeTab === 1 ? 'z-20' : 'z-10'
                        } group`}
                        onClick={() => setActiveTab(1)}
                    >
                        {/* Main tab body */}
                        <div
                            className="relative h-full flex items-center justify-center"
                            style={{
                                background: activeTab === 1 ? 'black' : 'var(--color-airbus-gray)',
                                clipPath: 'polygon(18.5px 0%, calc(100% - 18.5px) 2%, 100% 102%, 0% 102%)',
                                boxShadow: activeTab === 1 ? '0 0 2px 2px black' : undefined,
                                borderBottom: activeTab === 1 ? 'none' : `${borderWidth}px solid white`,
                            }}
                        >
                                <span className="text-sm px-[80px] rounded-none group-hover:outline group-hover:outline-2 group-hover:outline-airbus-blue outline-airbus-blue transition-none">
                                    TL;DR
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
                            {/* Top horizontal line */}
                            <path
                                d="M 11 0 L 189 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth}
                                strokeLinejoin="miter"
                            />
                            {/* Right diagonal line */}
                            <path
                                d="M 189 0 L 200 32"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth * 0.7}
                                strokeLinejoin="miter"
                            />
                            {/* Left diagonal line */}
                            <path
                                d="M 0.3 33 L 11 0"
                                fill="none"
                                stroke="white"
                                strokeWidth={borderWidth * 0.7}
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
                        borderTop: 'none',
                        height: '600px'
                    }}
                >
                    {/* Screen bezel effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-transparent to-gray-800 pointer-events-none"></div>

                    <div className="relative bg-black h-full p-3 overflow-y-auto">
                        {activeTab === 0 && (
                            <div className="flex flex-col h-full space-y-6">
                                <div className="text-airbus-green text-[18px] font-medium mb-30 mx-auto">
                                    WILLIAM YANG / SOFTWARE DEVELOPER
                                </div>
                                {/* FIXME: CHANGE GITHUB STATS TO SE WEB RING */}
                                <div className="mb-2">
                                    <div className="border p-1.5 inline-block" style={{ borderColor: '#454647' }}>
                                        <div className="flex gap-x-2 items-center">
                                            <div
                                                className="flex items-center px-2 cursor-pointer"
                                                style={{ border: '2px solid transparent', borderRadius: '1px', boxSizing: 'border-box' }}
                                                onMouseEnter={e => (e.currentTarget.style.border = '2px solid var(--color-airbus-blue)')}
                                                onMouseLeave={e => (e.currentTarget.style.border = '2px solid transparent')}
                                                onClick={() => window.open('https://google.com', '_blank')}
                                            >
                                                <span className="text-airbus-green mr-4 mb-1 text-[17px]">←</span>
                                                <span className="text-white text-[17px]">PREV.</span>
                                            </div>
                                            <Button height={30} width={110} className="!justify-start w-full px-2 onCci">
                                                <div className="flex justify-start items-center w-full">
                                                    <img src={SEWebRingLogo.src} alt={"SE Webring"} className="h-5 w-5 mr-2" />
                                                    <span className="text-[13px]">WEBRING</span>
                                                </div>
                                            </Button>
                                            <div
                                                    className="flex items-center px-2 cursor-pointer"
                                                style={{ border: '2px solid transparent', borderRadius: '1px', boxSizing: 'border-box' }}
                                                onMouseEnter={e => (e.currentTarget.style.border = '2px solid var(--color-airbus-blue)')}
                                                onMouseLeave={e => (e.currentTarget.style.border = '2px solid transparent')}
                                                onClick={() => window.open('https://google.com', '_blank')}
                                            >
                                                <span className="text-white mr-4 text-[17px]">NEXT.</span>
                                                <span className="text-airbus-green mb-1 text-[17px]">→</span>
                                            </div>
                                            <span className="text-amber-500"></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Education */}
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

                                {/* Currently Working */}
                                <div className="flex items-center mb-8">
                                    <span className="text-white mr-4 text-[17px]">CURRENTLY</span>
                                    <span className="text-airbus-green text-[17px]">WORKING ON:</span>
                                </div>

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

                                {/* Stats */}
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
                                <div className="text-airbus-green text-xl mx-auto -mb-5">
                                    TL;DR
                                </div>
                                <div className="scale-90">
                                    <div className="text-base">
                                        • INCOMING SE AT <span className="text-airbus-green">UWATERLOO</span> - <span className="text-[15px]">SEEKING <span className="text-airbus-green">SUMMER 2026 INTERNSHIPS</span></span></div>

                                    <div className="text-base">
                                        • DEVELOPER AT <span className="text-airbus-green">DIGITAL FLIGHT DYNAMICS</span>
                                    </div>

                                    <div>
                                        <div className="text-[18px] mb-1 mt-2 text-airbus-blue">• SO FAR:</div>
                                        <div className="space-y-3 text-sm">
                                            <div>↳ BUILT <span className="text-airbus-green text-base">CCCSOLUTIONS</span> - LARGEST CCC SOLUTION REPOSITORY</div>
                                            <div className="ml-4 text-xs">W/ <span className="text-airbus-blue font-bold text-lg">2800+</span> USERS AND <span className="text-airbus-blue font-bold text-lg">270+</span> SOLUTIONS</div>

                                            <div>↳ ATTENDED <span className="text-airbus-blue font-bold text-base">9</span> HACKATHONS AND  WON <span className="text-airbus-blue font-bold text-base">2</span> - (<span className="text-airbus-green text-sm">HACK THE NORTH</span> NEXT)</div>
                                            <div>↳ CREATED THIS <span className="text-airbus-green text-base">A350 FMS PORTFOLIO</span></div>
                                        </div>
                                    </div>
                                    <div className="-mt-2 mb-4">
                                        <PhotoDeck images={[Image5, Image4, Image3, Image1, Image2]} />
                                    </div>
                                    <div className="text-[12px] text-airbus-blue"> FUN LITTLE FACT: IVE LOVED AVIATION SINCE I WAS 3 AND LOVE TAKING COCKPIT PHOTOS. ABOVE ARE SOME OF MY FAVORITES :)</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
