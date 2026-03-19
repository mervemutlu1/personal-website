'use client';

import React from 'react';
import { MenuBar } from '../ui/MenuBar';
import { findEntry } from '@/lib/content';

interface NotepadWindowProps {
  fileId: string;
}

export function NotepadWindow({ fileId }: NotepadWindowProps) {
  const entry = findEntry(fileId);
  const content = entry?.content ?? '(Empty file)';

  const menuItems = [
    { label: 'File', items: ['New', 'Open...', 'Save', '-', 'Page Setup...', 'Print', '-', 'Exit'] },
    { label: 'Edit', items: ['Undo', '-', 'Cut', 'Copy', 'Paste', 'Delete', '-', 'Select All', '-', 'Time/Date', '-', 'Word Wrap'] },
    { label: 'Search', items: ['Find...', 'Find Next', 'Replace...'] },
    { label: 'Help', items: ['Help Topics', '-', 'About Notepad'] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#C0C0C0' }}>
      <MenuBar items={menuItems} />
      <div
        className="win95-selectable"
        style={{
          flex: 1,
          background: '#FFFFFF',
          fontFamily: "'W95FA', 'Courier New', Courier, monospace",
          fontSize: 11,
          lineHeight: 1.5,
          color: '#000000',
          padding: '4px 8px',
          overflowY: 'auto',
          overflowX: 'auto',
          whiteSpace: 'pre',
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #FFFFFF',
          borderBottom: '2px solid #FFFFFF',
          boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
          margin: 2,
          outline: 'none',
        }}
      >
        {content}
      </div>
    </div>
  );
}
