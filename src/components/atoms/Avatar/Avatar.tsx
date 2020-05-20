import React from 'react';

import cn from 'classnames';

import './Avatar.scss';

export enum Size {
  '2xs' = '2xs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

export type Props = {
  readonly size?: Size;
  readonly altText: string;
  readonly imgUrl?: string;
  readonly className?: string;
};

const Avatar: React.SFC<Props> = ({
  size = Size.xs,
  altText = 'avatar image',
  imgUrl = 'https://cdn.miaguila.com/kit/assets/default-avatar.jpg',
  className,
}) => {
  const avatarClass = cn(className, 'ug-avatar', {
    [`ug-avatar--${size}`]: true,
  });

  return (
    <div className={avatarClass}>
      <img className="image" src={imgUrl} alt={altText} />
    </div>
  );
};

export default Avatar;
