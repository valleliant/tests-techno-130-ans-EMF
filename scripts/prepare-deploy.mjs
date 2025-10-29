import { promises as fs } from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copyDir(src, dest) {
  try {
    const stat = await fs.stat(src);
    if (!stat.isDirectory()) return;
  } catch {
    return; // src n'existe pas, rien à copier
  }
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else if (entry.isSymbolicLink()) {
        const link = await fs.readlink(srcPath);
        await fs.symlink(link, destPath);
      } else {
        await ensureDir(path.dirname(destPath));
        await fs.copyFile(srcPath, destPath);
      }
    })
  );
}

async function writeServerJs(deployRoot) {
  const content = `process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
require('./.next/standalone/server.js');
`;
  const target = path.join(deployRoot, "server.js");
  await fs.writeFile(target, content, "utf8");
}

async function main() {
  const deployRoot = path.join(projectRoot, "deploy");

  // Réinitialiser le dossier deploy
  await fs.rm(deployRoot, { recursive: true, force: true });
  await ensureDir(deployRoot);

  const standaloneSrc = path.join(projectRoot, ".next", "standalone");
  const staticSrc = path.join(projectRoot, ".next", "static");
  const publicSrc = path.join(projectRoot, "public");

  const standaloneDest = path.join(deployRoot, ".next", "standalone");
  const staticDest = path.join(deployRoot, ".next", "static");
  const publicDest = path.join(deployRoot, "public");

  console.log("Copie des artefacts Next standalone...");
  await copyDir(standaloneSrc, standaloneDest);
  await copyDir(staticSrc, staticDest);
  await copyDir(publicSrc, publicDest);

  await writeServerJs(deployRoot);

  console.log("Dossier deploy prêt.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


