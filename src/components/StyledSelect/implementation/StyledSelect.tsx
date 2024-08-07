import { Select, SelectProps, Theme, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    selectStyle: {
        background:  theme.palette.background.default,
        borderRadius: '8px',
        '& .MuiOutlinedInput-notchedOutline': {
            border: '0px'
        },
        '.MuiSelect-select:focus': {
            borderRadius: '8px'
        },
        '& .MuiSelect-nativeInput': {
            padding: "5px 5px 5px 14px",
            minHeight: '3vh',
            alignContent: 'center',
            display: "flex",
            flexWrap: "wrap"
        }
    }
}))

/**
 * This component must be wrapped in `FormControlSelect`
 */
const StyledSelect: typeof Select = (props: Omit<SelectProps, 'className'>) => {
    const { children, ...otherProps } = props;
    const classes = useStyles();
    return (
        <Select
            className={classes.selectStyle}
            variant="outlined"
            {...otherProps}
        >
            {children}
        </Select>
    )
}


export default StyledSelect;
