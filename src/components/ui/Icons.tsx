import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export function IconComputer({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Monitor body */}
      <rect x="1" y="2" width="26" height="19" fill="#C0C0C0" />
      <rect x="1" y="2" width="26" height="1" fill="#FFFFFF" />
      <rect x="1" y="2" width="1" height="19" fill="#FFFFFF" />
      <rect x="26" y="2" width="1" height="19" fill="#808080" />
      <rect x="1" y="20" width="26" height="1" fill="#808080" />
      {/* Screen bezel sunken */}
      <rect x="3" y="4" width="22" height="15" fill="#808080" />
      <rect x="4" y="5" width="20" height="13" fill="#000080" />
      {/* Screen highlight */}
      <rect x="4" y="5" width="1" height="13" fill="#0000A0" />
      <rect x="4" y="5" width="20" height="1" fill="#0000A0" />
      {/* Screen content lines */}
      <rect x="6" y="8" width="14" height="1" fill="#FFFFFF" opacity="0.6" />
      <rect x="6" y="10" width="12" height="1" fill="#FFFFFF" opacity="0.6" />
      <rect x="6" y="12" width="10" height="1" fill="#FFFFFF" opacity="0.6" />
      {/* Stand */}
      <rect x="11" y="21" width="6" height="3" fill="#808080" />
      <rect x="11" y="21" width="6" height="1" fill="#C0C0C0" />
      {/* Base */}
      <rect x="7" y="24" width="14" height="2" fill="#C0C0C0" />
      <rect x="7" y="24" width="14" height="1" fill="#FFFFFF" />
      <rect x="7" y="24" width="1" height="2" fill="#FFFFFF" />
      <rect x="20" y="24" width="1" height="2" fill="#808080" />
      <rect x="7" y="25" width="14" height="1" fill="#808080" />
      {/* Keyboard */}
      <rect x="1" y="27" width="28" height="4" fill="#C0C0C0" />
      <rect x="1" y="27" width="28" height="1" fill="#FFFFFF" />
      <rect x="1" y="27" width="1" height="4" fill="#FFFFFF" />
      <rect x="28" y="27" width="1" height="4" fill="#808080" />
      <rect x="1" y="30" width="28" height="1" fill="#808080" />
      {/* Keys */}
      <rect x="3" y="28" width="24" height="2" fill="#DFDFDF" />
    </svg>
  );
}

export function IconBin({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Handle */}
      <rect x="13" y="2" width="6" height="2" fill="#C0C0C0" />
      <rect x="13" y="2" width="1" height="2" fill="#FFFFFF" />
      <rect x="18" y="2" width="1" height="2" fill="#808080" />
      <rect x="13" y="3" width="6" height="1" fill="#808080" />
      {/* Lid */}
      <rect x="5" y="4" width="22" height="4" fill="#C0C0C0" />
      <rect x="5" y="4" width="22" height="1" fill="#FFFFFF" />
      <rect x="5" y="4" width="1" height="4" fill="#FFFFFF" />
      <rect x="26" y="4" width="1" height="4" fill="#808080" />
      <rect x="5" y="7" width="22" height="1" fill="#808080" />
      {/* Body */}
      <rect x="6" y="8" width="20" height="20" fill="#C0C0C0" />
      <rect x="6" y="8" width="1" height="20" fill="#FFFFFF" />
      <rect x="25" y="8" width="1" height="20" fill="#808080" />
      <rect x="6" y="27" width="20" height="1" fill="#808080" />
      {/* Vertical lines inside */}
      <rect x="10" y="11" width="2" height="13" fill="#808080" />
      <rect x="15" y="11" width="2" height="13" fill="#808080" />
      <rect x="20" y="11" width="2" height="13" fill="#808080" />
      {/* Recycling arrows hint */}
      <rect x="8" y="10" width="16" height="1" fill="#008080" opacity="0.5" />
    </svg>
  );
}

export function IconFileTxt({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Page */}
      <polygon points="4,1 22,1 28,7 28,31 4,31" fill="#FFFFFF" />
      {/* Page border */}
      <polyline points="4,31 4,1 22,1" fill="none" stroke="#000080" strokeWidth="1" />
      <polyline points="22,1 28,7 28,31 4,31" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Folded corner */}
      <polygon points="22,1 28,7 22,7" fill="#C0C0C0" />
      <polyline points="22,1 22,7 28,7" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Text lines */}
      <rect x="7" y="12" width="14" height="1" fill="#808080" />
      <rect x="7" y="15" width="14" height="1" fill="#808080" />
      <rect x="7" y="18" width="14" height="1" fill="#808080" />
      <rect x="7" y="21" width="10" height="1" fill="#808080" />
      <rect x="7" y="24" width="12" height="1" fill="#808080" />
    </svg>
  );
}

export function IconFolder({ size = 32, open = false }: IconProps & { open?: boolean }) {
  if (open) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        {/* Back panel */}
        <rect x="1" y="8" width="30" height="20" fill="#D4A500" />
        {/* Tab */}
        <rect x="1" y="5" width="11" height="4" fill="#D4A500" />
        {/* Front of open folder */}
        <rect x="1" y="13" width="30" height="15" fill="#FFE080" />
        {/* Papers inside */}
        <rect x="5" y="10" width="8" height="8" fill="#FFFFFF" opacity="0.8" />
        <rect x="10" y="9" width="8" height="8" fill="#FFFFFF" opacity="0.6" />
        {/* Border */}
        <rect x="1" y="5" width="11" height="1" fill="#FFFFFF" />
        <rect x="1" y="5" width="1" height="4" fill="#FFFFFF" />
        <rect x="1" y="8" width="1" height="20" fill="#FFFFFF" />
        <rect x="1" y="8" width="30" height="1" fill="#FFFFFF" />
        <rect x="30" y="8" width="1" height="20" fill="#808080" />
        <rect x="1" y="27" width="30" height="1" fill="#808080" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Tab */}
      <rect x="1" y="9" width="12" height="4" fill="#D4A500" />
      <rect x="1" y="9" width="12" height="1" fill="#FFDD66" />
      <rect x="1" y="9" width="1" height="4" fill="#FFDD66" />
      <rect x="12" y="9" width="1" height="4" fill="#808080" />
      {/* Body */}
      <rect x="1" y="12" width="30" height="17" fill="#D4A500" />
      <rect x="1" y="12" width="30" height="2" fill="#FFDD66" />
      <rect x="1" y="12" width="1" height="17" fill="#FFDD66" />
      <rect x="30" y="12" width="1" height="17" fill="#808080" />
      <rect x="1" y="28" width="30" height="1" fill="#808080" />
      {/* Shine */}
      <rect x="3" y="14" width="26" height="1" fill="#FFE880" opacity="0.5" />
    </svg>
  );
}

export function IconFileCraft({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Page */}
      <polygon points="4,1 22,1 28,7 28,31 4,31" fill="#E8F0FF" />
      <polyline points="4,31 4,1 22,1" fill="none" stroke="#000080" strokeWidth="1" />
      <polyline points="22,1 28,7 28,31 4,31" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Folded corner */}
      <polygon points="22,1 28,7 22,7" fill="#B0C0E0" />
      <polyline points="22,1 22,7 28,7" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Design grid lines */}
      <rect x="7" y="11" width="14" height="1" fill="#000080" opacity="0.5" />
      <rect x="7" y="14" width="14" height="1" fill="#000080" opacity="0.3" />
      <rect x="7" y="17" width="10" height="1" fill="#000080" opacity="0.3" />
      <rect x="7" y="20" width="12" height="1" fill="#000080" opacity="0.3" />
      {/* Star/sparkle hint */}
      <rect x="8" y="24" width="3" height="3" fill="#000080" opacity="0.6" />
    </svg>
  );
}

export function IconFileGrowth({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Page */}
      <polygon points="4,1 22,1 28,7 28,31 4,31" fill="#F0FFE8" />
      <polyline points="4,31 4,1 22,1" fill="none" stroke="#008000" strokeWidth="1" />
      <polyline points="22,1 28,7 28,31 4,31" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Folded corner */}
      <polygon points="22,1 28,7 22,7" fill="#B0D0B0" />
      <polyline points="22,1 22,7 28,7" fill="none" stroke="#808080" strokeWidth="1" />
      {/* Growth chart lines */}
      <rect x="7" y="23" width="1" height="4" fill="#008000" opacity="0.8" />
      <rect x="10" y="20" width="1" height="7" fill="#008000" opacity="0.8" />
      <rect x="13" y="16" width="1" height="11" fill="#008000" opacity="0.8" />
      <rect x="16" y="14" width="1" height="13" fill="#008000" opacity="0.8" />
      <rect x="7" y="27" width="14" height="1" fill="#008000" opacity="0.5" />
    </svg>
  );
}

export function IconBrowser({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Blue "e" letter */}
      {/* Top bar */}
      <rect x="7" y="6" width="16" height="3" fill="#1144BB" />
      {/* Left vertical */}
      <rect x="5" y="6" width="2" height="20" fill="#1144BB" />
      {/* Upper-right arc segment */}
      <rect x="21" y="9" width="3" height="5" fill="#1144BB" />
      {/* Middle bar */}
      <rect x="7" y="14" width="13" height="3" fill="#1144BB" />
      {/* Lower-right arc segment */}
      <rect x="21" y="18" width="3" height="5" fill="#1144BB" />
      {/* Bottom bar */}
      <rect x="7" y="23" width="16" height="3" fill="#1144BB" />
      {/* Inner highlight */}
      <rect x="5" y="6" width="1" height="20" fill="#4477EE" />
      <rect x="7" y="6" width="16" height="1" fill="#4477EE" />

      {/* Yellow orbit ring — diagonal, top-right to bottom-left */}
      {/* Top-right arm */}
      <rect x="19" y="1" width="5" height="2" fill="#FFBB00" />
      <rect x="23" y="3" width="4" height="2" fill="#FFBB00" />
      <rect x="26" y="5" width="3" height="3" fill="#FFBB00" />
      <rect x="27" y="8" width="2" height="4" fill="#FFBB00" />
      {/* Bottom-left arm */}
      <rect x="3" y="19" width="2" height="4" fill="#FFBB00" />
      <rect x="2" y="23" width="3" height="3" fill="#FFBB00" />
      <rect x="4" y="26" width="4" height="2" fill="#FFBB00" />
      <rect x="8" y="28" width="5" height="2" fill="#FFBB00" />
    </svg>
  );
}

export function IconWindows({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
      <rect x="9" y="0" width="7" height="7" fill="#00FF00" />
      <rect x="0" y="9" width="7" height="7" fill="#0000FF" />
      <rect x="9" y="9" width="7" height="7" fill="#FFD700" />
    </svg>
  );
}

export function getIconComponent(iconType: string, size = 32) {
  switch (iconType) {
    case 'computer': return <IconComputer size={size} />;
    case 'bin': return <IconBin size={size} />;
    case 'folder': return <IconFolder size={size} />;
    case 'folder-open': return <IconFolder size={size} open />;
    case 'file-txt': return <IconFileTxt size={size} />;
    case 'file-craft': return <IconFileCraft size={size} />;
    case 'file-growth': return <IconFileGrowth size={size} />;
    case 'browser': return <IconBrowser size={size} />;
    default: return <IconFileTxt size={size} />;
  }
}
