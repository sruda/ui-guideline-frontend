import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { boolean, optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';

import Textarea, { Size, Resize } from './Textarea';

storiesOf('Atoms|Textarea', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const placeholder = text('Placeholder', 'Placeholder');
    const name = text('Name', 'user');
    const size = options('Size', Size, Size.xs, { display: 'inline-radio' });
    const resize = options('Resize', Resize, Resize.vertical, { display: 'inline-radio' });
    const block = boolean('Block', false);
    const isInvalid = boolean('Is invalid', false);

    return (
      <Textarea
        name={name}
        size={size}
        resize={resize}
        placeholder={placeholder}
        block={block}
        isInvalid={isInvalid}
        onChange={action('textarea-change')}
      />
    );
  });
