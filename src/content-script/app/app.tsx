import { Container, createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from 'options/app/layout';
import React from 'react';
import { useTheme } from 'shared/componants/theme/use-theme';
import { StoreProvider } from 'shared/state/store/provider';
import { getBrowserTheme } from 'shared/util/browser-theme';

export const App = () => {
    // Clear local storage is schema version not match
    // useCheckLocalStorageSchema();

    // We keep the theme in app state
    let [theme] = useTheme();

    if (theme === 'auto') {
        theme = getBrowserTheme();
    }

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: theme,
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
