import validator from 'validator';

import { RefSystemData } from '@interfaces/data';

export type BasicFields = RefSystemData;

export type CreateRefSystemFormFields = Partial<BasicFields>;

export interface ValidationError {
  name?: string;
  company?: string;
  companySiteUrl?: string;
  systemSiteUrl?: string;
  logoUrl?: string;
  quantityOfComponents?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  if (validator.isEmpty(field.name)) {
    errors.name = 'name is required';
  }

  if (validator.isEmpty(field.company)) {
    errors.company = 'company is required';
  }

  if (validator.isEmpty(field.company_site_url)) {
    errors.companySiteUrl = 'company site url is required';
  }

  if (validator.isEmpty(field.system_site_url)) {
    errors.systemSiteUrl = 'system site url is required';
  }

  if (validator.isEmpty(field.logo_url)) {
    errors.logoUrl = 'logo url is required';
  }

  if (!validator.isInt(field.quantity_of_components.toString(10))) {
    errors.quantityOfComponents = 'quantity of components should be a number';
  }

  if (field.quantity_of_components === 0) {
    errors.quantityOfComponents = `quantity of components shouldn't be 0`;
  }

  if (validator.isEmpty(field.quantity_of_components.toString(10))) {
    errors.quantityOfComponents = 'quantity of components is required';
  }

  return errors;
}
