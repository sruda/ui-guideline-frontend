import React from 'react';

import cn from 'classnames';

import { RefSystemData, RefSystemSize } from '@interfaces/data';

import Avatar, { Size as AvatarSize } from '@atoms/Avatar/Avatar';
import Tag, { Use as TagUse } from '@atoms/Tag/Tag';

import './RefSystemCard.scss';

export type Props = {
  readonly refSystem: RefSystemData;
  readonly isComingSoon?: boolean;
  readonly className?: string;
  readonly onClick?: (event: React.FormEvent<{}>) => any;
};

const RefSystemCard: React.SFC<Props> = ({ refSystem, isComingSoon = false, className, onClick }) => {
  const refSystemCardClass = cn(className, 'ug-ref-system-card', {
    'p-5 relative': true,
    'border-2 border-dashed': isComingSoon,
  });

  const renderTagSize = (): JSX.Element => {
    let tagSize = TagUse.positive;
    switch (refSystem.size) {
      case RefSystemSize.small:
        tagSize = TagUse.negative;
        break;
      case RefSystemSize.medium:
        tagSize = TagUse.warning;
        break;
      case RefSystemSize.large:
        tagSize = TagUse.positive;
        break;
    }
    return (
      <Tag className="mr-4" use={tagSize}>
        {refSystem.size}
      </Tag>
    );
  };

  const renderTagStatus = (): JSX.Element => {
    const tagUse = refSystem.updated ? TagUse.positive : TagUse.negative;
    const tagText = refSystem.updated ? 'updated' : 'outdated';
    return (
      <Tag className="mr-4" use={tagUse}>
        {tagText}
      </Tag>
    );
  };

  return (
    <div className={refSystemCardClass} onClick={onClick}>
      {isComingSoon && (
        <div className="overlay z-10">
          <span className="text-xl text-medium-slate font-bold">Coming soon</span>
        </div>
      )}
      <div className="flex items-center mb-3">
        <Avatar className="mr-4" imgUrl={refSystem.logo_url} size={AvatarSize.sm} altText={refSystem.name} />
        <div className="flex flex-col">
          <a
            className="text-lg font-bold hover:underline"
            href={refSystem.system_site_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {refSystem.name}
          </a>
          <span className="text-sm text-light-slate">
            by
            <a
              className="font-semi-bold hover:underline ml-1"
              href={refSystem.company_site_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {refSystem.company}
            </a>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-regular mb-12">{refSystem.description}</p>
        <div className="ug-ref-system-card__footer flex items-center">
          {renderTagSize()}
          {renderTagStatus()}
        </div>
      </div>
    </div>
  );
};

export default RefSystemCard;
