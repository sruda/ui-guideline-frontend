import React from 'react';

import cn from 'classnames';

import { TypeOfSystem, RefSystemSize } from '@interfaces/data';

import {
  CreateRefSystemFormFields,
  validateBasicFields,
  ValidationError,
} from '@validators/createRefSystemFormValidator';

import { isEmpty } from '@utils/utils';

import useForm from '@hooks/useForm';

import refSystemService, { StatusResponse } from '@services/refSystemService';

import Button, { Size as ButtonSize, Type as ButtonType } from '@atoms/Button/Button';
import Textarea, { Size as TexareaSize } from '@atoms/Textarea/Textarea';
import TextInput, { Size as TextInputSize } from '@atoms/TextInput/TextInput';

export type Props = {
  readonly className?: string;
  readonly onSuccess: (refSystemId: string) => void;
};

const CreateRefSystemForm: React.SFC<Props> = ({ className, onSuccess }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const createRefSystemFormClass = cn(className, 'ug-create-ref-system-form', {});

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  // TODO: Definir con la inclusion de GraphQL y Postgres si deberiamos usar aqui camelCase o underscore
  const formFields: CreateRefSystemFormFields = {
    name: '',
    description: '',
    company: '',
    type: TypeOfSystem.designSystem,
    ['logo_url']: '',
    ['system_site_url']: '',
    ['company_site_url']: '',
    ['quantity_of_components']: 0,
    size: RefSystemSize.small,
    updated: false,
    ['coming_soon']: false,
  };

  const onSubmit = async (values, errors): Promise<void> => {
    if (isEmpty(errors)) {
      const response = await refSystemService.create(values);
      if (response.status === StatusResponse.ok) {
        if (response.data) onSuccess(response.data.refSystemId);
      }
    }
  };

  const { errors, handleChange, handleBlur, handleSubmit } = useForm<CreateRefSystemFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={createRefSystemFormClass} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Type</label>
        <select className="border-2 border-black rounded-none appearance-none p-2" name="type" onChange={handleChange}>
          <option value="ds">Design System</option>
          <option value="fl">UI Framework or Library</option>
        </select>
      </div>

      <div className="flex">
        <div className="flex flex-col mb-6 mr-6 w-full">
          <label className="text-base font-semi-bold text-medium-slate mb-2">System Name</label>
          <TextInput
            name="name"
            size={TextInputSize.sm}
            block={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Primer"
          ></TextInput>
          {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
        </div>
        <div className="flex flex-col mb-6 w-full">
          <label className="text-base font-semi-bold text-medium-slate mb-2">Company</label>
          <TextInput
            name="company"
            size={TextInputSize.sm}
            block={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Github"
          ></TextInput>
          {errors?.company && <p className="text-default-negative text-sm">{errors?.company}</p>}
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Description</label>
        <Textarea
          name="description"
          size={TexareaSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></Textarea>
      </div>

      <div className="flex">
        <div className="flex flex-col mb-6 mr-6 w-full">
          <label className="text-base font-semi-bold text-medium-slate mb-2">Quantity of UI Components</label>
          <TextInput
            name="quantity_of_components"
            size={TextInputSize.sm}
            defaultValue={formFields.quantity_of_components}
            block={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="50"
          ></TextInput>
          {errors?.quantityOfComponents && (
            <p className="text-default-negative text-sm">{errors?.quantityOfComponents}</p>
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label className="text-base font-semi-bold text-medium-slate mb-2">Size</label>
          <select
            className="border-2 border-black rounded-none appearance-none p-2"
            name="size"
            onChange={handleChange}
          >
            <option value="small">Small (0 to 20 Components)</option>
            <option value="medium">Medium (21 to 49 Components)</option>
            <option value="large">Large (50+ Components)</option>
          </select>
        </div>
      </div>

      <div className="flex mb-6">
        <label className="text-base font-semi-bold text-medium-slate">
          Is Updated?
          <input className="ml-3" name="updated" type="checkbox" onChange={handleChange} />
        </label>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">System Site URL</label>
        <TextInput
          name="system_site_url"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
        {errors?.systemSiteUrl && <p className="text-default-negative text-sm">{errors?.systemSiteUrl}</p>}
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Company Site URL</label>
        <TextInput
          name="company_site_url"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
        {errors?.companySiteUrl && <p className="text-default-negative text-sm">{errors?.companySiteUrl}</p>}
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Logo URL</label>
        <TextInput
          name="logo_url"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
        {errors?.logoUrl && <p className="text-default-negative text-sm">{errors?.logoUrl}</p>}
      </div>

      <div className="flex mb-6">
        <label className="text-base font-semi-bold text-medium-slate">
          Coming soon?
          <input className="ml-3" name="coming_soon" type="checkbox" onChange={handleChange} />
        </label>
      </div>

      <div className="flex">
        <Button type={ButtonType.submit} className="ml-auto" size={ButtonSize.sm}>
          Save ref system
        </Button>
      </div>
    </form>
  );
};

export default CreateRefSystemForm;
