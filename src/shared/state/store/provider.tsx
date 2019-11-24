import PropTypes from 'prop-types';
import React, { Children, useCallback, useReducer } from 'react';
import reducers from 'shared/state/reducers';
import isPlainObject from '../../util/is-plain-object';
import StoreContext from './context';
import initialState from './initial-state';

export const asyncer = (dispatch: any, state: any) => (action: any) =>
    typeof action === 'function' ? action(dispatch, state) : dispatch(action);

export const StoreProvider = ({ children }) => {
    const [state, dispatchRoot] = useReducer(reducers, initialState);

    console.log({ state });

    if (!isPlainObject(initialState)) {
        throw new Error('Provider Expected the initialState to be a PlainObject');
    }

    const dispatch = useCallback(asyncer(dispatchRoot, state), []);

    const value = { state, dispatch };

    return <StoreContext.Provider value={value}>{Children.only(children)}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
    reducer: PropTypes.func,
    initialState: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StoreProvider;
