"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const dropdownOptions = ["PORTFOLIO", "BLOG", "ECAM"];
    const pages = ["HOME", "PROJECTS", "RESUME", "CONTACT"];

    // derive dropdown value from URL
    const dropdownValue = (() => {
        const path = pathname.replace("/", "").toUpperCase();
        return dropdownOptions.includes(path) ? path : "PORTFOLIO";
    })();

    const handleDropdownChange = (value: string) => {
        router.push(value === "PORTFOLIO" ? "/" : `/${value.toLowerCase()}`);
    };

    return (
        <nav className="navbar flex flex-col items-center p-4 relative">
            <div className="flex flex-col items-center w-full max-w-[612px] mx-auto">
                <div className="flex justify-between items-end w-full mb-1 z-50">
                    <Dropdown
                        options={dropdownOptions}
                        value={dropdownValue}
                        onChange={handleDropdownChange}
                        height={30}
                        width={150}
                        fontSize={17}
                    />
                    <div className="text-xl">WILLIAM YANG</div>
                </div>

                <ul className="flex space-x-1 mb-1">
                    {pages.map((page) => (
                        <li key={page}>
                            <Button
                                onClick={() => router.push(page === "HOME" ? "/" : `/${page.toLowerCase()}`)}
                                height={45}
                                width={150}
                                fontSize={17}
                            >
                                {page}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
