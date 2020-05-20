import React, { useState } from 'react';
import Link from 'next/link';

import cn from 'classnames';

import trackEvents from '@constants/trackEventConstants';

import useMixpanel from '@hooks/useMixpanel';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';
import Logo, { Size as LogoSize, Color as LogoColor } from '@primitives/Logo/Logo';

import './Navbar.scss';

export type Props = {
  readonly className?: string;
};

const Navbar: React.SFC<Props> = ({ className }) => {
  const navbarClass = cn(className, 'ug-navbar', {
    'bg-white border-b border-dark-snow': true,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { eventTrack } = useMixpanel();

  const handleOpenMenuClick = (): void => {
    setMobileMenuOpen(true);
  };

  const handleCloseMenuClick = (): void => {
    setMobileMenuOpen(false);
  };

  const handleNavbarOptionClick = (trackEvent: string, isMobile = false) => (): void => {
    eventTrack(trackEvent);
    if (isMobile) handleCloseMenuClick();
  };

  return (
    <nav className={navbarClass}>
      {/* DESKTOP */}
      <div className="max-w-7xl mx-auto px-6 hidden md:flex">
        <div className="relative flex-1 flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Logo className="block" arialLabel="UI Guideline" size={LogoSize.sm} color={LogoColor.default}></Logo>
          </div>
          <div className="navbar-options flex items-center ml-auto">
            <Link href="/">
              <a
                className="text-sm font-semi-bold cursor-pointer text-black hover:underline focus:text-dark-secondary mr-10"
                onClick={handleNavbarOptionClick(trackEvents.navbar.clickComponentOption)}
              >
                Components
              </a>
            </Link>
            <Link href="/reference-systems">
              <a
                className="text-sm font-semi-bold cursor-pointer text-black hover:underline focus:text-dark-secondary mr-10"
                onClick={handleNavbarOptionClick(trackEvents.navbar.clickRefSystemOption)}
              >
                Reference Systems
              </a>
            </Link>
            <a
              className="subscribe-btn subscribe-btn--xs subscribe-btn--primary"
              href="http://eepurl.com/c1fttz"
              onClick={handleNavbarOptionClick(trackEvents.navbar.clickSubscribeOption)}
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="max-w-7xl mx-auto px-6 flex md:hidden">
        <div className="relative flex-1 flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Logo className="block" arialLabel="UI Guideline" size={LogoSize.sm} color={LogoColor.default}></Logo>
          </div>
          <div className="navbar-options flex items-center ml-auto">
            <a
              className="subscribe-btn subscribe-btn--xs subscribe-btn--primary mr-3"
              href="http://eepurl.com/c1fttz"
              onClick={handleNavbarOptionClick(trackEvents.navbar.clickSubscribeOption)}
            >
              Subscribe
            </a>
            <span className="p-2 hover:bg-dark-snow rounded-md cursor-pointer" onClick={handleOpenMenuClick}>
              <Icon
                className="text-light-slate"
                icon={IconCatalog.ellipsisV}
                iconStyle={IconStyle.light}
                width="24"
                height="24"
              />
            </span>
          </div>
        </div>

        {/* MOBILE - MENU */}
        {mobileMenuOpen && (
          <div className="absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right">
            <div className="rounded-lg shadow-lg">
              <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="ml-auto">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        onClick={handleCloseMenuClick}
                      >
                        <Icon
                          className="text-default-slate"
                          icon={IconCatalog.close}
                          iconStyle={IconStyle.light}
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <nav className="grid row-gap-8">
                      <Link href="/">
                        <a
                          className="text-md font-regular cursor-pointer text-default-slate mr-10"
                          onClick={handleNavbarOptionClick(trackEvents.navbar.clickComponentOption, true)}
                        >
                          Components
                        </a>
                      </Link>
                      <Link href="/reference-systems">
                        <a
                          className="text-md font-regular cursor-pointer text-default-slate mr-10"
                          onClick={handleNavbarOptionClick(trackEvents.navbar.clickRefSystemOption, true)}
                        >
                          Reference Systems
                        </a>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
