import React from 'react';

import cn from 'classnames';

import trackEvents from '@constants/trackEventConstants';

import useMixpanel from '@hooks/useMixpanel';

import Logo, { Color as LogoColor, Size as LogoSize } from '@primitives/Logo/Logo';

import FaceRating from '@atoms/Ratings/FaceRating/FaceRating';

export type Props = {
  readonly className?: string;
};

const Footer: React.SFC<Props> = ({ className }) => {
  const footerClass = cn(className, 'ug-footer', {
    'flex flex-col lg:flex-row items-start px-6 py-8 border-t border-default-smoke': true,
  });

  const { eventTrack } = useMixpanel();

  const handleOptionClick = (trackEvent: string) => (): void => {
    eventTrack(trackEvent);
  };

  return (
    <div className={footerClass}>
      <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left w-full lg:w-1/2 mb-8 lg:mb-0">
        <span className="inline-flex mb-4">
          <Logo arialLabel="UI Guideline" color={LogoColor.lightSlate} size={LogoSize.sm}></Logo>
        </span>
        <p className="text-sm font-regular text-light-slate max-w-md mb-6">
          It’s a way to standardize the use of UI Components, starting with the naming convention. Our short-term goal
          is to include more details about each component (size, colors, code, best practices, etc).
        </p>
        <ul className="inline-flex mb-2">
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/UIGuideline/UIGuideline"
            >
              Github
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/uiguideline"
            >
              Twitter
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="http://eepurl.com/c1fttz"
              onClick={handleOptionClick(trackEvents.footer.clickSubscribeOption)}
            >
              Subscribe for updates
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
        <div className="flex items-center lg:ml-auto">
          <span className="uppercase text-sm text-light-slate font-semi-bold mr-6">was this page helpful?</span>
          <FaceRating />
        </div>
      </div>
    </div>
  );
};

export default Footer;
