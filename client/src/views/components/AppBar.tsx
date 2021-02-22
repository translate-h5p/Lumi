import React from 'react';

import * as Sentry from '@sentry/browser';

import { default as MAppBar } from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AppIcon from '@material-ui/icons/Apps';
import BackIcon from '@material-ui/icons/ArrowBack';
import BugReportIcon from '@material-ui/icons/BugReport';

import { Link } from 'react-router-dom';

import { useRouteMatch } from 'react-router-dom';

export default function AppBar(props: {}): JSX.Element {
    let match = useRouteMatch();
    const classes = useStyles();
    return (
        <MAppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Link
                    to="/"
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                    >
                        {match.isExact ? <AppIcon /> : <BackIcon />}
                    </IconButton>
                </Link>
                <Typography variant="h6" noWrap={true}>
                    Lumi
                </Typography>
                <div className={classes.grow} />
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => Sentry.showReportDialog()}
                    color="inherit"
                >
                    <BugReportIcon />
                </IconButton>
            </Toolbar>
        </MAppBar>
    );
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        grow: {
            flexGrow: 1
        },
        hide: {
            display: 'none'
        },
        menuButton: {
            marginRight: theme.spacing(2)
        }
    };
});
