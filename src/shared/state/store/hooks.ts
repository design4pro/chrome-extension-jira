import { useContext, useReducer, useState } from 'react';
import StoreContext, { ContextProps } from './context';
import { CURRENT_SCHEMA_VERSION, KEY_SCHEMA_VERSION } from './initial-state';
import createUseStorageReducer from './reducer';
import createUseStorageState from './state';

const createUseReducer = (storage: Storage | null): ReturnType<typeof createUseStorageReducer> => {
    if (storage) {
        return createUseStorageReducer(storage);
    }

    return (key, reducer, initializerArg, initializer) => {
        const [state, dispatch] = initializer
            ? useReducer(reducer, initializerArg, initializer)
            : useReducer(reducer, initializerArg);
        return [state, dispatch, undefined];
    };
};

const createUseState = (storage: Storage | null): ReturnType<typeof createUseStorageState> => {
    if (storage) {
        return createUseStorageState(storage);
    }

    return (key, defaultState) => {
        const [state, setState] = useState(defaultState);
        return [state, setState, undefined];
    };
};

const getLocalStorage = (): Storage => (typeof localStorage === 'undefined' ? null : localStorage);
const getSessionStorage = (): Storage => (typeof sessionStorage === 'undefined' ? null : sessionStorage);

export const useLocalStorageState = createUseState(getLocalStorage());
export const useSessionStorageState = createUseState(getSessionStorage());
export const useLocalStorageReducer = createUseReducer(getLocalStorage());
export const useSessionStorageReducer = createUseReducer(getSessionStorage());

export const useStore = (): ContextProps => useContext(StoreContext);

export const useCheckLocalStorageSchema = () => {
    const [schemaVersion, setSchemaVersion] = useLocalStorageState(KEY_SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);

    if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
        window.localStorage.clear();
        setSchemaVersion(CURRENT_SCHEMA_VERSION);
    }
};
