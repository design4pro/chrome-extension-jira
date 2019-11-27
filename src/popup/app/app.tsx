import { createMuiTheme, CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'shared/componants/theme/use-theme';
import { Layout } from './layout';

export const App = () => {
    // Clear local storage is schema version not match
    // useCheckLocalStorageSchema();

    const [title, setTitle] = useState('popup');

    const [initialized, setInitialized] = useState(false);
    // We keep the theme in app state
    const [theme, setTheme] = useTheme();

    console.log({ theme });

    useEffect(() => {
        if (!initialized) {
            setTheme(theme);
            setInitialized(true);
        }
    }, [initialized, setTheme, theme, setInitialized]);

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: theme as PaletteType,
        },
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout name={title} />
        </ThemeProvider>
    );
};

export default App;
