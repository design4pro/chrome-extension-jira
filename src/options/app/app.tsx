import { createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { useTheme } from 'shared/hooks/ui/use-theme';
import { Layout } from './layout';

export const App = (): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout />
        </ThemeProvider>
    );
};

export default App;
