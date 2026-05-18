'use client';
import { useState, useEffect } from 'react';
import CursorOverlay from './CursorOverlay';

export default function CursorOverlayClient() {
  const [showCursor, setShowCursor] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hasSeenSplash')) {
      setShowCursor(true);
    }

    // Listen for splash completion
    const handler = () => setShowCursor(true);
    window.addEventListener('splash-complete', handler);

    // Detect first interaction (mouse move OR touch/pen tap) so the overlay
    // mounts on mobile too — touch devices never fire mousemove.
    const moveHandler = () => {
      setHasMoved(true);
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerdown', moveHandler);
    };
    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerdown', moveHandler);

    return () => {
      window.removeEventListener('splash-complete', handler);
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerdown', moveHandler);
    };
  }, []);

  if (!showCursor || !hasMoved) return null;

  return <CursorOverlay />;
}
