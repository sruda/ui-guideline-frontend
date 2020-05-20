import React from 'react';
import { storiesOf } from '@storybook/react';
import { optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';

import Logo, { Size, Color } from './Logo';

storiesOf('Primitives|Logo', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const arialLabel = text('Arial Label', 'UI Guideline Home');
    const size = options('Size', Size, Size.xs, { display: 'inline-radio' });
    const color = options('Color', Color, Color.default, { display: 'inline-radio' });

    return <Logo arialLabel={arialLabel} size={size} color={color} />;
  });
