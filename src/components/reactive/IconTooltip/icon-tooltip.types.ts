import { SvgIconProps } from '@mui/material/SvgIcon';
import { TooltipProps } from '@mui/material/Tooltip';
import { ReactElement } from 'react';

export interface IconTooltipProps extends Omit<TooltipProps, 'title'> {
  icon: ReactElement<SvgIconProps>;
  tooltip?: 'before' | 'after';
}
