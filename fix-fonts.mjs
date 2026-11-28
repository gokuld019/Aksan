import fs from "fs";
import path from "path";

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

for (const file of walk("src")) {
  if (!/\.(js|jsx|ts|tsx)$/.test(file)) continue;
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("next/font/google")) continue;

  const m = s.match(/const\s+(\w+)\s*=\s*Noto_Sans\(\{[\s\S]*?\}\);?/);
  if (m) {
    const name = m[1];
    s = s.replace(m[0], "");
    s = s.replace(
      /import\s*\{\s*Noto_Sans\s*\}\s*from\s*["']next\/font\/google["'];?\r?\n?/,
      ""
    );
    s = s.split(`${name}.className`).join('"font-noto"');
    s = s.split(`${name}.style.fontFamily`).join('"\'Noto Sans\', sans-serif"');
    fs.writeFileSync(file, s);
    console.log("fixed:", file);
  }

  if (fs.readFileSync(file, "utf8").includes("next/font/google")) {
    console.log("CHECK MANUALLY (still uses next/font/google):", file);
  }
}