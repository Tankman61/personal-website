import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface PrinterRef {
    startPrint: () => void;
}

const AirbusPrinter = forwardRef<PrinterRef>((props, ref) => {
    const [printing, setPrinting] = useState(false);
    const [paperVisible, setPaperVisible] = useState(false);
    const [hasPrinted, setHasPrinted] = useState(false);
    const [printingComplete, setPrintingComplete] = useState(false);
    const [printerDuration, setPrinterDuration] = useState(2000);

    const printerAudioRef = useRef<HTMLAudioElement | null>(null);
    const paperAudioRef = useRef<HTMLAudioElement | null>(null);
    const buttonPressRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = printerAudioRef.current;
        if (!audio) return;

        const onLoadedMetadata = () => {
            setPrinterDuration(audio.duration * 1000);
        };

        audio.addEventListener("loadedmetadata", onLoadedMetadata);

        return () => {
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        };
    }, []);

    const startPrintSequence = () => {
        if (hasPrinted) return;

        setHasPrinted(true);
        setPaperVisible(true);
        setPrinting(false);
        setPrintingComplete(false);

        setTimeout(() => setPrinting(true), 50);

        setTimeout(() => {
            setPrintingComplete(true);
        }, printerDuration);

        if (printerAudioRef.current) {
            printerAudioRef.current.currentTime = 0;
            printerAudioRef.current.play();
        }
    };

    // Expose the startPrint method to parent components
    useImperativeHandle(ref, () => ({
        startPrint: startPrintSequence
    }));

    const handleButtonClick = () => {
        if (buttonPressRef.current) {
            buttonPressRef.current.currentTime = 0;
            buttonPressRef.current.play();
        }
    };

    const handlePaperClick = () => {
        if (!printingComplete) return;

        if (paperAudioRef.current) {
            paperAudioRef.current.currentTime = 0;
            paperAudioRef.current.play();
        }
        window.open('/assets/resume.pdf', '_blank');
    };

    return (
        <div className="flex flex-col items-center p-8 relative">
            <div className="relative" style={{
                width: '612px',
                height: '350px',
                background: 'linear-gradient(135deg, #6a7380 0%, #5a6370 50%, #4a5360 100%)',
                borderRadius: '20px',
                boxShadow: `
          inset 2px 2px 4px rgba(0,0,0,0.3),
          inset -1px -1px 2px rgba(120,120,140,0.4),
          0 4px 8px rgba(0,0,0,0.3)
        `
            }}>
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
                                            <div className="w-2 h-2 rounded-full" style={{
                                                backgroundColor: '#8eef17',
                                                boxShadow: '0 0 4px rgba(142,239,23,0.8)'
                                            }} />
                                            <div className="w-2 h-2 rounded-full" style={{
                                                backgroundColor: '#3a3a3a',
                                                boxShadow: 'inset 1px 1px 1px rgba(0,0,0,0.5)'
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

                {paperVisible && (
                    <div
                        className="absolute top-[-160px] left-1/2 -translate-x-1/2 overflow-hidden transition-transform duration-100 ease-linear hover:scale-102 origin-bottom"
                        style={{
                            width: '450px',
                            height: '250px',
                            zIndex: 20,
                        }}
                    >
                        <div onClick={handlePaperClick}
                             className={`w-full h-full ${printingComplete ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                             style={{
                                 backgroundColor: '#fcfcfc',
                                 boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)',
                                 transform: printing ? 'translateY(0%)' : 'translateY(100%)',
                                 transitionDuration: `${printerDuration}ms`
                             }}
                        >
                            <div className="px-4 pt-3 text-xs font-mono text-gray-900 leading-relaxed">
                                <div className="text-right text-xs mb-3 space-y-0">
                                    <div>DATE : {new Date().toLocaleDateString('en-GB').replace(/\//g, ' ')}</div>
                                    <div>TIME : {new Date().toLocaleTimeString('en-GB', { hour12: false })}</div>
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
                                    <div className="text-center text-xs">RESUME ATTACHED: CLICK TO VIEW</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <audio ref={printerAudioRef} src="/assets/sounds/printer.mp3" preload="auto" />
                <audio ref={paperAudioRef} src="/assets/sounds/paper.mp3" preload="auto" />
                <audio ref={buttonPressRef} src="/assets/sounds/buttonpress.mp3" preload="auto" />
            </div>
        </div>
    );
});

AirbusPrinter.displayName = 'AirbusPrinter';

export default AirbusPrinter;
