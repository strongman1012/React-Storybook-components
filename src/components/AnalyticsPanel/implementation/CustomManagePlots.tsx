import React, { FC, useState, useEffect, useMemo } from "react";
import { Grid, Theme, Select, MenuItem, Typography, makeStyles, Checkbox, ListItemText, Chip } from "@material-ui/core";
import Plot from 'react-plotly.js';
import { TFile } from "src/components/Manage-Plots/types";
import { OrbitalGapEvent } from "../types/types";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface CustomManagePlotsProps {
    data: TFile;
    filterMultiSelect: boolean;
    showFilter: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    subSummary: {
        '& *': {
            fontFamily: 'Roboto',
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "32px",
            color: theme.palette.primary.main,
        },
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontSize: "18px",
        lineHeight: "32px",
        display: "flex",
        alignItems: "center",
        color: theme.palette.primary.main,
        paddingLeft: '1rem',
        borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
    filterLabel: {
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontSize: "17px",
        lineHeight: "32px",
        marginRight: "0.8rem"
    }
}));

const CustomManagePlots: FC<CustomManagePlotsProps> = ({ data, filterMultiSelect, showFilter }) => {
    const classes = useStyles();
    const [topPlot, setTopPlot] = useState<any>({});
    const [lowerPlots, setLowerPlots] = useState<any[]>([]);
    const [slaveData, setSlaveData] = useState<OrbitalGapEvent[]>([]);
    const [selectedPlots, setSelectedPlots] = useState<string[]>([]);

    useEffect(() => {
        const cleanScript = data.script.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim(); // Remove comments
        const getData = new Function(cleanScript)();
        const getPlots = getData.graphs;
        const getSlaveData = getData.slaveData;
        setTopPlot(getPlots[0]);
        setLowerPlots(getPlots.slice(1));
        setSlaveData(getSlaveData);
        if (!filterMultiSelect) {
            setSelectedPlots(["viewall"]);
        } else {
            setSelectedPlots(getPlots.map((plot: any) => plot.name));
        }
    }, [data.script, filterMultiSelect]); // React to changes in script and viewAll

    const lowerPlotsMemo = useMemo(() => {
        if (lowerPlots.length > 0) {
            return lowerPlots.map((plot: any, index: number) => (
                <Grid item md={12} key={index}>
                    <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', width: '97%', marginRight: '1.5%', marginLeft: '1.5%' }}>
                        <Typography className={classes.subSummary}>
                            {plot.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Plot
                            data={plot.data}
                            layout={plot.layout}
                            config={plot.config}
                        />
                    </Grid>
                </Grid>
            ));
        }
    }, [lowerPlots]);

    const handleClick = (event: any) => {
        if (event && event.points && event.points.length > 0) {
            const altitude = event.points[0].x;
            const inclination = event.points[0].y;
            const findSlaveData = slaveData.find(e => e.altitude === altitude && e.inclination === inclination);

            if (findSlaveData) {
                const updatedLowerPlots = lowerPlots.map(plot => {
                    if (plot.type === "scatter" || plot.type === "bar") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                x: findSlaveData.gapEvents.map((e, i) => i),
                                y: findSlaveData.gapEvents.map(e => e.duration / 60)
                            }]
                        };
                    }
                    else if (plot.type === "box") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                y: findSlaveData.gapEvents.map(e => e.duration / 60)
                            }]
                        };
                    }
                    else if (plot.type === "pie") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                values: findSlaveData.gapEvents.map(e => e.duration / 60)
                            }]
                        };
                    }
                    else if (plot.type === "bubble") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                x: findSlaveData.gapEvents.map((e, i) => i),
                                y: findSlaveData.gapEvents.map(e => e.duration / 60),
                                marker: {
                                    ...plot.data[0].marker,
                                    size: findSlaveData.gapEvents.map(e => e.duration / 300)
                                }
                            }]
                        };
                    }
                    else if (plot.type === "error_bar") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                x: findSlaveData.gapEvents.map((e, i) => i),
                                y: findSlaveData.gapEvents.map(e => e.duration / 60),
                                error_y: {
                                    ...plot.data[0].error_y,
                                    array: findSlaveData.gapEvents.map(e => e.duration / 300)
                                }
                            }]
                        };
                    }
                    else if (plot.type === "histogram") {
                        return {
                            ...plot,
                            data: [{
                                ...plot.data[0],
                                x: findSlaveData.gapEvents.map(e => e.duration / 60)
                            }]
                        };
                    }
                    return plot;
                });

                setLowerPlots(updatedLowerPlots);
            }
        }
    };

    const handleSelectChange = (event: any, value: string[]) => {
        setSelectedPlots(value);
    };

    const plotNames = useMemo(() => {
        const names = lowerPlots.map(plot => plot.name);
        if (topPlot.name) {
            names.unshift(topPlot.name);
        }
        return names;
    }, [topPlot, lowerPlots]);

    const renderPlot = (plot: any) => {
        return (
            <Grid item md={12} key={plot.name}>
                <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', width: '97%', marginRight: '1.5%', marginLeft: '1.5%' }}>
                    <Typography className={classes.subSummary}>
                        {plot.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Plot
                        data={plot.data}
                        layout={plot.layout}
                        config={plot.config}
                        onClick={handleClick}
                    />
                </Grid>
            </Grid>
        );
    };

    const renderSelectedPlots = () => {
        return selectedPlots.map(plotName => {
            if (plotName === topPlot.name) {
                return renderPlot(topPlot);
            } else {
                const plot = lowerPlots.find(p => p.name === plotName);
                if (plot) {
                    return renderPlot(plot);
                }
            }
            return null;
        });
    };

    return (
        <>
            {showFilter && (
                <Grid item xs={12}>
                    <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', width: '97%', marginRight: '1.5%', marginLeft: '1.5%' }}>
                        <Typography className={classes.subSummary}>
                            Filter
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center" style={{ width: '97%', marginLeft: '2%' }}>
                        <Typography className={classes.filterLabel}>Name</Typography>
                        {
                            filterMultiSelect ? (
                                plotNames.length > 0 && <Autocomplete
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={plotNames}
                                    getOptionLabel={(option) => option}
                                    defaultValue={plotNames}
                                    onChange={handleSelectChange}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="Select a Plot to display" />
                                    )}
                                    sx={{ width: '500px' }}
                                />
                            ) : (
                                <Select
                                    value={selectedPlots[0] || ""}
                                    onChange={(event) => handleSelectChange(event, [event.target.value])}
                                    style={{ fontSize: '16px' }}
                                >
                                    <MenuItem value="viewall" style={{ textIndent: '10px' }}>
                                        No Filter
                                    </MenuItem>
                                    {plotNames.map((name, index) => (
                                        <MenuItem key={name + index} value={name} style={{ textIndent: '10px' }}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )
                        }
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={2}>
                {selectedPlots.includes("viewall") && topPlot && renderPlot(topPlot)}
                {selectedPlots.includes("viewall") && lowerPlotsMemo}
                {!selectedPlots.includes("viewall") && renderSelectedPlots()}
            </Grid>
        </>
    );
};

export default CustomManagePlots;
