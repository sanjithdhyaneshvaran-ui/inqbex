// Inqbex logo geometry. Redrawn as vector from the approved raster lockup (2000×700 reference).
// Letters are centre-line strokes so they can be drawn on in animation (see loader, step 6).
// Green appears only in the arrow. Everything else follows the UI palette.

export const STROKE = 44;
export const ARROW_STROKE = 42;

// Letters on stroke centre-lines. Baseline y=472, x-height y=238, ascender y=160.
export const letters = {
  iStem: "M210 238V472",
  iDot: { x: 188, y: 163, size: 44 },
  n: "M290 472V322A63 63 0 0 1 353 259H446A63 63 0 0 1 509 322V472",
  // q bowl stops short of the stem, as in the reference
  q: "M810.5 532V322A63 63 0 0 0 747.5 259H647.5A63 63 0 0 0 584.5 322V387.5A63 63 0 0 0 647.5 450.5H776",
  b: "M890 160V387.5A63 63 0 0 0 953 450.5H1043A63 63 0 0 0 1106 387.5V322A63 63 0 0 0 1043 259H868",
  // e: from the crossbar, up the right side, over the top and down the left
  e: "M1262 361H1456.5V322A63 63 0 0 0 1393.5 259H1260A83 83 0 0 0 1177 342V369.5",
  // slanted cut on the crossbar's open end
  eBarCap: "M1269 339L1247 383L1264 383L1264 339Z",
  // x: single white diagonal with horizontal cuts. The arrow forms the other diagonal
  x: "M1524 238H1588L1822 472H1758Z",
};

// Arrow continues from the e's lower-left curve and rises through the x
export const arrow = {
  shaft: "M1177 369.5A83 83 0 0 0 1260 452.5H1470C1530 452.5 1580 451.3 1620 415L1782 268",
  head: "M1862 177L1730 238L1828 297Z",
  // gap cut out of the x where the arrow crosses it
  knockoutWidth: 70,
};

export const tagline =
  "M422.4 603.5Q417.5 603.5 413.4 601.9Q409.4 600.3 406.4 597.4Q403.4 594.5 401.7 590.6Q400 586.7 400 582Q400 577.3 401.7 573.4Q403.4 569.5 406.4 566.6Q409.4 563.7 413.5 562.1Q417.6 560.5 422.5 560.5Q427.5 560.5 431.6 562.1Q435.8 563.8 438.6 567L434.9 570.7Q432.3 568.2 429.3 567Q426.3 565.9 422.7 565.9Q419.1 565.9 416 567.1Q413 568.3 410.7 570.4Q408.5 572.6 407.2 575.5Q406 578.5 406 582Q406 585.4 407.2 588.4Q408.5 591.4 410.7 593.5Q413 595.7 416 596.9Q419.1 598.1 422.7 598.1Q426 598.1 429.1 597.1Q432.2 596 434.9 593.6L438.3 598.1Q435.2 600.8 431 602.1Q426.8 603.5 422.4 603.5ZM438.3 598.1 432.5 597.4V581.8H438.3ZM509 603V561H525.4Q533.5 561 538.2 564.9Q542.9 568.7 542.9 575.6Q542.9 580.2 540.8 583.5Q538.7 586.7 534.8 588.5Q530.9 590.2 525.4 590.2H512.3L515 587.5V603ZM537.1 603 526.4 587.8H532.8L543.6 603ZM515 588.1 512.3 585.1H525.2Q531 585.1 533.9 582.6Q536.9 580.1 536.9 575.6Q536.9 571.1 533.9 568.7Q531 566.2 525.2 566.2H512.3L515 563.2ZM628.4 603.5Q623.6 603.5 619.5 601.9Q615.4 600.2 612.4 597.3Q609.4 594.4 607.7 590.5Q606 586.6 606 582Q606 577.4 607.7 573.5Q609.4 569.6 612.4 566.7Q615.4 563.8 619.4 562.1Q623.5 560.5 628.4 560.5Q633.2 560.5 637.2 562.1Q641.3 563.7 644.3 566.6Q647.3 569.5 649 573.4Q650.6 577.3 650.6 582Q650.6 586.7 649 590.6Q647.3 594.5 644.3 597.4Q641.3 600.3 637.2 601.9Q633.2 603.5 628.4 603.5ZM628.4 598.1Q631.9 598.1 634.8 596.9Q637.8 595.7 640 593.5Q642.2 591.4 643.4 588.4Q644.6 585.5 644.6 582Q644.6 578.5 643.4 575.6Q642.2 572.6 640 570.5Q637.8 568.3 634.8 567.1Q631.9 565.9 628.4 565.9Q624.8 565.9 621.9 567.1Q618.9 568.3 616.7 570.5Q614.5 572.6 613.2 575.6Q612 578.5 612 582Q612 585.5 613.2 588.4Q614.5 591.4 616.7 593.5Q618.9 595.7 621.9 596.9Q624.8 598.1 628.4 598.1ZM724 603 710 561H716.2L729.1 599.8H726L739.3 561H744.9L757.9 599.8H754.9L768 561H773.7L759.7 603H753.4L741.1 567.1H742.8L730.5 603ZM849.4 603V566.2H835V561H869.7V566.2H855.3V603ZM961.1 603V561H967.1V603ZM931 603V561H937V603ZM936.4 584.3V579.1H961.7V584.3ZM1108.1 603.5Q1103.3 603.5 1098.9 602Q1094.5 600.5 1092 598.2L1094.2 593.5Q1096.6 595.6 1100.3 597Q1104.1 598.4 1108.1 598.4Q1111.7 598.4 1114 597.5Q1116.3 596.7 1117.4 595.2Q1118.5 593.8 1118.5 591.9Q1118.5 589.7 1117 588.4Q1115.6 587.1 1113.4 586.3Q1111.1 585.5 1108.4 584.9Q1105.7 584.3 1103 583.5Q1100.3 582.7 1098 581.4Q1095.8 580.1 1094.4 578Q1093 575.9 1093 572.5Q1093 569.3 1094.7 566.5Q1096.4 563.8 1100 562.2Q1103.6 560.5 1109.1 560.5Q1112.8 560.5 1116.4 561.5Q1120 562.4 1122.6 564.2L1120.6 569Q1117.9 567.2 1114.9 566.4Q1111.9 565.6 1109.1 565.6Q1105.6 565.6 1103.3 566.5Q1101 567.4 1099.9 568.9Q1098.9 570.4 1098.9 572.3Q1098.9 574.5 1100.3 575.8Q1101.7 577.1 1104 577.9Q1106.2 578.7 1108.9 579.3Q1111.6 580 1114.3 580.7Q1117.1 581.5 1119.3 582.8Q1121.6 584 1123 586.1Q1124.3 588.2 1124.3 591.5Q1124.3 594.7 1122.6 597.5Q1120.9 600.2 1117.2 601.8Q1113.6 603.5 1108.1 603.5ZM1201.4 603V566.2H1187V561H1221.7V566.2H1207.3V603ZM1302.8 603.5Q1294.5 603.5 1289.7 598.7Q1285 594 1285 584.9V561H1291V584.6Q1291 591.7 1294.1 594.9Q1297.2 598.1 1302.8 598.1Q1308.5 598.1 1311.6 594.9Q1314.7 591.7 1314.7 584.6V561H1320.5V584.9Q1320.5 594 1315.8 598.7Q1311.1 603.5 1302.8 603.5ZM1385 603V561H1402.7Q1409.4 561 1414.6 563.6Q1419.7 566.3 1422.5 571Q1425.4 575.8 1425.4 582Q1425.4 588.2 1422.5 593Q1419.7 597.7 1414.6 600.4Q1409.4 603 1402.7 603ZM1391 597.8H1402.3Q1407.6 597.8 1411.4 595.8Q1415.2 593.8 1417.3 590.2Q1419.4 586.7 1419.4 582Q1419.4 577.3 1417.3 573.7Q1415.2 570.2 1411.4 568.2Q1407.6 566.2 1402.3 566.2H1391ZM1488 603V561H1494V603ZM1576.4 603.5Q1571.6 603.5 1567.5 601.9Q1563.4 600.2 1560.4 597.3Q1557.4 594.4 1555.7 590.5Q1554 586.6 1554 582Q1554 577.4 1555.7 573.5Q1557.4 569.6 1560.4 566.7Q1563.4 563.8 1567.4 562.1Q1571.5 560.5 1576.4 560.5Q1581.2 560.5 1585.2 562.1Q1589.3 563.7 1592.3 566.6Q1595.3 569.5 1597 573.4Q1598.6 577.3 1598.6 582Q1598.6 586.7 1597 590.6Q1595.3 594.5 1592.3 597.4Q1589.3 600.3 1585.2 601.9Q1581.2 603.5 1576.4 603.5ZM1576.4 598.1Q1579.9 598.1 1582.8 596.9Q1585.8 595.7 1588 593.5Q1590.2 591.4 1591.4 588.4Q1592.6 585.5 1592.6 582Q1592.6 578.5 1591.4 575.6Q1590.2 572.6 1588 570.5Q1585.8 568.3 1582.8 567.1Q1579.9 565.9 1576.4 565.9Q1572.8 565.9 1569.9 567.1Q1566.9 568.3 1564.7 570.5Q1562.5 572.6 1561.2 575.6Q1560 578.5 1560 582Q1560 585.5 1561.2 588.4Q1562.5 591.4 1564.7 593.5Q1566.9 595.7 1569.9 596.9Q1572.8 598.1 1576.4 598.1Z";

export const viewBoxes = {
  lockup: "160 140 1730 490",
  wordmark: "160 140 1730 410",
  mark: "1140 160 740 330",
} as const;

export type LogoVariant = keyof typeof viewBoxes;
export type LogoTone = "dark" | "light" | "mono-light" | "mono-dark";

const tones: Record<
  LogoTone,
  { letters: [string, string]; tagline: string; arrow: [string, string, string] }
> = {
  // For dark backgrounds. Soft silver letters, growth-green arrow
  dark: {
    letters: ["#FFFFFF", "#C9C4CD"],
    tagline: "#D8D3DB",
    arrow: ["#DAD6DE", "#00D26A", "#A6FF00"],
  },
  // For light backgrounds (brand sheet "light mode" greens)
  light: {
    letters: ["#13101A", "#13101A"],
    tagline: "#13101A",
    arrow: ["#13101A", "#00B85A", "#6FD900"],
  },
  "mono-light": {
    letters: ["#FAF9F6", "#FAF9F6"],
    tagline: "#FAF9F6",
    arrow: ["#FAF9F6", "#FAF9F6", "#FAF9F6"],
  },
  "mono-dark": {
    letters: ["#13101A", "#13101A"],
    tagline: "#13101A",
    arrow: ["#13101A", "#13101A", "#13101A"],
  },
};

type LogoSvgOptions = {
  variant?: LogoVariant;
  tone?: LogoTone;
  idPrefix?: string;
  title?: string;
  className?: string;
};

// Returns standalone SVG markup. Used by the <Logo> component and the export script.
export function logoSvg({
  variant = "lockup",
  tone = "dark",
  idPrefix = "inqbex",
  title = "Inqbex Growth Studio",
  className,
}: LogoSvgOptions = {}) {
  const t = tones[tone];
  const id = (s: string) => `${idPrefix}-${s}`;
  const showWordmark = variant !== "mark";
  const strokeAttrs = `fill="none" stroke-width="${STROKE}" stroke-linejoin="round"`;

  const wordmark = showWordmark
    ? `<g stroke="url(#${id("silver")})" ${strokeAttrs}>
  <path d="${letters.iStem}"/>
  <path d="${letters.n}"/>
  <path d="${letters.q}"/>
  <path d="${letters.b}"/>
</g>
<rect x="${letters.iDot.x}" y="${letters.iDot.y}" width="${letters.iDot.size}" height="${letters.iDot.size}" fill="url(#${id("silver")})"/>
<path d="${letters.x}" fill="url(#${id("silver")})" mask="url(#${id("knockout")})"/>`
    : "";

  const taglineMarkup =
    variant === "lockup" ? `<path d="${tagline}" fill="${t.tagline}"/>` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxes[variant]}" role="img" aria-labelledby="${id("title")}"${
    className ? ` class="${className}"` : ""
  }>
<title id="${id("title")}">${title}</title>
<defs>
  <linearGradient id="${id("silver")}" x1="0" y1="160" x2="0" y2="532" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${t.letters[0]}"/>
    <stop offset="1" stop-color="${t.letters[1]}"/>
  </linearGradient>
  <linearGradient id="${id("growth")}" x1="1180" y1="0" x2="1862" y2="0" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${t.arrow[0]}"/>
    <stop offset="0.16" stop-color="${t.arrow[1]}"/>
    <stop offset="1" stop-color="${t.arrow[2]}"/>
  </linearGradient>
  <mask id="${id("knockout")}" maskUnits="userSpaceOnUse" x="1400" y="140" width="500" height="400">
    <rect x="1400" y="140" width="500" height="400" fill="#fff"/>
    <path d="${arrow.shaft}" fill="none" stroke="#000" stroke-width="${arrow.knockoutWidth}"/>
  </mask>
</defs>
${wordmark}
<g stroke="url(#${id("silver")})" ${strokeAttrs}>
  <path d="${letters.e}"/>
</g>
<path d="${letters.eBarCap}" fill="url(#${id("silver")})"/>
<path d="${arrow.shaft}" fill="none" stroke="url(#${id("growth")})" stroke-width="${ARROW_STROKE}" stroke-linejoin="round"/>
<path d="${arrow.head}" fill="url(#${id("growth")})" stroke="url(#${id("growth")})" stroke-width="6" stroke-linejoin="round"/>
${taglineMarkup}
</svg>`;
}

// App icon / favicon: the e-to-arrow mark on a rounded dark tile.
export function iconSvg({ size = 512, idPrefix = "inqbex-icon" } = {}) {
  const pad = size * 0.14;
  const w = size - pad * 2;
  const h = (w * 330) / 740;
  const mark = logoSvg({ variant: "mark", idPrefix, title: "Inqbex" }).replace(
    "<svg ",
    `<svg x="${pad}" y="${(size - h) / 2}" width="${w}" height="${h}" `,
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#13101A"/>
${mark}
</svg>`;
}
