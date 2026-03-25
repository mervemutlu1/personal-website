import React from 'react';

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

interface StepBoxProps {
  x: number;
  y: number;
  step: number;
  label: string;
}

function StepBox({ x, y, step, label }: StepBoxProps) {
  return (
    <g>
      <rect x={x} y={y} width={150} height={64} rx={6} fill="#FFFFFF" stroke="#D4D4D4" strokeWidth={1.5} />
      {/* Step number badge */}
      <rect x={x + 10} y={y + 12} width={22} height={22} rx={4} fill="#F0F0EE" />
      <text x={x + 21} y={y + 27} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={700} fill="#888888">
        {step}
      </text>
      {/* Label */}
      <text x={x + 42} y={y + 27} fontFamily={FONT} fontSize={12} fontWeight={600} fill="#1a1a1a">
        {label}
      </text>
    </g>
  );
}

export function BuildProcess() {
  // 3 cols × 150px + 2 gaps × 50px + 2×20 padding = 450+100+40 = 590
  // 2 rows × 64px + 1 gap × 44px + caption + padding = 128+44+40+20+20 = 252
  const COL_W = 150;
  const H_GAP = 50;
  const PAD_X = 20;
  const BOX_H = 64;
  const V_GAP = 44;
  const PAD_Y = 20;

  const row1Y = PAD_Y;
  const row2Y = PAD_Y + BOX_H + V_GAP;
  const captionY = row2Y + BOX_H + 28;
  const totalH = captionY + 20;

  const cols = [PAD_X, PAD_X + COL_W + H_GAP, PAD_X + 2 * (COL_W + H_GAP)];
  const colCenterX = cols.map(x => x + COL_W / 2);

  const steps = [
    { row: 0, col: 0, step: 1, label: 'Idea' },
    { row: 1, col: 0, step: 2, label: 'Design system' },
    { row: 0, col: 1, step: 3, label: 'Prompt' },
    { row: 1, col: 1, step: 4, label: 'Build' },
    { row: 0, col: 2, step: 5, label: 'Iterate' },
    { row: 1, col: 2, step: 6, label: 'Deploy' },
  ];

  const rowY = [row1Y, row2Y];
  const viewW = PAD_X + 3 * COL_W + 2 * H_GAP + PAD_X; // 590

  // Horizontal arrow y positions
  const arrowRow1Y = row1Y + BOX_H / 2;
  const arrowRow2Y = row2Y + BOX_H / 2;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${totalH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: viewW, display: 'block', margin: '0 auto' }}
      aria-label="6-step build process diagram"
    >
      <defs>
        <marker id="bp-arrow" markerWidth={8} markerHeight={6} refX={6} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#CCCCCC" />
        </marker>
      </defs>

      {/* Background */}
      <rect width={viewW} height={totalH} rx={10} fill="#F8F8F7" />

      {/* Step boxes */}
      {steps.map((s) => (
        <StepBox
          key={s.step}
          x={cols[s.col]}
          y={rowY[s.row]}
          step={s.step}
          label={s.label}
        />
      ))}

      {/* Horizontal arrows — row 1 */}
      {[0, 1].map((colIdx) => {
        const x1 = cols[colIdx] + COL_W + 4;
        const x2 = cols[colIdx + 1] - 6;
        return (
          <line key={`hr1-${colIdx}`}
            x1={x1} y1={arrowRow1Y}
            x2={x2} y2={arrowRow1Y}
            stroke="#CCCCCC" strokeWidth={1.5}
            markerEnd="url(#bp-arrow)"
          />
        );
      })}

      {/* Horizontal arrows — row 2 */}
      {[0, 1].map((colIdx) => {
        const x1 = cols[colIdx] + COL_W + 4;
        const x2 = cols[colIdx + 1] - 6;
        return (
          <line key={`hr2-${colIdx}`}
            x1={x1} y1={arrowRow2Y}
            x2={x2} y2={arrowRow2Y}
            stroke="#CCCCCC" strokeWidth={1.5}
            markerEnd="url(#bp-arrow)"
          />
        );
      })}

      {/* Vertical arrows — col 1, 2, 3 (row1 bottom → row2 top) */}
      {colCenterX.map((cx, i) => {
        const y1 = row1Y + BOX_H + 4;
        const y2 = row2Y - 6;
        return (
          <line key={`vr-${i}`}
            x1={cx} y1={y1}
            x2={cx} y2={y2}
            stroke="#CCCCCC" strokeWidth={1.5}
            markerEnd="url(#bp-arrow)"
          />
        );
      })}

      {/* Caption */}
      <text
        x={viewW / 2}
        y={captionY}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={11}
        fill="#AAAAAA"
        fontStyle="italic"
      >
        No code written. No design tool opened from scratch.
      </text>
      <text
        x={viewW / 2}
        y={captionY + 16}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={11}
        fill="#AAAAAA"
        fontStyle="italic"
      >
        Every step was direction, not execution.
      </text>
    </svg>
  );
}
