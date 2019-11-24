import React from 'react';
import { StoreProvider } from 'shared/state';
import App from './app';

export const AppContainer = () => {
    return (
        <StoreProvider>
            <App />
        </StoreProvider>
    );
};

export default AppContainer;
