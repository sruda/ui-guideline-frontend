import React, { useState } from 'react';

import cn from 'classnames';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import './ComponentCard.scss';

export type Props = {
  readonly name: string;
  readonly imgSrc: string;
  readonly imgAltText?: string;
  readonly className?: string;
  readonly withBadgeIcon?: boolean;
  readonly onClick?: (event: React.FormEvent<{}>) => any;
};

const ComponentCard: React.SFC<Props> = ({
  name,
  imgSrc,
  imgAltText = name,
  className,
  withBadgeIcon = false,
  onClick,
}) => {
  const componentCardClass = cn(className, 'ug-component-card', {});

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isValidSrc, setIsValidSrc] = useState(Boolean(imgSrc));

  // TODO: Mover estas validaciones de lazy-wrapper a un Hook reusable.
  return (
    <div className={componentCardClass} onClick={onClick}>
      <div className="lazy-wrapper mb-2">
        {isValidSrc ? (
          <img
            className={`lazy-wrapper__img lazy-wrapper__img--${imageLoaded ? 'visible' : 'hidden'}`}
            src={imgSrc}
            alt={imgAltText}
            onLoad={(): void => setImageLoaded(true)}
            onError={(): void => setIsValidSrc(false)}
          />
        ) : (
          <div className="lazy-wrapper__no-img">
            <p className="text-extra-dark-smoke font-semi-bold text-xl">{imgAltText}</p>
          </div>
        )}
      </div>
      <span className="flex items-center">
        <p className="text-lg text-default-slate font-semi-bold ml-2 mr-1">{name}</p>
        {withBadgeIcon && (
          <Icon
            className="text-default-secondary"
            width="18"
            height="18"
            iconStyle={IconStyle.solid}
            icon={IconCatalog.badgeCheck}
          ></Icon>
        )}
      </span>
    </div>
  );
};

export default ComponentCard;
