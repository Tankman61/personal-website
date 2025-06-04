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
        <nav className="navbar flex flex-col items-center p-4 relative">
            {/* Container to hold both buttons and status bar with same width - 612 = 6 * 150 + 3 * 4 change if button sizes change*/}
            <div className="flex flex-col items-center  w-full max-w-[612px] mx-auto">
                {/* Dropdown menu (FMS1/FMS 2 - doesn't actually navigate anything yet), left aligned */}
                {/* TODO: make FMS2 as an easter egg that deletes the FMS so users can view the A350 model background */}
                <div className="flex justify-between items-end w-full mb-1">
                    <div>
                        <Dropdown
                            options={dropdownOptions}
                            value={dropdownValue}
                            onChange={setDropdownValue}
                            height={30}
                            width={150}
                            fontSize={17}
                        />
                    </div>
                    <div className="text-xl">WILLIAM YANG</div>
                </div>
                <ul className="flex space-x-1 mb-1">
                    {pages.map((page) => (
                        <li key={page}>
                            <Button
                                onClick={() => setCurrentPage(page)}
                                height={45}
                                width={150}
                                fontSize={17}
                            >
                                {page}
                            </Button>
                        </li>
                    ))}
                </ul>

                {/* Status bar with gaps, perfectly aligned with buttons */}
                <div className="flex space-x-1 w-full">
                    <div className="flex-1 h-7 bg-gray-400 flex text-black items-center pl-4">
                        <span className="text-xl">{currentPage}</span>
                    </div>
                    <div className="w-14 h-7 bg-gray-400"></div>
                    <div className="w-20 h-7 bg-gray-400"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;