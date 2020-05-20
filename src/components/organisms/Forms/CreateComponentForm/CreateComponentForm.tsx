import React, { useState } from 'react';

import cn from 'classnames';

import { ComponentData, SiblingComponentData } from '@interfaces/data';

import {
  CreateComponentFormFields,
  validateBasicFields,
  ValidationError,
} from '@validators/createComponentFormValidator';

import { AddSiblingFormFields, RefSystemFields } from '@validators/addSiblingFormValidator';

import { generateGuid, isEmpty } from '@utils/utils';

import useForm from '@hooks/useForm';

import componentService, { StatusResponse } from '@services/componentService';

import Button, { Size as ButtonSize, Type as ButtonType } from '@atoms/Button/Button';
import Textarea, { Size as TexareaSize } from '@atoms/Textarea/Textarea';
import TextInput, { Size as TextInputSize } from '@atoms/TextInput/TextInput';

import AddSiblingForm from '@organisms/Forms/AddSiblingForm/AddSiblingForm';

export interface Props {
  readonly className?: string;
  readonly onSuccess: (refSystemId: string) => void;
}

const CreateComponentForm: React.SFC<Props> = ({ className, onSuccess }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const createComponentFormClass = cn(className, 'ug-create-component-form', {});

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  // TODO: Definir con la inclusion de GraphQL y Postgres si deberiamos usar aqui camelCase o underscore
  const formFields: CreateComponentFormFields = {
    name: '',
    description: '',
    keywords: '',
    ['is_verified']: false,
    ['thumbnail_url']: '',
    visualRefUrl1: '',
    visualRefUrl2: '',
    visualRefUrl3: '',
    visualRefUrl4: '',
  };

  const [siblingList, setSiblingList] = useState<Array<AddSiblingFormFields>>([]);
  const handleAddSiblingFormSuccess = (sibling: AddSiblingFormFields): void => {
    const newList = siblingList?.concat(sibling);
    setSiblingList(newList);
  };

  const parseSiblingList = (): Array<SiblingComponentData> => {
    const siblingDataList: Array<SiblingComponentData> = siblingList.map((sibling: AddSiblingFormFields) => {
      const refSystems = { ds: [], fl: [] } as any;
      sibling.refSystems.forEach((refSystem: RefSystemFields) => {
        const index = refSystem.refSystem?.type;
        if (index) {
          refSystems[index] = refSystems[index].concat({
            ['component_site_url']: refSystem.siblingRefSystemUrl,
            ['logo_url']: refSystem.refSystem?.logo_url,
            name: refSystem.refSystem?.name,
          });
        }
      });
      return {
        id: generateGuid(),
        name: sibling.name,
        ['ref_systems']: refSystems,
      };
    });
    return siblingDataList;
  };

  const parseData = (fieldValues: CreateComponentFormFields): ComponentData => {
    const componentData: ComponentData = {
      name: fieldValues.name || '',
      description: fieldValues.description || '',
      ['is_verified']: fieldValues.is_verified || false,
      ['thumbnail_url']: fieldValues.thumbnail_url || '',
      ['visual_ref_urls']: [
        fieldValues.visualRefUrl1 || '',
        fieldValues.visualRefUrl2 || '',
        fieldValues.visualRefUrl3 || '',
        fieldValues.visualRefUrl4 || '',
      ],
      keywords: fieldValues.keywords?.split(', ') || [],
      siblings: parseSiblingList(),
    };

    return componentData;
  };

  const onSubmit = async (values, errors): Promise<void> => {
    if (isEmpty(errors)) {
      const parsedData = parseData(values);
      const response = await componentService.create(parsedData);
      if (response.status === StatusResponse.ok) {
        if (response.data) onSuccess(response.data.componentId);
      }
    }
  };

  const { errors, handleChange, handleBlur, handleSubmit } = useForm<CreateComponentFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={createComponentFormClass} onSubmit={handleSubmit} noValidate>
      {/* NAME */}
      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">
          Name <span className="text-default-negative">*</span>
        </label>
        <TextInput
          name="name"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
        {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
      </div>

      {/* DESCRIPTION */}
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

      {/* KEYWORDS */}
      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">
          Keywords (separated by commas) <span className="text-default-negative">*</span>
        </label>
        <TextInput
          name="keywords"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="keyword1, keyword2, keyword3, keyword4"
        ></TextInput>
        {errors?.keywords && <p className="text-default-negative text-sm">{errors?.keywords}</p>}
      </div>

      {/* THUMBNAIL URLS */}
      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">
          Thumbnail URL <span className="text-default-negative">*</span>
        </label>
        <TextInput
          name="thumbnail_url"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
        {errors?.thumbnailUrl && <p className="text-default-negative text-sm">{errors?.thumbnailUrl}</p>}
      </div>

      {/* VISUAL REF URLS */}
      <div className="flex flex-col mb-8">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Visual Ref URLs</label>
        <div className="flex">
          <div className="w-1/2 mb-4">
            <TextInput
              name="visualRefUrl1"
              size={TextInputSize.sm}
              block={true}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="image url 1"
              className="mr-4"
            ></TextInput>
          </div>
          <div className="w-1/2">
            <TextInput
              name="visualRefUrl2"
              size={TextInputSize.sm}
              block={true}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="image url 2"
            ></TextInput>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <TextInput
              name="visualRefUrl3"
              size={TextInputSize.sm}
              block={true}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="image url 3"
              className="mr-4"
            ></TextInput>
          </div>
          <div className="w-1/2">
            <TextInput
              name="visualRefUrl4"
              size={TextInputSize.sm}
              block={true}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="image url 4"
            ></TextInput>
          </div>
        </div>
      </div>

      {/* ADD SIBLING FORM */}
      <div className="flex flex-col">
        <h1 className="text-lg text-default-slate font-bold mb-2">Possible names</h1>
        <div className="flex flex-col">
          {/* OPTION */}
          {siblingList?.map((sibling: AddSiblingFormFields, index) => (
            <div key={index} className="flex border-b border-dark-smoke py-4">
              <div className="flex flex-col pl-5">
                <p className="text-sm font-regular text-light-slate">Component Name</p>
                <p className="text-md font-semi-bold text-default-slate">{sibling.name}</p>
              </div>
            </div>
          ))}
        </div>
        <AddSiblingForm onSuccess={handleAddSiblingFormSuccess} />
      </div>

      <div className="flex items-center justify-center">
        <Button type={ButtonType.submit} size={ButtonSize.sm}>
          Save component
        </Button>
      </div>
    </form>
  );
};

export default CreateComponentForm;
