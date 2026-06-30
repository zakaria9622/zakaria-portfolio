import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 627;
const OUT_DIR = path.join(process.cwd(), "public", "og");

const cards = [
  {
    file: "home.png",
    kicker: "PORTFOLIO",
    title: "Zakaria Maachou",
    subtitle: "Data, BI & Performance",
    badges: ["SQL", "Tableau", "Python", "Looker", "Data Quality"],
    footer: "Portfolio & case studies",
    accent: "#22d3ee",
    accentSoft: "#0e7490",
  },
  {
    file: "profit-leak.png",
    kicker: "CASE STUDY",
    title: "Profit Leak Analysis",
    subtitle: "E-commerce margin, discount and loss diagnostics",
    badges: ["SQL", "Tableau", "Python"],
    footer: "Zakaria Maachou - Analytics case study",
    accent: "#f59e0b",
    accentSoft: "#92400e",
  },
  {
    file: "funnel-analysis.png",
    kicker: "CASE STUDY",
    title: "Funnel Analysis",
    subtitle: "View -> Cart -> Purchase conversion diagnostics",
    badges: ["SQL", "Tableau", "Python"],
    footer: "Zakaria Maachou - Analytics case study",
    accent: "#38bdf8",
    accentSoft: "#0369a1",
  },
  {
    file: "rfm-segmentation.png",
    kicker: "CASE STUDY",
    title: "Customer Segmentation RFM",
    subtitle: "CRM segmentation and retention recommendations",
    badges: ["Python", "pandas", "CRM Analytics"],
    footer: "Zakaria Maachou - Analytics case study",
    accent: "#34d399",
    accentSoft: "#047857",
  },
  {
    file: "renewalos.png",
    kicker: "CASE STUDY",
    title: "RenewalOS",
    subtitle: "Revenue quality, account health and CSM prioritization",
    badges: ["DuckDB", "dbt", "Python", "Streamlit", "OR-Tools"],
    footer: "Zakaria Maachou - Analytics case study",
    accent: "#2dd4bf",
    accentSoft: "#0f766e",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function textLines(lines, x, y, size, color, weight = 600, lineHeight = 1.28) {
  return lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : size * lineHeight * index;
      return `<text x="${x}" y="${y + dy}" class="text" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`;
    })
    .join("\n");
}

function badgeGroup(badges, accent) {
  let x = 96;
  const y = 387;
  const gap = 14;

  return badges
    .map((badge) => {
      const width = Math.max(92, badge.length * 14 + 36);
      const markup = `
        <g>
          <rect x="${x}" y="${y}" width="${width}" height="48" rx="8" fill="#0c1828" stroke="${accent}" stroke-opacity="0.42"/>
          <text x="${x + 18}" y="${y + 31}" class="mono" font-size="22" font-weight="700" fill="#e5edf6">${escapeXml(badge)}</text>
        </g>`;
      x += width + gap;
      return markup;
    })
    .join("\n");
}

function svg(card) {
  const subtitleLines = wrapText(card.subtitle, 52);
  const titleSize = card.title.length > 24 ? 66 : 76;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.58" stop-color="#0b1524"/>
      <stop offset="1" stop-color="#101827"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#26364d" stroke-width="1" stroke-opacity="0.24"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#020617" flood-opacity="0.34"/>
    </filter>
    <style>
      .text { font-family: "Segoe UI", Inter, Arial, sans-serif; letter-spacing: 0; }
      .mono { font-family: "Cascadia Mono", "JetBrains Mono", Consolas, monospace; letter-spacing: 0; }
    </style>
  </defs>

  <rect width="1200" height="627" fill="url(#bg)"/>
  <rect width="1200" height="627" fill="url(#grid)" opacity="0.58"/>
  <rect x="46" y="46" width="1108" height="535" rx="10" fill="#081322" fill-opacity="0.76" stroke="#26364d" stroke-width="1.5" filter="url(#softShadow)"/>
  <rect x="72" y="90" width="7" height="98" rx="3.5" fill="${card.accent}"/>
  <rect x="866" y="84" width="232" height="8" rx="4" fill="${card.accent}" opacity="0.92"/>
  <rect x="866" y="110" width="168" height="8" rx="4" fill="${card.accentSoft}" opacity="0.5"/>
  <rect x="866" y="136" width="206" height="8" rx="4" fill="#334155" opacity="0.46"/>
  <path d="M96 504 H1104" stroke="#334155" stroke-width="1.5" stroke-opacity="0.75"/>
  <path d="M96 470 H286" stroke="${card.accent}" stroke-width="2" stroke-opacity="0.85"/>

  <text x="96" y="118" class="mono" font-size="22" font-weight="800" fill="${card.accent}">${escapeXml(card.kicker)}</text>
  ${textLines([card.title], 96, 219, titleSize, "#f8fafc", 800, 1.1)}
  ${textLines(subtitleLines, 98, 302, 34, "#cbd5e1", 600, 1.32)}
  ${badgeGroup(card.badges, card.accent)}
  <text x="96" y="550" class="text" font-size="24" font-weight="650" fill="#e2e8f0">${escapeXml(card.footer)}</text>
  <text x="1104" y="550" class="mono" text-anchor="end" font-size="19" font-weight="700" fill="#94a3b8">DATA / BI</text>
</svg>`;
}

await fs.mkdir(OUT_DIR, { recursive: true });

for (const card of cards) {
  const output = path.join(OUT_DIR, card.file);
  await sharp(Buffer.from(svg(card))).png().toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(`${path.relative(process.cwd(), output)} ${metadata.width}x${metadata.height}`);
}
