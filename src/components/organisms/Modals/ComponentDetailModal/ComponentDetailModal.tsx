import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import trackEvents from '@constants/trackEventConstants';

import { ComponentData, SiblingComponentData, SiblingRefSystemData, TypeOfSystem } from '@interfaces/data';

import useBodyClass from '@hooks/useBodyClass';
import useMixpanel from '@hooks/useMixpanel';

import Icon, { Catalog as IconCatalog, Style as IconStyle } from '@primitives/Icon/Icon';

import Avatar, { Size as AvatarSize } from '@atoms/Avatar/Avatar';
import Progress, { Color as ProgressColor, Size as ProgressSize } from '@atoms/Progress/Progress';

import './ComponentDetailModal.scss';

export type Props = {
  readonly component: ComponentData;
  readonly onClose: () => void;
  readonly className?: string;
};

interface SiblingElement extends SiblingComponentData {
  progress: number;
}

const ComponentDetailModal: React.SFC<Props> = ({ component, onClose, className }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const componentDetailModalClass = cn(className, 'ug-component-detail-modal', {});

  const { eventTrack } = useMixpanel();

  /*-------------------*/
  /* APPEND BODY CLASS */
  /*-------------------*/
  useBodyClass('opened-modal');

  const getProgressValue = (sibling: SiblingComponentData, totalRefSystems: number): number => {
    let refSystemsAmout = 0;
    for (const key in sibling.ref_systems) {
      refSystemsAmout = refSystemsAmout + sibling.ref_systems[key].length;
    }
    return Math.round((refSystemsAmout * 100) / totalRefSystems);
  };

  /*-----------------------*/
  /*      INIT STATES      */
  /*-----------------------*/
  const [totalRefSystems, setTotalRefSystems] = useState<number>();
  const [selectedSibling, setSelectedSibling] = useState<SiblingElement>();
  const [siblingElementList, setSiblingElementList] = useState<Array<SiblingElement>>([]);
  useEffect(() => {
    let total = 0;
    component.siblings.forEach((sibling: SiblingComponentData) => {
      total = sibling.ref_systems.ds.length + sibling.ref_systems.fl.length + total;
    });

    const parseSiblingList = component.siblings.map((sibling: SiblingComponentData) => {
      const progress = getProgressValue(sibling, total);
      return {
        ...sibling,
        progress,
      } as SiblingElement;
    });
    setSiblingElementList(parseSiblingList);
    setSelectedSibling(parseSiblingList[0]);
    setTotalRefSystems(total);
  }, [component]);

  const handleSiblingClick = (sibling: SiblingElement) => (): void => {
    eventTrack(trackEvents.componentDetailModal.clickSiblingItem, { sibling: sibling.name });
    setSelectedSibling(sibling);
  };

  const handleRefSystemClick = (refSystem: SiblingRefSystemData) => (): void => {
    eventTrack(trackEvents.componentDetailModal.clickRefSystemItem, { refSystem: refSystem.name });
  };

  /*-----------------------------*/
  /*   RENDER VISUAL REF LIST    */
  /*-----------------------------*/
  /* TODO: Mejorar esta creacion de referencias visuales, para que se adapte inteligentemente para cuando solo 
  uno, 2, 3 o ninguna referencia visual. */

  const visualRefList = (): JSX.Element => {
    const visualRefListClass = cn({
      'grid gap-4 mb-4': true,
      'grid-cols-1': !component.visual_ref_urls,
      'grid-cols-2': component.visual_ref_urls,
    });

    return (
      <div className={visualRefListClass}>
        <img className="w-full h-auto" src={component.thumbnail_url} alt={component.name} />
        <div className="grid grid-cols-2 gap-4">
          {component.visual_ref_urls &&
            component.visual_ref_urls.map((url: string, index) => {
              return <img key={index} className="w-full h-auto" src={url} alt={component.name} />;
            })}
        </div>
      </div>
    );
  };

  /*---------------------------*/
  /*   RENDER SIBLINGS LIST    */
  /*---------------------------*/
  const siblingsList = siblingElementList.map((sibling: SiblingElement) => {
    const siblingClass = cn({
      'flex mb-4 p-4 cursor-pointer hover:bg-default-snow hover:rounded-lg': true,
      'pr-8 -mr-4 bg-default-snow rounded-lg rounded-r-none': selectedSibling?.id === sibling.id,
    });
    return (
      <div onClick={handleSiblingClick(sibling)} className={siblingClass} key={sibling.id}>
        <div className="text-base font-semi-bold text-medium-slate">{sibling.name}</div>
        <div className="flex items-center ml-auto">
          <div className="w-20 mr-3">
            <Progress
              value={sibling.progress}
              maxValue={100}
              size={ProgressSize.md}
              color={ProgressColor.secondary}
              rounded={true}
            />
          </div>
          <div className="text-base font-semi-bold text-medium-slate ml-auto w-10 text-right">{sibling.progress}%</div>
        </div>
      </div>
    );
  });

  /*-----------------------*/
  /*     SYSTEMS LIST      */
  /*-----------------------*/
  /* TODO: Que pasa si agrego otra categoria de Systems? Deberia estar esto en base, y aqui solo llamar y ser dinamico, 
  Por ejemplo los nombres asignados en los titulos deberian estar en base: ref_system.name */
  const renderSystemList = (systemType: TypeOfSystem): JSX.Element | null => {
    const title = systemType === TypeOfSystem.designSystem ? 'Design System' : 'UI Frameworks';
    return (
      <div className="system-list">
        <h3 className="text-base text-default-slate font-bold mb-4 pb-2 pl-1">{title}</h3>
        <div className="ml-2">
          {selectedSibling &&
            selectedSibling?.ref_systems[systemType].map((refSystem: SiblingRefSystemData, index) => (
              <a
                href={refSystem.component_site_url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="system-list__item flex items-center hover:underline"
                onClick={handleRefSystemClick(refSystem)}
              >
                <Avatar className="mr-3" imgUrl={refSystem.logo_url} size={AvatarSize.xs} altText={refSystem.name} />
                <span className="text-base font-semi-bold text-medium-slate">{refSystem.name}</span>
              </a>
            ))}
        </div>
      </div>
    );
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={componentDetailModalClass} aria-modal aria-hidden role="dialog">
      <div className="bg-white h-full">
        {/* HEADER */}
        <div className="flex w-full p-6 pr-4 md:p-8 md:mb-10">
          <span className="cursor-pointer ml-auto" onClick={onClose}>
            <Icon
              icon={IconCatalog.close}
              iconStyle={IconStyle.light}
              className="text-default-slate"
              width="24"
              height="24"
            />
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col container mx-auto lg:max-w-4xl">
          {/* STATS */}
          <div className="flex items-center mb-6 pl-2 w-full">
            <div className="flex flex-col md:flex-row items-center justify-center w-full border-b-2 border-dark-snow py-6">
              {/* STATS - SELECTED NAME */}
              <div className="flex items-center justify-center h-24 p-5 w-full md:w-1/4 mb-6 md:mb-0 md:mr-6 bg-default-snow rounded-md">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-light-slate mb-2">Selected name</span>
                  <p className="text-2xl font-bold">{component.name}</p>
                </div>
              </div>

              {/* STATS - REF. SYSTEM USING THIS COMPONENT */}
              <div className="flex items-center justify-center h-24 p-5 w-full md:w-2/4 mb-6 md:mb-0 md:mr-6 bg-default-snow rounded-md">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-light-slate mb-2">Ref. Systems using this component</span>
                  <p className="text-2xl font-bold">
                    {totalRefSystems}
                    <span className="text-base font-regular text-medium-slate mx-2">of</span>
                    26
                  </p>
                </div>
              </div>

              {/* STATS - VERIFIED */}
              <div className="flex items-center justify-center h-24 p-5 w-full md:w-1/4 bg-default-snow rounded-md">
                {component.is_verified && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-light-slate mb-2">Verified</span>
                    <Icon
                      icon={IconCatalog.badgeCheck}
                      iconStyle={IconStyle.solid}
                      className="text-default-secondary"
                      width="32"
                      height="32"
                    />
                  </div>
                )}
                {!component.is_verified && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-light-slate mb-2">Not verified</span>
                    <Icon
                      icon={IconCatalog.badgeCheck}
                      iconStyle={IconStyle.solid}
                      className="text-default-smoke"
                      width="32"
                      height="32"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 pl-2">
            {/* IMAGES PREVIEW */}
            {/* visualRefList() */}

            {/* COMPONENT DETAILS */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-4 relative bg-white">
              {/* LEFT-SIDE: POSSIBLE NAME */}
              <div className="flex flex-col w-full pt-6">
                <h3 className="text-base text-default-slate font-bold mb-4 px-4">
                  Possible names <span className="text-default-negative font-semi-bold">*</span>
                </h3>
                {siblingsList}
                <p className="text-xs md:text-sm text-light-slate leading-snug text-center md:text-left mt-2 pl-1">
                  <span className="text-default-negative font-semi-bold mr-1">*</span>
                  {totalRefSystems} ref. systems that include this component in their system,
                  {selectedSibling?.progress}% name it <span className="font-semi-bold">{selectedSibling?.name}</span>.
                </p>
              </div>

              {/* RIGHT-SIDE: SYSTEMS USING THE COMPONENT */}
              <div className="flex flex-col bg-default-snow p-5 w-full">
                {/* DESIGN SYSTEMS */}
                {/* TODO: Que pasa si agregamos una nueva categoria? el key quemado aqui no es optimo */}
                {selectedSibling?.ref_systems.ds.length !== 0 && renderSystemList(TypeOfSystem.designSystem)}

                {/* FRAMEWORKS */}
                {selectedSibling?.ref_systems.fl.length !== 0 && renderSystemList(TypeOfSystem.frameworkAndLibrary)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailModal;
