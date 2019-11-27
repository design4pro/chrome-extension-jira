import Actions from 'shared/state/actions';
import { useStore } from 'shared/state/store/use-store';
import { ThemeType } from 'shared/util/theme';
import { getBrowserTheme } from 'shared/util/theme/browser-theme';

export const useTheme = (): [ThemeType, (theme: ThemeType) => void] => {
    const { state, dispatch, writeError } = useStore();

    console.log(useStore());

    const setTheme = (theme: ThemeType) => dispatch(Actions.setTheme(theme));

    console.log({ writeError });

    let { theme } = state;

    if (theme === 'auto') {
        console.log({ theme }, getBrowserTheme());

        theme = getBrowserTheme() as ThemeType;
    }

    return [theme, setTheme];
};
