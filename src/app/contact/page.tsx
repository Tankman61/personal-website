'use client';
import React from 'react';
import { Button } from '@/components/Button';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import DevpostLogo from '../../../public/assets/icons/img.png';
import SEWebRingLogo from '../../../public/assets/icons/logo_w.svg';
import Image from 'next/image';

const CONTACT_ITEMS = [
  {
    name: 'LINKEDIN',
    icon: <FaLinkedin size={24} color="white" />,
    url: 'https://www.linkedin.com/in/williamyang07/',
  },
  {
    name: 'EMAIL',
    icon: <FaEnvelope size={24} color="white" />,
    url: 'mailto:w259yang@uwaterloo.ca',
  },
];

const CHECKOUT_ITEMS = [
  {
    name: 'DEVPOST',
    icon: <Image src={DevpostLogo} alt="Devpost" width={24} height={24} />,
    url: 'https://devpost.com/Tankman61',
  },
  {
    name: 'GITHUB',
    icon: <FaGithub size={24} color="white" />,
    url: 'https://github.com/Tankman61',
  },
  {
    name: 'SE-WEBRING',
    icon: <Image src={SEWebRingLogo} alt="SE Webring" width={24} height={24} />,
    url: 'https://se-webring.xyz/',
  },
];

const handleClick = (url: string | URL | undefined) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center min-h-[632px] px-8 pt-0">
      <div className="flex flex-row items-start justify-center gap-12 w-full max-w-xl">
        <div className="flex flex-col items-center gap-6 flex-1">
          <h2 className="text-xl text-white text-center">CONTACT</h2>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.name} className="flex items-center justify-between w-56">
              <div className="flex items-center flex-shrink-0">
                <div className="flex-shrink-0">{item.icon}</div>
                <span className="ml-3 text-white text-sm font-normal">{item.name}</span>
              </div>

              <Button
                width={64}
                height={32}
                fontSize={12}
                className="flex-shrink-0 ml-6"
                onClick={() => handleClick(item.url)}
              >
                OPEN*
              </Button>
            </div>
          ))}
        </div>

        <div
          style={{
            width: '0px',
            height: '220px',
            borderLeft: '2px solid #535354',
            margin: '0 16px',
          }}
        />

        <div className="flex flex-col items-center gap-6 flex-1">
          <h2 className="text-xl text-white text-center">CHECK OUT</h2>
          {CHECKOUT_ITEMS.map((item) => (
            <div key={item.name} className="flex items-center justify-between w-56">
              <div className="flex items-center flex-shrink-0">
                <div className="flex-shrink-0">{item.icon}</div>
                <span className="ml-3 text-white text-sm font-normal">{item.name}</span>
              </div>

              <Button
                width={64}
                height={32}
                fontSize={12}
                className="flex-shrink-0 ml-6"
                onClick={() => handleClick(item.url)}
              >
                OPEN*
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#535354',
          height: '1.25px',
          width: '612px',
          marginTop: '12px',
          marginLeft: '-0.5%',
        }}
      />
        <div className="mt-auto">
        <div className="flex items-center justify-center gap-3">
            <a href={`https://se30webring.com?from=${window.location.href}&dir=prev`} className="no-underline text-[#FFCE1A] text-2xl leading-none flex items-center">←</a>
            <a href="https://se30webring.com" target="_blank" className="no-underline flex items-center">
                <img
                    src="https://se30webring.com/assets/icon-yellow.svg"
                    alt="SE '30 Webring"
                    className="w-8 h-8"
                />
            </a>
            <a href={`https://se30webring.com?from=${window.location.href}&dir=next`} className="no-underline text-[#FFCE1A] text-2xl leading-none flex items-center">→</a>
        </div>
       </div>
    </main>
  );
}
