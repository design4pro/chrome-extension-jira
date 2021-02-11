import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbarAlert } from 'shared/hooks/ui/use-snackbar-alert';
import { useTheme } from 'shared/hooks/ui/use-theme';
import { useAuthentication } from 'shared/hooks/use-authentication';
import { useJiraConnection } from 'shared/hooks/use-jira';
import { AuthenticationData } from 'shared/models/authentication';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordionDetails: {
            flexDirection: 'column',
        },
        formControl: {
            margin: theme.spacing(2, 0, 1, 0),
        },
        flexEnd: {
            justifyContent: 'flex-end',
        },
    })
);

export const Form = (): JSX.Element => {
    const [theme] = useTheme();
    const classes = useStyles(theme);
    const [snackbarAlert, setSnackbarAlert] = useSnackbarAlert();
    const [expanded, setExpanded] = useState('panel1');
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator
    const { handleSubmit, control, errors: fieldsErrors, formState, reset } = useForm<AuthenticationData>();
    const [authentication, setAuthentication] = useAuthentication();
    const [password, setPassword] = useState('');
    const [{ data, error, loading }, connection] = useJiraConnection();

    useEffect(() => {
        const defaultValues: AuthenticationData = {
            host: authentication?.host || '',
            username: authentication?.username || '',
            token: authentication?.token || '',
        };
        console.log('form->useEffect', { defaultValues });
        reset(defaultValues);
    }, [reset, authentication]);

    useEffect(() => {
        if (data && !error) {
            setSnackbarAlert({
                status: 'success',
                message: 'Connection succesfull',
            });
        } else if (error) {
            setSnackbarAlert({
                status: 'error',
                message: error.message,
            });
        }
        console.log({ data, error });
    }, [data, error, setSnackbarAlert]);

    const handleExpandedChange = (panel: string) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : '');
    };

    const handleTestConnection = useCallback(() => {
        connection(password);
    }, [connection, password]);

    const onSubmit = useCallback(
        (formValues: AuthenticationData) => {
            console.log({ formValues, authentication });
            setPassword(formValues.password);

            // remove password from save
            formValues.password = '';
            setAuthentication({ ...authentication, ...formValues });
        },
        [authentication, setAuthentication]
    );

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box component='div' my={2}>
                    <Typography variant='subtitle1' component='p'>
                        Configure Jira Connection
                    </Typography>
                </Box>
                <Card>
                    <CardContent>
                        <FormControl fullWidth className={classes.formControl}>
                            <Controller
                                name='host'
                                render={({ onChange, name, value }) => (
                                    <TextField
                                        id={name}
                                        helperText={fieldsErrors.host ? fieldsErrors.host.message : null}
                                        variant='outlined'
                                        label='Jira Hostname'
                                        error={!!fieldsErrors.host}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                                control={control}
                                defaultValue='https://'
                                rules={{
                                    required: 'Host name is required',
                                    pattern: {
                                        value: pattern,
                                        message: 'Invalid host address',
                                    },
                                }}
                            />
                        </FormControl>
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.flexEnd}>
                        <Button
                            startIcon={<SettingsEthernetIcon />}
                            variant='outlined'
                            onClick={handleTestConnection}
                            disabled={loading}>
                            Test Connection
                        </Button>
                    </CardActions>
                </Card>
                <Box component='div' my={2}>
                    <Typography variant='subtitle1' component='p'>
                        Authentication
                    </Typography>
                </Box>

                <Accordion defaultExpanded expanded={expanded === 'panel1'} onChange={handleExpandedChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                        <Typography>Basic Authentication</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Typography variant='body2' color='textSecondary'>
                            You probably don&apos;t need it. Only fill it if the Jira API URL is different from the Jira
                            Website you use, or if connection doesn&apos;t work even after logging in on Jira through
                            Chrome.
                        </Typography>
                        <FormControl fullWidth className={classes.formControl}>
                            <Controller
                                name='username'
                                as={
                                    <TextField
                                        id='username'
                                        helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
                                        variant='outlined'
                                        label='Username'
                                        error={!!fieldsErrors.username}
                                    />
                                }
                                control={control}
                                defaultValue=''
                                value={authentication.username}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <Controller
                                name='password'
                                as={<TextField id='password' variant='outlined' label='Password' type='password' />}
                                control={control}
                                defaultValue=''
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleExpandedChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content' id='panel2-header'>
                        <Typography>Token</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Typography variant='body2' color='textSecondary'>
                            Fill only if required by your Jira API. Ask your IT department for assistance.
                        </Typography>
                        <FormControl fullWidth className={classes.formControl}>
                            <Controller
                                name='token'
                                as={
                                    <TextField
                                        id='token'
                                        helperText={fieldsErrors.token ? fieldsErrors.token.message : null}
                                        variant='outlined'
                                        label='Token'
                                        error={!!fieldsErrors.token}
                                    />
                                }
                                control={control}
                                defaultValue=''
                                value={authentication.token}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Box my={4}>
                    <Divider />
                    <Box mt={4} display='flex' justifyContent='flex-end'>
                        <Button
                            startIcon={<SaveIcon />}
                            type='submit'
                            variant='outlined'
                            color='secondary'
                            disabled={formState.isSubmitting}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </form>
        </Fragment>
    );
};
