import { createStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
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
        <Container fixed maxWidth='md'>
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
            layuot
        </Container>
    );
};

export default Layout;
