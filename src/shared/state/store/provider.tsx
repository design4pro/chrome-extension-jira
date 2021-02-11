import PropTypes from 'prop-types';
import React, { Children, useCallback } from 'react';
import reducers from 'shared/state/reducers';
import isPlainObject from '../../util/is-plain-object';
import StoreContext from './context';
import { useLocalStorageReducer } from './hooks';
import initialState from './initial-state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncer = (dispatch: any, state: any) => (action: any) =>
    typeof action === 'function' ? action(dispatch, state) : dispatch(action);

export const StoreProvider = ({ children }): JSX.Element => {
    const [state, dispatchRoot, writeError] = useLocalStorageReducer('state', reducers, initialState);

    if (!isPlainObject(initialState)) {
        throw new Error('Provider Expected the initialState to be a PlainObject');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatch = useCallback(asyncer(dispatchRoot, state), []);

    const value = { state, dispatch, writeError };

    return <StoreContext.Provider value={value}>{Children.only(children)}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StoreProvider;
