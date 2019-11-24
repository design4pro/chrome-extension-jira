import ActionTypes from 'shared/state/actions/types';
import { setTheme } from './theme';

export const AppReducers = {
    [ActionTypes.SET_THEME]: setTheme,
};

export default AppReducers;
