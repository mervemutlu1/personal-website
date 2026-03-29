'use client';

import React from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';

interface StartMenuProps {
  onClose: () => void;
}

interface MenuItem {
  icon: string;
  label: string;
  action: () => void;
  separator?: boolean;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindowManager();

  const open = (id: string, title: string, app: 'explorer' | 'notepad' | 'dialog', appData: Record<string, unknown>, size: { width: number; height: number }) => {
    openWindow({ id, title, app, appData, iconType: app === 'explorer' ? 'folder' : 'file-txt', size });
    onClose();
  };

  const menuItems: MenuItem[] = [
    {
      icon: '📁',
      label: 'My Notes',
      action: () => open('explorer:root', 'My Notes', 'explorer', { folderId: 'root' }, { width: 420, height: 320 }),
    },
    {
      icon: '📁',
      label: 'Craft',
      action: () => open('explorer:craft', 'Craft', 'explorer', { folderId: 'craft' }, { width: 420, height: 300 }),
    },
    {
      icon: '📁',
      label: 'Growth',
      action: () => open('explorer:growth', 'Growth', 'explorer', { folderId: 'growth' }, { width: 420, height: 300 }),
    },
    {
      icon: '📄',
      label: 'Recently',
      action: () => open('notepad:recently', 'Notepad — Recently.txt', 'notepad', { fileId: 'recently' }, { width: 480, height: 360 }),
    },
    {
      icon: '📄',
      label: 'About Me',
      action: () => open('notepad:about-me', 'Notepad — About Me.txt', 'notepad', { fileId: 'about-me' }, { width: 480, height: 380 }),
      separator: true,
    },
    {
      icon: '🔌',
      label: 'Shut Down...',
      action: () => open('dialog:shutdown', 'Shut Down Windows', 'dialog', { variant: 'shutdown' }, { width: 300, height: 210 }),
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100%',
        left: 0,
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        borderLeft: '2px solid #FFFFFF',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        boxShadow: '2px 2px 0 #000000',
        display: 'flex',
        zIndex: 99999,
        minWidth: 200,
        animation: 'win95-open 80ms ease-out forwards',
      }}
    >
      {/* Vertical "Windows 95" text panel */}
      <div
        style={{
          width: 24,
          background: 'linear-gradient(180deg, #808080, #000080)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '6px 0',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--win95-font)',
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF',
            letterSpacing: 1,
            opacity: 0.9,
            whiteSpace: 'nowrap',
          }}
        >
          Windows 95
        </span>
      </div>

      {/* Menu items */}
      <div style={{ flex: 1 }}>
        {menuItems.map((item, i) => (
          <React.Fragment key={i}>
            {item.separator && (
              <div
                style={{
                  height: 1,
                  background: '#808080',
                  margin: '3px 6px',
                  boxShadow: '0 1px 0 #FFFFFF',
                }}
              />
            )}
            <button
              onClick={item.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '4px 12px 4px 8px',
                background: 'transparent',
                border: 'none',
                fontFamily: 'var(--win95-font)',
                fontSize: 11,
                color: '#000000',
                cursor: 'default',
                outline: 'none',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#000080';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#000000';
              }}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
