'use client';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { PhoneProps } from './phone.types';

export default function Phone(props: PhoneProps) {
  const { children, idd = '+420', tooltip = 'before' } = props;
  const position = tooltip === 'before' ? 'left' : 'right';
  const phone = children.includes('+') ? children : idd + children;
  const href = 'tel:' + phone.replace(/[^\d+]/g, '');

  return (
    <Tooltip
      title={<PhoneIcon sx={{ fontSize: (theme) => theme.typography.caption.fontSize }} />}
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
