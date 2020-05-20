import React from 'react';

import cn from 'classnames';

import './Divider.scss';

export enum Spacing {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
}

export enum Color {
  defaultSmoke = 'default-smoke',
  darkSmoke = 'dark-smoke',
  extraDarkSmoke = 'extra-dark-smoke',
}

export type Props = {
  readonly spacing?: Spacing;
  readonly color?: Color;
  readonly className?: string;
};

const Divider: React.SFC<Props> = ({ spacing = Spacing.xs, color = Color.defaultSmoke, className }) => {
  const dividerClass = cn(className, 'ug-divider', {
    [`ug-divider--spacing-${spacing}`]: true,
    [`ug-divider--${color}`]: true,
  });

  return <div className={dividerClass}></div>;
};

export default Divider;
