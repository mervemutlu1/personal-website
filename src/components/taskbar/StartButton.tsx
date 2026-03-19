'use client';

import React, { useState } from 'react';
import { IconWindows } from '../ui/Icons';

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function StartButton({ isOpen, onClick }: StartButtonProps) {
  const [pressed, setPressed] = useState(false);
  const active = isOpen || pressed;

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick(); }}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 8px',
        height: '100%',
        background: '#C0C0C0',
        border: 'none',
        cursor: 'default',
        outline: 'none',
        fontFamily: 'var(--win95-font)',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
        borderTop: active ? '2px solid #808080' : '2px solid #FFFFFF',
        borderLeft: active ? '2px solid #808080' : '2px solid #FFFFFF',
        borderRight: active ? '2px solid #FFFFFF' : '2px solid #808080',
        borderBottom: active ? '2px solid #FFFFFF' : '2px solid #808080',
        boxShadow: active
          ? 'inset 1px 1px 0 #000000'
          : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
        minWidth: 60,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <span style={{ position: 'relative', top: active ? 1 : 0, left: active ? 1 : 0, display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconWindows size={14} />
        Start
      </span>
    </button>
  );
}
