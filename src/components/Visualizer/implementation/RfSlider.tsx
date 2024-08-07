import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    slider: {
        '& .MuiSlider-thumb': {
            position: 'absolute',
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderBottom: '15px solid currentColor',
            transform: 'translate(-50%, 50%)',
            backgroundColor: 'transparent',
            color: '#e34747',
            borderRadius: 0,
            width: 0,
            marginLeft: '1px',
            height: 0,
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none', // Remove the default shadow on hover, focus, and active states
            },
        },
        '& .MuiSlider-track': {
            color: '#e34747'
        },
        '& .MuiSlider-valueLabel': {
            left: 'auto',
            top: '-18px',
        },
        '& .MuiSlider-thumb.Mui-active': {
            borderBottomColor: 'currentColor', // Keep the color the same for active state
        },
    }
}));

interface RfSliderProps {
    className: string;
    value: number[];
    minValue: number;
    maxValue: number;
    changeSlider: (updateSlider: number[], committed: boolean) => void;
}

const RfSlider: React.FC<RfSliderProps> = ({ className, value, minValue, maxValue, changeSlider }) => {

    const classes = useStyles();
    const [sliderValue, setSliderValue] = useState<number[]>(value);
    const valueUpdated = (e: any) => {
        const min = e.target?.value[0];
        const max = e.target?.value[1];
        if ((max - min) >= 5) {
            setSliderValue([min, max]);
            changeSlider([min, max], false)
        }
    };
    const valueCommitted = (event: any, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const min = newValue[0];
        const max = newValue[1];

        if ((max - min) >= 1) {
            setSliderValue([min, max]);
            changeSlider([min, max], true)
        }
    };
    return (
        <div className={className}>
            <Slider
                className={classes.slider}
                value={sliderValue}
                min={minValue}
                max={maxValue}
                onChange={valueUpdated}
                onChangeCommitted={valueCommitted}
                valueLabelDisplay="on"
                orientation="horizontal"
                disableSwap
                style={{ width: '90%' }}
            />
        </div>
    );
};

export default RfSlider;
