import Tooltip from '@mui/material/Tooltip';
import type { IconTooltipProps } from './icon-tooltip.types';
import { cloneElement } from 'react';
import styles from './icon-tooltip.module.css';

export default function Phone(props: IconTooltipProps) {
  const { icon, tooltip = 'before', children, ...rest } = props;
  const position = tooltip === 'before' ? 'left' : 'right';

  return (
    <Tooltip
      title={cloneElement(icon, { fontSize: 'inherit' })}
      placement={position}
      disableInteractive
      slotProps={{
        transition: { timeout: 0 },
      }}
      classes={{
        tooltip: styles.tooltip,
        popper: styles.popper,
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}
