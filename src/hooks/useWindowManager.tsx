'use client';

import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';

export interface WinDef {
  id: string;
  title: string;
  app: 'explorer' | 'notepad' | 'dialog' | 'recyclebin';
  appData: Record<string, unknown>;
  isMinimized: boolean;
  isMaximized: boolean;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  iconType: string;
}

interface State {
  windows: WinDef[];
  topZ: number;
}

type Action =
  | { type: 'OPEN'; window: Omit<WinDef, 'zIndex'> }
  | { type: 'CLOSE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'MAXIMIZE'; id: string; desktopW: number; desktopH: number }
  | { type: 'RESTORE'; id: string }
  | { type: 'MOVE'; id: string; position: { x: number; y: number } }
  | { type: 'RESIZE'; id: string; size: { width: number; height: number }; position: { x: number; y: number } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find(w => w.id === action.window.id);
      if (existing) {
        const newTopZ = state.topZ + 1;
        return {
          ...state,
          topZ: newTopZ,
          windows: state.windows.map(w =>
            w.id === action.window.id
              ? { ...w, isMinimized: false, zIndex: newTopZ }
              : w,
          ),
        };
      }
      const newTopZ = state.topZ + 1;
      return {
        ...state,
        topZ: newTopZ,
        windows: [...state.windows, { ...action.window, zIndex: newTopZ }],
      };
    }

    case 'CLOSE':
      return { ...state, windows: state.windows.filter(w => w.id !== action.id) };

    case 'FOCUS': {
      const newTopZ = state.topZ + 1;
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, zIndex: newTopZ } : w,
        ),
      };
    }

    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMinimized: true } : w,
        ),
      };

    case 'MAXIMIZE': {
      const win = state.windows.find(w => w.id === action.id);
      if (!win) return state;
      const newTopZ = state.topZ + 1;
      if (win.isMaximized) {
        return {
          ...state,
          topZ: newTopZ,
          windows: state.windows.map(w =>
            w.id === action.id
              ? {
                  ...w,
                  isMaximized: false,
                  zIndex: newTopZ,
                  position: w.prevPosition ?? w.position,
                  size: w.prevSize ?? w.size,
                  prevPosition: undefined,
                  prevSize: undefined,
                }
              : w,
          ),
        };
      }
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map(w =>
          w.id === action.id
            ? {
                ...w,
                isMaximized: true,
                zIndex: newTopZ,
                prevPosition: w.position,
                prevSize: w.size,
                position: { x: 0, y: 0 },
                size: { width: action.desktopW, height: action.desktopH },
              }
            : w,
        ),
      };
    }

    case 'RESTORE': {
      const newTopZ = state.topZ + 1;
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMinimized: false, zIndex: newTopZ } : w,
        ),
      };
    }

    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, position: action.position } : w,
        ),
      };

    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, size: action.size, position: action.position } : w,
        ),
      };

    default:
      return state;
  }
}

export type OpenWindowOpts = Omit<WinDef, 'zIndex' | 'isMinimized' | 'isMaximized' | 'position' | 'prevPosition' | 'prevSize'> & {
  position?: { x: number; y: number };
};

interface WindowManagerContextValue {
  windows: WinDef[];
  openWindow: (opts: OpenWindowOpts) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }, position: { x: number; y: number }) => void;
  getFocusedId: () => string | null;
  desktopRef: React.RefObject<HTMLDivElement | null>;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

const CASCADE_OFFSET = 22;
const BASE_X = 60;
const BASE_Y = 40;

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], topZ: 10 });
  const desktopRef = useRef<HTMLDivElement>(null);
  const openCountRef = useRef(0);

  const openWindow = useCallback((opts: OpenWindowOpts) => {
    const cascade = openCountRef.current % 8;
    const defaultPos = {
      x: BASE_X + cascade * CASCADE_OFFSET,
      y: BASE_Y + cascade * CASCADE_OFFSET,
    };
    openCountRef.current += 1;
    dispatch({
      type: 'OPEN',
      window: {
        ...opts,
        position: opts.position ?? defaultPos,
        isMinimized: false,
        isMaximized: false,
      },
    });
  }, []);

  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE', id }), []);

  const toggleMaximize = useCallback((id: string) => {
    const el = desktopRef.current;
    const w = el ? el.clientWidth : window.innerWidth;
    const h = el ? el.clientHeight : window.innerHeight - 28;
    dispatch({ type: 'MAXIMIZE', id, desktopW: w, desktopH: h });
  }, []);

  const restoreWindow = useCallback((id: string) => dispatch({ type: 'RESTORE', id }), []);

  const moveWindow = useCallback(
    (id: string, position: { x: number; y: number }) =>
      dispatch({ type: 'MOVE', id, position }),
    [],
  );

  const resizeWindow = useCallback(
    (id: string, size: { width: number; height: number }, position: { x: number; y: number }) =>
      dispatch({ type: 'RESIZE', id, size, position }),
    [],
  );

  const getFocusedId = useCallback(() => {
    const visible = state.windows.filter(w => !w.isMinimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id;
  }, [state.windows]);

  return (
    <WindowManagerContext.Provider
      value={{
        windows: state.windows,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        restoreWindow,
        moveWindow,
        resizeWindow,
        getFocusedId,
        desktopRef,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
