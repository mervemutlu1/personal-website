'use client';

import React from 'react';
import { WindowManagerProvider } from '@/hooks/useWindowManager';
import { Desktop } from './desktop/Desktop';
import { Taskbar } from './taskbar/Taskbar';

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
