import { FormControl, FormControlProps, Theme, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme: Theme) => ({
    select: {
        background: theme.palette.background.default,
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        padding: '0px',
        gap: '1px',
        border: '0px'
    },
}))

/** Needs to be used in tandem with StyledSelect component in order to produce the desired style effect */
const FormControlSelect: typeof FormControl = (props: Omit<FormControlProps, 'className'>) => {
    const { children, ...otherProps } = props;
    const classes = useStyles();
    return (
        <FormControl
            className={classes.select}
            variant='outlined'
            fullWidth
            size='small'
            {...otherProps}
        >
            {children}
        </FormControl>
    )
}


export default FormControlSelect;