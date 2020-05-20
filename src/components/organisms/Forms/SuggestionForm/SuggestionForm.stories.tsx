import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import SuggestionForm from './SuggestionForm';

storiesOf('Organisms|Forms/SuggestionForm', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <SuggestionForm className="max-w-lg" onSuccess={action('submitted-successfully')} />;
  });
