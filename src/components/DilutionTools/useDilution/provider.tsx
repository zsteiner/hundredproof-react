'use client';
import { useActorRef } from '@xstate/react';
import { createContext, ReactNode } from 'react';
import { ActorRefFrom } from 'xstate';

import { dilutionMachine } from './machine';

export const DilutionMachineContext = createContext<ActorRefFrom<
  typeof dilutionMachine
> | null>(null);

type DilutionMachineProviderProps = {
  children: ReactNode;
};

export const DilutionMachineProvider = ({
  children,
}: DilutionMachineProviderProps) => {
  const machine = useActorRef(dilutionMachine);

  return (
    <DilutionMachineContext.Provider value={machine}>
      {children}
    </DilutionMachineContext.Provider>
  );
};
