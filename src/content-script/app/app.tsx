import { Container, createMuiTheme, CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from 'options/app/layout';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'shared/componants/theme/use-theme';
import { StoreProvider } from 'shared/state/store/provider';
import { getBrowserTheme } from 'shared/util/theme/browser-theme';

export const App = () => {
    // Clear local storage is schema version not match
    // useCheckLocalStorageSchema();

    const [initialized, setInitialized] = useState(false);
    // We keep the theme in app state
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        if (!initialized) {
            setTheme(theme || getBrowserTheme());
            setInitialized(true);
        }
    }, [initialized, setTheme, theme, getBrowserTheme, setInitialized]);

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: theme as PaletteType,
        },
    });

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
