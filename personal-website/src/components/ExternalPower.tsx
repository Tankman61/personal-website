import React, { useRef } from "react";

interface ExternalPowerProps {
    powerState: 'AVAIL' | 'AUTO';
    setPowerState: (state: 'AVAIL' | 'AUTO') => void;
}

export default function ExternalPower({ powerState, setPowerState }: ExternalPowerProps) {
    const isAuto = powerState === 'AUTO';

    // Audio refs
    const buttonPressRef = useRef<HTMLAudioElement | null>(null);
    const buttonPress2Ref = useRef<HTMLAudioElement | null>(null);

    const handleButtonClick = () => {
        if (!isAuto) {
            if (buttonPressRef.current) {
                buttonPressRef.current.currentTime = 0;
            }
            buttonPressRef.current?.play();
            setPowerState('AUTO');
        } else {
            if (buttonPress2Ref.current) {
                buttonPress2Ref.current.currentTime = 0;
            }
            buttonPress2Ref.current?.play();
            setPowerState('AVAIL');
        }
    };

    return (
        <div className="flex flex-col items-center p-8 relative">
            {/* Audio elements */}
            <audio ref={buttonPressRef} src="/assets/buttonpress.mp3" preload="auto" />
            <audio ref={buttonPress2Ref} src="/assets/buttonpress2.mp3" preload="auto" />

            {/* Button Container - blue panel with 3D effect */}
            <div className="px-8 py-6 rounded-xl relative" style={{
                backgroundColor: '#5a6370',
                background: 'linear-gradient(135deg, #6a7380 0%, #5a6370 50%, #4a5360 100%)',
                boxShadow: `
          inset 2px 2px 4px rgba(0,0,0,0.3),
          inset -1px -1px 2px rgba(120,120,140,0.4),
          0 2px 4px rgba(0,0,0,0.3)
        `
            }}>
                {/* EXT 2 Label */}
                <div className="text-white text-2xl font-bold mb-2 tracking-wide text-center">
                    EXT 2
                </div>

                {/* Corner screws positioned on the blue panel */}
                <div className="absolute top-3 left-3 w-4 h-4 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black opacity-70"></div>
                </div>
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black opacity-70"></div>
                </div>
                <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black opacity-70"></div>
                </div>
                <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full" style={{
                    background: 'radial-gradient(circle, #a0a0a0 0%, #707070 50%, #404040 100%)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.7), inset -1px -1px 2px rgba(180,180,180,0.4), 0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-black opacity-70"></div>
                </div>

                {/* White border frame - separate from button */}
                <div className="border-2 border-white p-0.5" style={{ borderRadius: '8px' }}>
                    {/* Outer button frame */}
                    <div
                        className="w-20 h-20 p-1 relative cursor-pointer transition-all duration-150 active:scale-95"
                        style={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: '6px'
                        }}
                        onClick={handleButtonClick}
                    >

                        {/* Inner content area */}
                        <div className="w-full h-full rounded flex flex-col relative z-10" style={{ backgroundColor: '#2a2a2a' }}>
                            {/* Single gray frame containing both sections with enhanced 3D shadows */}
                            <div
                                className="w-full h-full rounded p-0.5 relative"
                                style={{
                                    backgroundColor: '#4a4a4a',
                                    background: 'linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 50%, #2a2a2a 100%)',
                                    boxShadow: `
                    inset 3px 3px 6px rgba(0,0,0,0.8),
                    inset -2px -2px 4px rgba(120,120,120,0.3),
                    0 1px 2px rgba(0,0,0,0.5)
                  `,
                                    border: '1px solid rgba(80,80,80,0.5)'
                                }}
                            >
                                <div className="w-full h-full flex flex-col gap-1">
                                    {/* AVAIL section */}
                                    <div
                                        className="flex-1 flex items-center justify-center transition-all duration-200 relative"
                                        style={{
                                            backgroundColor: '#2a2a2a',
                                            boxShadow: `
                        inset 1px 1px 3px rgba(0,0,0,0.7),
                        inset -0.5px -0.5px 1px rgba(120,120,120,0.2)
                      `
                                        }}
                                    >
                                        {/* LED glow effect */}
                                        {!isAuto && (
                                            <div
                                                className="absolute inset-0 transition-all duration-200"
                                                style={{
                                                    background: 'radial-gradient(circle, rgba(142,239,23,0.15) 30%, transparent 70%)',
                                                    boxShadow: '0 0 8px rgba(142,239,23,0.3), inset 0 0 8px rgba(142,239,23,0.1)'
                                                }}
                                            />
                                        )}
                                        <span
                                            className="text-xs font-bold transition-colors duration-200 relative z-10"
                                            style={{
                                                color: isAuto ? '#3a3a3a' : '#8eef17',
                                                textShadow: isAuto ? 'none' : '0 0 6px rgba(142,239,23,0.8)'
                                            }}
                                        >
                                            AVAIL
                                        </span>
                                    </div>

                                    {/* AUTO section */}
                                    <div
                                        className="flex-1 flex items-center justify-center transition-all duration-200 relative"
                                        style={{
                                            backgroundColor: '#2a2a2a',
                                            boxShadow: `
                        inset 1px 1px 3px rgba(0,0,0,0.7),
                        inset -0.5px -0.5px 1px rgba(120,120,120,0.2)
                      `
                                        }}
                                    >
                                        {/* LED glow effect */}
                                        {isAuto && (
                                            <div
                                                className="absolute inset-0 rounded transition-all duration-200"
                                                style={{
                                                    background: 'radial-gradient(circle, rgba(40,186,253,0.15) 30%, transparent 70%)',
                                                    boxShadow: '0 0 8px rgba(40,186,253,0.3), inset 0 0 8px rgba(40,186,253,0.1)'
                                                }}
                                            />
                                        )}
                                        {/* AUTO text with dynamic border and color */}
                                        <div
                                            className="border-2 px-0.5 py-0.5 text-xs font-bold transition-all duration-200 relative z-10"
                                            style={{
                                                borderColor: isAuto ? '#28bafd' : '#3a3a3a',
                                                color: isAuto ? '#28bafd' : '#3a3a3a',
                                                boxShadow: isAuto
                                                    ? 'inset 0.5px 0.5px 2px rgba(40,186,253,0.3), 0 0 6px rgba(40,186,253,0.4)'
                                                    : 'inset 0.5px 0.5px 1px rgba(96,96,96,0.4)',
                                                textShadow: isAuto ? '0 0 6px rgba(40,186,253,0.8)' : 'none',
                                                borderRadius: '1px'
                                            }}
                                        >
                                            AUTO
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
