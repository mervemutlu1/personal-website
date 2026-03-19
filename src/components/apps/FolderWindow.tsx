'use client';

import React, { useState } from 'react';
import { MenuBar } from '../ui/MenuBar';
import { getIconComponent } from '../ui/Icons';
import { findEntry, FileEntry } from '@/lib/content';
import { useWindowManager, OpenWindowOpts } from '@/hooks/useWindowManager';

interface FolderWindowProps {
  folderId: string;
}

function openFileWindow(
  entry: FileEntry,
  openWindow: (opts: OpenWindowOpts) => void,
) {
  if (entry.type === 'folder') {
    openWindow({
      id: `explorer:${entry.id}`,
      title: entry.name,
      app: 'explorer',
      appData: { folderId: entry.id },
      iconType: 'folder',
      size: { width: 420, height: 320 },
    });
  } else {
    openWindow({
      id: `notepad:${entry.id}`,
      title: `Notepad — ${entry.name}`,
      app: 'notepad',
      appData: { fileId: entry.id },
      iconType: 'file-txt',
      size: { width: 520, height: 380 },
    });
  }
}

export function FolderWindow({ folderId }: FolderWindowProps) {
  const { openWindow } = useWindowManager();
  const [selected, setSelected] = useState<string | null>(null);
  const folder = findEntry(folderId);
  const children = folder?.children ?? [];

  const menuItems = [
    { label: 'File', items: ['New Folder', 'New Text Document', '-', 'Properties', '-', 'Close'] },
    { label: 'Edit', items: ['Select All', '-', 'Invert Selection'] },
    { label: 'View', items: ['Large Icons', 'Small Icons', 'List', 'Details'] },
    { label: 'Help', items: ['Help Topics', '-', 'About My Notes'] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#C0C0C0' }}>
      {/* Menu bar */}
      <MenuBar items={menuItems} />

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 26,
          padding: '2px 4px',
          borderBottom: '1px solid #808080',
          flexShrink: 0,
        }}
      >
        {['◄', '►', '▲'].map((arrow, i) => (
          <button
            key={i}
            style={{
              width: 22,
              height: 20,
              background: '#C0C0C0',
              borderTop: '2px solid #FFFFFF',
              borderLeft: '2px solid #FFFFFF',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
              boxShadow: 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
              fontFamily: 'var(--win95-font)',
              fontSize: 9,
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {arrow}
          </button>
        ))}
        {/* Address bar */}
        <div
          style={{
            flex: 1,
            height: 20,
            background: '#FFFFFF',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid #FFFFFF',
            borderBottom: '2px solid #FFFFFF',
            boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            fontFamily: 'var(--win95-font)',
            fontSize: 11,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {folderId === 'root' ? 'C:\\My Notes' : `C:\\My Notes\\${folder?.name ?? ''}`}
        </div>
      </div>

      {/* File view area */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          background: '#FFFFFF',
          margin: 2,
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #FFFFFF',
          borderBottom: '2px solid #FFFFFF',
          boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
          padding: 8,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          gap: 4,
        }}
        onMouseDown={() => setSelected(null)}
      >
        {children.map((entry) => (
          <FolderIcon
            key={entry.id}
            entry={entry}
            selected={selected === entry.id}
            onSelect={() => setSelected(entry.id)}
            onOpen={() => openFileWindow(entry, openWindow)}
          />
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          height: 18,
          background: '#C0C0C0',
          borderTop: '2px solid #808080',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
          fontFamily: 'var(--win95-font)',
          fontSize: 11,
          flexShrink: 0,
        }}
      >
        {children.length} object{children.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

interface FolderIconProps {
  entry: FileEntry;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

function FolderIcon({ entry, selected, onSelect, onOpen }: FolderIconProps) {
  return (
    <div
      style={{
        width: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4px 4px',
        background: selected ? '#000080' : 'transparent',
        cursor: 'default',
      }}
      onMouseDown={(e) => { e.stopPropagation(); onSelect(); }}
      onDoubleClick={onOpen}
    >
      <div style={{ filter: selected ? 'brightness(1.5)' : 'none' }}>
        {getIconComponent(entry.icon, 32)}
      </div>
      <span
        style={{
          marginTop: 3,
          fontFamily: 'var(--win95-font)',
          fontSize: 11,
          color: selected ? '#FFFFFF' : '#000000',
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2,
          maxWidth: 76,
          textShadow: selected ? 'none' : 'none',
          background: selected ? '#000080' : 'transparent',
          padding: '0 2px',
        }}
      >
        {entry.name}
      </span>
    </div>
  );
}
