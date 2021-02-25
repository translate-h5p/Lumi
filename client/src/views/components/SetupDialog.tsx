import React from 'react';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
    WithStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import SettingsList from './SettingsList';

import PolicyIcon from '@material-ui/icons/Policy';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IState, actions } from '../../state';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            width: '400px',
            padding: theme.spacing(2)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

const useStyles = makeStyles((theme: Theme) => {
    return {
        warning: {
            color: 'red'
        },
        button: {
            margin: theme.spacing(1)
        }
    };
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        minWidth: 380
    }
}))(MuiDialogActions);

export default function CustomizedDialogs() {
    const dispatch = useDispatch();
    const settings = useSelector((state: IState) => state.settings);
    const classes = useStyles();

    const handleSave = () => {
        dispatch(
            actions.settings.updateSettings({ ...settings, firstOpen: false })
        );
    };

    return (
        <Dialog
            // onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={settings.firstOpen}
        >
            <DialogContent dividers>
                <Typography variant="body2" gutterBottom>
                    Protecting the individual's privacy is important for us. We
                    only collect the information you choose to give us, and we
                    process it with your consent. We want to be as transparent
                    as possible. However Lumi relies on some connections and
                    data transfers to work.
                </Typography>

                <a
                    href="https://www.lumi.education/app/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<PolicyIcon />}
                    >
                        Privacy Policy
                    </Button>
                </a>
                <a
                    href="https://www.github.com/Lumieducation/Lumi"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<GitHubIcon />}
                    >
                        Open Source
                    </Button>
                </a>
                <SettingsList />
                {settings.privacyPolicyConsent ? null : (
                    <Typography
                        className={classes.warning}
                        variant="body2"
                        gutterBottom
                    >
                        You need to at least consent to the privacy policy to
                        use this application.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleSave}
                    color="primary"
                    disabled={!settings.privacyPolicyConsent}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
