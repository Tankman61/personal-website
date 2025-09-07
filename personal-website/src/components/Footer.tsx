'use client';
import React from 'react';
import { Button } from './Button';

const Footer: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('footerMessages');
      if (saved) {
        return JSON.parse(saved);
      } else {
        localStorage.setItem('footerStartTime', Date.now().toString());
        return ['NAV ACCUR DOWNGRADED'];
      }
    }
    return ['NAV ACCUR DOWNGRADED'];
  });

  const [clearedMessages, setClearedMessages] = React.useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('footerClearedMessages');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  React.useEffect(() => {
    // Save messages and cleared messages to localStorage whenever they change
    if (typeof window !== 'undefined') {
      localStorage.setItem('footerMessages', JSON.stringify(messages));
      localStorage.setItem('footerClearedMessages', JSON.stringify(clearedMessages));
    }
  }, [messages, clearedMessages]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let timer2: NodeJS.Timeout | null = null;

    // Only start the NAV PRIMARY timer if ALIGN IRS has been displayed and either cleared or is still showing
    const alignIrsDisplayed =
      messages.includes('ALIGN IRS') || clearedMessages.includes('ALIGN IRS');

    if (
      alignIrsDisplayed &&
      !messages.includes('NAV PRIMARY') &&
      !clearedMessages.includes('NAV PRIMARY')
    ) {
      // Check if we need to set a timer or show immediately
      const alignIrsTime = localStorage.getItem('alignIrsTime');
      const elapsed = alignIrsTime ? Date.now() - parseInt(alignIrsTime) : 0;

      if (elapsed < 1000 * 60 * 5) {
        // Set timer for remaining time until 5 minutes after ALIGN IRS appeared
        timer2 = setTimeout(
          () => {
            setMessages((prev) => {
              if (!prev.includes('NAV PRIMARY') && !clearedMessages.includes('NAV PRIMARY')) {
                return [...prev, 'NAV PRIMARY'];
              }
              return prev;
            });
          },
          1000 * 60 * 5 - elapsed,
        );
      } else {
        // It's been more than 5 minutes since ALIGN IRS appeared, show NAV PRIMARY now
        setMessages((prev) => {
          if (!prev.includes('NAV PRIMARY')) {
            return [...prev, 'NAV PRIMARY'];
          }
          return prev;
        });
      }
    }

    return () => {
      if (timer2) clearTimeout(timer2);
    };
  }, [messages, clearedMessages]);

  const clearMessage = () => {
    const topMessage = messages[messages.length - 1];
    if (topMessage) {
      setClearedMessages((prev) => [...prev, topMessage]);
      setMessages((prev) => prev.slice(0, -1));

      if (topMessage === 'NAV ACCUR DOWNGRADED' && !clearedMessages.includes('ALIGN IRS')) {
        setTimeout(() => {
          setMessages((current) => {
            if (!current.includes('ALIGN IRS')) {
              // Store the time when ALIGN IRS appears
              localStorage.setItem('alignIrsTime', Date.now().toString());
              return [...current, 'ALIGN IRS'];
            }
            return current;
          });
        }, 2000);
      }
    }
  };

  const getMessageBackground = (message: string) => {
    if (message === 'NAV PRIMARY') {
      return 'bg-white';
    }
    if (message.startsWith('NAV') || message.startsWith('ALIGN')) {
      return 'bg-amber-500';
    }
    return 'bg-white';
  };

  const topMessage = messages[messages.length - 1];

  return (
    <div className="flex flex-col w-full max-w-[612px] mx-auto">
      <div className="bg-[#535354] h-[1.25px] w-[612px] mt-4 -ml-[0.5%]"></div>
      <div className="flex items-center ">
        <Button width={80} height={60} onClick={clearMessage}>
          CLEAR INFO
        </Button>
        <div className="relative flex-1 ml-4">
          {topMessage && (
            <div className="absolute inset-0 flex items-center px-2 pointer-events-none">
              <span className={`${getMessageBackground(topMessage)} text-black`}>{topMessage}</span>
            </div>
          )}
          <div
            className="w-full px-2 py-1 border-none rounded bg-transparent text-white h-10"
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
