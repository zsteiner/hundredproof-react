'use client';
import { useActorRef } from '@xstate/react';
import { createContext, ReactNode } from 'react';
import { ActorRefFrom } from 'xstate';

import { scalingMachine } from './machine';

export const ScalingMachineContext = createContext<ActorRefFrom<
  typeof scalingMachine
> | null>(null);

type ScalingMachineProviderProps = {
  children: ReactNode;
};

export const ScalingMachineProvider = ({
  children,
}: ScalingMachineProviderProps) => {
  const machine = useActorRef(scalingMachine);

  return (
    <ScalingMachineContext.Provider value={machine}>
      {children}
    </ScalingMachineContext.Provider>
  );
};
