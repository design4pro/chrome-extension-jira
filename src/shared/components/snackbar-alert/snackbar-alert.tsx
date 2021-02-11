import Alert from '@material-ui/core/Alert';
import SnackbarBase from '@material-ui/core/Snackbar';
import { experimentalStyled } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSnackbarAlert } from 'shared/hooks/ui/use-snackbar-alert';

export const Snackbar = experimentalStyled(SnackbarBase)({});

export const SnackbarAlert = (): JSX.Element => {
    const [snackbarAlert, setSnackbarAlert] = useSnackbarAlert();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (snackbarAlert && snackbarAlert.status) {
            setOpen(true);
        }
    }, [snackbarAlert, setOpen]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarAlert();
        setOpen(false);
    };

    return snackbarAlert?.status ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}>
            <Alert severity={snackbarAlert?.status}>
                {snackbarAlert?.message || `Form submission status: ${snackbarAlert?.status}`}
            </Alert>
        </Snackbar>
    ) : null;
};

export default SnackbarAlert;
