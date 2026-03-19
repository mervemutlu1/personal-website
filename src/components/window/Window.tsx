'use client';

import React from 'react';
import { TitleBar } from './TitleBar';
import { ResizeHandles } from './ResizeHandles';
import { useWindowManager } from '@/hooks/useWindowManager';

interface WindowProps {
  id: string;
  title: string;
  iconType?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  children: React.ReactNode;
}

export function Window({
  id,
  title,
  iconType,
  position,
  size,
  zIndex,
  isMinimized,
  isMaximized,
  isFocused,
  children,
}: WindowProps) {
  const { focusWindow, minimizeWindow, toggleMaximize, closeWindow, moveWindow, resizeWindow } = useWindowManager();
  if (isMinimized) return null;

  return (
    <div
      onPointerDown={() => !isFocused && focusWindow(id)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        // Win95 window frame
        border: '2px solid #000000',
        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #FFFFFF',
        background: '#C0C0C0',
        // Apply open animation on first render only
        animation: 'win95-open 80ms ease-out forwards',
      }}
    >
      <TitleBar
        title={title}
        iconType={iconType}
        isFocused={isFocused}
        isMaximized={isMaximized}
        position={position}
        onMove={(pos) => moveWindow(id, pos)}
        onMinimize={() => minimizeWindow(id)}
        onMaximize={() => toggleMaximize(id)}
        onClose={() => closeWindow(id)}
      />

      {/* Window content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* Resize handles — only when not maximized */}
      {!isMaximized && (
        <ResizeHandles
          position={position}
          size={size}
          onResize={(s, p) => resizeWindow(id, s, p)}
        />
      )}
    </div>
  );
}
