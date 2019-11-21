import { PaletteType } from '@material-ui/core';

export const CURRENT_SCHEMA_VERSION = '2';

export const KEY_SCHEMA_VERSION = 'schemaVersion';
export const KEY_DARK_MODE = 'preferDarkMode';

export const getObject = (key: string) => JSON.parse(localStorage.getItem(key));
export const setObject = (key: string, value) => localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorageTheme = (): PaletteType => {
    const localTheme = window.localStorage && (window.localStorage.getItem('theme') as PaletteType);

    if (localTheme && ['light', 'dark'].includes(localTheme)) {
        return localTheme;
    }
};

export const setLocalStorageTheme = (theme: PaletteType) => {
    localStorage.setItem('theme', theme);
};
