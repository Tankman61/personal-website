'use client';
import dynamic from 'next/dynamic';

const CursorOverlay = dynamic(() => import('./CursorOverlay'), { ssr: false });

export default function CursorOverlayClient() {
    return <CursorOverlay />;
}
