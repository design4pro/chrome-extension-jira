import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createStyles, makeStyles, Theme, useTheme as useThemeMui } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useState } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { SwitchTheme } from 'shared/components/theme';
import { useTheme } from 'shared/hooks/ui/use-theme';
import Authentication from '../pages/authentication/authentication';
import { Home } from '../pages/home';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            // !!!temporary
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
        },
    })
);

export const Layout = (): JSX.Element => {
    const [theme] = useTheme();
    const themeMui = useThemeMui();
    const classes = useStyles(theme);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Fragment>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    Jira Worklogs Tracker
                </Typography>
            </Toolbar>
            <Divider />
            <List dense={true} subheader={<ListSubheader>Tasks</ListSubheader>}>
                <ListItem button key='Home' component={Link} to='/'>
                    <ListItemText primary='Home' />
                </ListItem>
            </List>
            <Divider />
            <List dense={true} subheader={<ListSubheader>Settings</ListSubheader>}>
                <ListItem button key='Authentication' component={Link} to='/authentication'>
                    <ListItemText primary='Authentication' />
                </ListItem>
            </List>
        </Fragment>
    );

    return (
        <div className={classes.root}>
            <Router>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerToggle}
                            edge='start'
                            className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            Jira Work Logs
                        </Typography>
                        <div>
                            <SwitchTheme />
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden mdUp implementation='css'>
                        <Drawer
                            container={document.body}
                            variant='temporary'
                            anchor={themeMui.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}>
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation='css'>
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant='permanent'
                            open>
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Container fixed maxWidth='lg'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/authentication' component={Authentication} />
                        </Switch>
                    </Container>
                </main>
            </Router>
        </div>
    );
};

export default Layout;
