import { createStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import SwitchTheme from 'shared/componants/theme/switch-theme';
import { useTheme } from 'shared/componants/theme/use-theme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export const Layout = () => {
    const [theme] = useTheme();
    const classes = useStyles(theme);

    return (
        <Fragment>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <Typography variant='h6' className={classes.title}>
                        JIRA
                    </Typography>
                    <div>
                        <SwitchTheme />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed maxWidth='md'>
                <Grid container spacing={2}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8}>
                        <form noValidate autoComplete='off'>
                            <div>
                                <TextField
                                    error
                                    id='outlined-error-helper-text'
                                    label='Error'
                                    defaultValue='Hello World'
                                    helperText='Incorrect entry.'
                                    margin='normal'
                                    variant='outlined'
                                />
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Layout;
