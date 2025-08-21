"use client";
import React, { useState } from 'react';
import { PROJECTS } from '../../../public/assets/constants/constants';
import { Button } from '@/components/Button';

// FIXME: clicking the back button should not be possible on the first page, forward button should not be possible on second page also i needa fix the size of the buttons
// FIXME: fix airbus-blue highlighting system to not be based off of number but rather important keywords defined in constants.js
export default function Projects() {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const borderWidth = 2;
    const projectsPerPage = 5;

    // Calculate which projects to show on current page
    const startIndex = currentPage * projectsPerPage;
    const currentProjects = PROJECTS.slice(startIndex, startIndex + projectsPerPage);
    const currentProject = currentProjects[activeTab];

    // Helper function to highlight numbers in descriptions
    const highlightNumbers = (text) => {
        return text.split(/(\b\d+\+?\b)/).map((part, index) =>
            /^\d+\+?$/.test(part) ? (
                <span key={index} className="text-airbus-blue">{part}</span>
            ) : (
                part
            )
        );
    };

    // FIXME: delete this lol/make the easter egg different
    const handleLinkClick = (project) => {
        if (project.title === "A350 PORTFOLIO") {
            alert("YOU'RE ALREADY ON THE PORTFOLIO! 🛩️");
            return;
        }
        if (project.link) {
            window.open(project.link, '_blank');
        }
    };

    const handlePrevious = () => {
        const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
        setActiveTab(0); // Reset to first tab when changing pages
    };

    const handleNext = () => {
        const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);
        setCurrentPage((prev) => (prev + 1) % totalPages);
        setActiveTab(0); // Reset to first tab when changing pages
    };

    return (
        <main className="px-8 flex items-center justify-center">
            {/* Previous Button */}
            <div className="mr-4">
                <Button
                    onClick={handlePrevious}
                    className="text-xs px-3 py-2"
                    width={40}
                >
                    ←
                </Button>
            </div>

            <div className="w-full" style={{ maxWidth: '612px' }}>
                {/* Tab Container */}
                <div className="relative flex w-full">
                    <div className="relative flex w-full">
                        {currentProjects.map((project, index) => (
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
                                        {project.shortTitle}
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

                        {/* Fill empty slots if less than 5 projects on current page */}
                        {Array.from({ length: Math.max(0, projectsPerPage - currentProjects.length) }).map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                className={`relative h-8 ${currentProjects.length + index > 0 ? '-ml-6' : ''} z-10`}
                                style={{width: '142px'}}
                            >
                                <div
                                    className="relative h-full flex items-center justify-center"
                                    style={{
                                        background: 'var(--color-airbus-gray)',
                                        clipPath: 'polygon( 11.5% 0%, 88.5% 0%, 100% 99%, 0% 99%)',
                                        borderBottom: `${borderWidth}px solid white`,
                                    }}
                                >
                                    <span className="text-sm px-[10px] text-gray-500">---</span>
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
                    <div className="relative bg-black h-full p-4 overflow-y-auto">
                        {currentProject ? (
                            <div className="flex flex-col h-full space-y-4">
                                {/* Project Title */}
                                <div className="text-airbus-green text-[18px] font-medium text-center mb-4">
                                    {currentProject.title}
                                </div>

                                {/* Project Details */}
                                <div className="space-y-4 text-white">
                                    {/* Description */}
                                    <div className="text-sm leading-relaxed">
                                        {highlightNumbers(currentProject.description)}
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center space-x-2 text-xs">
                                        <span className="text-airbus-blue">YEAR:</span>
                                        <span className="text-airbus-green">{currentProject.date}</span>
                                    </div>

                                    {/* Technologies */}
                                    <div className="space-y-2">
                                        <div className="text-airbus-blue text-xs">TECHNOLOGIES:</div>
                                        <div className="space-y-1">
                                            {currentProject.technologies.map((tech, index) => (
                                                <div key={index} className="text-xs text-airbus-green flex items-center">
                                                    <span className="mr-2">↳</span>
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        {currentProject.link && (
                                            <Button
                                                onClick={() => handleLinkClick(currentProject)}
                                                className="text-xs px-4 py-2"
                                            >
                                                VIEW LIVE
                                            </Button>
                                        )}

                                        {currentProject.github && (
                                            <Button
                                                onClick={() => window.open(currentProject.github, '_blank')}
                                                className="text-xs px-4 py-2"
                                            >
                                                VIEW CODE
                                            </Button>
                                        )}

                                        {!currentProject.link && !currentProject.github && (
                                            <div className="text-xs text-gray-500 italic">
                                                ↳ LINKS COMING SOON
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                NO PROJECT SELECTED
                            </div>
                        )}
                    </div>

                    {/* Screen reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-5 pointer-events-none"></div>
                </div>
            </div>

            {/* Next Button */}
            <div className="ml-4">
                <Button
                    onClick={handleNext}
                    className="text-xs px-3 py-2"
                    width={40}
                >
                    →
                </Button>
            </div>
        </main>
    );
}