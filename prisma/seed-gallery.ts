/**
 * Fills the gallery with generated test images, or removes them with `--clean`.
 *
 * Rows are owned by the seed user and files live in `public/galerie/_seed/`. Cleaning removes only
 * the seed user's rows and the files they point to, and seeding never overwrites a file.
 */
import { mkdir, readdir, rm, rmdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import nextEnv from '@next/env';
import { PrismaPg } from '@prisma/adapter-pg';
import sharp from 'sharp';
import { postgresUrl } from '../src/lib/utilities/postgres-url';
import { PrismaClient } from './generated/client';

// src/lib/prisma.ts can't be used here: plain Node can't take named imports from CommonJS @next/env
nextEnv.loadEnvConfig(process.cwd());
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: postgresUrl(true) }) });

// .invalid is a reserved domain, so this can never be a real user
const SEED_EMAIL = 'seed-gallery@example.invalid';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SEED_DIR = '/galerie/_seed';
const FILE_SIZE = 16;
const LONG_SIDE = 1200;
const RATIOS = [3 / 2, 2 / 3, 4 / 3, 3 / 4, 16 / 9, 1];

// uneven on purpose: a nearly empty year, a big one and a year without images (2020)
const IMAGES_PER_YEAR: Record<number, number> = {
  2026: 40,
  2025: 250,
  2024: 120,
  2023: 90,
  2022: 10,
  2021: 75,
  2019: 110,
  2018: 65,
  2017: 95,
  2016: 55,
  2015: 90,
};

let seed = 42;
function random() {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
}

function pick<T>(items: T[]) {
  return items[Math.floor(random() * items.length)];
}

/** Random dates within `year`, mostly in the summer camp months, newest first. */
function datesIn(year: number, count: number) {
  return Array.from({ length: count }, () => {
    const summer = random() < 0.7;
    const start = Date.UTC(year, summer ? 6 : 0, 1);
    const end = summer ? Date.UTC(year, 8, 1) : Date.UTC(year + 1, 0, 1);
    return new Date(start + Math.floor(random() * (end - start)));
  }).sort((a, b) => b.getTime() - a.getTime());
}

/** Full-size dimensions for the DB; the file itself is a tiny square that the browser scales. */
function sizeFor(ratio: number) {
  return ratio >= 1
    ? { width: LONG_SIDE, height: Math.round(LONG_SIDE / ratio) }
    : { width: Math.round(LONG_SIDE * ratio), height: LONG_SIDE };
}

async function writeNoise(file: string) {
  const pixels = Buffer.from(
    Array.from({ length: FILE_SIZE * FILE_SIZE * 3 }, () => Math.floor(random() * 256)),
  );
  const png = await sharp(pixels, { raw: { width: FILE_SIZE, height: FILE_SIZE, channels: 3 } })
    .png()
    .toBuffer();
  await writeFile(file, png, { flag: 'wx' });
}

async function isEmptyOrMissing(dir: string) {
  try {
    return (await readdir(dir, { recursive: true })).length === 0;
  } catch {
    return true;
  }
}

/** Removes `dir` and its subfolders as long as they are empty, keeping anything else in place. */
async function removeEmptyDirs(dir: string) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.isDirectory()) await removeEmptyDirs(path.join(dir, entry.name));
  }
  await rmdir(dir).catch(() => {});
}

async function clean() {
  const where = { author: { email: SEED_EMAIL }, src: { startsWith: `${SEED_DIR}/` } };
  const rows = await prisma.image.findMany({ where, select: { src: true } });
  await Promise.all(rows.map(({ src }) => rm(path.join(PUBLIC_DIR, src), { force: true })));
  await prisma.image.deleteMany({ where });
  await removeEmptyDirs(path.join(PUBLIC_DIR, SEED_DIR));
  console.log(`Removed ${rows.length} seeded images.`);
}

async function assertSeedDirFree() {
  const foreign = await prisma.image.count({
    where: { src: { startsWith: `${SEED_DIR}/` }, author: { email: { not: SEED_EMAIL } } },
  });
  if (foreign > 0) throw new Error(`${foreign} images of other users are in ${SEED_DIR}.`);
  if (!(await isEmptyOrMissing(path.join(PUBLIC_DIR, SEED_DIR)))) {
    throw new Error(`public${SEED_DIR} contains files the seed didn't create.`);
  }
}

async function seedGallery() {
  await assertSeedDirFree();
  const user = await prisma.user.upsert({
    where: { email: SEED_EMAIL },
    update: {},
    create: { email: SEED_EMAIL, name: 'Seed' },
  });

  const rows = [];
  for (const [year, count] of Object.entries(IMAGES_PER_YEAR)) {
    for (const [index, createdAt] of datesIn(Number(year), count).entries()) {
      const day = createdAt.toISOString().slice(0, 10);
      const src = `${SEED_DIR}/${day}/${String(index).padStart(3, '0')}.png`;
      await mkdir(path.join(PUBLIC_DIR, SEED_DIR, day), { recursive: true });
      await writeNoise(path.join(PUBLIC_DIR, src));
      rows.push({
        src,
        alt: `Testovací fotka ${day} #${index}`,
        ...sizeFor(pick(RATIOS)),
        published: true,
        authorId: user.id,
        createdAt,
      });
    }
  }

  await prisma.image.createMany({ data: rows });
  console.log(`Created ${rows.length} seeded images.`);
}

try {
  await clean();
  if (!process.argv.includes('--clean')) await seedGallery();
} finally {
  await prisma.$disconnect();
}
