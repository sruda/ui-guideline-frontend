import mixpanel from 'mixpanel-browser';

import * as appConfig from '@constants/appConstants';

// Initialize Mixpanel
mixpanel.init(appConfig.MIXPANEL_PROJECT_TOKEN);
