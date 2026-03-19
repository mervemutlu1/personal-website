'use client';

import React, { useState, useEffect, useRef } from 'react';
import { StartButton } from './StartButton';
import { StartMenu } from './StartMenu';
import { Clock } from './Clock';
import { useWindowManager } from '@/hooks/useWindowManager';

export function Taskbar() {
  const { windows, focusWindow, minimizeWindow, restoreWindow, getFocusedId } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);

  const focusedId = getFocusedId();

  // Close start menu when clicking outside
  useEffect(() => {
    if (!startOpen) return;
    const handle = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [startOpen]);

  const handleWindowBtn = (winId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(winId);
      return;
    }
    if (winId === focusedId) {
      minimizeWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 28,
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        gap: 4,
        zIndex: 99999,
        flexShrink: 0,
      }}
    >
      {/* Start button + menu */}
      <div ref={startRef} style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
        <StartButton isOpen={startOpen} onClick={() => setStartOpen(v => !v)} />
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </div>

      {/* Separator */}
      <div
        style={{
          width: 2,
          height: '80%',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #FFFFFF',
          flexShrink: 0,
        }}
      />

      {/* Window buttons */}
      <div style={{ flex: 1, display: 'flex', gap: 2, overflow: 'hidden' }}>
        {windows.map((win) => {
          const isActive = !win.isMinimized && win.id === focusedId;
          return (
            <TaskbarWindowBtn
              key={win.id}
              title={win.title}
              iconType={win.iconType}
              isActive={isActive}
              onClick={() => handleWindowBtn(win.id, win.isMinimized)}
            />
          );
        })}
      </div>

      {/* Clock */}
      <div style={{ height: '80%', display: 'flex', alignItems: 'center' }}>
        <Clock />
      </div>
    </div>
  );
}

interface TaskbarWindowBtnProps {
  title: string;
  iconType: string;
  isActive: boolean;
  onClick: () => void;
}

function TaskbarWindowBtn({ title, isActive, onClick }: TaskbarWindowBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 8px',
        height: 20,
        maxWidth: 160,
        minWidth: 80,
        background: '#C0C0C0',
        cursor: 'default',
        fontFamily: 'var(--win95-font)',
        fontSize: 11,
        color: '#000000',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        border: 'none',
        outline: 'none',
        borderTop: isActive ? '2px solid #808080' : '2px solid #FFFFFF',
        borderLeft: isActive ? '2px solid #808080' : '2px solid #FFFFFF',
        borderRight: isActive ? '2px solid #FFFFFF' : '2px solid #808080',
        borderBottom: isActive ? '2px solid #FFFFFF' : '2px solid #808080',
        boxShadow: isActive
          ? 'inset 1px 1px 0 #000000'
          : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
        {title}
      </span>
    </button>
  );
}
