import { KEY_DARK_MODE } from 'util/local-storage';
import useLocalStorage from './use-local-storage';

export const useDarkMode = (initialValue: boolean) => {
    return useLocalStorage(KEY_DARK_MODE, initialValue);
};
