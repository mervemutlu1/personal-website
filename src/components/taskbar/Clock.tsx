'use client';

import React, { useState, useEffect } from 'react';

function formatTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      title={new Date().toLocaleDateString()}
      style={{
        padding: '2px 6px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'var(--win95-font)',
        fontSize: 11,
        color: '#000000',
        borderTop: '2px solid #808080',
        borderLeft: '2px solid #808080',
        borderRight: '2px solid #FFFFFF',
        borderBottom: '2px solid #FFFFFF',
        boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
        whiteSpace: 'nowrap',
        minWidth: 60,
        justifyContent: 'center',
      }}
    >
      {time}
    </div>
  );
}
