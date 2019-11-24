import { createMuiTheme, CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { WindowExtension } from 'background/model/background';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { StoreProvider } from 'shared/state/store/provider';
import { useCheckLocalStorageSchema } from 'shared/util/local-storage/use-check-local-storage-schema';
import { getBrowserTheme, onBrowserThemeChanged } from 'shared/util/theme/browser-theme';
import { getLocalStorageTheme, setLocalStorageTheme } from 'shared/util/theme/local-storage';
import { Layout } from './layout';

export const App = () => {
    // Clear local storage is schema version not match
    useCheckLocalStorageSchema();

    const [title, setTitle] = useState('popup');

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

            const getBackgroundPage = (): Promise<WindowExtension> => {
                return new Promise<WindowExtension>((resolve, reject) => {
                    if (chrome.runtime.lastError) {
                        reject("Background can't be loaded");
                    }

                    chrome.runtime.getBackgroundPage(page =>
                        page ? resolve(page as WindowExtension) : reject("Background can't be loaded")
                    );
                });
            };

            const start = async () => {
                const background = await getBackgroundPage();

                setTitle(background.getName);
            };

            start();
        }

        return onBrowserThemeChanged(updateTheme);
    }, [updateTheme, setTheme, initialized, setInitialized]);

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
                <Layout name={title} />
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;
