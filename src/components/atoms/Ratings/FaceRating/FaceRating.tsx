import React, { useState } from 'react';

import cn from 'classnames';

import trackEvents from '@constants/trackEventConstants';

import useMixpanel from '@hooks/useMixpanel';

import Icon, { Style as IconStyle, Catalog as IconCatalog } from '@primitives/Icon/Icon';

import RatingForm from '@organisms/Forms/RatingForm/RatingForm';

import './FaceRating.scss';

export enum Types {
  happy = 'happy',
  meh = 'meh',
  sad = 'sad',
}

export enum Color {
  happy = 'default-positive',
  meh = 'default-warning',
  sad = 'default-negative',
}

export type Props = {
  readonly className?: string;
};

const FaceRating: React.SFC<Props> = ({ className }) => {
  const [selected, setSelected] = useState<Types>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { eventTrack } = useMixpanel();

  const faceRatingClass = cn(className, 'ug-face-rating', {});

  const iconClass = (type: string): any => {
    return cn(className, {
      icon: true,
      [`text-${Color[type]}`]: selected === type,
    });
  };

  const handleFaceClick = (type: Types) => (): void => {
    if (selected === type) return;
    eventTrack(trackEvents.faceRating.clickRating, { type });
    setSelected(type);
  };

  const handleCancelClick = (): void => {
    setSelected(undefined);
    setSubmitted(false);
  };

  const handleSubmitSuccessful = (): void => {
    setSelected(undefined);
    setSubmitted(true);
  };

  const faceList = Object.keys(Types).map((type) => (
    <span className="icon-container" key={type} onClick={handleFaceClick(type as Types)}>
      <Icon
        className={iconClass(type)}
        icon={IconCatalog[type]}
        iconStyle={IconStyle.solid}
        width="32"
        height="32"
      ></Icon>
    </span>
  ));

  return (
    <div className={faceRatingClass}>
      {selected && (
        <div className="rating-popover shadow-lg">
          <RatingForm onCancel={handleCancelClick} optionSelected={selected} onSuccess={handleSubmitSuccessful} />
        </div>
      )}
      {!submitted && faceList}
      {submitted && <div className="text-default-positive text-base font-semi-bold">Thanks for your opinion!</div>}
    </div>
  );
};

export default FaceRating;
