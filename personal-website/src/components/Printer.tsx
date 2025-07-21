// TODO: MAKE PRINTER GENERATE CUSTOM FRONT PAGE FOR RESUME PDF AS ITS COOL


import React, { useState } from "react";

export default function AirbusPrinter() {
    const [statusLED, setStatusLED] = useState(true);
    const [printing, setPrinting] = useState(false);
    const [paperVisible, setPaperVisible] = useState(false);

    const handleButtonClick = (buttonType) => {
        console.log(`Button pressed: ${buttonType}`);

        if (buttonType === 'TEST') {
            // Show paper and initialize reclaimed state
            setPaperVisible(true);
            setPrinting(false);
            // Trigger slide-up after mount
            setTimeout(() => setPrinting(true), 50);
            // Reset: slide-down then hide
            setTimeout(() => {
            }, 2050); // match transition duration

        } else if (buttonType === 'STATUS') {
            setStatusLED(!statusLED);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 relative">
            <div className="relative" style={{
                width: '800px',
                height: '350px',
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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70" />
                </div>
                <div className="absolute top-4 right-8 w-6 h-6 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70" />
                </div>
                <div className="absolute bottom-4 left-[52px] w-6 h-6 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70" />
                </div>
                <div className="absolute bottom-4 right-[52px] w-6 h-6 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-black opacity-70" />
                </div>

                {/* Buttons */}
                <div className="absolute left-1/2 top-5 transform -translate-x-1/2 z-10 flex gap-3">
                    {['ABORT', 'SLEW', 'TEST', 'STATUS'].map((btn) => (
                        <div
                            key={btn}
                            className="w-15 h-15 p-1 relative cursor-pointer transition-transform duration-150 active:scale-95"
                            style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}
                            onClick={() => handleButtonClick(btn)}
                        >
                            <div className="w-full h-full rounded flex flex-col items-center justify-center" style={{
                                backgroundColor: '#2a2a2a',
                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(120,120,120,0.3)'
                            }}>
                                {btn === 'STATUS' ? (
                                    <div className="flex flex-col items-center">
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full transition-all duration-200" style={{
                                                backgroundColor: statusLED ? '#8eef17' : '#3a3a3a',
                                                boxShadow: statusLED ? '0 0 4px rgba(142,239,23,0.8)' : 'inset 1px 1px 1px rgba(0,0,0,0.5)'
                                            }} />
                                            <div className="w-2 h-2 rounded-full transition-all duration-200" style={{
                                                backgroundColor: !statusLED ? '#ff4444' : '#3a3a3a',
                                                boxShadow: !statusLED ? '0 0 4px rgba(255,68,68,0.8)' : 'inset 1px 1px 1px rgba(0,0,0,0.5)'
                                            }} />
                                        </div>
                                        <span className="text-white text-xs font-bold">STATUS</span>
                                    </div>
                                ) : (
                                    <span className="text-white text-xs font-bold">{btn}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inner rectangular frame - Centered and larger */}
                <div className="absolute" style={{
                    top: '90px',
                    bottom: '5px',
                    left: '5px',
                    right: '5px',
                    border: '2px solid rgba(0,0,0,0.4)',
                    borderRadius: '8px 8px 15px 15px',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                }}>
                </div>

                {/* Paper container */}
                {paperVisible && (
                    <div
                        className="absolute top-[-160px] left-1/2 -translate-x-1/2 overflow-hidden transition-transform duration-75 ease-linear hover:scale-101 origin-bottom"
                        style={{
                            width: '600px',
                            height: '250px',
                            zIndex: 20
                        }}
                    >
                        <div onClick={() => {
                            window.open('/assets/resume.pdf', '_blank');
                        }}
                            className="w-full h-full transition-transform duration-[2000ms] ease-linear"
                            style={{
                                backgroundColor: '#fcfcfc',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)',
                                transform: printing ? 'translateY(0%)' : 'translateY(100%)'
                            }}
                        >
                            <div className="px-4 pt-3 text-xs font-mono text-gray-900 leading-relaxed">
                                <div className="text-right text-xs mb-3 space-y-0">
                                    <div>DATE : {new Date().toLocaleDateString('en-GB').replace(/\//g, ' ')}</div>
                                    <div>TIME : {new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5)}Z</div>
                                </div>

                                <div className="mb-3 tracking-wide space-y-0.5">
                                    <div>ATSU C-GXWB WILLIAM YANG</div>
                                    <div>COCKPIT PRINTER MESSAGE - RESUME UPLINK</div>
                                </div>

                                <div className="space-y-0.5">
                                    <div>** REQUEST **</div>
                                    <div>ICAO : CYYZ</div>
                                    <div>TO : W.YANG</div>
                                    <div>REQ : RESUME / IDENT / CREW INFO</div>
                                </div>

                                <div className="mt-4 pt-2 border-t-2 border-dotted border-gray-400">
                                    <div className="text-center text-xs">RESUME FILE ATTACHED</div>
                                </div>
                            </div>


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
