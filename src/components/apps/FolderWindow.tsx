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
      size: { width: 720, height: 420 },
      position: { x: 80, y: 40 },
    });
  } else {
    const isPlainText = entry.id === 'recently' || entry.id === 'about-me';
    openWindow({
      id: `notepad:${entry.id}`,
      title: `Notepad — ${entry.name}`,
      app: 'notepad',
      appData: { fileId: entry.id },
      iconType: 'file-txt',
      size: isPlainText ? { width: 720, height: 500 } : { width: 520, height: 380 },
    });
  }
}

interface PanelConfig {
  title: string;
  description: string;
  meta: string[];
  background: string;
  dividerColor: string;
}

const PANEL_CONFIGS: Record<string, PanelConfig> = {
  root: {
    title: 'My Notes',
    description: "Notes, experiments & things I'm figuring out.\nOpen a folder to see what's inside.",
    meta: ['Created: 2026', 'By: Merve'],
    background: '#b8b8b8',
    dividerColor: '#808080',
  },
  craft: {
    title: 'Craft',
    description: "AI, design and vibe coding experiments.\n\nThings I built to learn. Most of them\nstarted as a question I couldn't answer.",
    meta: ['Format: Build logs', 'Tools: Claude, Figma, Vercel'],
    background: '#ffffff',
    dividerColor: '#c0c0c0',
  },
  growth: {
    title: 'Growth',
    description: "Writing on mindset, habits, and how\nto think better.\n\nPublished on Medium. Some of these\nhit thousands of readers.",
    meta: ['Platform: Medium', 'Status: Top Writer'],
    background: '#ffffff',
    dividerColor: '#c0c0c0',
  },
};

interface FolderPanelProps {
  config: PanelConfig;
}

function FolderPanel({ config }: FolderPanelProps) {
  return (
    <>
      <div
        style={{
          width: 160,
          flexShrink: 0,
          background: config.background,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: 10 }}>
          {getIconComponent('folder', 48)}
        </div>

        <span style={{
          fontFamily: 'var(--win95-font)',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000000',
        }}>
          {config.title}
        </span>

        <span style={{
          fontFamily: 'var(--win95-font)',
          fontSize: 14,
          color: '#444444',
          lineHeight: 1.6,
          marginTop: 8,
          whiteSpace: 'pre-wrap',
        }}>
          {config.description}
        </span>

        <div style={{
          width: '100%',
          height: 1,
          background: '#999999',
          margin: '12px 0',
          flexShrink: 0,
        }} />

        <span style={{
          fontFamily: 'var(--win95-font)',
          fontSize: 10,
          color: '#666666',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
        }}>
          {config.meta.join('\n')}
        </span>
      </div>

      <div style={{ width: 1, background: config.dividerColor, flexShrink: 0 }} />
    </>
  );
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
          display: 'flex',
          overflow: 'hidden',
          margin: 2,
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #FFFFFF',
          borderBottom: '2px solid #FFFFFF',
          boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
          background: '#FFFFFF',
        }}
      >
        {/* Left info panel */}
        {PANEL_CONFIGS[folderId] && (
          <FolderPanel config={PANEL_CONFIGS[folderId]} />
        )}

        {/* Icons area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 8,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: 24,
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
        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 12,
        background: selected ? '#000080' : 'transparent',
        cursor: 'default',
      }}
      onMouseDown={(e) => { e.stopPropagation(); onSelect(); }}
      onDoubleClick={onOpen}
    >
      <div style={{ filter: selected ? 'brightness(1.5)' : 'none' }}>
        {getIconComponent(entry.icon, 48)}
      </div>
      <span
        style={{
          marginTop: 6,
          fontFamily: 'var(--win95-font)',
          fontSize: 14,
          color: selected ? '#FFFFFF' : '#000000',
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2,
          maxWidth: 92,
          background: selected ? '#000080' : 'transparent',
          padding: '0 2px',
        }}
      >
        {entry.name}
      </span>
    </div>
  );
}
