#!/usr/bin/env node
/*
 * professional-repo-docs — scaffold.mjs
 *
 * Generates professional GitHub repo documentation (README, LICENSE, FUNDING.yml,
 * CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, SUPPORT, GOVERNANCE, CHANGELOG, CITATION.cff,
 * issue/PR templates, AGENTS.md, llms.txt) from the bundled assets.
 *
 * Design rules (learned the hard way — see references/):
 *  - Copy canonical texts (LICENSE, CODE_OF_CONDUCT) VERBATIM from assets/. Never regenerate them.
 *  - Idempotent & non-destructive: only create files that are MISSING (unless --force).
 *    FUNDING.yml is always (re)written so the Sponsor link stays wired.
 *  - Never touch source code or README content the user already wrote.
 *
 * Usage:
 *   node scaffold.mjs [--dir <path>] [--license <spdx>] [--readme full|lite|none]
 *                     [--name <name>] [--owner <o>] [--repo <r>] [--branch <b>]
 *                     [--description <text>] [--citation] [--no-llms] [--no-agents] [--force]
 *
 * Defaults: dir=cwd, license=MIT, readme=lite, llms on, agents on, citation off.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, "..", "assets");

// ---------- arg parsing ----------
const args = process.argv.slice(2);
const opt = { readme: "lite", license: "MIT", llms: true, agents: true, citation: false, force: false, dir: process.cwd() };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  const next = () => args[++i];
  if (a === "--dir") opt.dir = path.resolve(next());
  else if (a === "--license") opt.license = next();
  else if (a === "--readme") opt.readme = next();
  else if (a === "--name") opt.name = next();
  else if (a === "--owner") opt.owner = next();
  else if (a === "--repo") opt.repo = next();
  else if (a === "--branch") opt.branch = next();
  else if (a === "--description") opt.description = next();
  else if (a === "--version") opt.version = next();
  else if (a === "--date") opt.date = next();
  else if (a === "--citation") opt.citation = true;
  else if (a === "--no-llms") opt.llms = false;
  else if (a === "--no-agents") opt.agents = false;
  else if (a === "--force") opt.force = true;
}

const DIR = opt.dir;
const sh = (cmd) => { try { return execSync(cmd, { cwd: DIR, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return ""; } };
const exists = (rel) => fs.existsSync(path.join(DIR, rel));
const read = (p) => fs.readFileSync(p, "utf8");
const ensureDir = (rel) => fs.mkdirSync(path.join(DIR, rel), { recursive: true });

// ---------- license registry ----------
const LICENSES = {
  "MIT": { file: "LICENSE-MIT.txt", name: "MIT", spdx: "MIT" },
  "APACHE-2.0": { file: "LICENSE-Apache-2.0.txt", name: "Apache License 2.0", spdx: "Apache-2.0" },
  "GPL-3.0": { file: "LICENSE-GPL-3.0.txt", name: "GNU GPLv3", spdx: "GPL-3.0" },
  "AGPL-3.0": { file: "LICENSE-AGPL-3.0.txt", name: "GNU AGPLv3", spdx: "AGPL-3.0" },
  "LGPL-3.0": { file: "LICENSE-LGPL-3.0.txt", name: "GNU LGPLv3", spdx: "LGPL-3.0" },
  "CC-BY-4.0": { file: "LICENSE-CC-BY-4.0.txt", name: "CC BY 4.0", spdx: "CC-BY-4.0" },
  "CC0-1.0": { file: "LICENSE-CC0-1.0.txt", name: "CC0 1.0", spdx: "CC0-1.0" },
};

// ---------- detection ----------
function titleCase(slug) {
  let n = slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const ac = { Css: "CSS", Html: "HTML", Svg: "SVG", Ai: "AI", Ui: "UI", Ux: "UX", Cli: "CLI", Api: "API",
    Sdk: "SDK", Ios: "iOS", Mlp: "MLP", Qa: "QA", Pdf: "PDF", "3d": "3D", "2d": "2D", Iot: "IoT",
    Md: "MD", Json: "JSON", Yaml: "YAML" };
  return n.split(" ").map((w) => ac[w] || w).join(" ");
}

function parseRemote() {
  const url = sh("git remote get-url origin");
  const m = url.match(/[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };
  return {};
}

function pkgJson() {
  const p = path.join(DIR, "package.json");
  if (fs.existsSync(p)) { try { return JSON.parse(read(p)); } catch { return null; } }
  return null;
}

function detectDevsetup() {
  const pkg = pkgJson();
  if (pkg) {
    const s = pkg.scripts || {};
    let o = "```bash\n# Install dependencies\nnpm install\n";
    if (s.dev) o += "\n# Start the development server\nnpm run dev\n";
    else if (s.start) o += "\n# Start the app\nnpm start\n";
    if (s.build) o += "\n# Production build\nnpm run build\n";
    if (s.lint) o += "\n# Lint\nnpm run lint\n";
    if (s.test) o += "\n# Run the test suite\nnpm test\n";
    return o + "```";
  }
  if (exists("requirements.txt"))
    return "```bash\n# (Optional) create a virtual environment\npython -m venv .venv && source .venv/bin/activate\n\n# Install dependencies\npip install -r requirements.txt\n```";
  if (exists("pyproject.toml"))
    return "```bash\n# (Optional) create a virtual environment\npython -m venv .venv && source .venv/bin/activate\n\n# Install the package and its dependencies\npip install -e .\n```";
  if (exists("go.mod"))
    return "```bash\n# Download dependencies, build and test\ngo mod download\ngo build ./...\ngo test ./...\n```";
  if (exists("Cargo.toml")) return "```bash\ncargo build\ncargo test\ncargo run\n```";
  if (exists("pubspec.yaml")) return "```bash\nflutter pub get\nflutter run\nflutter test\n```";
  if (exists("index.html"))
    return "```bash\n# Static site — no build step required. Serve locally, e.g.:\npython -m http.server 8000\n# then open http://localhost:8000\n```";
  return "See the project manifest for setup. (No recognized package manager was detected — fill in the real install/build/run commands here.)";
}

function detectStack() {
  if (exists("package.json")) {
    const pkg = pkgJson() || {};
    const d = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    if (d.next) return "Next.js / TypeScript";
    if (d.react) return "React / JavaScript";
    if (d.expo || d["react-native"]) return "React Native (Expo)";
    if (d.vue) return "Vue";
    return "Node.js / JavaScript";
  }
  if (exists("requirements.txt") || exists("pyproject.toml")) return "Python";
  if (exists("go.mod")) return "Go";
  if (exists("Cargo.toml")) return "Rust";
  if (exists("pubspec.yaml")) return "Dart / Flutter";
  if (exists("index.html")) return "Static site (HTML/CSS/JS)";
  return "Unknown — fill in the primary language/stack";
}

const remote = parseRemote();
const pkg = pkgJson();
const owner = opt.owner || remote.owner || "ChanMeng666";
const repo = opt.repo || remote.repo || path.basename(DIR);
const branch = opt.branch || sh("git symbolic-ref --short HEAD") || "main";
const name = opt.name || (pkg && pkg.name && !pkg.name.startsWith("@") ? titleCase(pkg.name) : titleCase(repo));
const description = opt.description || (pkg && pkg.description) || `${name} — a project by Chan Meng.`;
const stack = detectStack();
const devsetup = detectDevsetup();
const year = opt.date ? opt.date.slice(0, 4) : String(new Date().getFullYear());
const version = opt.version || (pkg && pkg.version) || "0.1.0";
const date = opt.date || new Date().toISOString().slice(0, 10);

const licKey = (opt.license || "MIT").toUpperCase();
const lic = LICENSES[licKey];
if (!lic) { console.error(`Unknown license '${opt.license}'. Choose one of: ${Object.keys(LICENSES).join(", ")}`); process.exit(1); }

const vars = {
  NAME: name, OWNER: owner, REPO: repo, BRANCH: branch, DESCRIPTION: description,
  STACK: stack, DEVSETUP: devsetup, LICENSE_NAME: lic.name, SPDX: lic.spdx,
  VERSION: version, DATE: date, DATESUFFIX: ` - ${date}`, TAGLINE: opt.tagline || "",
};
const render = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : `{{${k}}}`));

// ---------- writers ----------
const created = [], kept = [], wired = [];
function place(rel, content, { always = false } = {}) {
  ensureDir(path.dirname(rel) === "." ? "" : path.dirname(rel));
  if (!opt.force && !always && exists(rel)) { kept.push(rel); return; }
  fs.writeFileSync(path.join(DIR, rel), content);
  (always ? wired : created).push(rel);
}
function placeAsset(rel, assetRel, transform = (x) => x, o = {}) {
  place(rel, transform(read(path.join(ASSETS, assetRel))), o);
}

// LICENSE — verbatim copy, only fill the copyright line
function licenseText() {
  let t = read(path.join(ASSETS, "licenses", lic.file));
  t = t.replace(/\[year\]/g, year).replace(/\[fullname\]/g, "Chan Meng")
       .replace(/\[yyyy\]/g, year).replace(/\[name of copyright owner\]/g, "Chan Meng")
       .replace(/<year>/g, year).replace(/<name of author>/g, "Chan Meng");
  return t;
}

// ---------- build ----------
// 1. FUNDING.yml — always wired
placeAsset(".github/FUNDING.yml", "FUNDING.yml", (x) => x, { always: true });

// 2. LICENSE — only if missing
if (!exists("LICENSE") && !exists("LICENSE.md") && !exists("LICENSE.txt") && !exists("COPYING")) {
  place("LICENSE", licenseText());
} else kept.push("LICENSE");

// 3. CODE_OF_CONDUCT — verbatim, if missing
placeAsset("CODE_OF_CONDUCT.md", "CODE_OF_CONDUCT.md");

// 4. templated docs (if missing)
placeAsset("CONTRIBUTING.md", "CONTRIBUTING.md.tmpl", render);
placeAsset("SECURITY.md", "SECURITY.md.tmpl", render);
placeAsset("SUPPORT.md", "SUPPORT.md.tmpl", render);
placeAsset("GOVERNANCE.md", "GOVERNANCE.md.tmpl", render);
if (!exists("CHANGELOG.md")) placeAsset("CHANGELOG.md", "CHANGELOG.md.tmpl", render); else kept.push("CHANGELOG.md");

// 5. issue + PR templates
placeAsset(".github/ISSUE_TEMPLATE/bug_report.md", "ISSUE_TEMPLATE/bug_report.md");
placeAsset(".github/ISSUE_TEMPLATE/feature_request.md", "ISSUE_TEMPLATE/feature_request.md");
placeAsset(".github/ISSUE_TEMPLATE/config.yml", "ISSUE_TEMPLATE/config.yml", render);
placeAsset(".github/PULL_REQUEST_TEMPLATE.md", "PULL_REQUEST_TEMPLATE.md");

// 6. README + brand logo
if (opt.readme !== "none") {
  const tmpl = opt.readme === "full" ? "README-full.md.tmpl" : "README-lite.md.tmpl";
  placeAsset("README.md", tmpl, render);
  ensureDir(".github/brand");
  const logoDst = ".github/brand/chan-meng-logo.svg";
  if (opt.force || !exists(logoDst)) {
    fs.copyFileSync(path.join(ASSETS, "brand", "chan-meng-logo.svg"), path.join(DIR, logoDst));
    created.push(logoDst);
  } else kept.push(logoDst);
}

// 7. agent-first docs
if (opt.agents) placeAsset("AGENTS.md", "AGENTS.md.tmpl", render);
if (opt.llms) placeAsset("llms.txt", "llms.txt.tmpl", render);

// 8. CITATION.cff (optional)
if (opt.citation) placeAsset("CITATION.cff", "CITATION.cff.tmpl", render);

// ---------- report ----------
const log = (label, arr) => { if (arr.length) console.log(`\n${label}:\n  ` + arr.join("\n  ")); };
console.log(`\nprofessional-repo-docs — scaffolded "${name}" (${owner}/${repo}, branch ${branch})`);
console.log(`stack: ${stack} | license: ${lic.name} | readme: ${opt.readme}`);
log("Created", created);
log("Wired (always refreshed)", wired);
log("Kept (already present, untouched)", kept);
console.log(`\nNext steps (not files — see references/post-setup.md):`);
console.log(`  1. Enable Discussions:  gh api -X PATCH repos/${owner}/${repo} -f has_discussions=true`);
console.log(`  2. Enable the Sponsor button: turn ON Settings → Features → "Sponsorships" (no API; FUNDING.yml alone is not enough).`);
console.log(`  3. Review the generated files, fill placeholders, then commit (this script does NOT commit or push).`);
