import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, optionsKnob as options, withKnobs } from '@storybook/addon-knobs';

import Progress, { Size, Color } from './Progress';

storiesOf('Atoms|Progress', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const value = number('Value', 0);
    const maxValue = number('Max Value', 100);
    const size = options('Size', Size, Size.sm, { display: 'inline-radio' });
    const color = options('Color', Color, Color.secondary, { display: 'inline-radio' });
    const rounded = boolean('Block', false);

    return <Progress value={value} maxValue={maxValue} color={color} size={size} rounded={rounded} />;
  });
