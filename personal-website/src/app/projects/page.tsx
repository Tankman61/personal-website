"use client";
import React, { useState } from 'react';
import { PROJECTS } from '../../../public/assets/constants/constants';
import { Button } from '@/components/Button';
import { FaGithub, FaGlobe, FaDiscord } from 'react-icons/fa';
import PhotoDeck from '@/components/PhotoDeck';

// FIXME: clicking the back button should not be possible on the first page, forward button should not be possible on second page also i needa fix the size of the buttons
// FIXME: fix airbus-blue highlighting system to not be based off of number but rather important keywords defined in constants.js
// FIXME: FOR IMAGES USE THE GALLERY
export default function Projects() {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const borderWidth = 2;
    const projectsPerPage = 5;
    const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);

    // Calculate which projects to show on current page
    const startIndex = currentPage * projectsPerPage;
    const currentProjects = PROJECTS.slice(startIndex, startIndex + projectsPerPage);
    const currentProject = currentProjects[activeTab];


    const handleLinkClick = (project: { link?: string }) => {
        if (project.link) {
            window.open(project.link, '_blank');
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setActiveTab(0); // Reset to first tab when changing pages
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            setActiveTab(0); // Reset to first tab when changing pages
        }
    };

    return (
        <main className="px-8 flex items-center justify-center">
            {/* Previous Button */}
            <div className="mr-4">
                <Button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
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
                                        d="M 2 31.5 L 25 0 L 175 0 L 199.5 31.5 L"
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
                            <div className="flex flex-col h-full">
                                {/* Project Title */}
                                <div className="text-airbus-green text-[18px] font-medium text-center -mb-3">
                                    {currentProject.title}
                                </div>
                                <PhotoDeck
                                    images={currentProject.images.map(img => ({ src: typeof img === 'string' ? img : img.src }))}
                                    singlePhotoView={true}
                                    cardWidth={500}
                                    cardHeight={225}
                                />


                                {/* Project Details */}
                                <div className="space-y-4 text-white mt-2">
                                    {/* Description */}
                                    <div className="text-sm leading-relaxed">
                                        {currentProject.description}
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center space-x-2 text-sm">
                                        <span className="text-airbus-blue">YEAR:</span>
                                        <span className="text-airbus-green">{currentProject.date}</span>
                                    </div>

                                    {/* Technologies */}
                                    <div className="space-y-2">
                                        <div className="text-airbus-blue text-sm">TECHNOLOGIES:</div>
                                        <div className="flex gap-x-4">
                                            {/* First column - always takes first 3 items */}
                                            <div className="flex-1 space-y-1">
                                                {currentProject.technologies.slice(0, 3).map((tech, index) => (
                                                    <div key={index} className="text-xs text-white flex items-center">
                                                        <span className="mr-2">↳</span>
                                                        {tech}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Second column - takes any remaining items */}
                                            {currentProject.technologies.length > 3 && (
                                                <div className="flex-1 space-y-1">
                                                    {currentProject.technologies.slice(3).map((tech, index) => (
                                                        <div key={index} className="text-xs text-white flex items-center">
                                                            <span className="mr-2">↳</span>
                                                            {tech}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 -mt-2">
                                        {currentProject.github && (
                                            <div
                                                onClick={() => window.open(currentProject.github, '_blank')}
                                                className="p-2 border border-transparent hover:outline hover:outline-airbus-blue hover:outline-[2px] rounded-[0.5px] transition-none cursor-pointer"
                                            >
                                                <FaGithub className="text-xl" />
                                            </div>
                                        )}
                                        {currentProject.link && (
                                            <div
                                                onClick={() => handleLinkClick(currentProject)}
                                                className="p-2 border border-transparent hover:outline hover:outline-airbus-blue hover:outline-[2px] rounded-[0.5px] transition-none cursor-pointer"
                                            >
                                                <FaGlobe className="text-xl" />
                                            </div>
                                        )}
                                        {currentProject.discord && (
                                            <div
                                                onClick={() => window.open(currentProject.discord, '_blank')}
                                                className="p-2 border border-transparent hover:outline hover:outline-airbus-blue hover:outline-[2px] rounded-[0.5px] transition-none cursor-pointer"
                                            >
                                                <FaDiscord className="text-xl" />
                                            </div>
                                        )}
                                        {!currentProject.link && !currentProject.github && !currentProject.discord && (
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
                    disabled={currentPage === totalPages - 1}
                    className="text-xs px-3 py-2"
                    width={40}
                >
                    →
                </Button>
            </div>
        </main>
    );
}