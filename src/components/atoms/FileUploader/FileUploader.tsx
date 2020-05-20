import React, { useEffect, useState, ChangeEvent } from 'react';

import cn from 'classnames';

import { formatBytes, toMb } from '@utils/utils';

import useFileUpload, { UploadDataResponse, DeleteResponse } from '@hooks/useFileUpload';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import Progress from '@atoms/Progress/Progress';

import './FileUploader.scss';

enum FileUploaderStatus {
  default = 'default',
  success = 'success',
  attached = 'attached',
  processing = 'processing',
  error = 'error',
}

export type Props = {
  readonly extensions: Array<string>;
  readonly limitSize: number;
  readonly block?: boolean;
  readonly className?: string;
  readonly imageFolder: string;
  readonly onFileUpload: (fileData: UploadDataResponse) => void;
};

const FileUploader: React.SFC<Props> = ({
  block = false,
  className,
  extensions = ['jpg', 'png'],
  limitSize = 10,
  imageFolder = 'images/test/',
  onFileUpload,
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [status, setStatus] = useState<FileUploaderStatus>(FileUploaderStatus.default);
  const [attachedFile, setAttachedFile] = useState<File>();
  const [{ fileData, isLoading, isError, progress }, handleDeleteFile, setFileToUpload] = useFileUpload(imageFolder);

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const FileUploaderClass = cn(className, 'ug-file-uploader', {
    attached: status === FileUploaderStatus.attached,
    success: status === FileUploaderStatus.success,
    error: status === FileUploaderStatus.error,
    processing: status === FileUploaderStatus.processing,
    'ug-file-uploader--block': block,
  });

  /*---------------------*/
  /*  STATUS MANAGEMENT  */
  /*---------------------*/
  useEffect(() => {
    if (isLoading && progress) return setStatus(FileUploaderStatus.processing);
    if (fileData) return setStatus(FileUploaderStatus.success);
    if (!fileData && !progress) setStatus(FileUploaderStatus.default);
  }, [isLoading, progress, fileData]);

  useEffect(() => {
    if (isError) setErrorMsg('Something happened, try again');
  }, [isError]);

  /*---------------------*/
  /*    EMIT FILE DATA   */
  /*---------------------*/
  useEffect(() => {
    if (fileData) {
      onFileUpload(fileData);
    }
  }, [fileData, onFileUpload]);

  /*---------------------*/
  /*     VALIDATIONS     */
  /*---------------------*/
  const formatExtensions = (): string => {
    return extensions.join(', ');
  };

  const getExtensionFile = (fileName = ''): string => {
    if (fileName === '') return fileName;
    return fileName.split('.').pop() as string;
  };

  const isValidFileSize = (size: number): boolean => {
    const MB = toMb(size);
    return MB <= limitSize;
  };

  const isValidExtension = (fileName: string): boolean => {
    const ext = getExtensionFile(fileName);
    return extensions.includes(ext);
  };

  const validator = (file: File): string => {
    if (file === null || !file) return '';
    const ERROR_FILE_SIZE_MSG = `File size ${formatBytes(file.size, 2)}. It exceeds limits`;
    const ERROR_FILE_EXT_MSG = 'This filetype isn’t supported';
    if (!isValidFileSize(file.size)) return ERROR_FILE_SIZE_MSG;
    if (!isValidExtension(file.name)) return ERROR_FILE_EXT_MSG;
    return '';
  };

  /*---------------------*/
  /*      SET STATES     */
  /*---------------------*/
  const setStates = (status: FileUploaderStatus, errorMsg = '', file?: File): void => {
    setErrorMsg(errorMsg);
    setStatus(status);
    setAttachedFile(file);
  };

  /*---------------------*/
  /*        HANDLES      */
  /*---------------------*/
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files === null) return;
    if (files.length === 0) return;

    const tempFile = files[0];
    const currentErrorMsg = validator(tempFile);

    if (currentErrorMsg === '') {
      setStates(FileUploaderStatus.attached, '', tempFile);
      setFileToUpload(tempFile);
    } else {
      setStates(FileUploaderStatus.error, currentErrorMsg);
    }

    // Clean input file
    event.target.value = '';
  };

  const handleCloseBtnClick = async (): Promise<void> => {
    if (!fileData) {
      setStates(FileUploaderStatus.default, '');
      return;
    }

    const response = await handleDeleteFile();
    if (response === DeleteResponse.ok) setStates(FileUploaderStatus.default, '');
  };

  /*----------------------------------------*/
  /*     RENDER FILE UPLOADER BY STATUS     */
  /*----------------------------------------*/
  const renderFileUploader = (): JSX.Element => {
    switch (status) {
      /* DEFAULT STATUS */
      case FileUploaderStatus.default:
        return (
          <div className="flex items-center w-full">
            <div className="left-section flex flex-col leading-none">
              <p className="text-base font-semi-bold text-medium-slate mr-1 mb-3">Browse the image</p>
              <p className=" text-sm font-regular text-light-slate">
                Supports {formatExtensions()} <span className="mx-1">•</span> up to {limitSize} MB
              </p>
            </div>
            <div className="right-section flex items-center ml-auto">
              <Icon
                className="text-extra-dark-smoke"
                icon={IconCatalog.paperclip}
                iconStyle={IconStyle.light}
                width="32"
                height="32"
              ></Icon>
            </div>
          </div>
        );

      /* ATTACHED STATUS */
      case FileUploaderStatus.attached:
        return (
          <div className="flex items-center w-full">
            <div className="left-section flex flex-col leading-none">
              <p className="text-base font-semi-bold text-medium-slate mr-1 mb-3">Attached 1 file</p>
              <p className=" text-sm font-regular text-light-slate">
                {attachedFile?.name} <span className="mx-1">•</span>
                {formatBytes(attachedFile?.size, 2)}
              </p>
            </div>
            <div className="right-section flex items-center ml-auto">
              <Icon
                className="text-extra-dark-smoke mr-4"
                icon={IconCatalog.paperclip}
                iconStyle={IconStyle.light}
                width="32"
                height="32"
              ></Icon>
              <Icon
                className="cursor-pointer text-medium-slate hover:text-black"
                icon={IconCatalog.close}
                iconStyle={IconStyle.light}
                width="20"
                height="20"
                onClick={handleCloseBtnClick}
              ></Icon>
            </div>
          </div>
        );

      /* PROCESSING STATUS */
      case FileUploaderStatus.processing:
        return (
          <div className="flex items-center w-full">
            <div className="left-section flex flex-col leading-none w-full">
              <p className="text-base font-semi-bold text-medium-slate mr-1 mb-3">Uploading 1 file</p>
              <div className="ug-process-bar"></div>
              <Progress value={progress * 100} maxValue={100} />
            </div>
            <div className="right-section flex items-center pl-6 ml-auto">
              <Icon
                className="cursor-pointer text-medium-slate hover:text-black"
                icon={IconCatalog.close}
                iconStyle={IconStyle.light}
                width="20"
                height="20"
                onClick={handleCloseBtnClick}
              ></Icon>
            </div>
          </div>
        );

      /* ERROR STATUS */
      case FileUploaderStatus.error:
        return (
          <div className="flex items-center w-full">
            <div className="left-section flex flex-col leading-none">
              <p className="text-base font-semi-bold text-default-negative mr-1 mb-3">{errorMsg}</p>
              <p className=" text-sm font-regular text-light-slate">
                Supports {formatExtensions()} <span className="mx-1">•</span> up to {limitSize} MB
              </p>
            </div>
            <div className="right-section flex items-center ml-auto">
              <Icon
                className="text-default-negative mr-4"
                icon={IconCatalog.exclamationCircle}
                iconStyle={IconStyle.duotone}
                width="32"
                height="32"
              ></Icon>
              <Icon
                className="cursor-pointer text-medium-slate hover:text-black"
                icon={IconCatalog.close}
                iconStyle={IconStyle.light}
                width="20"
                height="20"
                onClick={handleCloseBtnClick}
              ></Icon>
            </div>
          </div>
        );

      /* SUCCESS STATUS */
      case FileUploaderStatus.success:
        return (
          <div className="flex items-center w-full">
            <div className="left-section flex flex-col leading-none">
              <p className="text-base font-semi-bold text-medium-slate mr-1 mb-3">Uploaded 1 file</p>
              <p className=" text-sm font-regular text-light-slate">
                {getExtensionFile(attachedFile?.name)} <span className="mx-1">•</span>
                {formatBytes(attachedFile?.size, 2)}
              </p>
            </div>
            <div className="right-section flex items-center ml-auto">
              <Icon
                className="text-default-positive mr-4"
                icon={IconCatalog.checkCircle}
                iconStyle={IconStyle.duotone}
                width="32"
                height="32"
              ></Icon>
              <Icon
                className="cursor-pointer text-medium-slate hover:text-black"
                icon={IconCatalog.close}
                iconStyle={IconStyle.light}
                width="20"
                height="20"
                onClick={handleCloseBtnClick}
              ></Icon>
            </div>
          </div>
        );
    }
  };

  /*-------------*/
  /*    RENDER   */
  /*-------------*/
  return (
    <div className={FileUploaderClass}>
      <input type="file" tabIndex={-1} onChange={handleInputChange} />
      {renderFileUploader()}
    </div>
  );
};

export default FileUploader;
