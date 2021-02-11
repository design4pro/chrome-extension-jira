import { useRecoilState } from 'recoil';
import atomSnackbarAlert from 'shared/atoms/ui/snackbar-alert';
import { SnackbarAlertProps } from 'shared/models/ui/snackbar-alert';

export const useSnackbarAlert = (): [SnackbarAlertProps, (props?: SnackbarAlertProps) => void] => {
    const [snackbarAlert, setSnackbarAlert] = useRecoilState(atomSnackbarAlert);

    return [snackbarAlert, setSnackbarAlert];
};
