import Link from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import type { EmailProps } from './email.types';
import IconTooltip from '@/components/reactive/IconTooltip';

export default function Email(props: EmailProps) {
  const { children, tooltip = 'before' } = props;
  const href = 'mailto:' + children;

  return (
    <IconTooltip icon={<EmailIcon />} tooltip={tooltip}>
      <Link href={href}>{children}</Link>
    </IconTooltip>
  );
}
