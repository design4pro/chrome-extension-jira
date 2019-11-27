import { ThemeType } from 'shared/util/theme';
import ActionTypes from '../types';

export const setTheme = (state: ThemeType) => ({ type: ActionTypes.SET_THEME, payload: { state } });
