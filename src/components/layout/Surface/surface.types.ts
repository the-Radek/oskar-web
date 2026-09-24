import type { OverrideProps } from '@mui/material/OverridableComponent';

export interface SurfaceOwnProps {
  children?: React.ReactNode;
  variant?: 'elevation' | 'outlined' | 'container';
}

export interface SurfaceTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & SurfaceOwnProps;
  defaultComponent: RootComponent;
}

export type SurfaceProps<
  RootComponent extends React.ElementType = SurfaceTypeMap['defaultComponent'],
  AdditionalProps = object,
> = OverrideProps<SurfaceTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};
