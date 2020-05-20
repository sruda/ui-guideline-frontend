import React from 'react';

import cn from 'classnames';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import './Tag.scss';

export enum Use {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  positive = 'positive',
  warning = 'warning',
  negative = 'negative',
  info = 'info',
}

export type Props = {
  readonly use?: Use;
  readonly closable?: boolean;
  readonly onClose?: () => void;
  readonly className?: string;
};

const Tag: React.SFC<Props> = ({ use = Use.primary, closable = false, className, onClose, children }) => {
  const tagClass = cn(className, 'ug-tag', {
    [`ug-tag--${use}`]: true,
  });

  return (
    <span className={tagClass}>
      {children}
      {closable && (
        <span>
          <Icon
            className="ml-2 cursor-pointer"
            icon={IconCatalog.close}
            iconStyle={IconStyle.light}
            width="10"
            height="10"
            onClick={onClose}
          />
        </span>
      )}
    </span>
  );
};

export default Tag;
