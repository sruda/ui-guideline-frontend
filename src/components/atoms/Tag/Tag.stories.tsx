import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { boolean, optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';

import Tag, { Use } from './Tag';

storiesOf('Atoms|Tag', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const children = text('Label', 'NEW');
    const closable = boolean('Closable', false);
    const use = options('Use', Use, Use.primary, { display: 'inline-radio' });

    return (
      <Tag use={use} closable={closable} onClose={action('closed tag')}>
        {children}
      </Tag>
    );
  });
