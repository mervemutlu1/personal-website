'use client';

import React, { useState } from 'react';
import { getIconComponent } from '../ui/Icons';
import { useWindowManager } from '@/hooks/useWindowManager';

export function RecycleBinWindow() {
  const { openWindow } = useWindowManager();
  const [confirmed, setConfirmed] = useState(false);

  const openConfirmDialog = () => {
    openWindow({
      id: 'dialog:empty-bin-confirm',
      title: 'Confirm',
      app: 'dialog',
      appData: { variant: 'info', message: 'There is nothing to delete.\nYou are already free.' },
      iconType: 'bin',
      position: { x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 70 },
      size: { width: 280, height: 140 },
    });
    setConfirmed(true);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#C0C0C0',
    }}>
      {/* Content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        background: '#FFFFFF',
        margin: 2,
        borderTop: '2px solid #808080',
        borderLeft: '2px solid #808080',
        borderRight: '2px solid #FFFFFF',
        borderBottom: '2px solid #FFFFFF',
        boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
      }}>
        {/* Icon */}
        <div style={{ marginBottom: 16 }}>
          {getIconComponent('bin', 64)}
        </div>

        {/* Main message */}
        <div style={{
          fontFamily: 'var(--win95-font)',
          fontSize: 13,
          color: '#333333',
          textAlign: 'center',
          lineHeight: 2,
        }}>
          0 items.
          <br />
          <br />
          You deleted nothing.
          <br />
          You regret nothing.
          <br />
          Impressive.
        </div>

        {/* Sub message */}
        <div style={{
          fontFamily: 'var(--win95-font)',
          fontSize: 10,
          color: '#888888',
          textAlign: 'center',
          marginTop: 12,
          lineHeight: 1.8,
        }}>
          Last emptied: never.
          <br />
          Nothing is ever truly gone.
        </div>
      </div>

      {/* Bottom bar with button */}
      <div style={{
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: '0 8px',
      }}>
        <button
          onClick={openConfirmDialog}
          style={{
            fontFamily: 'var(--win95-font)',
            fontSize: 11,
            padding: '3px 16px',
            background: '#C0C0C0',
            color: '#000000',
            cursor: 'default',
            borderTop: '2px solid #FFFFFF',
            borderLeft: '2px solid #FFFFFF',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
            boxShadow: 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
            outline: 'none',
            opacity: confirmed ? 0.6 : 1,
          }}
        >
          Empty Recycle Bin
        </button>
      </div>
    </div>
  );
}
