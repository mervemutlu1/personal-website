import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILE_MAP: Record<string, string> = {
  'about-me': 'content/about-me/about-me.mdx',
  'recently': 'content/about-me/recently.mdx',
};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || !FILE_MAP[id]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), FILE_MAP[id]);
  const content = fs.readFileSync(filePath, 'utf-8');
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
