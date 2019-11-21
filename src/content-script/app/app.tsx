import { Container, createMuiTheme, CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useCheckLocalStorageSchema } from 'hooks/check-local-storage-schema';
import { Layout } from 'options/app/layout';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import reducers from 'state/reducers';
import initialState from 'state/store/initial-state';
import { StoreProvider } from 'state/store/provider';
import { getBrowserTheme, onBrowserThemeChanged } from 'util/browser-theme';
import { getLocalStorageTheme, setLocalStorageTheme } from 'util/local-storage';

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
