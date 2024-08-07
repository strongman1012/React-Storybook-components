import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface TimelineControlsProps {
    className: string,
    timelineDragged: number,
    simulationTime: number,
    onChange: (realtime: boolean, direction: number, timeScale: number) => void;
    triggerReset: () => void;
    onChangeAnimate: (status: boolean) => void;
}


const initialButtonActive = {
    realtime: false,
    pause: true,
    forward: false,
    reverse: false,
    x10: false,
    x100: true,
    x1000: false
};

var realtime = false;
var timeDirection = 0;
var timeScale = 100;

const TimelineControls: FC<TimelineControlsProps> = ({ className, timelineDragged, simulationTime, onChange, triggerReset, onChangeAnimate }) => {

    const dateToTimeString = (t: number, includeSeconds: boolean = true) => {
        var m = moment(new Date(t)).utc();
        var s;
        if (includeSeconds) {
            s = m.format("H:mm:ss");
        } else {
            s = m.format("h:mm a");
        }
        return s;
    }

    const [buttonActive, setButtonActive] = useState(initialButtonActive);
    //const [time, setTime] = useState(dateToTimeString(timeline.start.getTime()))
    const [time, setTime] = useState(dateToTimeString(simulationTime))

    useEffect(() => {
        timeDirection = 0;
        timeScale = 100;
        realtime = false;
        setButtonActive(() => ({
            realtime: false,
            pause: true,
            forward: false,
            reverse: false,
            x10: false,
            x100: true,
            x1000: false
        }));
        onChange(realtime, timeDirection, timeScale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTime(dateToTimeString(simulationTime));
    }, [simulationTime]);

    useEffect(() => {
        onChange(realtime, timeDirection, timeScale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timelineDragged])

    const getButtonClasses = (activated: boolean) => {
        if (activated) {
            return "activated";
        } else {
            return "";
        }
    };

    // buttons need to call a function to change the state of the buttons and speed and timeScale. This function will
    // call the onChange function to notify the visualizer.
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if ((event.currentTarget) && (event.currentTarget.id)) {
            var id = event.currentTarget.id;
            switch (id) {
                case 'realtime':
                    realtime = true;
                    timeDirection = 1;
                    timeScale = 1;
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: true,
                        forward: true,
                        pause: false,
                        reverse: false,
                        x10: false,
                        x100: false,
                        x1000: false,
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    break;
                case 'reverse':
                    if (buttonActive.reverse) {
                        break;
                    }
                    realtime = false;
                    timeDirection = -1;
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: false,
                        reverse: true,
                        pause: false,
                        forward: false
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    onChangeAnimate(true);
                    break;
                case 'pause':
                    if (buttonActive.pause) {
                        break;
                    }
                    timeDirection = 0;
                    realtime = false;
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: false,
                        reverse: false,
                        pause: true,
                        forward: false
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    onChangeAnimate(false);
                    break;
                case 'forward':
                    if (buttonActive.forward) {
                        break;
                    }
                    timeDirection = 1;
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        reverse: false,
                        pause: false,
                        forward: true
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    onChangeAnimate(true);
                    break;
                case 'x10':
                    realtime = false;
                    timeScale = (buttonActive.x10 ? 1 : 10);
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: false,
                        x10: !buttonActive.x10,
                        x100: false,
                        x1000: false,
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    break;
                case 'x100':
                    realtime = false;
                    timeScale = (buttonActive.x100 ? 1 : 100);
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: false,
                        x10: false,
                        x100: !buttonActive.x100,
                        x1000: false,
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    break;
                case 'x1000':
                    realtime = false;
                    timeScale = (buttonActive.x1000 ? 1 : 1000);
                    setButtonActive((currentButtonActive) => ({
                        ...currentButtonActive,
                        realtime: false,
                        x10: false,
                        x100: false,
                        x1000: !buttonActive.x1000,
                    }));
                    onChange(realtime, timeDirection, timeScale);
                    break;
            }

        }

        return;
    };

    function resetTimeControls() {
        realtime = false;
        timeDirection = 0;
        timeScale = 100;
        setButtonActive(() => ({
            realtime: false,
            pause: true,
            forward: false,
            reverse: false,
            x10: false,
            x100: true,
            x1000: false
        }));
        onChange(realtime, timeDirection, timeScale);
        triggerReset();
    }

    function dateTimeText() {
        let dateMonth = (new Date(simulationTime)).getUTCMonth() + 1;
        let dateDay = (new Date(simulationTime)).getUTCDate();
        return dateMonth + "/" + dateDay + " - " + time;
    }


    return (
        <div className={className}>
            <div>
                <div id="refreshContainer" style={{ display: "inline-block" }}><button id="refresh" className={"activated"} onClick={resetTimeControls}><FontAwesomeIcon icon={faSyncAlt} /></button></div>
                <div id="timelineClockContainer" style={{ display: "inline-block", paddingLeft: '10px' }}><div style={{ fontSize: 12 }} id="timelineClock">{dateTimeText()}</div></div>
            </div>
            <div id="playbackControls"><button id="reverse" className={getButtonClasses(buttonActive.reverse)} onClick={handleClick}><FontAwesomeIcon icon={faCaretLeft} /></button><button id="pause" className={getButtonClasses(buttonActive.pause)} onClick={handleClick}><FontAwesomeIcon icon={faPause} /></button><button id="forward" className={getButtonClasses(buttonActive.forward)} onClick={handleClick}><FontAwesomeIcon icon={faCaretRight} /></button></div>
            <div id="speedControls"><button id="x10" className={getButtonClasses(buttonActive.x10)} onClick={handleClick}>10x</button><button id="x100" className={getButtonClasses(buttonActive.x100)} onClick={handleClick}>100x</button><button id="x1000" className={getButtonClasses(buttonActive.x1000)} onClick={handleClick}>1000x</button></div>
        </div>
    );
}

export default TimelineControls