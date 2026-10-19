'use client';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import type { ImageYear } from '@/lib/data/image/types';
import styles from './feed.module.css';

interface YearNavProps {
  year: number;
  /** all available years with images, sorted */
  years: ImageYear[];
  /** id used for aria-label */
  labelId: string;
  active: boolean;
  disabled?: boolean;
  onJump: (year: number) => void;
}

interface IconControlProps {
  label: string;
  target: number | undefined;
  children: React.ReactNode;
}

export default function YearNav({
  year,
  years,
  labelId,
  active,
  disabled = false,
  onJump,
}: YearNavProps) {
  const index = years.findIndex((item) => item.year === year);
  const newer = index > 0 ? years[index - 1].year : undefined;
  const older = index >= 0 ? years[index + 1]?.year : undefined;

  function IconControl({ label, target, children }: IconControlProps) {
    return (
      <IconButton
        aria-label={target ? `${label}: ${target}` : label}
        title={target ? `${target}` : undefined}
        disabled={disabled || target === undefined}
        onClick={() => target !== undefined && onJump(target)}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <div className={clsx(styles.year, active && styles.active)}>
      <div className={clsx(styles.controls, styles.controlsStart)}>
        <IconControl label="Nejnovější rok" target={newer && years[0].year}>
          <FirstPageIcon />
        </IconControl>
        <IconControl label="Novější rok" target={newer}>
          <ChevronLeftIcon />
        </IconControl>
      </div>
      <Typography id={labelId} variant="h3" className={styles.title}>
        {year}
      </Typography>
      <div className={clsx(styles.controls, styles.controlsEnd)}>
        <IconControl label="Starší rok" target={older}>
          <ChevronRightIcon />
        </IconControl>
        <IconControl label="Nejstarší rok" target={older && years[years.length - 1].year}>
          <LastPageIcon />
        </IconControl>
      </div>
    </div>
  );
}
