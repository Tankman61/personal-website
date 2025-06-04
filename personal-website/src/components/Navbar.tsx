"use client";

import React, { useState } from "react";
import { Button } from "./Button";

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState("HOME");

    const pages = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];

    return (
        <nav className="navbar flex flex-col items-end p-4 relative">
            {/* Name above buttons, right-aligned */}
            <div className="text-lg text-blue-400 mb-2 self-end">WILLIAM YANG</div>

            {/* Container to hold both buttons and status bar with same width */}
            <div className="flex flex-col items-end">
                <ul className="flex space-x-1 mb-4">
                    {pages.map((page) => (
                        <li key={page}>
                            <Button
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </Button>
                        </li>
                    ))}
                </ul>

                {/* Status bar with gaps, perfectly aligned with buttons */}
                <div className="flex space-x-1 w-full">
                    <div className="flex-1 h-5 bg-gray-400 flex items-center text-xs text-black pl-4">
                        {currentPage}
                    </div>
                    <div className="w-8 h-5 bg-gray-400"></div>
                    <div className="w-12 h-5 bg-gray-400"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;