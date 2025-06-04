"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState("HOME");
    const [dropdownValue, setDropdownValue] = useState("FMS1");
    const dropdownOptions = ["FMS1", "FMS2"];
    const pages = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];

    return (
        <nav className="navbar flex flex-col items-end p-4 relative">
            {/* Name above buttons, right-aligned */}
            <div className="text-lg mb-2 self-end">WILLIAM YANG</div>

            {/* Dropdown menu (FMS1/FMS 2 - doesn't actually navigate anything yet), left aligned */}
            {/* TODO: make FMS2 as an easter egg that deletes the FMS so users can view the A350 model background */}
            <div className="absolute left-4 top-4">
                <Dropdown
                    options={dropdownOptions}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    style={{
                        height: 10, // match Button height (py-2 = 8px*2 + text-sm = 14px, total ~32px)
                        minWidth: 0,
                        width: 120, // match Button min width (px-4 = 16px*2 + text)
                        padding: 0,
                    }}
                />
            </div>
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
                    <div className="flex-1 h-5 bg-gray-400 flex items-center text-s font-semibold pl-4">
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