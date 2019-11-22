import React, { Children, useReducer } from 'react';
import PropTypes from 'prop-types';
import isPlainObject from './../../util/is-plain-object';
import StateContext from './context';

export const StoreProvider = ({ reducer, initialState, children }) => {
    if (!isPlainObject(initialState)) {
        throw new Error('Provider Expected the initialState to be a PlainObject');
    }

    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {Children.only(children)}
        </StateContext.Provider>
    );
};

StoreProvider.propTypes = {
    reducer: PropTypes.func,
    initialState: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StoreProvider;
