import { useRecoilState } from 'recoil';
import atomTheme from 'shared/atoms/ui/theme';
import { ThemeMode } from '../../models/ui/theme';

export const useTheme = (): [ThemeMode, (theme: ThemeMode) => void] => {
    const [theme, setTheme] = useRecoilState(atomTheme);

    return [theme, setTheme];
};
