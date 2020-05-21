import mixpanel from 'mixpanel-browser';

import * as appConstants from '@constants/appConstants';

// Initialize Mixpanel
mixpanel.init(appConstants.MIXPANEL_PROJECT_TOKEN);
