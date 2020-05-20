import mixpanel from 'mixpanel-browser';

type UseMixpanelResponse = {
  eventTrack: (action: string, properties?: any) => void;
};

const useMixpanel = (): UseMixpanelResponse => {
  const eventTrack = (action: string, properties?: any): void => {
    try {
      mixpanel.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  };

  return {
    eventTrack,
  };
};

export default useMixpanel;
