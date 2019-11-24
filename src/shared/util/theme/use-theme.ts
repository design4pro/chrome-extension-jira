import { PaletteType } from '@material-ui/core';
import { KEY_THEME } from 'shared/util/local-storage';
import useLocalStorage from '../local-storage/use-local-storage';

export const useTheme = (theme: PaletteType) => {
    const [currentTheme, setTheme] = useLocalStorage(KEY_THEME, 'light');

    if (theme !== currentTheme) {
        setTheme(theme);
    }
};
