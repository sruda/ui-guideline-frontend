import validator from 'validator';

import { RefSystemData } from '@interfaces/data';

export type BasicFields = {
  name: string;
};

export interface RefSystemFields {
  refSystem: RefSystemData | undefined;
  siblingRefSystemUrl: string;
}

export interface AddSiblingFormFields extends BasicFields {
  refSystems: Array<RefSystemFields>;
}

export interface ValidationError {
  name?: string;
  refSystemUrl?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  if (validator.isEmpty(field.name)) {
    errors.name = 'name is required';
  }

  return errors;
}

export function validateRefSystemFields(field: RefSystemFields): ValidationError {
  const errors: ValidationError = {};

  if (validator.isEmpty(field.siblingRefSystemUrl)) {
    errors.refSystemUrl = 'component url is required';
  }

  return errors;
}
