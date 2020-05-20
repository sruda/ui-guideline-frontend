import { boolean, optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button, { Size, Use } from './Button';

storiesOf('Atoms|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const label = text('Label', 'Button');
    const size = options('Size', Size, Size.xs, { display: 'inline-radio' });
    const use = options('Use', Use, Use.primary, { display: 'inline-radio' });
    const block = boolean('Block', false);

    return (
      <Button use={use} size={size} block={block} onClick={(): boolean => true}>
        {label}
      </Button>
    );
  });
