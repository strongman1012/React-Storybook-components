import { CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Theme, Typography, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { FC } from "react";
import React from "react";
import { BasicDialogProps } from "../types/basic-dialog-types";


const newStyles = makeStyles((theme: Theme) => ({
    dialogBox: {
        '& > div > div': {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            maxWidth: 'none'
        }
    },
    dialogTitle: {
        margin: 0,
        padding: '8px 16px',
        backgroundColor: theme.palette.primary.main,
        color: "white",
        alignItems: "center"
    },
    dialogCloseBtn: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'white',
        zIndex: 100
    },
}));

/**
 * Just a basic extension of the MUI dialog
 */
const BasicDialog: FC<BasicDialogProps> = (props) => {
    const styles = newStyles();
    //eslint-disable-next-line @typescript-eslint/no-unused-vars -- not unused removing title
    const { title, ...otherProps } = props;

    return (
        <Dialog
            className={styles.dialogBox}
            {...otherProps}
        >
            <CssBaseline />
            <DialogTitle
                className={styles.dialogTitle}
            >
                <Typography component="strong" variant="h4">
                    {props.title}
                </Typography>
                {props.hideCloseButton ? null :
                    <IconButton
                        aria-label="Close"
                        className={styles.dialogCloseBtn}
                        onClick={props.onClose}
                        size="small"
                    >
                        <Close />
                    </IconButton>
                }
            </DialogTitle>
            <DialogContent
                style={{
                    width: props.contentWidth,
                    height: props.contentHeight
                }}
            >
                {props.children}
            </DialogContent>
            {props.actions ? (
                <DialogActions>
                    {props.actions}
                </DialogActions>
            ) : null}
        </Dialog>
    );
}

export default BasicDialog;
