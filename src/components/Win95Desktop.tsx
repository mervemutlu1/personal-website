'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { WindowManagerProvider } from '@/hooks/useWindowManager';
import { Taskbar } from './taskbar/Taskbar';

const Desktop = dynamic(() => import('./desktop/Desktop').then((m) => m.Desktop), { ssr: false });

export function Win95Desktop() {
  return (
    <WindowManagerProvider>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#008080',
          fontFamily: 'var(--win95-font)',
          fontSize: 11,
          overflow: 'hidden',
        }}
      >
        <Desktop />
        <Taskbar />
      </div>
    </WindowManagerProvider>
  );
}
