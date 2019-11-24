import { PaletteType } from '@material-ui/core';
import { useCallback } from 'react';
import Actions from 'shared/state/actions';
import { useStore } from 'shared/state/store/use-store';

export const useTheme = () => {
    const { state, dispatch } = useStore();

    const { theme } = state;

    const setTheme = (theme: PaletteType) =>
        useCallback((theme: ((theme: PaletteType) => PaletteType) | PaletteType) => dispatch(Actions.setTheme(theme)), [
            dispatch,
        ]);

    return [theme, setTheme];
};
