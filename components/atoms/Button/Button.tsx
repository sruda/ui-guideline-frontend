import React from 'react';

import * as classNames from 'classnames';

import './Button.module.scss';

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
  const btnClass = classNames({
    'ug-btn': true,
    [`ug-btn--${size}`]: true,
    [`ug-btn--${use}`]: true,
    'ug-btn--block': block,
    [`${className}`]: !!className,
  });

  return (
    <button className={btnClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
