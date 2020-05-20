import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { boolean, optionsKnob as options, text, withKnobs, select } from '@storybook/addon-knobs';

import { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import TextInput, { Size } from './TextInput';

storiesOf('Atoms|Text Input', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const placeholder = text('Placeholder', 'Placeholder');
    const name = text('Name', 'user');
    const size = options('Size', Size, Size.xs, { display: 'inline-radio' });
    const leadingIcon = select('Leading Icon', IconCatalog, IconCatalog.none);
    const trailingIcon = select('Trailing Icon', IconCatalog, IconCatalog.none);
    const iconStyle = options('Icon Style', IconStyle, IconStyle.regular, { display: 'inline-radio' });
    const block = boolean('Block', false);
    const isInvalid = boolean('In invalid', false);

    return (
      <TextInput
        name={name}
        size={size}
        placeholder={placeholder}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        iconStyle={iconStyle}
        block={block}
        isInvalid={isInvalid}
        onChange={action('input-change')}
      />
    );
  });
