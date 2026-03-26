import React from 'react';

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

const STEP_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  'Idea':          { bg: '#fdf2f8', text: '#9d174d', badge: '#f9a8d4' },
  'Design system': { bg: '#fffbeb', text: '#92400e', badge: '#fcd34d' },
  'Prompt':        { bg: '#f0ebff', text: '#5b21b6', badge: '#c4b5fd' },
  'Build':         { bg: '#ecfdf5', text: '#065f46', badge: '#6ee7b7' },
  'Iterate':       { bg: '#ecfdf5', text: '#065f46', badge: '#6ee7b7' },
  'Deploy':        { bg: '#eff6ff', text: '#1e40af', badge: '#93c5fd' },
};

interface StepBoxProps {
  x: number;
  y: number;
  step: number;
  label: string;
}

function StepBox({ x, y, step, label }: StepBoxProps) {
  const { bg, text, badge } = STEP_COLORS[label] ?? { bg: '#f5f5f5', text: '#333', badge: '#ddd' };
  return (
    <g>
      <rect x={x} y={y} width={150} height={64} rx={8} fill={bg} />
      <rect x={x + 10} y={y + 12} width={22} height={22} rx={5} fill={badge} />
      <text x={x + 21} y={y + 27} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={700} fill={text}>
        {step}
      </text>
      <text x={x + 44} y={y + 27} fontFamily={FONT} fontSize={12} fontWeight={500} fill={text}>
        {label}
      </text>
    </g>
  );
}

export function BuildProcess() {
  const COL_W = 150;
  const H_GAP = 50;
  const PAD_X = 20;
  const BOX_H = 64;
  const V_GAP = 44;
  const PAD_Y = 20;

  const row1Y = PAD_Y;
  const row2Y = PAD_Y + BOX_H + V_GAP;
  const captionY = row2Y + BOX_H + 28;
  const totalH = captionY + 36;

  const cols = [PAD_X, PAD_X + COL_W + H_GAP, PAD_X + 2 * (COL_W + H_GAP)];
  const colCenterX = cols.map((x) => x + COL_W / 2);
  const viewW = PAD_X + 3 * COL_W + 2 * H_GAP + PAD_X;

  const steps = [
    { row: 0, col: 0, step: 1, label: 'Idea' },
    { row: 1, col: 0, step: 2, label: 'Design system' },
    { row: 0, col: 1, step: 3, label: 'Prompt' },
    { row: 1, col: 1, step: 4, label: 'Build' },
    { row: 0, col: 2, step: 5, label: 'Iterate' },
    { row: 1, col: 2, step: 6, label: 'Deploy' },
  ];

  const rowY = [row1Y, row2Y];
  const arrowRow1Y = row1Y + BOX_H / 2;
  const arrowRow2Y = row2Y + BOX_H / 2;

  return (
    <div style={{ border: '1px solid #e8e8e8', borderRadius: 12, padding: 32, margin: '2rem 0', background: '#ffffff' }}>
      <svg
        viewBox={`0 0 ${viewW} ${totalH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: viewW, display: 'block', margin: '0 auto' }}
        aria-label="6-step build process diagram"
      >
        <defs>
          <marker id="bp-arrow" markerWidth={8} markerHeight={6} refX={6} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>

        {steps.map((s) => (
          <StepBox key={s.step} x={cols[s.col]} y={rowY[s.row]} step={s.step} label={s.label} />
        ))}

        {/* Horizontal arrows row 1 */}
        {[0, 1].map((c) => (
          <line key={`hr1-${c}`}
            x1={cols[c] + COL_W + 4} y1={arrowRow1Y}
            x2={cols[c + 1] - 6}    y2={arrowRow1Y}
            stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#bp-arrow)"
          />
        ))}

        {/* Horizontal arrows row 2 */}
        {[0, 1].map((c) => (
          <line key={`hr2-${c}`}
            x1={cols[c] + COL_W + 4} y1={arrowRow2Y}
            x2={cols[c + 1] - 6}    y2={arrowRow2Y}
            stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#bp-arrow)"
          />
        ))}

        {/* Vertical arrows */}
        {colCenterX.map((cx, i) => (
          <line key={`vr-${i}`}
            x1={cx} y1={row1Y + BOX_H + 4}
            x2={cx} y2={row2Y - 6}
            stroke="#9ca3af" strokeWidth={1.5} markerEnd="url(#bp-arrow)"
          />
        ))}

        <text x={viewW / 2} y={captionY} textAnchor="middle" fontFamily={FONT} fontSize={11} fill="#9ca3af" fontStyle="italic">
          No code written. No design tool opened from scratch.
        </text>
        <text x={viewW / 2} y={captionY + 16} textAnchor="middle" fontFamily={FONT} fontSize={11} fill="#9ca3af" fontStyle="italic">
          Every step was direction, not execution.
        </text>
      </svg>
    </div>
  );
}
