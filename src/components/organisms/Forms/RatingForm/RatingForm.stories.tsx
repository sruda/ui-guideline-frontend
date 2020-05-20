import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import RatingForm from './RatingForm';

storiesOf('Organisms|Forms/RatingForm', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <RatingForm onSuccess={action('submitted-successfully')} onCancel={action('cancel')} />;
  });
