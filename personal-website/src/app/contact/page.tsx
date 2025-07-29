
// TODO: fix this bad vibe code LOL
// This should be in the blog page eventually
// Contact page can be
import React from 'react';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';

const FlightManagementDisplay = () => {
    const waypoints = [
        { name: 'LFML31L', time: '00:00', spd: '---', alt: '-----', track: '307°', dist: '5' },
        { name: 'C313°', sub: 'ML320', time: '--:--', spd: '---', alt: '-----', track: '192°', dist: '6' },
        { name: 'FJR6N', sub: 'MTG4', time: '--:--', spd: '210', alt: '3500', track: '227°', dist: '10' },
        { name: 'FJR6N', sub: 'BULTO', time: '--:--', spd: '---', alt: '-----', track: '271°', dist: '7' },
        { name: 'FJR6N', sub: 'SALIN', time: '--:--', spd: '---', alt: '-----', track: '296°', dist: '12' },
        { name: 'FJR6N', sub: 'MARRI', time: '--:--', spd: '---', alt: '-----', track: '296°', dist: '24' },
        { name: 'FJR', time: '--:--', spd: '---', alt: '-----', track: '282°', dist: '24' },
        { name: 'VALAG', time: '--:--', spd: '---', alt: '-----', track: '282°', dist: '17' },
        { name: 'BRUSC', time: '--:--', spd: '---', alt: '-----', track: '', dist: '' }
    ];

    const dropdownOptions = ['ALT', 'SPD', 'HDG', 'VS'];

    return (
        <div className="bg-black text-green-400 font-mono text-sm w-full max-w-4xl mx-auto border border-gray-600">
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-800 px-4 py-1 border-b border-gray-600">
                <div className="flex space-x-8">
                    <span className="text-white">FROM</span>
                    <span className="text-white ml-20">TIME</span>
                    <span className="text-white ml-16">SPD</span>
                    <Dropdown
                        options={dropdownOptions}
                        value="ALT"
                        width={60}
                        height={24}
                        fontSize={12}
                    />
                    <span className="text-white ml-4">TRK DIST FPA</span>
                </div>
            </div>

            {/* Waypoint List */}
            <div className="px-4 py-2">
                {waypoints.map((waypoint, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center w-3/5">
                            <div className="w-16">
                                <div className={`${index === 0 ? 'text-green-400' : 'text-white'} ${waypoint.sub ? 'text-xs' : ''}`}>
                                    {waypoint.name}
                                </div>
                                {waypoint.sub && (
                                    <div className={`text-xs ${waypoint.sub === 'MTG4' ? 'text-green-400' : 'text-white'} ml-4`}>
                                        {waypoint.sub}
                                    </div>
                                )}
                            </div>

                            <div className="ml-8 w-12 text-center">
                                {waypoint.time}
                            </div>

                            <div className="ml-8 w-8 text-center">
                                {waypoint.spd}
                            </div>

                            <div className={`ml-12 w-12 text-center ${waypoint.alt === '3500' ? 'text-purple-400' : ''}`}>
                                {waypoint.alt}
                            </div>
                        </div>

                        {/* Diamond and Track/Distance */}
                        <div className="flex items-center">
                            {waypoint.track && (
                                <>
                                    <div className="text-green-400 mr-2">♦</div>
                                    <div className="text-green-400 text-xs">
                                        <div>{waypoint.track}</div>
                                    </div>
                                    <div className="text-green-400 text-xs ml-4">
                                        {waypoint.dist}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Separator */}
            <div className="border-t border-gray-600 mx-4"></div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
                <div className="flex items-center space-x-4">
                    <div className="text-white bg-gray-700 px-2 py-1 text-xs">
                        LFB032L
                    </div>
                    <span className="text-white">--:-- ----T ---- NM</span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        width={30}
                        height={24}
                        fontSize={16}
                        className="bg-gray-700 text-white"
                    >
                        ▼
                    </Button>
                    <Button
                        width={30}
                        height={24}
                        fontSize={16}
                        className="bg-gray-700 text-white"
                    >
                        ▲
                    </Button>
                    <div className="text-white bg-gray-700 px-2 py-1 text-xs">
                        DEST
                    </div>
                </div>
            </div>

            {/* Very Bottom Section */}
            <div className="flex justify-between items-center px-4 py-1 bg-black border-t border-gray-600">
                <div className="flex items-center">
                    <div className="text-yellow-400 mr-2">✕</div>
                    <div className="text-cyan-400 bg-blue-900 px-2 py-1 text-xs border border-cyan-400">
                        INIT
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="text-white bg-gray-700 px-2 py-1 text-xs">
                        F-PLN INFO
                    </div>
                    <Button
                        width={20}
                        height={20}
                        fontSize={12}
                        className="bg-gray-700 text-white"
                    >
                        ▲
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FlightManagementDisplay;
