'use client';

import { useRef, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDraggable(
  position: Position,
  onMove: (pos: Position) => void,
  enabled = true,
) {
  const isDragging = useRef(false);
  const startRef = useRef({ pointerX: 0, pointerY: 0, winX: 0, winY: 0 });
  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || e.button !== 0) return;
      e.preventDefault();
      isDragging.current = true;
      startRef.current = {
        pointerX: e.clientX,
        pointerY: e.clientY,
        winX: positionRef.current.x,
        winY: positionRef.current.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [enabled],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startRef.current.pointerX;
      const dy = e.clientY - startRef.current.pointerY;
      onMove({
        x: Math.max(0, startRef.current.winX + dx),
        y: Math.max(0, startRef.current.winY + dy),
      });
    },
    [onMove],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
