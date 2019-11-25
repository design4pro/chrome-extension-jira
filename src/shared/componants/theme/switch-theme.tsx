import { PaletteType } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import BrightnessAuto from '@material-ui/icons/BrightnessAuto';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { KEY_THEME } from 'shared/util/local-storage';
import useLocalStorage from 'shared/util/local-storage/use-local-storage';
import { ThemeType } from 'shared/util/theme';
import { onBrowserThemeChanged } from 'shared/util/theme/browser-theme';
import { useTheme } from './use-theme';

export const SwitchTheme = () => {
    const [theme, setTheme] = useTheme();
    const [state, setState] = useLocalStorage(KEY_THEME);

    const updateTheme: Dispatch<SetStateAction<ThemeType | PaletteType>> = useCallback(
        (newTheme: (theme: ThemeType) => ThemeType | ThemeType | PaletteType) => {
            if (typeof newTheme === 'function') {
                setTheme((currentTheme: ThemeType) => {
                    const actualNewTheme: ThemeType = newTheme(currentTheme);

                    setState(actualNewTheme);

                    return actualNewTheme;
                });
            } else {
                setState(newTheme);

                setTheme(newTheme);
            }
        },
        [setTheme, setState]
    );
    const setDarkTheme = useCallback(() => updateTheme('dark'), [updateTheme]);
    const setLightTheme = useCallback(() => updateTheme('light'), [updateTheme]);
    const setAutoTheme = useCallback(() => updateTheme('auto'), [updateTheme]);

    useEffect(() => onBrowserThemeChanged(updateTheme), [updateTheme, setTheme]);

    return (
        <React.Fragment>
            {theme === 'auto' && (
                <Tooltip title='Toggle light/auto/dark theme' aria-label='Toggle light/auto/dark theme'>
                    <IconButton onClick={setDarkTheme} color='inherit'>
                        <BrightnessAuto></BrightnessAuto>
                    </IconButton>
                </Tooltip>
            )}

            {theme === 'light' && (
                <Tooltip title='Toggle light/auto/dark theme' aria-label='Toggle light/auto/dark theme'>
                    <IconButton onClick={setAutoTheme} color='inherit'>
                        <Brightness4></Brightness4>
                    </IconButton>
                </Tooltip>
            )}

            {theme === 'dark' && (
                <Tooltip title='Toggle light/auto/dark theme' aria-label='Toggle light/auto/dark theme'>
                    <IconButton onClick={setLightTheme} color='inherit'>
                        <Brightness7></Brightness7>
                    </IconButton>
                </Tooltip>
            )}
        </React.Fragment>
    );
};

export default SwitchTheme;
