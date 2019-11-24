import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export const Layout = () => {
    return (
        <Container fixed maxWidth='md'>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <Typography variant='h6'>JIRA</Typography>
                </Toolbar>
            </AppBar>
            layuot
        </Container>
    );
};

export default Layout;
