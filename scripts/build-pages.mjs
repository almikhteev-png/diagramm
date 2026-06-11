import { mkdir, copyFile, rm, writeFile } from "node:fs/promises";

const distDir = new URL("../dist/", import.meta.url);
const files = ["index.html", "styles.css", "app.js", "README.md"];

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const file of files) {
  await copyFile(new URL(`../${file}`, import.meta.url), new URL(file, distDir));
}

await writeFile(new URL(".nojekyll", distDir), "");

console.log("GitHub Pages artifact prepared in dist/");
