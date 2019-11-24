import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'shared/componants/theme/use-theme';
import { useCheckLocalStorageSchema } from 'shared/util/local-storage/use-check-local-storage-schema';
import { getBrowserTheme } from 'shared/util/theme/browser-theme';
import { getLocalStorageTheme } from 'shared/util/theme/local-storage';
import { Layout } from './layout';

export const App = () => {
    // Clear local storage is schema version not match
    useCheckLocalStorageSchema();

    const [initialized, setInitialized] = useState(false);

    const [theme, setTheme] = useTheme();

    useEffect(() => {
        if (!initialized) {
            setTheme(getLocalStorageTheme() || getBrowserTheme());
            setInitialized(true);
        }
    }, [setTheme, initialized, setInitialized]);

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
