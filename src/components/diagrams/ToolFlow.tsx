import React from 'react';

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

const BOX_COLORS: Record<string, { bg: string; text: string }> = {
  'Claude.ai':   { bg: '#f0ebff', text: '#5b21b6' },
  'Claude Code': { bg: '#ecfdf5', text: '#065f46' },
  'Figma MCP':   { bg: '#fffbeb', text: '#92400e' },
  'Vercel':      { bg: '#eff6ff', text: '#1e40af' },
};

interface BoxProps {
  x: number;
  y: number;
  label: string;
  subtitle: string;
}

function Box({ x, y, label, subtitle }: BoxProps) {
  const { bg, text } = BOX_COLORS[label] ?? { bg: '#f5f5f5', text: '#333' };
  return (
    <g>
      <rect x={x} y={y} width={138} height={66} rx={8} fill={bg} />
      <text x={x + 69} y={y + 28} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={500} fill={text}>
        {label}
      </text>
      <text x={x + 69} y={y + 46} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={text} opacity={0.7}>
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
      <text x={mid} y={y - 10} textAnchor="middle" fontFamily={FONT} fontSize={10} fill="#9ca3af" letterSpacing={0.3}>
        {label}
      </text>
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#tf-arrow)" />
    </g>
  );
}

export function ToolFlow() {
  const BOX_W = 130;
  const GAP = 40;
  const PAD = 20;
  const BOX_H = 66;
  const ROW_Y = 57;

  const boxes = [
    { label: 'Claude.ai',   subtitle: 'Prompt builder' },
    { label: 'Claude Code', subtitle: 'Builds the site' },
    { label: 'Figma MCP',   subtitle: 'Design reference' },
    { label: 'Vercel',      subtitle: 'Deploy & host' },
  ];

  const arrowLabels = ['prompt', 'reads design', 'push to deploy'];
  const arrowY = ROW_Y + BOX_H / 2;

  return (
    <div style={{ border: '1px solid #e8e8e8', borderRadius: 12, padding: 32, margin: '2rem 0', background: '#ffffff' }}>
      <svg
        viewBox="0 0 680 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 680, display: 'block', margin: '0 auto' }}
        aria-label="Tool workflow: Claude.ai → Claude Code → Figma MCP → Vercel"
      >
        <defs>
          <marker id="tf-arrow" markerWidth={8} markerHeight={6} refX={6} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>

        {boxes.map((box, i) => (
          <Box
            key={i}
            x={PAD + i * (BOX_W + GAP)}
            y={ROW_Y}
            label={box.label}
            subtitle={box.subtitle}
          />
        ))}

        {arrowLabels.map((label, i) => {
          const x1 = PAD + i * (BOX_W + GAP) + BOX_W + 4;
          const x2 = PAD + (i + 1) * (BOX_W + GAP);
          return <Arrow key={i} x1={x1} x2={x2} y={arrowY} label={label} />;
        })}
      </svg>
    </div>
  );
}
