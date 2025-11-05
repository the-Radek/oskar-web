import IconTooltip from '@/components/reactive/IconTooltip';
import { OpenNewProps } from './open-new.types';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function OpenNew({ children, tooltip = 'after', ...rest }: OpenNewProps) {
  return (
    <IconTooltip icon={<OpenInNewIcon />} tooltip={tooltip}>
      <Link target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </Link>
    </IconTooltip>
  );
}
