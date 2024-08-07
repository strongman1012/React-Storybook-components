import React, { FC, useState, useEffect, useCallback } from 'react';
import { makeStyles, Theme, Mark } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import clsx from 'clsx';
import { Window } from './model';

interface RangeSliderProps {
    className: string,
    bounds: { start: Date, stop: Date },
    // className: string,
    onChange: (newValue: number[], committed: boolean) => void;
    resetSliderFlag: boolean;
    setResetSliderFlag: (newValue: boolean) => void;
    showEnhancedTimeline?: boolean;
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    margin: {
        height: theme.spacing(3),
    },
    sliderNew: {
        '& .MuiSlider-markLabel': {
            color: '#FFFFFF',
            fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
            lineHeight: 2.8,
            fontSize: '0.775rem',
            top: -2,
        },
        '& .MuiSlider-mark': {
            height: '0.6rem',
            width: '1px',
            marginTop: '5.2px',
            color: '#828282'
        },
        '& .MuiSlider-rail': {
            background: 'linear-gradient(to bottom, rgb(130 130 130), rgb(174, 174, 174), rgb(130 130 130))',
            opacity: 0.8,
            width: '100%',
            height: '0.6rem',
            marginTop: '5.2px'
        },
        '& .MuiSlider-markActive': {
            backgroundColor: '#828282'
        },
        '& .MuiSlider-thumb': {
            width: '1rem',
            height: '1rem',
            marginTop: '2px',
            zIndex: 2,
            background: '#e34747',
        },
        '& .MuiSlider-track': {
            height: '0.6rem',
            marginTop: '5.2px',
            background: '#e34747',
        }
    },
    sliderOld: {
        '& .MuiSlider-markLabel': {
            color: '#FFFFFF',
            fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
            lineHeight: 2.8,
            fontSize: '0.775rem',
            top: -2,
        },
        '& .MuiSlider-root': {
            width: '99%',
            marginTop: '9px'
        },
        '& .MuiSlider-mark': {
            height: '0.6rem',
            width: '1px',
            marginTop: '5.2px',
            color: '#8d8585'
        },
        '& .MuiSlider-rail': {
            background: '#fff',
            width: '100%',
            height: '0.6rem',
            marginTop: '5.2px'
        },
        '& .MuiSlider-markActive': {
            backgroundColor: '#8d8585'
        },
        '& .MuiSlider-thumb': {
            width: '1rem',
            height: '1rem',
            marginTop: '2px',
            zIndex: 2,
            background: '#e34747',
        },
        '& .MuiSlider-track': {
            height: '0.6rem',
            marginTop: '5.2px',
            background: '#e34747',
        },
    },
    sliderWithMarks: {
        '& .MuiSlider-mark': {
            marginTop: '25px !important'
        },
        '& .MuiSlider-rail': {
            marginTop: '25px !important'
        },
        '& .MuiSlider-track': {
            marginTop: '25px !important'
        },
        '& .MuiSlider-thumb': {
            marginTop: '21px !important'
        }
    },
}));

//const timelineRange = 2 * 60 * 60; // seconds before/after current time
let marks: Array<Mark> = [];


const RangeSlider: FC<RangeSliderProps> = ({ className, bounds, onChange, resetSliderFlag, setResetSliderFlag, showEnhancedTimeline }) => {

    const classes = useStyles();
    const [value, setValue] = useState<number[]>([0, 0]);
    const [newMinMax, setNewMinMax] = useState<number[]>([bounds.start.getTime(), bounds.stop.getTime()]);
    const [hideMarks, setHideMarks] = useState<boolean>(true);
    const DEFAULT_NUM_TICKS = 9;

    const resetRange = useCallback(() => {
        const totalDays = ((bounds.stop.getTime() - bounds.start.getTime()) / 86400000);
        let numTicks = DEFAULT_NUM_TICKS;

        if (totalDays < 4) {
            numTicks = 4;
        }
        else if (totalDays >= 4 && totalDays <= 9) {
            numTicks = totalDays;
        }

        let msIncrement = bounds.start.getTime();
        const multiplier = totalDays / numTicks;

        setValue([msIncrement, msIncrement + (totalDays * 24 * 3600 * 1000)]);
        marks = [];

        setNewMinMax([msIncrement, msIncrement + (totalDays * 24 * 3600 * 1000)]);

        for (let d = 0; d <= numTicks; d++) {

            const m = moment(new Date(msIncrement)).utc();
            const newMonth = m.month() + 1;
            const newDay = m.date();
            let label;

            if (totalDays >= 4) {
                label = newMonth + "/" + newDay;
            } else {
                label = newMonth + "/" + newDay + " " + dateToTimeString(msIncrement, false);
            }
            marks.push(
                {
                    value: msIncrement,
                    label: label
                }
            );
            msIncrement += 24 * 3600 * 1000 * multiplier; //num milliseconds in days between each interval (always 10 intervals if totalDay < 10)

        }
    }, [bounds]);

    useEffect(() => {
        if (resetSliderFlag) {
            resetRange();
            setResetSliderFlag(false);
        }
    }, [resetSliderFlag, resetRange, setResetSliderFlag]);

    useEffect(() => {
        resetRange();
    }, [resetRange]);

    useEffect(() => {
        setHideMarks(value[0] === newMinMax[0] && value[1] === newMinMax[1]);
    }, [value, newMinMax]);


    const dateToTimeString = (t: number, includeSeconds: boolean = true) => {
        const m = moment(new Date(t)).utc();
        let s;
        if (includeSeconds) {
            s = m.format("HH:mm:ss");
        } else {
            s = m.format("h:mma");
        }
        return s;
    }


    const getMarks = () => {
        return marks;
    }


    const valuetext = (value: number) => {
        return `${value}`;
    }

    const valueUpdated = (event: any, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const min = newValue[0];
        const max = newValue[1];

        if ((max - min) >= 1) {
            setValue([min, max]);
            onChange([min, max], false)
        }

    };
    const valueCommitted = (event: any, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const min = newValue[0];
        const max = newValue[1];

        // if (Math.abs(newValue - ))
        if ((max - min) >= 1) {
            setValue([min, max]);
            onChange([min, max], true)
        }

    };

    return (
        <div className={className}>
            {
                showEnhancedTimeline === true ? (<Slider
                    className={classes.sliderNew}
                    value={value}
                    getAriaValueText={valuetext}
                    min={newMinMax[0]}
                    max={newMinMax[1]}
                    valueLabelDisplay="off"
                    onChange={valueUpdated}
                    onChangeCommitted={valueCommitted}
                    style={{
                        maxWidth: '94%',
                        marginLeft: '3%',
                        padding: 0
                    }}
                />) : (<Slider
                    className={hideMarks ? classes.sliderOld : clsx(classes.sliderOld, classes.sliderWithMarks)}
                    value={value}
                    getAriaValueText={valuetext}
                    min={newMinMax[0]}
                    max={newMinMax[1]}
                    valueLabelDisplay="off"
                    marks={hideMarks ? false : getMarks()}
                    onChange={valueUpdated}
                    onChangeCommitted={valueCommitted}
                    style={{
                        maxWidth: '94%',
                        marginLeft: '3%'
                    }}
                />)
            }

        </div>
    );
}

export default RangeSlider