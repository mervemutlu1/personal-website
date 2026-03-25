import React from 'react';

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

interface BoxProps {
  x: number;
  y: number;
  label: string;
  subtitle: string;
}

function Box({ x, y, label, subtitle }: BoxProps) {
  return (
    <g>
      <rect x={x} y={y} width={138} height={66} rx={6} fill="#FFFFFF" stroke="#D4D4D4" strokeWidth={1.5} />
      <text x={x + 69} y={y + 28} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={600} fill="#1a1a1a">
        {label}
      </text>
      <text x={x + 69} y={y + 46} textAnchor="middle" fontFamily={FONT} fontSize={11} fill="#888888">
        {subtitle}
      </text>
    </g>
  );
}

interface ArrowProps {
  x1: number;
  x2: number;
  y: number;
  label: string;
}

function Arrow({ x1, x2, y, label }: ArrowProps) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <text x={mid} y={y - 10} textAnchor="middle" fontFamily={FONT} fontSize={10} fill="#AAAAAA" letterSpacing={0.3}>
        {label}
      </text>
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} stroke="#CCCCCC" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
    </g>
  );
}

export function ToolFlow() {
  // 4 boxes × 138px + 3 gaps × 44px + 2×20 padding = 552 + 132 + 40 = 724 → use viewBox 680
  // Fit in 680: box=130, gap=40, padding=20 each side
  // 4×130 + 3×40 + 40 = 520+120+40 = 680 ✓
  const BOX_W = 130;
  const GAP = 40;
  const PAD = 20;
  const BOX_H = 66;
  const ROW_Y = 57; // (180 - 66) / 2

  const boxes = [
    { label: 'Claude.ai',    subtitle: 'Prompt builder' },
    { label: 'Claude Code',  subtitle: 'Builds the site' },
    { label: 'Figma MCP',    subtitle: 'Design reference' },
    { label: 'Vercel',       subtitle: 'Deploy & host' },
  ];

  const arrowLabels = ['prompt', 'reads design', 'push to deploy'];
  const arrowY = ROW_Y + BOX_H / 2;

  return (
    <svg
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 680, display: 'block', margin: '0 auto' }}
      aria-label="Tool workflow: Claude.ai → Claude Code → Figma MCP → Vercel"
    >
      <defs>
        <marker id="arrowhead" markerWidth={8} markerHeight={6} refX={6} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#CCCCCC" />
        </marker>
      </defs>

      {/* Background */}
      <rect width={680} height={180} rx={10} fill="#F8F8F7" />

      {/* Boxes */}
      {boxes.map((box, i) => (
        <Box
          key={i}
          x={PAD + i * (BOX_W + GAP)}
          y={ROW_Y}
          label={box.label}
          subtitle={box.subtitle}
        />
      ))}

      {/* Arrows */}
      {arrowLabels.map((label, i) => {
        const x1 = PAD + i * (BOX_W + GAP) + BOX_W + 4;
        const x2 = PAD + (i + 1) * (BOX_W + GAP);
        return (
          <Arrow key={i} x1={x1} x2={x2} y={arrowY} label={label} />
        );
      })}
    </svg>
  );
}
