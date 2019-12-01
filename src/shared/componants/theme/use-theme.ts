import Actions from 'shared/state/actions';
import { useStore } from 'shared/state/store/hooks';
import { ThemeType } from './model';

export const useTheme = (): [ThemeType, (theme: ThemeType) => void] => {
    const { state, dispatch } = useStore();
    const { theme } = state;
    const setTheme = (theme: ThemeType) => dispatch(Actions.setTheme(theme));

    return [theme, setTheme];
};
