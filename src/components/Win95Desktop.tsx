'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { WindowManagerProvider } from '@/hooks/useWindowManager';
import { Taskbar } from './taskbar/Taskbar';

const Desktop = dynamic(() => import('./desktop/Desktop').then((m) => m.Desktop), { ssr: false });

export function Win95Desktop() {
  return (
    <>
      {/* Mobile fallback — shown via CSS when viewport < 800px */}
      <div
        className="mobile-fallback"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#008080',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          background: '#C0C0C0',
          borderTop: '2px solid #FFFFFF',
          borderLeft: '2px solid #FFFFFF',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
          boxShadow: '2px 2px 0 #000000, inset 1px 1px 0 #DFDFDF',
          width: 280,
          padding: '16px 20px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>⚠</span>

          <div style={{
            fontFamily: 'var(--win95-font)',
            fontSize: 13,
            fontWeight: 'bold',
            color: '#000000',
            letterSpacing: '0.01em',
          }}>
            Resolution Too Low
          </div>

          <div style={{
            width: '100%',
            height: 1,
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #FFFFFF',
          }} />

          <div style={{
            fontFamily: 'var(--win95-font)',
            fontSize: 11,
            color: '#000000',
            lineHeight: 1.8,
            textAlign: 'center',
          }}>
            This site is designed for desktop.<br />
            Please open it on a computer.<br />
            <br />
            (Some things aren&apos;t meant to fit<br />
            in your pocket.)
          </div>

          <button
            style={{
              marginTop: 4,
              fontFamily: 'var(--win95-font)',
              fontSize: 11,
              background: '#C0C0C0',
              color: '#000000',
              border: 'none',
              borderTop: '2px solid #FFFFFF',
              borderLeft: '2px solid #FFFFFF',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
              boxShadow: 'inset 1px 1px 0 #DFDFDF',
              padding: '3px 24px',
              cursor: 'default',
              minWidth: 75,
            }}
            onMouseDown={e => {
              e.currentTarget.style.borderTop = '2px solid #808080';
              e.currentTarget.style.borderLeft = '2px solid #808080';
              e.currentTarget.style.borderRight = '2px solid #FFFFFF';
              e.currentTarget.style.borderBottom = '2px solid #FFFFFF';
            }}
            onMouseUp={e => {
              e.currentTarget.style.borderTop = '2px solid #FFFFFF';
              e.currentTarget.style.borderLeft = '2px solid #FFFFFF';
              e.currentTarget.style.borderRight = '2px solid #808080';
              e.currentTarget.style.borderBottom = '2px solid #808080';
            }}
          >
            OK
          </button>
        </div>
      </div>

      {/* Desktop — hidden via CSS when viewport < 800px */}
      <WindowManagerProvider>
        <div
          className="desktop-root"
          style={{
            position: 'fixed',
            inset: 0,
            minWidth: 800,
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
    </>
  );
}
