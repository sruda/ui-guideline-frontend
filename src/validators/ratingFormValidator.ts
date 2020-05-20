import validator from 'validator';

// TODO: Mover este Types a un interface más global, ya que aqui esta atado al componente.
import { Types as FaceRatingTypes } from '@atoms/Ratings/FaceRating/FaceRating';

export interface BasicFields {
  rate: FaceRatingTypes;
  comment: string;
}

export type RatingFormFields = Partial<BasicFields>;

export interface ValidationError {
  rate?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  /* Suggestion Details */
  if (validator.isEmpty(field.rate)) {
    errors.rate = 'Rate is required.';
  }

  return errors;
}
