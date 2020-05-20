import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import { RefSystemData, RefSystemSize, TypeOfSystem } from '@interfaces/data';

import RefSystemCard from './RefSystemCard';

storiesOf('Atoms|Cards/Ref System Card', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const refSystem: RefSystemData = {
      id: 'wne7XCWxt0WdNAPwotwo',
      name: 'Ant Design',
      ['logo_url']:
        'https://firebasestorage.googleapis.com/v0/b/ui-guideline.appspot.com/o/images%2Fsystems%2Fds%2Fds-ant-design.svg?alt=media&token=b4104537-ea2e-4239-bd25-4f5fdb7e7615',
      description: 'HubSpot Canvas is the design system that we at HubSpot use to build our products.',
      company: 'XTech',
      size: RefSystemSize.medium,
      updated: false,
      ['coming_soon']: false,
      ['quantity_of_components']: 30,
      ['company_site_url']: 'https://www.atlassian.com/',
      ['system_site_url']: 'https://ant.design/',
      type: TypeOfSystem.designSystem,
    };

    const isComingSoon = boolean('Is coming soon', refSystem.coming_soon);

    return (
      <div className="flex flex-wrap">
        <RefSystemCard className="max-w-sm m-3" refSystem={refSystem} isComingSoon={isComingSoon} />
      </div>
    );
  });
