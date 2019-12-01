import { PaletteType } from '@material-ui/core';

const getMql = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) || undefined;

export const getBrowserTheme = (): PaletteType => {
    const mql = getMql();

    return mql && mql.matches ? 'dark' : 'light';
};

export const onBrowserThemeChanged = (callback: (theme: PaletteType) => void) => {
    const mql = getMql();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mqlListener = (e: any) => callback(e.matches ? 'dark' : 'light');

    mql && mql.addListener(mqlListener);

    return () => mql && mql.removeListener(mqlListener);
};
