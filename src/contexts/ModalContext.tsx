/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';

export enum Modals {
  ComponentDetailModal = 'ComponentDetailModal',
}

interface CurrentModal {
  name: Modals;
  props: any;
}

export interface ModalContext {
  currentModal: CurrentModal | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal | null>>;
}

export const ModalContext = createContext<ModalContext>({} as ModalContext);

export const ModalProvider = (props): JSX.Element => {
  const [currentModal, setCurrentModal] = useState<CurrentModal | null>(null);

  return <ModalContext.Provider value={{ currentModal, setCurrentModal }}>{props.children}</ModalContext.Provider>;
};
