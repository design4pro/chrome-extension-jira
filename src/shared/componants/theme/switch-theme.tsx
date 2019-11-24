import { PaletteType } from '@material-ui/core';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { onBrowserThemeChanged } from 'shared/util/theme/browser-theme';
import { setLocalStorageTheme } from 'shared/util/theme/local-storage';
import { useTheme } from './use-theme';

export const SwitchTheme = () => {
    const [theme, setTheme] = useTheme();

    const updateTheme: Dispatch<SetStateAction<PaletteType>> = useCallback(
        (newTheme: (theme: PaletteType) => PaletteType | PaletteType) => {
            if (typeof newTheme === 'function') {
                setTheme(currentTheme => {
                    const actualNewTheme: PaletteType = newTheme(currentTheme);

                    setLocalStorageTheme(actualNewTheme);

                    return actualNewTheme;
                });
            } else {
                setLocalStorageTheme(newTheme);

                setTheme(newTheme);
            }
        },
        [setTheme]
    );

    useEffect(() => onBrowserThemeChanged(updateTheme), [updateTheme, setTheme]);

    return '';
};

export default SwitchTheme;
