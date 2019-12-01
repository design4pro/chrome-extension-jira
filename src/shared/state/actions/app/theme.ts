import { ThemeType } from 'shared/componants/theme/model';
import ActionTypes from '../types';

export const setTheme = (theme: ThemeType) => ({ type: ActionTypes.SET_THEME, payload: { theme } });
