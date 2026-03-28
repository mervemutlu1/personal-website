'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { findEntry, FileEntry } from '@/lib/content';
import { useWindowManager } from '@/hooks/useWindowManager';

interface NotepadWindowProps {
  fileId: string;
  windowId: string;
}

function isBlogPost(entry: FileEntry) {
  return entry.icon === 'file-craft' || entry.icon === 'file-growth';
}

function getCategoryLabel(entry: FileEntry) {
  return entry.icon === 'file-craft' ? 'CRAFT' : 'GROWTH';
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getPostTitle(entry: FileEntry) {
  return entry.title ?? entry.name.replace(/\.txt$/i, '');
}

/** Everything after the first standalone `---` line is the body */
function extractBody(content: string) {
  const lines = content.split('\n');
  const dividerIdx = lines.findIndex((l) => l.trim() === '---');
  if (dividerIdx === -1) return content;
  return lines.slice(dividerIdx + 1).join('\n').replace(/^\n+/, '');
}

function extractHeadings(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => /^##\s+/.test(b))
    .map((b) => b.split('\n')[0].replace(/^##\s+/, '').trim());
}

/** Render inline text with ==highlight==, `code`, and URL support */
function renderInline(text: string, key: string | number) {
  const pattern = /(==.+?==|`[^`]+`|https?:\/\/[^\s)]+|(?<![a-zA-Z])figma\.com\/[^\s)]+)/g;
  const parts = text.split(pattern);

  return (
    <span key={key}>
      {parts.map((part, i) => {
        if (part.startsWith('==') && part.endsWith('==')) {
          return <React.Fragment key={i}>{part.slice(2, -2)}</React.Fragment>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} style={{
              background: '#f1f5f9',
              fontFamily: '"Fira Code", "Cascadia Code", monospace',
              fontSize: 14,
              color: '#dc2626',
              padding: '2px 6px',
              borderRadius: 4,
            }}>
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('https://') || part.startsWith('figma.com/')) {
          const href = part.startsWith('https://') ? part : `https://${part}`;
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1558d6',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(21, 88, 214, 0.4)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = '#1558d6')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = 'rgba(21, 88, 214, 0.4)')}
            >
              {part}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

function NavTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '8px 12px',
        fontSize: 12,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: active ? 500 : 400,
        color: active ? '#ffffff' : hovered ? '#333' : '#888',
        background: active ? '#1a1a1a' : hovered ? '#f5f5f5' : 'transparent',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.15s',
        lineHeight: 1.4,
      }}
    >
      {label}
    </button>
  );
}

const BODY_FONT = 'Georgia, serif';
const BODY_SIZE = 17;
const BODY_LINE = 1.85;
const BODY_COLOR = '#1a1a1a';
const BODY_WEIGHT = 400;

function BlogPostReader({ entry, windowId }: { entry: FileEntry; windowId: string }) {
  const { closeWindow, toggleMaximize } = useWindowManager();
  const title = getPostTitle(entry);
  const category = getCategoryLabel(entry);
  const readingTime = getReadingTime(entry.content ?? '');
  const body = extractBody(entry.content ?? '');
  const headings = useMemo(() => extractHeadings(body), [body]);

  const [activeHeading, setActiveHeading] = useState<string | null>(headings[0] ?? null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Auto-maximize when blog post window opens
  useEffect(() => {
    toggleMaximize(windowId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !headings.length) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let current: string | null = null;
      for (const h of headings) {
        const el = sectionRefs.current.get(h);
        if (!el) continue;
        if (el.getBoundingClientRect().top - containerTop <= 120) current = h;
      }
      setActiveHeading(current ?? headings[0] ?? null);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (heading: string) => {
    const el = sectionRefs.current.get(heading);
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    const elTop = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollBy({ top: elTop - 80, behavior: 'smooth' });
    setActiveHeading(heading);
  };

  const blocks = body.split(/\n{2,}/);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#ffffff', overflow: 'hidden' }}>

      {/* LEFT NAV — 220px fixed */}
      <div style={{
        width: 220,
        flexShrink: 0,
        height: '100%',
        overflowY: 'auto',
        background: '#ffffff',
        borderRight: '1px solid #e8e8e8',
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        {/* Back button */}
        <button
          onClick={() => closeWindow(windowId)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 13,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#888',
            cursor: 'pointer',
            textAlign: 'left',
            marginBottom: 20,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#333')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
        >
          ← Back
        </button>

        {/* Category badge */}
        <span style={{
          display: 'inline-block',
          background: '#f0f0f0',
          color: '#555',
          fontSize: 11,
          letterSpacing: '0.08em',
          padding: '4px 10px',
          borderRadius: 20,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textTransform: 'uppercase',
          alignSelf: 'flex-start',
        }}>
          {category}
        </span>

        {/* Post title */}
        <div style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#1a1a1a',
          marginTop: 16,
          lineHeight: 1.5,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          {title}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#e8e8e8', margin: '20px 0', flexShrink: 0 }} />

        {/* Section tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {headings.map((h) => (
            <NavTab
              key={h}
              label={h}
              active={activeHeading === h}
              onClick={() => scrollToSection(h)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT — scrollable */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: 660, padding: '48px 64px 80px', margin: '0 auto' }}>

          {/* Post header */}
          <div>
            <div style={{
              fontSize: 12,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#999',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {category}{entry.date && ` · ${entry.date}`} · {readingTime} min read
            </div>

            <h1 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0f0f0f',
              lineHeight: 1.25,
              fontFamily: BODY_FONT,
              margin: '0 0 12px',
            }}>
              {title}
            </h1>

            {entry.description && (
              <p style={{
                fontSize: 18,
                color: '#555',
                fontStyle: 'italic',
                lineHeight: 1.5,
                fontFamily: BODY_FONT,
                margin: 0,
              }}>
                {entry.description}
              </p>
            )}
          </div>

          {/* Header divider */}
          <div style={{ height: 1, background: '#e0e0e0', margin: '32px 0' }} />

          {/* Body blocks */}
          <div>
            {blocks.map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // --- divider
              if (trimmed === '---') {
                return (
                  <div key={i} style={{ height: 1, background: '#e0e0e0', margin: '2rem 0' }} />
                );
              }

              // >>> Style B — bold standalone line (must be before >> check)
              if (trimmed.startsWith('>>> ')) {
                const text = trimmed.slice(4);
                return (
                  <div key={i} style={{
                    fontFamily: BODY_FONT,
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#0f0f0f',
                    display: 'block',
                    margin: '0.8rem 0',
                    lineHeight: 1.5,
                  }}>
                    {renderInline(text, i)}
                  </div>
                );
              }

              // >> Style A — callout block with left border
              if (trimmed.startsWith('>> ')) {
                const text = trimmed.slice(3);
                return (
                  <div key={i} style={{
                    borderLeft: '3px solid #1a1a1a',
                    background: '#f7f6f1',
                    padding: '12px 20px',
                    margin: '1.5rem 0',
                    borderRadius: '0 4px 4px 0',
                    fontFamily: BODY_FONT,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: '#1a1a1a',
                  }}>
                    {renderInline(text, i)}
                  </div>
                );
              }

              // ~~~ fenced code block
              if (trimmed.startsWith('~~~') && trimmed.endsWith('~~~') && trimmed.length > 6) {
                const code = trimmed.slice(3, -3).replace(/^\n/, '');
                return (
                  <pre key={i} style={{
                    background: '#0f172a',
                    color: '#e2e8f0',
                    fontFamily: '"Fira Code", "Cascadia Code", monospace',
                    fontSize: 14,
                    lineHeight: 1.7,
                    padding: '20px 24px',
                    borderRadius: 8,
                    margin: '1.5rem 0',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    border: 'none',
                  }}>
                    {code}
                  </pre>
                );
              }

              const lines = trimmed.split('\n');

              // ## Section heading — registers ref for nav
              if (/^##\s+/.test(lines[0])) {
                const heading = lines[0].replace(/^##\s+/, '').trim();
                const rest = lines.slice(1).join('\n').trim();
                return (
                  <div
                    key={i}
                    ref={(el) => { if (el) sectionRefs.current.set(heading, el); }}
                    style={{ marginTop: 48 }}
                  >
                    <h2 style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#1a1a1a',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      margin: '0 0 8px',
                      paddingBottom: 8,
                      borderBottom: '2px solid #1a1a1a',
                    }}>
                      {heading}
                    </h2>
                    {rest && (
                      <p style={{
                        fontFamily: BODY_FONT,
                        fontSize: BODY_SIZE,
                        lineHeight: BODY_LINE,
                        fontWeight: BODY_WEIGHT,
                        color: BODY_COLOR,
                        margin: '1rem 0 0',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {renderInline(rest, 'body')}
                      </p>
                    )}
                  </div>
                );
              }

              // → Arrow list card
              if (lines.some((l) => l.trim().startsWith('→'))) {
                const items: string[] = [];
                for (const line of lines) {
                  const t = line.trim();
                  if (!t) continue;
                  if (t.startsWith('→')) {
                    items.push(t.slice(1).trim());
                  } else if (items.length > 0) {
                    items[items.length - 1] += ' ' + t;
                  }
                }
                return (
                  <div key={i} style={{
                    background: '#fafaf8',
                    border: '1px solid #efefed',
                    borderRadius: 8,
                    padding: '12px 16px',
                    margin: '1.25rem 0',
                  }}>
                    {items.map((item, j) => (
                      <div key={j} style={{
                        display: 'block',
                        padding: '5px 0',
                        paddingLeft: 20,
                        fontFamily: BODY_FONT,
                        fontSize: BODY_SIZE,
                        lineHeight: BODY_LINE,
                        fontWeight: BODY_WEIGHT,
                        color: BODY_COLOR,
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#888',
                          fontFamily: 'system-ui, sans-serif',
                        }}>→</span>
                        {renderInline(item, j)}
                      </div>
                    ))}
                  </div>
                );
              }

              // Numbered/bullet list
              if (lines.every((l) => /^(\d+\.|-)/.test(l.trim()) || l.trim() === '')) {
                return (
                  <ul key={i} style={{
                    fontFamily: BODY_FONT,
                    fontSize: BODY_SIZE,
                    lineHeight: BODY_LINE,
                    fontWeight: BODY_WEIGHT,
                    color: BODY_COLOR,
                    margin: '0 0 1.5rem',
                    paddingLeft: 24,
                    listStyle: 'none',
                  }}>
                    {lines.filter((l) => l.trim()).map((l, j) => (
                      <li key={j} style={{ marginBottom: 6 }}>
                        {renderInline(l.trim(), j)}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Blockquote
              if (trimmed.startsWith('"') || trimmed.startsWith('  "')) {
                return (
                  <blockquote key={i} style={{
                    borderLeft: '3px solid #d0d0d0',
                    margin: '0 0 1.5rem',
                    paddingLeft: 20,
                    fontFamily: BODY_FONT,
                    fontStyle: 'italic',
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: '#666',
                  }}>
                    {renderInline(trimmed, 'quote')}
                  </blockquote>
                );
              }

              // Regular paragraph
              return (
                <p key={i} style={{
                  fontFamily: BODY_FONT,
                  fontSize: BODY_SIZE,
                  lineHeight: BODY_LINE,
                  fontWeight: BODY_WEIGHT,
                  color: BODY_COLOR,
                  margin: '0 0 1.5rem',
                  whiteSpace: 'pre-wrap',
                }}>
                  {renderInline(trimmed, i)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlainTextReader({ entry }: { entry: FileEntry }) {
  const isModern = entry.id === 'now' || entry.id === 'about';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#C0C0C0' }}>
      <div
        className="win95-selectable"
        style={{
          flex: 1,
          background: '#FFFFFF',
          fontFamily: isModern ? "'IBM Plex Mono', monospace" : "'W95FA', 'Courier New', Courier, monospace",
          fontSize: isModern ? 16 : 14,
          lineHeight: isModern ? 1.9 : 1.9,
          color: isModern ? '#1a1a1a' : '#000000',
          padding: isModern ? '24px 28px' : '4px 8px',
          letterSpacing: isModern ? '0.01em' : undefined,
          fontWeight: isModern ? 400 : undefined,
          overflowY: 'auto',
          overflowX: 'auto',
          whiteSpace: 'pre',
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #FFFFFF',
          borderBottom: '2px solid #FFFFFF',
          boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
          margin: 2,
          outline: 'none',
        }}
      >
        {entry.content ?? '(Empty file)'}
      </div>
    </div>
  );
}

export function NotepadWindow({ fileId, windowId }: NotepadWindowProps) {
  const entry = findEntry(fileId);
  if (!entry) return null;

  if (isBlogPost(entry)) {
    return <BlogPostReader entry={entry} windowId={windowId} />;
  }

  return <PlainTextReader entry={entry} />;
}
