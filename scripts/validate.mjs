import { readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "bpm-server.js",
  "README.md",
];

const failures = [];

for (const file of requiredFiles) {
  try {
    await readFile(file, "utf8");
  } catch {
    failures.push(`Missing ${file}`);
  }
}

const html = await readOptional("index.html");
const styles = await readOptional("styles.css");
const app = await readOptional("app.js");
const server = await readOptional("bpm-server.js");
const readme = await readOptional("README.md");

assertIncludes(html, "BPM Agent Studio", "HTML contains the BPM Agent Studio shell.");
assertIncludes(html, "Клиентская версия", "HTML exposes the client presentation mode.");
assertIncludes(styles, ".presentation-stage", "Styles include the presentation stage.");
assertIncludes(app, "buildModelFromBrief", "App can generate a BPM model from a brief.");
assertIncludes(app, "localStorage", "App saves editable changes locally.");
assertIncludes(app, "exportSvg", "App can export the diagram as SVG.");
assertIncludes(app, "exportPng", "App can export the full diagram as PNG.");
assertIncludes(app, "exportPdf", "App can export the full diagram as PDF.");
assertIncludes(app, "renderOnboarding", "App renders onboarding from process actions.");
assertIncludes(app, "calculateAnalytics", "App calculates process analytics.");
assertIncludes(server, "BPM Agent Studio running", "Server runs the BPM app.");
assertNotIncludes(app, "OPENAI_API_KEY", "Client must not reference secrets.");
assertIncludes(readme, "Формат шагов", "README documents the process step format.");

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Validation passed.");

async function readOptional(file) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

function assertIncludes(source, text, message) {
  if (!source.includes(text)) {
    failures.push(message);
  }
}

function assertNotIncludes(source, text, message) {
  if (source.includes(text)) {
    failures.push(message);
  }
}
