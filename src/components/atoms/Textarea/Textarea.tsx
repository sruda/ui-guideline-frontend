import React, { ChangeEvent, FocusEvent, useState } from 'react';

import cn from 'classnames';

import './Textarea.scss';

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum Resize {
  both = 'both',
  vertical = 'vertical',
  horizontal = 'horizontal',
  none = 'none',
}

export type Props = {
  readonly placeholder?: string;
  readonly name: string;
  readonly size?: Size;
  readonly resize?: Resize;
  readonly block?: boolean;
  readonly isInvalid?: boolean;
  readonly className?: string;
  readonly onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
};

const Textarea: React.SFC<Props> = ({
  placeholder = '',
  name,
  size = Size.xs,
  resize = Resize.vertical,
  block = false,
  isInvalid = false,
  className,
  onChange,
  onBlur,
}) => {
  const textareaClass = cn(className, 'ug-textarea', {
    [`ug-textarea--${size}`]: true,
    [`ug-textarea--resize-${resize}`]: true,
    'ug-textarea--is-invalid': isInvalid,
    'ug-textarea--block': block,
  });

  const [value, setValue] = useState('');

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event?.target?.value;
    setValue(newValue);
    onChange(event);
  };

  const handleInputBlur = (event: FocusEvent<HTMLTextAreaElement>): void => {
    if (onBlur) onBlur(event);
  };

  return (
    <textarea
      className={textareaClass}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleTextareaChange}
      onBlur={handleInputBlur}
      autoComplete="off"
    />
  );
};

export default Textarea;
