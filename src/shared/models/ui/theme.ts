import { PaletteMode } from '@material-ui/core';

export const DEFAULT_THEME: ThemeMode = 'auto';

export const KEY_THEME = 'theme';

export type ThemeMode = PaletteMode | 'auto';

export interface ThemeState {
    [key: string]: ThemeMode;
}
