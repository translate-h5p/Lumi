import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AnalyticsIcon from '@material-ui/icons/ShowChart';

import { useTranslation } from 'react-i18next';

import MainSection from './components/MainSection';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            padding: '50px'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary
        },
        card: {
            margin: '20px',
            // maxWidth: 345,
            // minWidth: 345
            minHeight: '340px'
        },
        media: {
            height: 140,
            background: 'linear-gradient(45deg, #1abc9c 0%, #3498db 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center'
        },
        analyticsIcon: {
            margin: 'auto',
            height: 120,
            width: 120
        }
    })
);

export default function Launchpad() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.root}>
            <MainSection>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card id="launchpad-h5peditor" className={classes.card}>
                            <Link
                                to="/h5peditor"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        // image="/assets/h5p-logo.svg"
                                        title={t('editor.startPage.title')}
                                    >
                                        <img
                                            src="/assets/h5p-logo.svg"
                                            alt="logo"
                                            className={classes.analyticsIcon}
                                        />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {t('editor.startPage.title')}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {t(
                                                'editor.startPage.welcomeMessage'
                                            )}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link
                                        to="/h5peditor"
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'inherit'
                                        }}
                                    >
                                        {t('editor.startPage.start')}
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card id="launchpad-analytics" className={classes.card}>
                            <Link
                                to="/analytics"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'inherit'
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        title={t('analytics.startPage.title')}
                                    >
                                        <AnalyticsIcon
                                            className={classes.analyticsIcon}
                                        />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {t('analytics.startPage.title')}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {t(
                                                'analytics.startPage.welcomeMessage'
                                            )}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link
                                        to="/analytics"
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'inherit'
                                        }}
                                    >
                                        {t('analytics.startPage.start')}
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </MainSection>
        </div>
    );
}
