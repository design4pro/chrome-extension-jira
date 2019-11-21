import * as types from './types';

export const showState = state => ({ type: types.SHOW_STATE, payload: { state } });
