import { SkeletonProps } from '@mui/material/Skeleton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactElement } from 'react';

export interface IconSkeletonProps extends SkeletonProps {
  icon?: ReactElement<SvgIconProps>;
}
