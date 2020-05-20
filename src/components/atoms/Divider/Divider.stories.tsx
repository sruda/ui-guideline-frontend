import React from 'react';
import { storiesOf } from '@storybook/react';
import { optionsKnob as options, withKnobs } from '@storybook/addon-knobs';

import Divider, { Spacing, Color } from './Divider';

storiesOf('Atoms|Divider', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const spacing = options('Spacing', Spacing, Spacing.xs, { display: 'inline-radio' });
    const color = options('Color', Color, Color.defaultSmoke, { display: 'inline-radio' });

    return <Divider color={color} spacing={spacing} />;
  });
