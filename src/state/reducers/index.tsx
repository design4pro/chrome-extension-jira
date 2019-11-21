import * as types from '../actions/types';
import * as app from './app';

const createReducer = (handlers: any) => (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
        return state;
    }

    return handlers[action.type](state, action);
};

export default createReducer({
    [types.SHOW_STATE]: app.showState,
});
