import { ThemeMode } from 'shared/models/ui/theme';
import ActionTypes from '../types';

export const setTheme = (theme: ThemeMode) => ({ type: ActionTypes.SET_THEME, payload: { theme } });
