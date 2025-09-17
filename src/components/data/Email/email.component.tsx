'use client';
import Link from '@mui/material/Link';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import type { EmailProps } from './email.types';

export default function Email(props: EmailProps) {
  const { children, tooltip = 'before' } = props;
  const position = tooltip === 'before' ? 'left' : 'right';
  const href = 'mailto:' + children;

  return (
    <Tooltip
      title={<AlternateEmailIcon sx={{ fontSize: (theme) => theme.typography.caption.fontSize }} />}
      placement={position}
      disableInteractive
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="${position}"] .${tooltipClasses.tooltip}`]:
              {
                margin: 0,
              },
          },
        },
        tooltip: {
          sx: (theme) => ({
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            margin: 0,
            padding: 0,
          }),
        },
        transition: { timeout: 0 },
      }}
    >
      <Link href={href}>{children}</Link>
    </Tooltip>
  );
}
