import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import BrightnessAuto from '@material-ui/icons/BrightnessAuto';
import React, { Fragment, useCallback } from 'react';
import { useTheme } from 'shared/hooks/ui/use-theme';

export const SwitchTheme = (): JSX.Element => {
    const [theme, setTheme] = useTheme();
    const setDarkTheme = useCallback(() => setTheme('dark'), [setTheme]);
    const setLightTheme = useCallback(() => setTheme('light'), [setTheme]);
    const setAutoTheme = useCallback(() => setTheme('auto'), [setTheme]);

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default SwitchTheme;
