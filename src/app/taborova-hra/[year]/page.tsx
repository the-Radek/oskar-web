import Image from 'next/image';
import styles from './page.module.css';
import config from './page.config.json';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';
import MenuPagination from '@/components/navigation/MenuPagination';
import Markdown from '@/components/layout/Markdown/markdown.component';

type Year = keyof typeof config;

function assertValidYear(year: string): asserts year is Year {
  if (!(year in config)) notFound();
}

export async function generateStaticParams() {
  return Object.keys(config).map((year) => ({ year }));
}

export default async function ThemedYearGame({ params }: PageProps<'/taborova-hra/[year]'>) {
  const { year } = await params;
  assertValidYear(year);

  const pages = Object.entries(config)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([y, v]) => ({
      label: `${y} - ${v.title}`,
      href: `/taborova-hra/${y}`,
    }));
  const index = pages.findIndex(({ href }) => href === `/taborova-hra/${year}`);

  const themedGame = config[year as keyof typeof config];
  let imageTemplate = null;

  if (themedGame.image) {
    const { alt, ...imgProps } = themedGame.image;
    imageTemplate = (
      <Image
        alt={alt}
        {...imgProps}
        sizes="(max-width: 600px) 33vw, (max-width: 900px) 200px, 300px"
        className={styles.img}
      />
    );
  }

  return (
    <>
      <MenuPagination pages={pages} current={index} label={year} className={styles.pagination} />
      <section className={styles.game}>
        {imageTemplate}
        <Typography variant="h2">{themedGame.title}</Typography>
        <Markdown>{themedGame.description}</Markdown>
      </section>
    </>
  );
}
