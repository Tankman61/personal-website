import React, { useState } from "react";

export default function AirbusPrinter() {
    const [statusLED, setStatusLED] = useState(true);
    const [printing, setPrinting] = useState(false);
    const [paperVisible, setPaperVisible] = useState(false);

    const handleButtonClick = (buttonType) => {
        console.log(`Button pressed: ${buttonType}`);

        if (buttonType === 'TEST') {
            setPrinting(true);
            setPaperVisible(true);
            setTimeout(() => setPrinting(false), 2000);
        } else if (buttonType === 'STATUS') {
            setStatusLED(!statusLED);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 relative">
            {/* Main Rectangular Panel - Made taller */}
            <div className="relative" style={{
                width: '800px',
                height: '350px',
                backgroundColor: '#5a6370',
                background: 'linear-gradient(135deg, #6a7380 0%, #5a6370 50%, #4a5360 100%)',
                borderRadius: '20px',
                boxShadow: `
                    inset 2px 2px 4px rgba(0,0,0,0.3),
                    inset -1px -1px 2px rgba(120,120,140,0.4),
                    0 4px 8px rgba(0,0,0,0.3)
                `
            }}>
                {/* Corner bolts */}
                <div className="absolute top-4 left-8 w-6 h-6 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70"></div>
                </div>
                <div className="absolute top-4 right-8 w-6 h-6 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70"></div>
                </div>
                {/* Bottom bolts moved 15% closer to center */}
                <div className="absolute bottom-4 w-6 h-6 rounded-full" style={{
                    left: 'calc(10% + 32px)',
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70"></div>
                </div>
                <div className="absolute bottom-4 w-6 h-6 rounded-full" style={{
                    right: 'calc(10% + 32px)',
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70"></div>
                </div>

                {/* Inner rectangular frame - Centered and larger */}
                <div className="absolute" style={{
                    top: '80px',
                    bottom: '80px',
                    left: '100px',
                    right: '100px',
                    border: '2px solid rgba(0,0,0,0.4)',
                    borderRadius: '8px',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                }}>
                    {/* Paper output from printer - 80% width of inner frame */}
                    {paperVisible && (
                        <div
                            className="absolute bg-white transition-all duration-1000 ease-out"
                            style={{
                                top: '-20px',
                                left: '10%',
                                width: '80%',
                                height: printing ? '60px' : '40px',
                                borderRadius: '2px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                transform: printing ? 'translateY(-10px)' : 'translateY(0px)',
                                border: '1px solid #ddd'
                            }}
                        >
                            <div className="p-2 text-xs text-gray-800">
                                <div>TEST PRINT</div>
                                <div>Status: OK</div>
                                <div>{new Date().toLocaleTimeString()}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons moved higher and centered - Made square */}
                <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '20px' }}>
                    <div className="flex gap-3">
                        {/* ABORT Button - Made square */}
                        <div
                            className="w-16 h-16 p-1 relative cursor-pointer transition-all duration-150 active:scale-95"
                            style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}
                            onClick={() => handleButtonClick('ABORT')}
                        >
                            <div className="w-full h-full rounded flex items-center justify-center" style={{
                                backgroundColor: '#2a2a2a',
                                boxShadow: `
                                inset 2px 2px 4px rgba(0,0,0,0.8),
                                inset -1px -1px 2px rgba(120,120,120,0.3)
                            `
                            }}>
                                <span className="text-white text-xs font-bold">ABORT</span>
                            </div>
                        </div>

                        {/* SLEW Button - Made square */}
                        <div
                            className="w-16 h-16 p-1 relative cursor-pointer transition-all duration-150 active:scale-95"
                            style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}
                            onClick={() => handleButtonClick('SLEW')}
                        >
                            <div className="w-full h-full rounded flex items-center justify-center" style={{
                                backgroundColor: '#2a2a2a',
                                boxShadow: `
                                inset 2px 2px 4px rgba(0,0,0,0.8),
                                inset -1px -1px 2px rgba(120,120,120,0.3)
                            `
                            }}>
                                <span className="text-white text-xs font-bold">SLEW</span>
                            </div>
                        </div>

                        {/* TEST Button - Made square */}
                        <div
                            className="w-16 h-16 p-1 relative cursor-pointer transition-all duration-150 active:scale-95"
                            style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}
                            onClick={() => handleButtonClick('TEST')}
                        >
                            <div className="w-full h-full rounded flex items-center justify-center" style={{
                                backgroundColor: '#2a2a2a',
                                boxShadow: `
                                inset 2px 2px 4px rgba(0,0,0,0.8),
                                inset -1px -1px 2px rgba(120,120,120,0.3)
                            `
                            }}>
                                <span className="text-white text-xs font-bold">TEST</span>
                            </div>
                        </div>

                        {/* STATUS Button with dual LEDs - Made square */}
                        <div
                            className="w-16 h-16 p-1 relative cursor-pointer transition-all duration-150 active:scale-95"
                            style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}
                            onClick={() => handleButtonClick('STATUS')}
                        >
                            <div className="w-full h-full rounded flex flex-col items-center justify-center" style={{
                                backgroundColor: '#2a2a2a',
                                boxShadow: `
                                inset 2px 2px 4px rgba(0,0,0,0.8),
                                inset -1px -1px 2px rgba(120,120,120,0.3)
                            `
                            }}>
                                {/* Dual Status LEDs */}
                                <div className="flex gap-2 mb-1">
                                    {/* Green LED */}
                                    <div
                                        className="w-2 h-2 rounded-full transition-all duration-200"
                                        style={{
                                            backgroundColor: statusLED ? '#8eef17' : '#3a3a3a',
                                            boxShadow: statusLED ? '0 0 4px rgba(142,239,23,0.8)' : 'inset 1px 1px 1px rgba(0,0,0,0.5)'
                                        }}
                                    />
                                    {/* Red LED */}
                                    <div
                                        className="w-2 h-2 rounded-full transition-all duration-200"
                                        style={{
                                            backgroundColor: !statusLED ? '#ff4444' : '#3a3a3a',
                                            boxShadow: !statusLED ? '0 0 4px rgba(255,68,68,0.8)' : 'inset 1px 1px 1px rgba(0,0,0,0.5)'
                                        }}
                                    />
                                </div>
                                <span className="text-white text-xs font-bold">STATUS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
