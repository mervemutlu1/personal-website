'use client';

import { useRef, useCallback, useEffect } from 'react';

export type ResizeDirection = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

interface Position { x: number; y: number }
interface Size { width: number; height: number }

interface ResizeState {
  direction: ResizeDirection;
  startPointerX: number;
  startPointerY: number;
  startX: number;
  startY: number;
  startW: number;
  startH: number;
}

const CURSORS: Record<ResizeDirection, string> = {
  n: 'n-resize', ne: 'ne-resize', e: 'e-resize', se: 'se-resize',
  s: 's-resize', sw: 'sw-resize', w: 'w-resize', nw: 'nw-resize',
};

export function useResizable(
  position: Position,
  size: Size,
  onResize: (size: Size, position: Position) => void,
  minSize: Size = { width: 240, height: 120 },
) {
  const resizeState = useRef<ResizeState | null>(null);
  const positionRef = useRef(position);
  const sizeRef = useRef(size);

  useEffect(() => { positionRef.current = position; }, [position]);
  useEffect(() => { sizeRef.current = size; }, [size]);

  const getHandleProps = useCallback(
    (direction: ResizeDirection) => ({
      style: { cursor: CURSORS[direction] } as React.CSSProperties,
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        resizeState.current = {
          direction,
          startPointerX: e.clientX,
          startPointerY: e.clientY,
          startX: positionRef.current.x,
          startY: positionRef.current.y,
          startW: sizeRef.current.width,
          startH: sizeRef.current.height,
        };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      },
      onPointerMove: (e: React.PointerEvent) => {
        if (!resizeState.current) return;
        const { direction: dir, startPointerX, startPointerY, startX, startY, startW, startH } = resizeState.current;
        const dx = e.clientX - startPointerX;
        const dy = e.clientY - startPointerY;

        let x = startX, y = startY, w = startW, h = startH;

        const affectsE = dir === 'e' || dir === 'ne' || dir === 'se';
        const affectsW = dir === 'w' || dir === 'nw' || dir === 'sw';
        const affectsS = dir === 's' || dir === 'se' || dir === 'sw';
        const affectsN = dir === 'n' || dir === 'ne' || dir === 'nw';

        if (affectsE) w = Math.max(minSize.width, startW + dx);
        if (affectsW) {
          const newW = Math.max(minSize.width, startW - dx);
          x = startX + (startW - newW);
          w = newW;
        }
        if (affectsS) h = Math.max(minSize.height, startH + dy);
        if (affectsN) {
          const newH = Math.max(minSize.height, startH - dy);
          y = startY + (startH - newH);
          h = newH;
        }

        onResize({ width: w, height: h }, { x, y });
      },
      onPointerUp: () => {
        resizeState.current = null;
      },
    }),
    [onResize, minSize],
  );

  return { getHandleProps };
}
