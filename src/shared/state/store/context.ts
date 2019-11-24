import { createContext } from 'react';

export interface ContextProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    state: any;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    dispatch: any;
}

export const StoreContext = createContext({} as ContextProps);

export default StoreContext;
