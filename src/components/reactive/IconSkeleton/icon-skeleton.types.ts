import { SkeletonProps } from '@mui/material/Skeleton';
import { ReactElement } from 'react';

type ReactElementWithClassName<P = unknown> = ReactElement<P & { className?: string }>;

export interface IconSkeletonProps extends SkeletonProps {
  icon?: ReactElementWithClassName;
}
