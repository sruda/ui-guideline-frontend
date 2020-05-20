import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import FaceRating from './FaceRating';

storiesOf('Atoms|Ratings/Face', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <FaceRating />;
  });
