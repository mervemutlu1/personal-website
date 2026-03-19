'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Window } from '../window/Window';
import { FolderWindow } from '../apps/FolderWindow';
import { NotepadWindow } from '../apps/NotepadWindow';
import { DialogBox } from '../apps/DialogBox';
import { Taskbar } from '../taskbar/Taskbar';
import { useWindowManager } from '@/hooks/useWindowManager';

interface IconDef {
  id: string;
  label: string;
  iconType: string;
  defaultPosition: { x: number; y: number };
  onOpen: () => void;
}

interface ContextMenuState {
  x: number;
  y: number;
}

function WindowContent({ app, appData }: { app: string; appData: Record<string, unknown> }) {
  if (app === 'explorer') {
    return <FolderWindow folderId={appData.folderId as string} />;
  }
  if (app === 'notepad') {
    return <NotepadWindow fileId={appData.fileId as string} />;
  }
  if (app === 'dialog') {
    return null; // Handled differently
  }
  return null;
}

export function Desktop() {
  const { windows, openWindow, closeWindow, getFocusedId, desktopRef } = useWindowManager();
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const contextRef = useRef<HTMLDivElement>(null);

  // Load icon positions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('win95-icon-positions');
      if (saved) setIconPositions(JSON.parse(saved));
    } catch {}
  }, []);

  // Check for mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 800);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Show mobile dialog
  useEffect(() => {
    if (isMobile) {
      openWindow({
        id: 'dialog:mobile',
        title: 'Display Settings',
        app: 'dialog',
        appData: { variant: 'mobile' },
        iconType: 'computer',
        position: { x: 20, y: 60 },
        size: { width: 320, height: 160 },
      });
    }
  }, [isMobile]); // eslint-disable-line

  const saveIconPosition = (id: string, pos: { x: number; y: number }) => {
    const updated = { ...iconPositions, [id]: pos };
    setIconPositions(updated);
    try { localStorage.setItem('win95-icon-positions', JSON.stringify(updated)); } catch {}
  };

  const getIconPos = (id: string, def: { x: number; y: number }) =>
    iconPositions[id] ?? def;

  const openExplorer = (folderId: string, title: string, size = { width: 420, height: 320 }) =>
    openWindow({
      id: `explorer:${folderId}`,
      title,
      app: 'explorer',
      appData: { folderId },
      iconType: 'folder',
      size,
    });

  const openNotepad = (fileId: string, title: string) =>
    openWindow({
      id: `notepad:${fileId}`,
      title: `Notepad — ${title}`,
      app: 'notepad',
      appData: { fileId },
      iconType: 'file-txt',
      size: { width: 520, height: 380 },
    });

  const icons: IconDef[] = [
    {
      id: 'icon:computer',
      label: 'My Computer',
      iconType: 'computer',
      defaultPosition: { x: 18, y: 18 },
      onOpen: () =>
        openWindow({
          id: 'dialog:computer',
          title: 'My Computer',
          app: 'dialog',
          appData: { variant: 'info', message: 'This is your computer. It is running.' },
          iconType: 'computer',
          position: { x: 120, y: 80 },
          size: { width: 280, height: 130 },
        }),
    },
    {
      id: 'icon:bin',
      label: 'Recycle Bin',
      iconType: 'bin',
      defaultPosition: { x: 18, y: 112 },
      onOpen: () =>
        openWindow({
          id: 'dialog:bin',
          title: 'Recycle Bin',
          app: 'dialog',
          appData: { variant: 'info', message: 'The Recycle Bin is empty.' },
          iconType: 'bin',
          position: { x: 140, y: 100 },
          size: { width: 260, height: 120 },
        }),
    },
    {
      id: 'icon:about',
      label: 'About.txt',
      iconType: 'file-txt',
      defaultPosition: { x: 18, y: 210 },
      onOpen: () => openNotepad('about', 'About.txt'),
    },
    {
      id: 'icon:notes',
      label: 'My Notes',
      iconType: 'folder',
      defaultPosition: { x: 18, y: 310 },
      onOpen: () => openExplorer('root', 'My Notes'),
    },
  ];

  const focusedId = getFocusedId();

  // Close context menu on click outside
  useEffect(() => {
    if (!contextMenu) return;
    const handle = (e: MouseEvent) => {
      if (contextRef.current && !contextRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [contextMenu]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        bottom: 28,
        background: '#008080',
        overflow: 'hidden',
      }}
      ref={desktopRef}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
      onMouseDown={() => setContextMenu(null)}
    >
      {/* Desktop icons */}
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          iconType={icon.iconType}
          position={getIconPos(icon.id, icon.defaultPosition)}
          onOpen={icon.onOpen}
          onPositionChange={saveIconPosition}
        />
      ))}

      {/* Windows */}
      {windows.map((win) => {
        const isFocused = win.id === focusedId && !win.isMinimized;

        if (win.app === 'dialog') {
          const variant = win.appData.variant as 'shutdown' | 'info' | 'mobile';
          const message = win.appData.message as string | undefined;
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              iconType={win.iconType}
              position={win.position}
              size={win.size}
              zIndex={win.zIndex}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              isFocused={isFocused}
            >
              <DialogBox
                variant={variant}
                message={message}
                onClose={() => closeWindow(win.id)}
              />
            </Window>
          );
        }

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            iconType={win.iconType}
            position={win.position}
            size={win.size}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={isFocused}
          >
            <WindowContent app={win.app} appData={win.appData} />
          </Window>
        );
      })}

      {/* Right-click context menu */}
      {contextMenu && (
        <div
          ref={contextRef}
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            background: '#C0C0C0',
            borderTop: '2px solid #FFFFFF',
            borderLeft: '2px solid #FFFFFF',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
            boxShadow: '2px 2px 0 #000000',
            zIndex: 99998,
            minWidth: 160,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {[
            { label: 'Arrange Icons', sub: true },
            { label: 'Line up Icons', sub: false },
            { label: '-' },
            { label: 'Paste', disabled: true },
            { label: 'Paste Shortcut', disabled: true },
            { label: '-' },
            { label: 'New', sub: true },
            { label: '-' },
            { label: 'Properties', sub: false },
          ].map((item, i) => {
            if (item.label === '-') {
              return (
                <div
                  key={i}
                  style={{ height: 1, background: '#808080', margin: '3px 4px', boxShadow: '0 1px 0 #FFFFFF' }}
                />
              );
            }
            return (
              <button
                key={i}
                onClick={() => setContextMenu(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '2px 20px 2px 20px',
                  background: 'transparent',
                  border: 'none',
                  fontFamily: 'var(--win95-font)',
                  fontSize: 11,
                  color: item.disabled ? '#808080' : '#000000',
                  cursor: 'default',
                  outline: 'none',
                  textAlign: 'left',
                }}
                onMouseEnter={e => {
                  if (!item.disabled) {
                    e.currentTarget.style.background = '#000080';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = item.disabled ? '#808080' : '#000000';
                }}
              >
                {item.label}
                {item.sub && <span style={{ fontSize: 9 }}>▶</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
