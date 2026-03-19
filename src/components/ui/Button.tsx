'use client';

import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'normal' | 'default';
}

export function Button({ children, variant = 'normal', className = '', disabled, ...props }: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      {...props}
      disabled={disabled}
      className={className}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 75,
        height: 23,
        padding: '0 8px',
        background: '#C0C0C0',
        fontFamily: 'var(--win95-font)',
        fontSize: 11,
        color: disabled ? '#808080' : '#000000',
        cursor: disabled ? 'default' : 'default',
        outline: 'none',
        position: 'relative',
        ...(variant === 'default' ? {
          border: '2px solid #000000',
          boxShadow: pressed
            ? 'inset 1px 1px 0 #000000'
            : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #FFFFFF',
        } : {
          borderTop: pressed ? '2px solid #808080' : '2px solid #FFFFFF',
          borderLeft: pressed ? '2px solid #808080' : '2px solid #FFFFFF',
          borderRight: pressed ? '2px solid #FFFFFF' : '2px solid #808080',
          borderBottom: pressed ? '2px solid #FFFFFF' : '2px solid #808080',
          boxShadow: pressed
            ? 'inset 1px 1px 0 #000000'
            : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #DFDFDF',
        }),
        ...props.style,
      }}
    >
      {pressed ? (
        <span style={{ position: 'relative', top: 1, left: 1 }}>{children}</span>
      ) : children}
    </button>
  );
}
