import React from 'react';

import cn from 'classnames';

import './Progress.scss';

export enum Color {
  secondary = 'secondary',
  positive = 'positive',
  negative = 'negative',
}

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export type Props = {
  readonly maxValue: number;
  readonly value: number;
  readonly color?: Color;
  readonly size?: Size;
  readonly rounded?: boolean;
  readonly className?: string;
};

const Progress: React.SFC<Props> = ({
  maxValue = 100,
  value = 0,
  color = Color.secondary,
  size = Size.md,
  rounded = false,
  className,
}) => {
  const progressClass = cn(className, 'ug-progress', {
    [`ug-progress--${color}`]: true,
    [`ug-progress--${size}`]: true,
    'ug-progress--rounded': rounded,
  });

  const getPercentage = (): string => {
    const percentage = (100 / maxValue) * value;
    return `${percentage}%`;
  };

  return (
    <div className={progressClass}>
      <div
        className="progress-bar"
        style={{ width: getPercentage() }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
      ></div>
    </div>
  );
};

export default Progress;
