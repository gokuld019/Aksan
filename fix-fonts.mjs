import fs from "fs";
import path from "path";

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const fonts = new Map();

for (const file of walk("src")) {
  if (!/\.(js|jsx|ts|tsx)$/.test(file)) continue;
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("next/font/google")) continue;

  const imp = s.match(
    /import\s*\{([^}]*)\}\s*from\s*["']next\/font\/google["'];?\r?\n?/
  );
  if (!imp) {
    console.log("CHECK MANUALLY:", file);
    continue;
  }

  const names = imp[1].split(",").map((x) => x.trim()).filter(Boolean);

  for (const fn of names) {
    const m = s.match(
      new RegExp(`const\\s+(\\w+)\\s*=\\s*${fn}\\(\\{[\\s\\S]*?\\}\\);?`)
    );
    if (!m) continue;

    const varName = m[1];
    const family = fn.replace(/_/g, " ");
    const cls = "font-" + fn.toLowerCase().replace(/_/g, "-");

    const wm = m[0].match(/weight\s*:\s*(\[[^\]]*\]|["'][^"']*["'])/);
    const weights = wm ? [...wm[1].matchAll(/\d+/g)].map((x) => x[0]) : [];

    if (!fonts.has(family)) fonts.set(family, { cls, weights: new Set() });
    weights.forEach((w) => fonts.get(family).weights.add(w));

    s = s.replace(m[0], "");
    s = s.split(`${varName}.className`).join(`"${cls}"`);
    s = s.split(`${varName}.variable`).join(`"${cls}"`);
    s = s
      .split(`${varName}.style.fontFamily`)
      .join(`"'${family}', sans-serif"`);
  }

  s = s.replace(imp[0], "");
  fs.writeFileSync(file, s);
  console.log("fixed:", file);

  if (s.includes("next/font/google")) {
    console.log("CHECK MANUALLY (still uses next/font/google):", file);
  }
}

if (fonts.size) {
  console.log("\n--- Add these to globals.css ---");
  for (const [family, { cls }] of fonts) {
    console.log(`.${cls} { font-family: "${family}", sans-serif; }`);
  }
  console.log("\n--- Google Fonts URL parts for layout.js ---");
  for (const [family, { weights }] of fonts) {
    const w = [...weights].sort((a, b) => a - b).join(";");
    console.log(
      `family=${family.replace(/ /g, "+")}${w ? ":wght@" + w : ""}`
    );
  }
}