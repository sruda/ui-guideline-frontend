/* TODO: Add explicit titles */
export const isEmpty = (obj): boolean => Object.keys(obj).length === 0;

/* TODO: Add explicit titles */
export const formatBytes = (bytes = 0, decimals: number): string => {
  if (bytes === 0) return '0 Bytes';
  const kb = 1024;
  const parsedDecimal = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = Math.floor(Math.log(bytes) / Math.log(kb));
  return parseFloat((bytes / Math.pow(kb, index)).toFixed(parsedDecimal)) + ' ' + sizes[index];
};

/* TODO: Add explicit titles */
export const toMb = (size: number): number => {
  return size / 1024 / 1024;
};

/**
 * generateGuid
 * @description - generate Guid id string
 * @function
 * @return {string} guid - Returns an Guid Id string.
 * TODO: Install uuid library (it's more robust than this)
 */
export const generateGuid = (): string => {
  const fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const guid = fmt.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return guid;
};
