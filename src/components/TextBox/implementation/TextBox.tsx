import { FormControl, FormHelperText, StandardTextFieldProps, TextField, Theme, makeStyles } from "@material-ui/core";
import React from "react";
import { FC } from "react";
import { THEMES } from "../../utils/constants/general";


export const useTextBoxStyles = makeStyles((theme: Theme) => ({
    input: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        gap: '1px',
        background: theme.palette.type === THEMES.LIGHT ? '#FFFFFF' : '#4c4c4c',
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0)',
        minHeight: '3vh',
        paddingLeft: '14px'
    },
    tooltip: {
        maxWidth: '500px'
    },
    error: {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main
    }
}));

/**
 * Basic wrapper for a text field. Includes styles.
 */
const TextBox: FC<StandardTextFieldProps> = (props) => {
    const classes = useTextBoxStyles();
    const { InputProps, helperText, ...otherProps } = props;

    return (
        <>
            <FormControl className={`${classes.input} ${props.error ? classes.error : ''}`}>
                <TextField
                    {...otherProps}
                    InputProps={{
                        disableUnderline: true,
                        ...InputProps
                    }}
                />
            </FormControl>
            {helperText ? <FormHelperText className={props.error ? classes.error : ''}>{helperText}</FormHelperText> : null}
        </>
    );
};

export default TextBox;
