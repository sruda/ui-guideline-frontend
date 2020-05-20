import React, { useState } from 'react';

import * as classNames from 'classnames';

import trackEvents from '@constants/trackEventConstants';

import { SuggestionFormFields, validateBasicFields, ValidationError } from '@validators/suggestionFormValidator';

import { isEmpty } from '@utils/utils';

import useForm from '@hooks/useForm';
import { UploadDataResponse } from '@hooks/useFileUpload';
import useMixpanel from '@hooks/useMixpanel';

import suggestionService, { CreateResponse } from '@services/suggestionService';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import Button, { Size as ButtonSize, Type as ButtonType } from '@atoms/Button/Button';
import FileUploader from '@atoms/FileUploader/FileUploader';
import Textarea, { Size as TextareaSize } from '@atoms/Textarea/Textarea';
import TextInput, { Size as TextInputSize } from '@atoms/TextInput/TextInput';

export type Props = {
  readonly onSuccess: () => void;
  readonly className?: string;
};

const SuggestionForm: React.SFC<Props> = ({ className, onSuccess }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const suggestionFormClass = classNames(className, 'ug-suggestion-form', {});

  const { eventTrack } = useMixpanel();

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  // TODO: Definir con la inclusion de GraphQL y Postgres si deberiamos usar aqui camelCase o underscore
  const formFields: SuggestionFormFields = {
    searchTerms: '',
    details: '',
    imgUrl: '',
  };
  const [imgUrl, setImgUrl] = useState<string>('');

  const onSubmit = async (values, errors): Promise<void> => {
    if (isEmpty(errors)) {
      eventTrack(trackEvents.suggestionForm.clickSendSuggestionBtn);
      const response = await suggestionService.create({ ...values, imgUrl });
      if (response === CreateResponse.ok) onSuccess();
    }
  };

  const { errors, handleChange, handleBlur, handleSubmit } = useForm<SuggestionFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  /*----------------------------*/
  /*    RENDER FILE UPLOADER    */
  /*----------------------------*/
  const handleFileUpload = (fileData: UploadDataResponse): void => {
    setImgUrl(fileData.downloadUrl);
  };

  const [isShowFileUploader, setIsShowFileUploader] = useState(false);
  const showFileUploader = (): void => {
    eventTrack(trackEvents.suggestionForm.clickUploadImageLink);
    setIsShowFileUploader(true);
  };

  const renderFileUploader = (): JSX.Element => {
    if (isShowFileUploader) {
      return (
        <FileUploader
          block={true}
          extensions={['jpg', 'png']}
          limitSize={20}
          imageFolder="/images/suggestions/"
          onFileUpload={handleFileUpload}
        />
      );
    }

    return (
      <div
        className="cursor-pointer flex items-center text-default-secondary hover:text-dark-secondary hover:underline"
        onClick={showFileUploader}
      >
        <Icon className="mr-1" icon={IconCatalog.paperclip} iconStyle={IconStyle.regular} width="20" height="20" />
        <span className="text-base font-bold">Upload Image</span>
      </div>
    );
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={suggestionFormClass} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">How would you google this component?</label>
        <TextInput
          name="searchTerms"
          size={TextInputSize.sm}
          block={true}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextInput>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-base font-semi-bold text-medium-slate mb-2">
          How does the component behave? Where did you see it?
        </label>
        <Textarea
          name="details"
          size={TextareaSize.sm}
          block={true}
          isInvalid={Boolean(errors?.details)}
          onChange={handleChange}
          onBlur={handleBlur}
        ></Textarea>
        {errors?.details && <p className="text-default-negative text-sm">{errors?.details}</p>}
      </div>

      <div className="flex mb-8">{renderFileUploader()}</div>

      <div className="flex">
        <Button type={ButtonType.submit} className="ml-auto" size={ButtonSize.sm}>
          Send suggestion
        </Button>
      </div>
    </form>
  );
};

export default SuggestionForm;
