import { NextRequest } from "next/server";

/**
 * GET /api/placeholder/{width}/{height}
 * Returns a styled SVG placeholder. Dimensions are clamped to safe bounds.
 *
 *   /api/placeholder/600/400
 *   /api/placeholder/600x400        (also accepted)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { dimensions: string[] } }
) {
  const parts = params.dimensions.flatMap((p) => p.split("x"));
  const w = clamp(parseInt(parts[0] ?? "800", 10) || 800, 16, 4000);
  const h = clamp(parseInt(parts[1] ?? String(Math.round(w * 0.625)), 10) || Math.round(w * 0.625), 16, 4000);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#13131A"/>
      <stop offset="100%" stop-color="#0A0A0F"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#3D7BFF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3D7BFF" stop-opacity="0"/>
    </radialGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" filter="url(#n)" opacity="0.6"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="rgba(255,255,255,0.55)" font-size="14">
    <text x="24" y="${h - 24}">${w} × ${h}</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
