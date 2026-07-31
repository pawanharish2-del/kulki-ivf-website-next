import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Running deterministic legacy extraction script...");
try {
  execSync("npx ts-node --project tsconfig.json scripts/extract_all_data.ts", {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
  });
  console.log("Extraction completed successfully!");
} catch (error) {
  console.error("Error during extraction:", error);
  process.exit(1);
}
