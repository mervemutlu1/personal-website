'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Window } from '../window/Window';
import { FolderWindow } from '../apps/FolderWindow';
import { NotepadWindow } from '../apps/NotepadWindow';
import { DialogBox } from '../apps/DialogBox';
import { RecycleBinWindow } from '../apps/RecycleBinWindow';
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
  if (app === 'recyclebin') {
    return <RecycleBinWindow />;
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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
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
          id: 'recyclebin',
          title: 'Recycle Bin',
          app: 'recyclebin',
          appData: {},
          iconType: 'bin',
          position: { x: Math.max(0, Math.round((window.innerWidth - 400) / 2)), y: Math.max(0, Math.round((window.innerHeight - 300) / 2) - 28) },
          size: { width: 400, height: 300 },
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
      onOpen: () => openWindow({
        id: 'explorer:root',
        title: 'My Notes',
        app: 'explorer',
        appData: { folderId: 'root' },
        iconType: 'folder',
        position: { x: Math.max(0, Math.round((window.innerWidth - 720) / 2)), y: Math.max(0, Math.round((window.innerHeight - 420) / 2) - 28) },
        size: { width: 720, height: 420 },
      }),
    },
  ];

  // Open My Notes on first load
  useEffect(() => {
    if (isMobile !== false) return;
    openWindow({
      id: 'explorer:root',
      title: 'My Notes',
      app: 'explorer',
      appData: { folderId: 'root' },
      iconType: 'folder',
      position: { x: Math.max(0, Math.round((window.innerWidth - 720) / 2)), y: Math.max(0, Math.round((window.innerHeight - 420) / 2) - 28) },
      size: { width: 720, height: 420 },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#008080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
            onClick={() => {}}
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
    );
  }

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
