import React from 'react';

import * as classNames from 'classnames';

import { RatingFormFields, validateBasicFields, ValidationError } from '@validators/ratingFormValidator';

import { isEmpty } from '@utils/utils';

import useForm from '@hooks/useForm';

import ratingService, { CreateResponse } from '@services/ratingService';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import Button, { Size as ButtonSize, Type as ButtonType, Use as ButtonUse } from '@atoms/Button/Button';
import { Color as FaceRatingColor, Types as FaceRatingTypes } from '@atoms/Ratings/FaceRating/FaceRating';
import Textarea, { Size as TextareaSize } from '@atoms/Textarea/Textarea';

enum RateLabel {
  happy = 'Positive',
  meh = 'Neutral',
  sad = 'Negative',
}

export type Props = {
  readonly optionSelected?: FaceRatingTypes;
  readonly onSuccess: () => void;
  readonly onCancel: () => void;
  readonly className?: string;
};

const RatingForm: React.SFC<Props> = ({ className, optionSelected = FaceRatingTypes.happy, onSuccess, onCancel }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const ratingFormClass = classNames(className, 'ug-rating-form', {});

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  const formFields: RatingFormFields = {
    rate: optionSelected,
    comment: '',
  };

  const onSubmit = async (values, errors): Promise<void> => {
    if (isEmpty(errors)) {
      const response = await ratingService.create(values);
      if (response === CreateResponse.ok) onSuccess();
    }
  };

  const { errors, handleChange, handleBlur, handleSubmit } = useForm<RatingFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  const handleCancelClick = (): void => {
    onCancel();
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={ratingFormClass} onSubmit={handleSubmit} noValidate>
      <div className="flex items-center justify-center mb-5">
        <Icon
          className={`mr-2 text-${FaceRatingColor[optionSelected]}`}
          icon={IconCatalog[optionSelected]}
          iconStyle={IconStyle.solid}
          width="40"
          height="40"
        />
        <p className="text-xl font-bold text-default-slate">{RateLabel[optionSelected]}</p>
        {errors?.rate && <p className="text-default-negative text-sm">{errors?.rate}</p>}
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-xs font-semi-bold text-medium-slate mb-2">Comments (optional)</label>
        <Textarea name="comment" size={TextareaSize.xs} block={true} onChange={handleChange}></Textarea>
      </div>

      <div className="flex">
        <Button use={ButtonUse.secondary} size={ButtonSize.xs} onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button className="ml-auto" type={ButtonType.submit} size={ButtonSize.xs}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default RatingForm;
