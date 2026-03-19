'use client';

import React, { useState } from 'react';

interface ControlBtnProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  title?: string;
}

function ControlBtn({ label, onClick, title }: ControlBtnProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      title={title}
      onMouseDown={(e) => { e.stopPropagation(); setPressed(true); }}
      onMouseUp={(e) => { setPressed(false); onClick(e); }}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: 16,
        height: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#C0C0C0',
        border: 'none',
        cursor: 'default',
        outline: 'none',
        fontFamily: 'var(--win95-font)',
        fontSize: 9,
        lineHeight: 1,
        color: '#000000',
        borderTop: pressed ? '2px solid #808080' : '2px solid #FFFFFF',
        borderLeft: pressed ? '2px solid #808080' : '2px solid #FFFFFF',
        borderRight: pressed ? '2px solid #FFFFFF' : '2px solid #808080',
        borderBottom: pressed ? '2px solid #FFFFFF' : '2px solid #808080',
        boxShadow: pressed
          ? 'inset 1px 1px 0 #000000'
          : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <span style={{ position: 'relative', top: pressed ? 1 : 0, left: pressed ? 1 : 0 }}>
        {label}
      </span>
    </button>
  );
}

interface WindowControlsProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

export function WindowControls({ onMinimize, onMaximize, onClose, isMaximized }: WindowControlsProps) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0 }}>
      <ControlBtn label="—" onClick={onMinimize} title="Minimize" />
      <ControlBtn label={isMaximized ? '❐' : '□'} onClick={onMaximize} title={isMaximized ? 'Restore' : 'Maximize'} />
      <ControlBtn label="✕" onClick={onClose} title="Close" />
    </div>
  );
}
