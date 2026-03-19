'use client';

import React, { useState, useRef } from 'react';
import { getIconComponent } from '../ui/Icons';

interface DesktopIconProps {
  id: string;
  label: string;
  iconType: string;
  position: { x: number; y: number };
  onOpen: () => void;
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
}

export function DesktopIcon({ id, label, iconType, position, onOpen, onPositionChange }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, iconX: 0, iconY: 0 });
  const movedRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setSelected(true);
    movedRef.current = false;
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      iconX: position.x,
      iconY: position.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      movedRef.current = true;
      onPositionChange(id, {
        x: Math.max(0, dragRef.current.iconX + dx),
        y: Math.max(0, dragRef.current.iconY + dy),
      });
    }
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  const handleDoubleClick = () => {
    if (!movedRef.current) {
      onOpen();
    }
  };

  const handleDesktopClick = () => {
    // Deselect when desktop is clicked - handled in parent
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        cursor: 'default',
        userSelect: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      onBlur={() => setSelected(false)}
    >
      {/* Icon image */}
      <div
        style={{
          position: 'relative',
          width: 32,
          height: 32,
        }}
      >
        <div
          style={{
            opacity: selected ? 0.5 : 1,
          }}
        >
          {getIconComponent(iconType, 32)}
        </div>
        {selected && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000080',
              mixBlendMode: 'multiply',
              opacity: 0.5,
            }}
          />
        )}
      </div>

      {/* Label */}
      <span
        style={{
          marginTop: 3,
          fontFamily: 'var(--win95-font)',
          fontSize: 11,
          color: selected ? '#FFFFFF' : '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.2,
          background: selected ? '#000080' : 'transparent',
          padding: '1px 3px',
          maxWidth: 70,
          wordBreak: 'break-word',
          textShadow: selected ? 'none' : '1px 1px 0 #000000',
        }}
      >
        {label}
      </span>
    </div>
  );
}
