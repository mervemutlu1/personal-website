'use client';

import React from 'react';
import { WindowControls } from './WindowControls';
import { getIconComponent } from '../ui/Icons';
import { useDraggable } from '@/hooks/useDraggable';

interface TitleBarProps {
  title: string;
  iconType?: string;
  isFocused: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  onMove: (pos: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export function TitleBar({
  title,
  iconType,
  isFocused,
  isMaximized,
  position,
  onMove,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  const { onPointerDown, onPointerMove, onPointerUp } = useDraggable(
    position,
    onMove,
    !isMaximized,
  );

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onMaximize}
      style={{
        height: 18,
        background: isFocused
          ? 'linear-gradient(90deg, #000080, #1084d0)'
          : '#808080',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
        gap: 3,
        cursor: isMaximized ? 'default' : 'move',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Window icon */}
      {iconType && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {getIconComponent(iconType, 14)}
        </span>
      )}

      {/* Title */}
      <span
        style={{
          flex: 1,
          color: '#FFFFFF',
          fontSize: 11,
          fontFamily: 'var(--win95-font)',
          fontWeight: 'bold',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          minWidth: 0,
        }}
      >
        {title}
      </span>

      {/* Controls */}
      <WindowControls
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        isMaximized={isMaximized}
      />
    </div>
  );
}
