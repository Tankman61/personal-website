"use client";
import React from 'react';
import { Button } from './Button';


const Footer: React.FC = () => {
    return (
        <div className="flex flex-col w-full max-w-[612px] mx-auto">
            <div className="bg-[#535354] h-[1.25px] w-[101%] mt-4 -ml-[0.5%]"></div>
        <Button width={80} height={60}>CLEAR INFO</Button>

            </div>
    );
};

export default Footer;