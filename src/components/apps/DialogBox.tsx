'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface DialogBoxProps {
  variant: 'shutdown' | 'info' | 'mobile';
  message?: string;
  onClose: () => void;
}

export function DialogBox({ variant, message, onClose }: DialogBoxProps) {
  const [selected, setSelected] = useState<'shutdown' | 'restart' | 'msdos'>('shutdown');

  if (variant === 'shutdown') {
    return (
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%', background: '#C0C0C0' }}>
        <p style={{ fontFamily: 'var(--win95-font)', fontSize: 11, marginBottom: 4 }}>
          Are you sure you want to:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(['shutdown', 'restart', 'msdos'] as const).map((opt) => (
            <label
              key={opt}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--win95-font)',
                fontSize: 11,
                cursor: 'default',
              }}
            >
              <input
                type="radio"
                name="shutdown-opt"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                style={{ cursor: 'default' }}
              />
              {opt === 'shutdown' && 'Shut down the computer?'}
              {opt === 'restart' && 'Restart the computer?'}
              {opt === 'msdos' && 'Restart in MS-DOS mode?'}
            </label>
          ))}
        </div>
        {selected === 'shutdown' && (
          <p
            style={{
              fontFamily: 'var(--win95-font)',
              fontSize: 11,
              color: '#000080',
              marginTop: 4,
              fontStyle: 'italic',
            }}
          >
            Thanks for visiting. Come back soon.
          </p>
        )}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
          <Button onClick={onClose} variant="default">Yes</Button>
          <Button onClick={onClose}>No</Button>
          <Button onClick={onClose}>Help</Button>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%', background: '#C0C0C0', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div>
            <p style={{ fontFamily: 'var(--win95-font)', fontSize: 11, marginBottom: 8 }}>
              This site is best viewed on a desktop computer.
            </p>
            <p style={{ fontFamily: 'var(--win95-font)', fontSize: 11, color: '#808080' }}>
              Recommended resolution: 800×600 or higher.
            </p>
          </div>
        </div>
        <Button onClick={onClose} variant="default">OK</Button>
      </div>
    );
  }

  // info variant
  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%', background: '#C0C0C0' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 20 }}>ℹ️</span>
        <p style={{ fontFamily: 'var(--win95-font)', fontSize: 11 }}>{message}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button onClick={onClose} variant="default">OK</Button>
      </div>
    </div>
  );
}
