import React, { Children, FC, ReactNode, useReducer } from 'react';
import isPlainObject from './../../util/is-plain-object';
import StateContext from './context';

type Props = {
    reducer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState: Record<string, any>;
    children: ReactNode;
};

export const StoreProvider: FC<Props> = ({ reducer, initialState, children }) => {
    if (!isPlainObject(initialState)) {
        throw new Error('Provider Expected the initialState to be a PlainObject');
    }

    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {Children.only(children)}
        </StateContext.Provider>
    );
};
