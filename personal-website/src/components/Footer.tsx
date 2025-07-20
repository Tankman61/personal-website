"use client";
import React from 'react';
import { Button } from './Button';

// design a message system for the footer
// make an easter egg that displays IRS has been aligned
// after a certain amount of time

const Footer: React.FC = () => {
    const [inputValue, setInputValue] = React.useState("");

    return (
        <div className="flex flex-col w-full max-w-[612px] mx-auto">
            <div className="bg-[#535354] h-[1.25px] w-[101%] mt-4 -ml-[0.5%]"></div>
            <div className="flex items-center ">
        <Button width={80} height={60}>CLEAR INFO</Button>
            <input
                type="text"
                className="flex-1 ml-4 px-2 py-1 border-none rounded bg-transparent text-white placeholder-gray-400 h-10"
                readOnly={false}
                style={{ outline: "none" }}
                value={inputValue}
                placeholder={"TEST FOOTER FOR LATER"}
                onChange={e => setInputValue(e.target.value.toUpperCase())}
            />
        </div>
            </div>
    );
};

export default Footer;
