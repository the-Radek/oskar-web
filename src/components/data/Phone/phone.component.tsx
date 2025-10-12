import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import type { PhoneProps } from './phone.types';
import IconTooltip from '@/components/reactive/IconTooltip';

export default function Phone(props: PhoneProps) {
  const { children, idd = '+420', tooltip } = props;
  const phone = children.includes('+') ? children : idd + children;
  const href = 'tel:' + phone.replace(/[^\d+]/g, '');

  return (
    <IconTooltip icon={<PhoneIcon />} tooltip={tooltip}>
      <Link href={href} underline="hover">
        {children}
      </Link>
    </IconTooltip>
  );
}
