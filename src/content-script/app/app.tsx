import { Container, createMuiTheme, CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from 'options/app/layout';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import reducers from 'shared/state/reducers';
import initialState from 'shared/state/store/initial-state';
import { StoreProvider } from 'shared/state/store/provider';
import { useCheckLocalStorageSchema } from 'shared/util/local-storage/use-check-local-storage-schema';
import { getBrowserTheme, onBrowserThemeChanged } from 'shared/util/theme/browser-theme';
import { getLocalStorageTheme, setLocalStorageTheme } from 'shared/util/theme/local-storage';

export const App = () => {
    // Clear local storage is schema version not match
    useCheckLocalStorageSchema();

    const [initialized, setInitialized] = useState(false);
    // We keep the theme in app state
    const [theme, setTheme] = useState<PaletteType>('light');

    const updateTheme: Dispatch<SetStateAction<PaletteType>> = useCallback(
        newTheme => {
            if (typeof newTheme === 'function') {
                setTheme(currentTheme => {
                    const actualNewTheme = newTheme(currentTheme);

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

    useEffect(() => {
        if (!initialized) {
            setTheme(getLocalStorageTheme() || getBrowserTheme());
            setInitialized(true);
        }
        return onBrowserThemeChanged(updateTheme);
    }, [updateTheme, setTheme, initialized, setInitialized]);

    // we change the palette type of the theme in state
    // const toggleDarkTheme = () => {
    //     const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';

    //     setTheme({
    //         palette: {
    //             type: newPaletteType,
    //         },
    //     });
    // };

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: theme,
        },
    });

    return (
        <StoreProvider initialState={initialState} reducer={reducers}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Container fixed maxWidth='md'>
                    <Layout />
                </Container>
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;
