"use client";

import { Button } from '@/components/Button';
import {useState} from "react";

export default function About() {
    const [clickCount, setClickCount] = useState(0);

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-8">
            <div className="text-white text-xl mb-4" style={{color: "white"}}>Button Test</div>

            <div style={{color: 'red', backgroundColor: 'yellow'}}>
                TEST TEXT - CAN YOU SEE THIS CLEARLY?
            </div>

            {/* Normal Button */}
            <div className="flex flex-col items-center gap-2">
                <div className="text-white text-sm" style={{color: "white"}}>Normal Button (clicked {clickCount} times)</div>
                <Button onClick={() => setClickCount(prev => prev + 1)}>
                    HELLO
                </Button>
            </div>

            {/* Custom Size Button */}
            <div className="flex flex-col items-center gap-2">
                <div className="text-white text-sm" style={{color: "white"}}>Custom Size Button</div>
                <Button width={200} height={60}>
                    BIG BUTTON
                </Button>
            </div>
        </div>
    );
}