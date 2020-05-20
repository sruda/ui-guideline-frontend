import React, { useContext } from 'react';

import cn from 'classnames';

import ComponentDetailModal from './ComponentDetailModal/ComponentDetailModal';

import { ModalContext } from '@contexts/ModalContext';

import './ModalManager.scss';

const Modals = {
  ComponentDetailModal,
};

const ModalManager = (): JSX.Element | null => {
  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const modalManagerClass = cn('ug-modal-manager', {});

  /*------------------*/
  /*      HANDLES     */
  /*------------------*/
  const { currentModal, setCurrentModal } = useContext(ModalContext);
  const handleCloseClick = (): void => setCurrentModal(null);

  /*--------------------------------*/
  /*     RENDER BY CURRENT MODAL    */
  /*--------------------------------*/
  if (currentModal) {
    const ModalComponent = Modals[currentModal.name];
    return (
      <div className={modalManagerClass}>
        <ModalComponent className="mb-20" onClose={handleCloseClick} {...currentModal.props} />
      </div>
    );
  }
  return null;
};

export default ModalManager;
