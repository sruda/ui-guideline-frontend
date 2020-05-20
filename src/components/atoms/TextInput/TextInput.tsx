import React, { ChangeEvent, FocusEvent, useState } from 'react';

import cn from 'classnames';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import './TextInput.scss';

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

enum IconSize {
  xs = '18',
  sm = '22',
  md = '26',
  lg = '30',
}

export type Props = {
  readonly placeholder?: string;
  readonly defaultValue?: string | number;
  readonly name: string;
  readonly size?: Size;
  readonly block?: boolean;
  readonly isInvalid?: boolean;
  readonly leadingIcon?: IconCatalog;
  readonly trailingIcon?: IconCatalog;
  readonly iconStyle?: IconStyle;
  readonly className?: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

const TextInput: React.SFC<Props> = ({
  placeholder = '',
  name,
  size = Size.xs,
  block = false,
  isInvalid = false,
  leadingIcon = IconCatalog.none,
  trailingIcon = IconCatalog.none,
  iconStyle = IconStyle.regular,
  defaultValue = '',
  className,
  onChange,
  onBlur,
}) => {
  const textInputWrapperClass = cn(className, 'ug-text-input-wrapper', {
    [`ug-text-input-wrapper--${size}`]: true,
    'ug-text-input--block': block,
    'with-leading-icon': !!leadingIcon && leadingIcon !== IconCatalog.none,
    'with-trailing-icon': !!trailingIcon && trailingIcon !== IconCatalog.none,
  });

  const textInputClass = cn('ug-text-input', {
    [`ug-text-input--${size}`]: true,
    'ug-text-input--block': block,
    'ug-text-input--is-invalid': isInvalid,
  });

  const leadingIconClass = cn({
    'icon leading-icon': true,
    'text-default-slate': true,
  });

  const trailingIconClass = cn({
    'icon trailing-icon': true,
    'text-default-slate': true,
  });

  const [value, setValue] = useState(defaultValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event?.target?.value;
    setValue(newValue);
    onChange(event);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  return (
    <div className={textInputWrapperClass}>
      {leadingIcon && (
        <Icon
          icon={leadingIcon}
          width={IconSize[size]}
          height={IconSize[size]}
          iconStyle={iconStyle}
          className={leadingIconClass}
        />
      )}
      <input
        className={textInputClass}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        autoComplete="off"
      />
      {trailingIcon && (
        <Icon
          icon={trailingIcon}
          width={IconSize[size]}
          height={IconSize[size]}
          iconStyle={iconStyle}
          className={trailingIconClass}
        />
      )}
    </div>
  );
};

export default TextInput;
