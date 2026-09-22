import styles from './surface.module.css';
import { SurfaceProps } from './surface.types';
import clsx from 'clsx';

export default function Surface(props: SurfaceProps) {
  const {
    component: Component = 'div',
    variant = 'elevation',
    children,
    className,
    ...rest
  } = props;

  return (
    <Component className={clsx(styles.root, styles[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
