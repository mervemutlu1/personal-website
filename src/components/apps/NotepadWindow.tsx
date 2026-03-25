'use client';

import React from 'react';
import { MenuBar } from '../ui/MenuBar';
import { findEntry, FileEntry } from '@/lib/content';

interface NotepadWindowProps {
  fileId: string;
}

const menuItems = [
  { label: 'File', items: ['New', 'Open...', 'Save', '-', 'Page Setup...', 'Print', '-', 'Exit'] },
  { label: 'Edit', items: ['Undo', '-', 'Cut', 'Copy', 'Paste', 'Delete', '-', 'Select All', '-', 'Time/Date', '-', 'Word Wrap'] },
  { label: 'Search', items: ['Find...', 'Find Next', 'Replace...'] },
  { label: 'Help', items: ['Help Topics', '-', 'About Notepad'] },
];

function isBlogPost(entry: FileEntry) {
  return entry.icon === 'file-craft' || entry.icon === 'file-growth';
}

function getCategoryLabel(entry: FileEntry) {
  return entry.icon === 'file-craft' ? 'Craft' : 'Growth';
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getPostTitle(entry: FileEntry) {
  return entry.name.replace(/\.txt$/i, '');
}

/** Everything after the first standalone `---` line is the body */
function extractBody(content: string) {
  const lines = content.split('\n');
  const dividerIdx = lines.findIndex((l) => l.trim() === '---');
  if (dividerIdx === -1) return content;
  return lines.slice(dividerIdx + 1).join('\n').replace(/^\n+/, '');
}

/** Render inline text with ==highlight==, `code`, and URL support */
function renderInline(text: string, key: string | number) {
  // Split on ==mark==, `code`, https:// URLs, and bare domain URLs
  const pattern = /(==.+?==|`[^`]+`|https?:\/\/[^\s)]+|(?<![a-zA-Z])figma\.com\/[^\s)]+)/g;
  const parts = text.split(pattern);

  return (
    <span key={key}>
      {parts.map((part, i) => {
        if (part.startsWith('==') && part.endsWith('==')) {
          return (
            <mark key={i} style={{ background: '#FFF176', color: '#1a1a1a', padding: '0 2px', borderRadius: 1 }}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} style={{
              background: '#f0f0ec',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 13,
              fontWeight: 500,
              padding: '2px 6px',
              borderRadius: 3,
              color: '#c0392b',
            }}>
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('https://') || part.startsWith('figma.com/')) {
          const href = part.startsWith('https://') ? part : `https://${part}`;
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{
              color: '#1a1a1a',
              textDecoration: 'underline',
              textDecorationColor: '#aaaaaa',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = '#333333')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = '#aaaaaa')}
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

/** Check if heading matches "STEP N —" pattern */
function isStepHeader(text: string) {
  return /^STEP\s+\d+\s*[—\-]/i.test(text.trim());
}

const SERIF = "'Lora', Georgia, serif";
const MONO = "var(--win95-font), 'Courier New', monospace";

function BlogPostReader({ entry }: { entry: FileEntry }) {
  const title = getPostTitle(entry);
  const category = getCategoryLabel(entry);
  const readingTime = getReadingTime(entry.content ?? '');
  const body = extractBody(entry.content ?? '');

  const blocks = body.split(/\n{2,}/);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#C0C0C0' }}>
      <MenuBar items={menuItems} />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: '#FAFAF8',
        margin: 2,
        borderTop: '2px solid #808080',
        borderLeft: '2px solid #808080',
        borderRight: '2px solid #FFFFFF',
        borderBottom: '2px solid #FFFFFF',
        boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #DFDFDF',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '28px 32px 40px' }}>

          {/* Post header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: MONO,
                fontSize: 10,
                color: '#000000',
                border: '1px solid #808080',
                padding: '1px 6px',
                background: '#C0C0C0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {category}
              </span>
              {entry.date && (
                <span style={{ fontFamily: MONO, fontSize: 10, color: '#808080' }}>{entry.date}</span>
              )}
              <span style={{ fontFamily: MONO, fontSize: 10, color: '#808080' }}>{readingTime} min read</span>
            </div>

            <h1 style={{
              fontFamily: SERIF,
              fontSize: 26,
              fontWeight: 600,
              lineHeight: 1.25,
              color: '#1a1a1a',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}>
              {title}
            </h1>

            {entry.description && (
              <p style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 15,
                lineHeight: 1.5,
                color: '#555555',
                margin: 0,
              }}>
                {entry.description}
              </p>
            )}
          </div>

          {/* Sunken divider */}
          <div style={{
            height: 2,
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #FFFFFF',
            margin: '0 0 24px',
          }} />

          {/* Body blocks */}
          <div>
            {blocks.map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // --- divider
              if (trimmed === '---') {
                return (
                  <div key={i} style={{
                    height: 2,
                    borderTop: '1px solid #e0e0e0',
                    borderBottom: '1px solid #FFFFFF',
                    margin: '28px 0',
                  }} />
                );
              }

              // >> Highlight callout
              if (trimmed.startsWith('>> ')) {
                const text = trimmed.slice(3);
                return (
                  <div key={i} style={{
                    borderLeft: '3px solid #1a1a1a',
                    background: '#f5f5f0',
                    padding: '10px 16px',
                    margin: '1.5rem 0',
                    borderRadius: '0 4px 4px 0',
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#1a1a1a',
                  }}>
                    {renderInline(text, i)}
                  </div>
                );
              }

              // ~~~ code block
              if (trimmed.startsWith('~~~') && trimmed.endsWith('~~~') && trimmed.length > 6) {
                const code = trimmed.slice(3, -3).replace(/^\n/, '');
                return (
                  <pre key={i} style={{
                    background: '#1a1a1a',
                    color: '#e8e8e8',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.7,
                    padding: '16px 20px',
                    borderRadius: 4,
                    borderLeft: '3px solid #555555',
                    margin: '1.2rem 0',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                  }}>
                    {code}
                  </pre>
                );
              }

              const lines = trimmed.split('\n');

              // ## Markdown heading
              if (/^##\s+/.test(lines[0])) {
                const heading = lines[0].replace(/^##\s+/, '').trim();
                const rest = lines.slice(1).join('\n').trim();
                const isStep = isStepHeader(heading);
                return (
                  <div key={i} style={{ marginTop: isStep ? '2.5rem' : '1.5rem', marginBottom: 12 }}>
                    <h2 style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      letterSpacing: isStep ? '0.12em' : '0.08em',
                      textTransform: 'uppercase',
                      margin: 0,
                      paddingBottom: isStep ? 6 : 0,
                      borderBottom: isStep ? '1px solid #e0e0e0' : 'none',
                    }}>
                      {heading}
                    </h2>
                    {rest && (
                      <p style={{
                        fontFamily: SERIF,
                        fontSize: 15,
                        lineHeight: 1.75,
                  fontWeight: 500,
                        color: '#1a1a1a',
                        margin: '10px 0 0',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {renderInline(rest, 'body')}
                      </p>
                    )}
                  </div>
                );
              }

              // ALL CAPS + dashes heading
              if (
                lines.length >= 2 &&
                lines[0] === lines[0].toUpperCase() &&
                lines[0].trim().length > 2 &&
                /^[-=]+$/.test(lines[1].trim())
              ) {
                const heading = lines[0].trim();
                const rest = lines.slice(2).join('\n').trim();
                const isStep = isStepHeader(heading);
                return (
                  <div key={i} style={{ marginTop: isStep ? '2.5rem' : '1.5rem', marginBottom: 12 }}>
                    <h2 style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      letterSpacing: isStep ? '0.12em' : '0.08em',
                      textTransform: 'uppercase',
                      margin: 0,
                      paddingBottom: isStep ? 6 : 0,
                      borderBottom: isStep ? '1px solid #e0e0e0' : 'none',
                    }}>
                      {heading}
                    </h2>
                    {rest && (
                      <p style={{
                        fontFamily: SERIF,
                        fontSize: 15,
                        lineHeight: 1.75,
                  fontWeight: 500,
                        color: '#1a1a1a',
                        margin: '10px 0 0',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {renderInline(rest, 'body')}
                      </p>
                    )}
                  </div>
                );
              }

              // Arrow list card (→ items, with optional indented continuation lines)
              if (lines.some((l) => l.trim().startsWith('→'))) {
                // Group lines: → starts new item, indented lines continue previous
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
                    borderRadius: 6,
                    padding: '12px 16px',
                    margin: '1rem 0',
                  }}>
                    {items.map((item, j) => (
                      <div key={j} style={{
                        display: 'block',
                        padding: '4px 0',
                        paddingLeft: 16,
                        fontFamily: SERIF,
                        fontSize: 15,
                        lineHeight: 1.75,
                  fontWeight: 500,
                        color: '#1a1a1a',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#888888',
                          fontFamily: "'Courier New', monospace",
                        }}>→</span>
                        {renderInline(item, j)}
                      </div>
                    ))}
                  </div>
                );
              }

              // Numbered list
              if (lines.every((l) => /^(\d+\.|-)/.test(l.trim()) || l.trim() === '')) {
                return (
                  <ul key={i} style={{
                    fontFamily: SERIF,
                    fontSize: 15,
                    lineHeight: 1.75,
                  fontWeight: 500,
                    color: '#1a1a1a',
                    margin: '0 0 1.4rem',
                    paddingLeft: 20,
                    listStyle: 'none',
                  }}>
                    {lines.filter((l) => l.trim()).map((l, j) => (
                      <li key={j} style={{ marginBottom: 4 }}>
                        {renderInline(l.trim(), j)}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Blockquote: starts with `"`
              if (trimmed.startsWith('"') || trimmed.startsWith('  "')) {
                return (
                  <blockquote key={i} style={{
                    borderLeft: '3px solid #808080',
                    margin: '0 0 1.4rem',
                    paddingLeft: 16,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#555555',
                  }}>
                    {renderInline(trimmed, 'quote')}
                  </blockquote>
                );
              }

              // Regular paragraph
              return (
                <p key={i} style={{
                  fontFamily: SERIF,
                  fontSize: 15,
                  lineHeight: 1.75,
                  fontWeight: 500,
                  color: '#1a1a1a',
                  margin: '0 0 1.4rem',
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#C0C0C0' }}>
      <MenuBar items={menuItems} />
      <div
        className="win95-selectable"
        style={{
          flex: 1,
          background: '#FFFFFF',
          fontFamily: "'W95FA', 'Courier New', Courier, monospace",
          fontSize: 14,
          lineHeight: 1.9,
          color: '#000000',
          padding: '4px 8px',
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

export function NotepadWindow({ fileId }: NotepadWindowProps) {
  const entry = findEntry(fileId);
  if (!entry) return null;

  if (isBlogPost(entry)) {
    return <BlogPostReader entry={entry} />;
  }

  return <PlainTextReader entry={entry} />;
}
