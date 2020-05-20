import validator from 'validator';

export interface BasicFields {
  name: string;
  description: string;
  keywords: string;
  ['thumbnail_url']: string;
  ['is_verified']: boolean;
  visualRefUrl1: string;
  visualRefUrl2: string;
  visualRefUrl3: string;
  visualRefUrl4: string;
}

export type CreateComponentFormFields = Partial<BasicFields>;

export interface ValidationError {
  name?: string;
  keywords?: string;
  thumbnailUrl?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  if (validator.isEmpty(field.name)) {
    errors.name = 'name is required';
  }

  if (validator.isEmpty(field.keywords)) {
    errors.keywords = 'keywords are required';
  }

  if (validator.isEmpty(field.thumbnail_url)) {
    errors.thumbnailUrl = 'thumbnail url is required';
  }

  return errors;
}
