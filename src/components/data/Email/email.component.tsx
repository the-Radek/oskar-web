import Link from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import type { EmailProps } from './email.types';
import IconTooltip from '@/components/reactive/IconTooltip';

export default function Email({ children, tooltip = 'before' }: EmailProps) {
  const href = 'mailto:' + children;

  return (
    <IconTooltip icon={<EmailIcon />} tooltip={tooltip}>
      <Link href={href} underline="hover">
        {children}
      </Link>
    </IconTooltip>
  );
}
