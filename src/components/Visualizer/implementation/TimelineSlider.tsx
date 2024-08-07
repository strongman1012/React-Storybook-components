import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { makeStyles, Theme, Mark } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import { Window } from './model';

interface TimelineSliderProps {
    className: string;
    initialTime: number;
    simulationTime: number;
    range: number[]; // milliseconds
    onChange: (newValue: number, committed: boolean) => void;
    highlightedContactPoints: Window[];
    highlightedInterferencePoints: Window[];
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
            lineHeight: 2.5,
            fontSize: '0.775rem',
            top: 0
        },
        '& .MuiSlider-mark': {
            height: '27px',
            width: '1px',
            marginTop: '13px',
            color: '#828282'
        },
        '& .MuiSlider-rail': {
            background: 'linear-gradient(to bottom, rgb(130 130 130), rgb(174, 174, 174), rgb(130 130 130))',
            opacity: 0.8,
            width: '100%',
            height: '27px',
            marginTop: '13px'
        },
        '& .MuiSlider-markActive': {
            backgroundColor: '#828282'
        },
        '& .MuiSlider-thumb': {
            width: '4px',
            height: '32px',
            borderRadius: 0,
            marginTop: '10px',
            zIndex: 6,
            marginLeft: 0,
            background: '#e34747',
        },
        '& .MuiSlider-thumb::after': {
            top: '-5px',
            left: '-5px',
            right: '-5px',
            bottom: '-5px'
        },
        '& .MuiSlider-track': {
            height: '0.6rem',
            marginTop: '13px',
            background: '#e34747',
        },
        width: '94%',
        marginLeft: '3%'
    },
    sliderOld: {
        '& .MuiSlider-markLabel': {
            color: '#FFFFFF',
            fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
            lineHeight: 2.5,
            fontSize: '0.775rem'
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
        width: '94%',
        marginLeft: '3%'
    },
    highlightedPointContainer: {
        maxWidth: '94%',
        marginLeft: '3%',
        position: 'relative',
    },
    highlightedContactPoint: {
        position: 'absolute',
        height: '27px',
        background: 'linear-gradient(to bottom, #00FF00, #0edd0e, #00FF00)',
        backgroundColor: '#00FF00',
        marginTop: '26px',
        zIndex: 4
    },
    highlightedInterferenceContactPoint: {
        position: 'absolute',
        height: '27.5px',
        background: 'linear-gradient(to bottom, rgb(255, 192, 0), rgb(213 165 22), rgb(255, 192, 0))',
        backgroundColor: 'rgb(255, 192, 0)',
        marginTop: '25.5px',
        zIndex: 5
    }
}));

const TimelineSlider: FC<TimelineSliderProps> = ({
    className,
    initialTime,
    simulationTime,
    range,
    onChange,
    highlightedContactPoints,
    highlightedInterferencePoints,
    showEnhancedTimeline
}) => {
    const classes = useStyles();
    const [value, setValue] = useState(initialTime);

    useEffect(() => {
        setValue(simulationTime);
    }, [simulationTime]);

    const dateToTimeString = (t: number, includeSeconds: boolean = true) => {
        const m = moment(new Date(t)).utc();
        return includeSeconds ? m.format("HH:mm:ss") : m.format("h:mma");
    };

    const marks = useMemo(() => {
        const totalDays = (range[1] - range[0]) / (24 * 3600 * 1000);
        let numMarks = 9;

        if (totalDays < 4) {
            numMarks = 4;
        } else if (totalDays >= 4 && totalDays <= 9) {
            numMarks = totalDays;
        } else {
            numMarks = 9;
        }

        const step = (range[1] - range[0]) / numMarks;
        const newMarks: Mark[] = [];

        for (let t = range[0]; t <= range[1]; t += step) {
            const m = moment(new Date(t)).utc();
            const month = m.month() + 1;
            const day = m.date();
            let label;

            if (totalDays <= 1) {
                label = dateToTimeString(t, true);
            } else if (totalDays >= 4) {
                label = `${month}/${day}`;
            } else {
                label = `${month}/${day} ${dateToTimeString(t, false)}`;
            }

            newMarks.push({
                value: t,
                label: label
            });
        }

        return newMarks;
    }, [range]);

    const valuetext = (value: number) => {
        return `${value}`;
    };

    const valueUpdated = (event: any, newValue: number | number[]) => {
        setValue(newValue as number);
        onChange(newValue as number, false);
    };

    const valueCommitted = (event: any, newValue: number | number[]) => {
        setValue(newValue as number);
        onChange(newValue as number, true);
    };

    const calculatePosition = useCallback((point: Window) => {
        const startTime = initialTime + point[0] * 1000;
        const endTime = initialTime + point[1] * 1000;
        let result;
        if ((startTime < range[0] && endTime <= range[0])
            || (startTime < range[0] && endTime > range[0])
            || startTime >= range[1])
            result = 0;
        else
            result = ((startTime - range[0]) / (range[1] - range[0])) * 100;
        return result;
    }, [initialTime, range]);

    const calculateWidth = useCallback((point: Window) => {
        const startTime = initialTime + point[0] * 1000;
        const endTime = initialTime + point[1] * 1000;
        let result;
        if ((startTime < range[0] && endTime <= range[0])
            || startTime >= range[1])
            result = 0;
        else if (startTime < range[0] && endTime > range[0])
            result = ((endTime - range[0]) / (range[1] - range[0])) * 100;
        else if (startTime < range[1] && startTime >= range[0] && endTime >= range[1])
            result = ((range[1] - startTime) / (range[1] - range[0])) * 100;
        else
            result = ((point[1] * 1000 - point[0] * 1000) / (range[1] - range[0])) * 100;
        return result >= 100 ? 100 : result;
    }, [initialTime, range]);

    // Use useMemo to calculate points positions and widths
    const enhancedContactPoints = useMemo(() => (
        highlightedContactPoints?.filter(point => {
            const width = calculateWidth(point);
            return width >= 0.01;
        }).map((point, index) => (
            <div
                key={`contact-${index}`}
                className={classes.highlightedContactPoint}
                style={{
                    left: `${calculatePosition(point)}%`,
                    width: `${calculateWidth(point)}%`
                }}
            />
        ))
    ), [highlightedContactPoints, calculatePosition, calculateWidth]);

    const enhancedInterferencePoints = useMemo(() => (
        highlightedInterferencePoints?.filter(point => {
            const width = calculateWidth(point);
            return width >= 0.01;
        }).map((point, index) => (
            <div
                key={`interference-${index}`}
                className={classes.highlightedInterferenceContactPoint}
                style={{
                    left: `${calculatePosition(point)}%`,
                    width: `${calculateWidth(point)}%`
                }}
            />
        ))
    ), [highlightedInterferencePoints, calculatePosition, calculateWidth]);

    const memoizedSlider = useMemo(() => (
        <Slider
            className={showEnhancedTimeline ? classes.sliderNew : classes.sliderOld}
            value={value}
            track={false}
            getAriaValueText={valuetext}
            min={range[0]}
            max={range[1]}
            valueLabelDisplay="off"
            marks={marks}
            onChange={valueUpdated}
            onChangeCommitted={valueCommitted}
            style={{
                maxWidth: '94%',
                marginLeft: '3%'
            }}
        />
    ), [value, range, marks, showEnhancedTimeline]);

    return (
        <div className={className}>
            {showEnhancedTimeline === true &&
                <>
                    <div className={classes.highlightedPointContainer}>
                        {enhancedContactPoints}
                    </div>
                    <div className={classes.highlightedPointContainer}>
                        {enhancedInterferencePoints}
                    </div>
                </>
            }
            {memoizedSlider}
        </div>
    );
}

export default TimelineSlider;
