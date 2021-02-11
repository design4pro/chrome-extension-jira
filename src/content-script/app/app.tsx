import { Container, createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from 'options/app/layout';
import React, { useMemo } from 'react';
import { useTheme } from 'shared/hooks/ui/use-theme';
import { useCheckLocalStorageSchema } from 'shared/state/store/hooks';
import { StoreProvider } from 'shared/state/store/provider';

export const App = (): JSX.Element => {
    // Clear local storage is schema version not match
    useCheckLocalStorageSchema();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // We keep the theme in app state
    const [theme] = useTheme();

    // we generate a MUI-theme from state's theme object
    const muiTheme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    mode: theme === 'auto' ? (prefersDarkMode ? 'dark' : 'light') : theme,
                    primary: {
                        main: '#3367d6',
                    },
                },
            }),
        [prefersDarkMode, theme]
    );

    return (
        <StoreProvider>
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
