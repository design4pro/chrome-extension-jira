import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarAlert } from 'shared/components/snackbar-alert';
import App from './app';

const cache = createCache({
    key: 'css',
    prepend: true,
});

export const AppContainer = (): JSX.Element => {
    return (
        <RecoilRoot>
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst>
                    <App />
                    <SnackbarAlert />
                </StyledEngineProvider>
            </CacheProvider>
        </RecoilRoot>
    );
};

export default AppContainer;
