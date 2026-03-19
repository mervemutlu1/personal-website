'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MenuBarItem {
  label: string;
  items?: string[];
}

interface MenuBarProps {
  items: MenuBarItem[];
}

export function MenuBar({ items }: MenuBarProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const handleClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenIdx(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openIdx]);

  return (
    <div
      ref={barRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 18,
        background: '#C0C0C0',
        borderBottom: '1px solid #808080',
        padding: '0 2px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ position: 'relative' }}>
          <button
            onMouseDown={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              padding: '1px 6px',
              background: openIdx === i ? '#000080' : 'transparent',
              color: openIdx === i ? '#FFFFFF' : '#000000',
              border: 'none',
              fontFamily: 'var(--win95-font)',
              fontSize: 11,
              cursor: 'default',
              outline: 'none',
            }}
          >
            {item.label}
          </button>
          {openIdx === i && item.items && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#C0C0C0',
                minWidth: 150,
                zIndex: 9000,
                borderTop: '2px solid #FFFFFF',
                borderLeft: '2px solid #FFFFFF',
                borderRight: '2px solid #808080',
                borderBottom: '2px solid #808080',
                boxShadow: '2px 2px 0 #000000',
              }}
            >
              {item.items.map((menuItem, j) => (
                menuItem === '-' ? (
                  <div
                    key={j}
                    style={{
                      height: 1,
                      background: '#808080',
                      margin: '3px 4px',
                      boxShadow: '0 1px 0 #FFFFFF',
                    }}
                  />
                ) : (
                  <button
                    key={j}
                    onClick={() => setOpenIdx(null)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '2px 20px 2px 20px',
                      textAlign: 'left',
                      background: 'transparent',
                      color: '#000000',
                      border: 'none',
                      fontFamily: 'var(--win95-font)',
                      fontSize: 11,
                      cursor: 'default',
                      outline: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#000080', e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = '#000000')}
                  >
                    {menuItem}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
