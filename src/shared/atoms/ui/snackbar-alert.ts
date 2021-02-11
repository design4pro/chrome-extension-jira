import { atom } from 'recoil';
import { DEFAULT_SNACKBAR_ALERT, KEY_SNACKBAR_ALERT, SnackbarAlertProps } from 'shared/models/ui/snackbar-alert';

export const atomSnackbarAlert = atom<SnackbarAlertProps>({
    key: KEY_SNACKBAR_ALERT,
    default: DEFAULT_SNACKBAR_ALERT,
});

export default atomSnackbarAlert;
