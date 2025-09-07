'use client';

import { useRef } from 'react';
import AirbusPrinter, { PrinterRef } from '@/components/Printer';
import { Button } from '@/components/Button';

export default function Resume() {
  const printerRef = useRef<PrinterRef>(null);

  const handlePrintResume = () => {
    if (printerRef.current) {
      printerRef.current.startPrint();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[632px] relative">
      <div className="relative z-10 flex flex-col space-y-4 items-center">
        <Button width={150} onClick={handlePrintResume}>
          PRINT RESUME*
        </Button>
        <AirbusPrinter ref={printerRef} />
      </div>
    </main>
  );
}
