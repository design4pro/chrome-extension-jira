import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { useTheme } from 'shared/componants/theme/use-theme';
import { getBrowserTheme } from 'shared/util/browser-theme';
import { Layout } from './layout';

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
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout />
        </ThemeProvider>
    );
};

export default App;
