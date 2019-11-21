import { createContext } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const StateContext = createContext<Record<string, any>>({});

export default StateContext;
