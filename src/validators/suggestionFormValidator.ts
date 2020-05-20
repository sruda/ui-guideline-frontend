import validator from 'validator';

// TODO: Definir con la inclusion de GraphQL y Postgres si deberiamos usar aqui camelCase o underscore
export interface BasicFields {
  searchTerms?: string;
  details: string;
  imgUrl?: string;
}

/* Every field of Suggestion Forms */
export type SuggestionFormFields = Partial<BasicFields>;

/* Message error of each field */
export interface ValidationError {
  searchTerms?: string;
  details?: string;
  imgUrl?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  /* Suggestion Details */
  if (validator.isEmpty(field.details)) {
    errors.details = 'Could you provide more details?, please.';
  }

  return errors;
}
