import { PaletteType } from '@material-ui/core';
import { ThemeType } from '.';

export const getLocalStorageTheme = (): PaletteType => {
    const localTheme = window.localStorage && (window.localStorage.getItem('theme') as PaletteType);

    if (localTheme && ['light', 'dark'].includes(localTheme)) {
        return localTheme;
    }
};

export const setLocalStorageTheme = (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
};
