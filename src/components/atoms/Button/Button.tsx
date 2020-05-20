import './Button.scss';

import cn from 'classnames';
import React from 'react';

export enum Use {
  primary = 'primary',
  secondary = 'secondary',
}

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum Type {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export interface Props {
  readonly size?: Size;
  readonly use?: Use;
  readonly block?: boolean;
  readonly type?: Type;
  readonly className?: string;
  readonly onClick?: (event: React.FormEvent<{}>) => any;
}

const Button: React.SFC<Props> = ({
  size = Size.xs,
  use = Use.primary,
  type = Type.button,
  block = false,
  className,
  onClick,
  children,
}) => {
  const btnClass = cn(className, 'ug-btn', {
    [`ug-btn--${size}`]: true,
    [`ug-btn--${use}`]: true,
    ['ug-btn--block']: block,
  });

  return (
    <button className={btnClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
