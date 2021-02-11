import { AlertProps } from '@material-ui/core/Alert';
import { SnackbarProps } from '@material-ui/core/Snackbar';

export const DEFAULT_SNACKBAR_ALERT: SnackbarAlertProps = {};

export const KEY_SNACKBAR_ALERT = 'snackbarAlert';

export interface SnackbarAlertProps extends SnackbarProps {
    status?: AlertProps['color'];
}
