import React from 'react';
import type { CollapsibleContext } from './types';

type CreateCtx<A> = readonly [
  () => A,
  React.ProviderExoticComponent<React.ProviderProps<A | undefined>>
];

// utility function from
// https://github.com/dooboolab/expo-relay-boilerplate/blob/master/src/utils/createCtx.ts
// create context with no upfront defaultValue
// without having to do undefined check all the time
function createContext<A>(): CreateCtx<A> {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx(): A {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  // make TypeScript infer a tuple, not an array of union types
  return [useCtx, ctx.Provider] as const;
}
const [useCollapsibleContext, CollapsibleContextProvider] = createContext<
  CollapsibleContext
>();

export { useCollapsibleContext, CollapsibleContextProvider, createContext };
