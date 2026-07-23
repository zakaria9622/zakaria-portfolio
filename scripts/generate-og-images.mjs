import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = path.join(process.cwd(), "public", "og");
const COMPAT_HOME_OUTPUT = path.join(process.cwd(), "public", "og-image.png");

const palette = {
  ink: "#141512",
  paper: "#f2eee4",
  paperDeep: "#e5dfd2",
  slate: "#60625e",
  signal: "#2458e8",
  white: "#fffdf7",
};

const cards = [
  {
    file: "home.png",
    marker: "PORTFOLIO / EDITORIAL GROWTH LAB",
    titleLines: [
      "Marketing Data Analyst |",
      "Growth, Acquisition,",
      "Conversion & Retention",
    ],
    question: "Analytical rigor, marketing judgment and transparent evidence.",
    signature: ["QUESTION", "EVIDENCE", "DECISION"],
    index: "00",
  },
  {
    file: "funnel-analysis.png",
    marker: "CASE STUDY / CONVERSION ANALYTICS",
    titleLines: ["E-commerce", "Funnel Analysis"],
    question: "Where do users drop before purchase?",
    signature: ["VIEW", "CART", "PURCHASE"],
    index: "01",
  },
  {
    file: "rfm-segmentation.png",
    marker: "CASE STUDY / CRM & RETENTION",
    titleLines: ["Customer", "Segmentation RFM"],
    question: "Which customers should CRM prioritize?",
    signature: ["CUSTOMER SHARE", "REVENUE SHARE", "CRM PRIORITY"],
    index: "02",
  },
  {
    file: "profit-leak.png",
    marker: "CASE STUDY / PROFITABILITY",
    titleLines: ["Profit Leak", "Analysis"],
    question: "Where is margin being destroyed?",
    signature: ["REVENUE", "PROFIT", "PRESSURE"],
    index: "03",
  },
  {
    file: "renewalos.png",
    marker: "CASE STUDY / REVENUE QUALITY",
    titleLines: ["RenewalOS"],
    question:
      "Can revenue KPIs be trusted before Customer Success teams prioritize accounts?",
    signature: ["QUALITY GATE", "KPI STATUS", "DECISION"],
    index: "04",
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

function textLines(
  lines,
  {
    x,
    y,
    size,
    color,
    family = "display",
    weight = 500,
    lineHeight = 1,
  },
) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * size * lineHeight}" class="${family}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function signatureRegister(card) {
  const startY = 212;
  const gap = 96;

  return card.signature
    .map((label, index) => {
      const y = startY + index * gap;
      const connector =
        index === card.signature.length - 1
          ? ""
          : `<path d="M 939 ${y + 25} V ${y + gap - 20}" stroke="${palette.white}" stroke-opacity="0.42" stroke-width="1"/>`;

      return `
        <g>
          <rect x="924" y="${y - 5}" width="30" height="30" fill="none" stroke="${palette.white}" stroke-opacity="0.72"/>
          <text x="939" y="${y + 15}" class="mono" text-anchor="middle" font-size="11" font-weight="700" fill="${palette.white}">${String(index + 1).padStart(2, "0")}</text>
          <text x="978" y="${y + 14}" class="mono" font-size="14" font-weight="700" letter-spacing="1.8" fill="${palette.white}">${escapeXml(label)}</text>
          ${connector}
        </g>`;
    })
    .join("\n");
}

function svg(card) {
  const isHome = card.file === "home.png";
  const titleSize = isHome ? 58 : card.titleLines.length === 1 ? 96 : 82;
  const titleY = isHome ? 184 : card.titleLines.length === 1 ? 235 : 205;
  const titleLineHeight = isHome ? 0.96 : 0.9;
  const questionLines = wrapText(card.question, isHome ? 52 : 43);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="paperRule" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 H 0 V 64" fill="none" stroke="${palette.ink}" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
    <style>
      .display { font-family: Georgia, "Times New Roman", serif; letter-spacing: -2px; }
      .sans { font-family: "Segoe UI", Arial, sans-serif; }
      .mono { font-family: "Cascadia Mono", Consolas, monospace; }
    </style>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${palette.paper}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#paperRule)"/>
  <rect x="856" width="344" height="${HEIGHT}" fill="${palette.signal}"/>

  <path d="M 68 66 H 810" stroke="${palette.ink}" stroke-width="1.5"/>
  <path d="M 68 552 H 810" stroke="${palette.ink}" stroke-opacity="0.42" stroke-width="1"/>
  <path d="M 68 66 V 552" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="1"/>
  <path d="M 810 66 V 552" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="1"/>

  <text x="68" y="98" class="mono" font-size="13" font-weight="700" letter-spacing="1.7" fill="${palette.signal}">${escapeXml(card.marker)}</text>
  <text x="810" y="98" class="mono" text-anchor="end" font-size="13" font-weight="700" letter-spacing="1.7" fill="${palette.slate}">ZAKARIA MAACHOU</text>

  ${textLines(card.titleLines, {
    x: 68,
    y: titleY,
    size: titleSize,
    color: palette.ink,
    weight: 500,
    lineHeight: titleLineHeight,
  })}

  <text x="68" y="440" class="mono" font-size="12" font-weight="700" letter-spacing="1.8" fill="${palette.slate}">BUSINESS QUESTION / POSITION</text>
  ${textLines(questionLines, {
    x: 68,
    y: 478,
    size: isHome ? 25 : 29,
    color: palette.ink,
    family: "sans",
    weight: 600,
    lineHeight: 1.22,
  })}

  <text x="68" y="588" class="mono" font-size="13" font-weight="700" letter-spacing="1.3" fill="${palette.slate}">ZAKARIAMAACHOU.COM</text>
  <text x="810" y="588" class="mono" text-anchor="end" font-size="13" font-weight="700" letter-spacing="1.3" fill="${palette.slate}">MARKETING / DATA / DECISIONS</text>

  <text x="924" y="88" class="mono" font-size="13" font-weight="700" letter-spacing="1.8" fill="${palette.white}">ANALYTICAL SIGNATURE</text>
  <text x="1136" y="158" class="display" text-anchor="end" font-size="92" font-weight="500" fill="${palette.white}" fill-opacity="0.2">${card.index}</text>
  ${signatureRegister(card)}
  <path d="M 924 530 H 1136" stroke="${palette.white}" stroke-opacity="0.52" stroke-width="1"/>
  <text x="924" y="564" class="mono" font-size="12" font-weight="700" letter-spacing="1.7" fill="${palette.white}">EDITORIAL GROWTH LAB</text>
  <text x="924" y="590" class="sans" font-size="16" font-weight="600" fill="${palette.white}">Evidence before assertion.</text>
</svg>`;
}

await fs.mkdir(OUT_DIR, { recursive: true });

for (const card of cards) {
  const output = path.join(OUT_DIR, card.file);
  await sharp(Buffer.from(svg(card)))
    .png({ compressionLevel: 9, palette: true, quality: 96 })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  const stats = await fs.stat(output);
  console.log(
    `${path.relative(process.cwd(), output)} ${metadata.width}x${metadata.height} ${Math.round(stats.size / 1024)} KiB`,
  );
}

await fs.copyFile(path.join(OUT_DIR, "home.png"), COMPAT_HOME_OUTPUT);
const compatMetadata = await sharp(COMPAT_HOME_OUTPUT).metadata();
const compatStats = await fs.stat(COMPAT_HOME_OUTPUT);
console.log(
  `${path.relative(process.cwd(), COMPAT_HOME_OUTPUT)} ${compatMetadata.width}x${compatMetadata.height} ${Math.round(compatStats.size / 1024)} KiB`,
);
