import Actions from 'shared/state/actions';
import { useStore } from 'shared/state/store/use-store';
import { ThemeType } from 'shared/util/theme';

export const useTheme = () => {
    const { state, dispatch } = useStore();

    const { theme } = state;

    const setTheme = (theme: ((theme: ThemeType) => ThemeType) | ThemeType) => dispatch(Actions.setTheme(theme));

    return [theme, setTheme];
};
