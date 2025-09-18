import { IconSkeletonProps } from '../IconSkeleton';

export interface ProgressiveIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  icon?: IconSkeletonProps['icon'];
}
