"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const dropdownOptions = ["PORTFOLIO", "BLOG", "GALLERY"];
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
                <div className="flex items-center w-full space-x-1">
                    {[
                        { text: pathname === "/" ? "HOME" : pages.find(page => pathname.toUpperCase().includes(page.toUpperCase())) || "PAGE NAME", width: 490 },
                        { text: "", width: 52 },
                        { text: "", width: 70 }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: "#8c9ba0",
                                color: "black",
                                height: "25px",
                                width: item.width,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                paddingLeft: "10px",
                                paddingTop: "3px",
                                borderRadius: "1px",
                                fontSize: "22px",
                            }}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
