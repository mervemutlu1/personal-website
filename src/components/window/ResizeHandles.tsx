'use client';

import React from 'react';
import { useResizable, ResizeDirection } from '@/hooks/useResizable';

interface ResizeHandlesProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  onResize: (size: { width: number; height: number }, position: { x: number; y: number }) => void;
}

const HANDLE_SIZE = 5;

const handleDefs: Array<{ dir: ResizeDirection; style: React.CSSProperties }> = [
  { dir: 'nw', style: { top: 0, left: 0, width: HANDLE_SIZE * 2, height: HANDLE_SIZE * 2 } },
  { dir: 'n',  style: { top: 0, left: HANDLE_SIZE * 2, right: HANDLE_SIZE * 2, height: HANDLE_SIZE } },
  { dir: 'ne', style: { top: 0, right: 0, width: HANDLE_SIZE * 2, height: HANDLE_SIZE * 2 } },
  { dir: 'e',  style: { top: HANDLE_SIZE * 2, right: 0, bottom: HANDLE_SIZE * 2, width: HANDLE_SIZE } },
  { dir: 'se', style: { bottom: 0, right: 0, width: HANDLE_SIZE * 2, height: HANDLE_SIZE * 2 } },
  { dir: 's',  style: { bottom: 0, left: HANDLE_SIZE * 2, right: HANDLE_SIZE * 2, height: HANDLE_SIZE } },
  { dir: 'sw', style: { bottom: 0, left: 0, width: HANDLE_SIZE * 2, height: HANDLE_SIZE * 2 } },
  { dir: 'w',  style: { top: HANDLE_SIZE * 2, left: 0, bottom: HANDLE_SIZE * 2, width: HANDLE_SIZE } },
];

export function ResizeHandles({ position, size, onResize }: ResizeHandlesProps) {
  const { getHandleProps } = useResizable(position, size, onResize);

  return (
    <>
      {handleDefs.map(({ dir, style }) => {
        const props = getHandleProps(dir);
        return (
          <div
            key={dir}
            {...props}
            style={{
              position: 'absolute',
              zIndex: 10,
              ...style,
              ...props.style,
            }}
          />
        );
      })}
    </>
  );
}
