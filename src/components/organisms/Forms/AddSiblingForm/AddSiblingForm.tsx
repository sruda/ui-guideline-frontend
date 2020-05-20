import React, { ChangeEvent, useEffect, useState } from 'react';

import cn from 'classnames';

import { RefSystemData } from '@interfaces/data';

import {
  BasicFields,
  RefSystemFields,
  validateBasicFields,
  ValidationError,
  AddSiblingFormFields,
} from '@validators/addSiblingFormValidator';

import { isEmpty } from '@utils/utils';

import useGetAll from '@hooks/useGetAll';

import refSystemService from '@services/refSystemService';

import Button, { Size as ButtonSize, Use as ButtonUse } from '@atoms/Button/Button';
import TextInput, { Size as TextInputSize } from '@atoms/TextInput/TextInput';

export type Props = {
  readonly className?: string;
  readonly onSuccess: (sibling: AddSiblingFormFields) => void;
};

const AddSiblingForm: React.SFC<Props> = ({ className, onSuccess }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const addSiblingFormClass = cn(className, 'ug-add-sibling-form', {});

  /********************/
  /*    FETCH DATA    */
  /********************/
  const { data, isLoading, isError } = useGetAll<RefSystemData>(refSystemService, []);

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/

  const [basicFields, setBasicFields] = useState<BasicFields>({
    name: '',
  });
  const [errors, setErrors] = useState<ValidationError>({});
  const [refSystemFormField, setRefSystemFormField] = useState<RefSystemFields>({
    refSystem: data[0],
    siblingRefSystemUrl: '',
  });

  useEffect(() => {
    const refSystem = data[0];
    setRefSystemFormField((values) => ({ ...values, refSystem }));
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    event.persist();
    const target = event.target as HTMLInputElement & HTMLTextAreaElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setBasicFields((values) => ({ ...values, [name]: value }));
  };

  const handleRefSystemSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.persist();
    const target = event.target;
    const value = target.value;
    const refSystem = data.find((refSystem) => refSystem.id === value);
    setRefSystemFormField((values) => ({ ...values, refSystem }));
  };

  const handleRefSystemInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const target = event.target;
    const value = target.value;
    setRefSystemFormField((values) => ({ ...values, siblingRefSystemUrl: value }));
  };

  const [siblingRefSystemList, setSiblingRefSystemList] = useState<Array<RefSystemFields>>([]);
  const handleRefSystemAddClick = (): void => {
    const newList = siblingRefSystemList?.concat(refSystemFormField);
    setSiblingRefSystemList(newList);
  };

  const onSubmit = async (values, errors): Promise<void> => {
    if (isEmpty(errors)) {
      onSuccess({ ...values, refSystems: siblingRefSystemList });
      setRefSystemFormField({
        refSystem: data[0],
        siblingRefSystemUrl: '',
      });
      setSiblingRefSystemList([]);
    }
  };

  const handleAddSiblingClick = (event: React.FormEvent<{}>): void => {
    if (event) event.preventDefault();
    const newErrors = validateBasicFields(basicFields);
    setErrors({ ...newErrors });
    onSubmit(basicFields, newErrors);
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={addSiblingFormClass}>
      <div className="flex flex-col bg-dark-snow p-6 rounded-lg mb-10">
        {/* SIBLING NAME */}
        <div className="flex flex-col mb-6">
          <label className="text-base font-semi-bold text-medium-slate mb-2">
            Name <span className="text-default-negative">*</span>
          </label>
          <div className="w-1/2">
            <TextInput name="name" size={TextInputSize.sm} block={true} onChange={handleChange}></TextInput>
          </div>
          {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
        </div>

        {/* ADDED REF SYSTEM LIST */}
        <div className="flex flex-col mb-6">
          <label className="text-base font-semi-bold text-medium-slate mb-2">Ref Systems</label>
          <div className="flex flex-col">
            {/* OPTION */}
            {siblingRefSystemList?.map((siblingRefSystem: RefSystemFields, index) => (
              <div key={index} className="flex items-center justify-around border-b border-dark-smoke py-4">
                <div className="flex flex-col w-1/4 pl-5">
                  <p className="text-sm font-regular text-light-slate">System</p>
                  <p className="text-md font-semi-bold text-default-slate">{siblingRefSystem.refSystem?.name}</p>
                </div>
                <div className="flex flex-col w-1/4">
                  <p className="text-sm font-regular text-light-slate">Type</p>
                  <p className="text-md font-semi-bold text-default-slate">{siblingRefSystem.refSystem?.type}</p>
                </div>
                <div className="flex flex-col w-2/4">
                  <p className="text-sm font-regular text-light-slate">Component URL</p>
                  <p className="text-md font-semi-bold text-default-slate truncate">
                    {siblingRefSystem.siblingRefSystemUrl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIBLING REF SYSTEMS */}
        <div className="flex flex-col mb-6 bg-default-snow border-2 border-extra-dark-smoke border-dashed p-6">
          <div className="flex">
            <div className="flex flex-col mb-6 w-1/3 mr-8">
              <label className="text-base font-semi-bold text-medium-slate mb-2">System</label>
              {data.length !== 0 && (
                <select
                  className="text-sm border-2 border-black rounded-none appearance-none p-2"
                  name="refSystem"
                  onChange={handleRefSystemSelectChange}
                >
                  {data.map((refSystem: RefSystemData) => (
                    <option key={refSystem.id} value={refSystem.id}>
                      {refSystem.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-end mb-6 w-2/3">
              <div className="flex flex-col w-full mr-8">
                <label className="text-base font-semi-bold text-medium-slate mb-2">
                  Component Url <span className="text-default-negative">*</span>
                </label>
                <TextInput
                  name="refSystemUrl"
                  size={TextInputSize.xs}
                  block={true}
                  onChange={handleRefSystemInputChange}
                ></TextInput>
              </div>
              <div className="flex">
                <Button
                  use={ButtonUse.secondary}
                  className="ml-auto"
                  size={ButtonSize.xs}
                  onClick={handleRefSystemAddClick}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button onClick={handleAddSiblingClick} use={ButtonUse.secondary} className="ml-auto" size={ButtonSize.xs}>
            Add possible name
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSiblingForm;
