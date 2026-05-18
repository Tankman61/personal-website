'use client';
import React, { useState, useEffect } from 'react';
import Cursor from './Cursor';

const CursorOverlay = () => {
  const [pos, setPos] = useState(() => {
    const storedX = localStorage.getItem('cursor-x');
    const storedY = localStorage.getItem('cursor-y');
    return {
      x: storedX !== null ? Number(storedX) : 0,
      y: storedY !== null ? Number(storedY) : 0,
    };
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Pointer Events unify mouse + touch + pen. clientX/clientY are viewport
    // coordinates and are NOT affected by the app's CSS scale transform, so
    // drawing at (x, y) lands exactly under the real pointer/finger.
    const handleMove = (e: PointerEvent) => {
      setVisible(true);
      setPos({ x: e.clientX, y: e.clientY });
      localStorage.setItem('cursor-x', e.clientX.toString());
      localStorage.setItem('cursor-y', e.clientY.toString());
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    // pointermove covers mouse hover and touch-drag; pointerdown snaps the
    // crosshair to a tap (touch fires no move until the finger is down).
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleMove);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
      }}
    >
      <Cursor x={pos.x} y={pos.y} visible={visible} screenWidth={window.innerWidth} />
    </svg>
  );
};

export default CursorOverlay;
