import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Layout } from './layout';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const App = () => {
    // We keep the theme in app state
    const [theme, setTheme] = useState<ThemeOptions>({
        palette: {
            type: 'light',
        },
    });

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
    const muiTheme = createMuiTheme(theme);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Container fixed maxWidth='md'>
                <Layout />
            </Container>
        </ThemeProvider>
    );
};

export default App;
