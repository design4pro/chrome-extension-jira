import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import BrightnessAuto from '@material-ui/icons/BrightnessAuto';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { onBrowserThemeChanged } from '../../util/browser-theme';
import { ThemeType } from './model';
import { useTheme } from './use-theme';

export const SwitchTheme = () => {
    const [theme, setTheme] = useTheme();

    const updateTheme: Dispatch<SetStateAction<ThemeType>> = useCallback(
        (newTheme: ThemeType) => {
            setTheme(newTheme);
        },
        [setTheme]
    );
    const setDarkTheme = useCallback(() => updateTheme('dark'), [updateTheme]);
    const setLightTheme = useCallback(() => updateTheme('light'), [updateTheme]);
    const setAutoTheme = useCallback(() => updateTheme('auto'), [updateTheme]);

    useEffect(() => onBrowserThemeChanged(updateTheme), [updateTheme, setTheme]);

    return (
        <React.Fragment>
            {theme === 'auto' && (
                <Tooltip title='Toggle dark/light/auto theme' aria-label='Toggle dark/light/auto theme'>
                    <IconButton onClick={setDarkTheme} color='inherit'>
                        <BrightnessAuto></BrightnessAuto>
                    </IconButton>
                </Tooltip>
            )}

            {theme === 'light' && (
                <Tooltip title='Toggle auto/dark/light theme' aria-label='Toggle auto/dark/light theme'>
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
