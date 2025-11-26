import { execSync } from "node:child_process";

const name = process.argv[2];

if (!name) {
  console.error("Error: Migration name required.\nUsage: npm run migrate <name>");
  process.exit(1);
}

execSync(`npx prisma migrate dev --name "${name}"`, { stdio: "inherit" });
execSync(`npx prisma generate`, { stdio: "inherit" });
