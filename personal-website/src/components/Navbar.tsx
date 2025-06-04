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
            <div className="text-xl mb-2 self-end">WILLIAM YANG</div>

            {/* Dropdown menu (FMS1/FMS 2 - doesn't actually navigate anything yet), left aligned */}
            {/* TODO: make FMS2 as an easter egg that deletes the FMS so users can view the A350 model background */}
            <div className="absolute left-4 top-3">
                <Dropdown
                    options={dropdownOptions}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    height={35}
                    width={150}
                    // fix centering tomorrwo
                    fontSize={17}
                />
            </div>
            {/* Container to hold both buttons and status bar with same width */}
            <div className="flex flex-col items-end">
                <ul className="flex space-x-1 mb-4">
                    {pages.map((page) => (
                        <li key={page}>
                            <Button
                                onClick={() => setCurrentPage(page)}
                                height={45}
                                width={150}
                                fontSize={16}
                            >
                                {page}
                            </Button>
                        </li>
                    ))}
                </ul>

                {/* Status bar with gaps, perfectly aligned with buttons */}
                <div className="flex space-x-1 w-full">
                    <div className="flex-1 h-7 bg-gray-400 flex items-center text-m font-semibold pl-4">
                        {currentPage}
                    </div>
                    <div className="w-10 h-7 bg-gray-400"></div>
                    <div className="w-16 h-7 bg-gray-400"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;