import React, { useEffect, useState } from "react";
import { FC } from "react";
import { AnalyticsTraces, OrbitalCoverageEvent, OrbitalGapEvent, SPAOrbitalPoint, SPATerrestrialPoint, TerrestrialCoverageEvent, TerrestrialGapEvent, userParams } from "../types/types";
import { SCATTER_COLORS, stateToOrbitalPoint, toOrbitalPoint, toRunningAverage } from "../utils/misc";
import AnalyticsPlot from "src/components/AnalyticsPlot/implementation/AnalyticsPlot";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Grid, IconButton } from "@material-ui/core";
import PlotDialog from "./plotDialog";
import Plot from "react-plotly.js";

export interface RFCoverageProps {
    dataset: any,
    selectedUser: userParams,
    updateSelectedUser: (user: userParams) => void;
};

const emptyDataset =
    [{
        x: [],
        y: [],
        name: '',
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' }
    }]

const RFCoverage: FC<RFCoverageProps> = ({
    dataset,
    selectedUser,
    updateSelectedUser
}) => {

    const [traces, setTraces] = useState<AnalyticsTraces>({ coverage: null, gap: null, histogram: null, boxPlot: null, coverage_histogram: null, gap_histogram: null });
    const [possiblePoints, setPossiblePoints] = useState<(SPAOrbitalPoint | SPATerrestrialPoint)[]>([]);
    const [plotData, setPlotData] = useState<any>();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [is3D, setIs3D] = useState<boolean>(false);

    function primaryPlot(hideData?: boolean, is3D?: boolean) {
        return (
            <Plot
                data={hideData ? emptyDataset : plotData}
                config={{ displayModeBar: false }}
                layout={is3D ? {
                    paper_bgcolor: "primary",
                    plot_bgcolor: "primary",
                    autosize: true,
                    width: 500,
                    height: 400,
                    margin: {
                        l: 0,
                        r: 0,
                        b: 0,
                        t: 0,
                    },
                    scene: {
                        aspectratio: {
                            x: 0.6,
                            y: 0.6,
                            z: 0.6,
                        },
                        camera: {
                            center: {
                                x: 0,
                                y: 0,
                                z: 0,
                            },
                            eye: {
                                x: 0.9,
                                y: 0.9,
                                z: 0.9,
                            },
                            up: {
                                x: 0,
                                y: 0,
                                z: 1,
                            }
                        },
                        xaxis: {
                            title: 'Altitude (km)',
                            type: 'linear',
                            zeroline: false,
                            color: "primary"
                        },
                        yaxis: {
                            title: 'Inclination (deg)',
                            type: 'linear',
                            zeroline: false,
                            color: 'primary'
                        },
                        zaxis: {
                            title: 'RF Coverage',
                            type: 'linear',
                            zeroline: false,
                            color: 'primary'
                        }
                    },
                    showlegend: false,
                } :
                    {
                        paper_bgcolor: "primary",
                        plot_bgcolor: "primary",
                        autosize: true,
                        showlegend: false,
                        width: 500,
                        height: 400,
                        margin: {
                            l: 60,
                            r: 15,
                            b: 35,
                            t: 15
                        },
                        xaxis: {
                            title: `Altitude (km), Inclination=${selectedUser.inclination} deg`,
                            type: 'linear',
                            zeroline: false,
                            color: "primary"
                        },
                        yaxis: {
                            title: "RF Coverage (minutes / day)",
                            type: 'linear',
                            zeroline: false,
                            color: "primary"
                        },
                        title: false as any
                    }
                }
                onClick={(e) => {
                    if(is3D){
                        updateSelectedUser({altitude: e.points[0]?.x as number, inclination: e.points[0]?.y as number, eccentricity: 0, isOrbital: true})
                    }else{
                        updateSelectedUser({altitude: e.points[0]?.x as number, inclination: selectedUser.inclination, eccentricity: 0, isOrbital: true})
                    }
                }}
            />
        )
    }

    useEffect(() => {
        if (dataset && dataset.realTime) {
            if (dataset.coverageEvents && dataset.coverageEvents.length > 1) {
                let newPossiblePoints: SPAOrbitalPoint[] | SPATerrestrialPoint[];
                if ('latitude' in dataset.coverageEvents[0]) {
                    newPossiblePoints = (dataset.coverageEvents.map((pointAndEvent: SPATerrestrialPoint) => {
                        const { latitude, longitude, altitude } = pointAndEvent as SPATerrestrialPoint;
                        return { latitude, longitude, altitude };
                    })) as SPATerrestrialPoint[];
                } else {
                    newPossiblePoints = (dataset.coverageEvents.map((pointAndEvent: SPAOrbitalPoint) => {
                        const { altitude, inclination, eccentricity } = pointAndEvent as SPAOrbitalPoint;
                        return { altitude, inclination, eccentricity };
                    })) as SPAOrbitalPoint[];
                }
                if (!selectedUser.isOrbital) {
                    //something is probably wrong/strange here
                    newPossiblePoints = (newPossiblePoints as SPAOrbitalPoint[]).map((point) => {
                        return { latitude: point.inclination, longitude: point.eccentricity, altitude: point.altitude };
                    });
                }
                setPossiblePoints(newPossiblePoints);
            }
            try {
                let p = possiblePoints.length > 0 ? toOrbitalPoint(possiblePoints[0]) : stateToOrbitalPoint(selectedUser.isOrbital, selectedUser.altitude, selectedUser.inclination, selectedUser.eccentricity, selectedUser.latitude, selectedUser.longitude);
                const { altitude, inclination, eccentricity } = p;


                //DIVIDE BY 60 TO CONVERT SECONDS -> MINUTES
                let coverageEvents;
                let gapEvents;
                if (selectedUser.isOrbital) {
                    const ppce = dataset.coverageEvents as OrbitalCoverageEvent[];
                    const ppge = dataset.gapEvents as OrbitalGapEvent[];
                    coverageEvents = ppce.find((e) => e.altitude === altitude && e.eccentricity === eccentricity && e.inclination.toFixed(1) === (selectedUser.inclination ?? 0).toFixed(1))?.coverageEvents.map(e => ({ ...e, duration: e.duration / 60 }))
                    gapEvents = ppge.find(e => e.altitude === altitude && e.eccentricity === eccentricity && e.inclination.toFixed(1) === (selectedUser.inclination ?? 0).toFixed(1))?.gapEvents.map(e => ({ ...e, duration: e.duration / 60 }))
                } else {
                    const ppce = dataset.coverageEvents as TerrestrialCoverageEvent[];
                    const ppge = dataset.gapEvents as TerrestrialGapEvent[];
                    coverageEvents = ppce.find(e => e.latitude === altitude && e.longitude === inclination)?.coverageEvents.map(e => ({ ...e, duration: e.duration / 60 }))
                    gapEvents = ppge.find(e => e.latitude === altitude && e.longitude === inclination)?.gapEvents.map(e => ({ ...e, duration: e.duration / 60 }))
                }

                if (coverageEvents == null || gapEvents == null) {
                    console.error('coverageEvents or gapEvents not found! Throwing error...');
                    throw new Error('coverageEvents or gapEvents not found!');
                }
                const newTraces: AnalyticsTraces = {
                    coverage: {
                        title: "Coverage Running Average",
                        type: "line",
                        xTraces: coverageEvents.map((e, i) => i),
                        yTraces: coverageEvents.map(e => e.duration),
                        avgTraces: coverageEvents.map(e => e.duration).reduce(toRunningAverage, [])
                    },
                    gap: {
                        title: "Gap data",
                        type: "line",
                        xTraces: gapEvents.map((e, i) => i),
                        yTraces: gapEvents.map(e => e.duration),
                        avgTraces: gapEvents.map(e => e.duration).reduce(toRunningAverage, [])
                    },
                    coverage_histogram: {
                        title: "Coverage Histogram",
                        type: "box",
                        xTraces: coverageEvents.map(e => e.duration)
                    },
                    gap_histogram: {
                        title: "Gap Histogram",
                        type: "box",
                        xTraces: gapEvents.map(e => e.duration)
                    },
                    histogram: null,
                    boxPlot: null
                };
                setTraces(newTraces);
            } catch (err) {
                console.warn(`Couldn't set RF coverage value on analytics panel`, err);
            }
        }

        const inclinations: number[] = dataset.modelData.orbital['coverageMinutes']?.points.map((x: { inclination: number; }) => x.inclination)
        const uniqueInclinations: number[] = inclinations.filter(function(elem, pos) {
            return inclinations.indexOf(elem) == pos;
        })

        if(uniqueInclinations.length > 1){
            setIs3D(true);
            setPlotData([{
                x: dataset.modelData.orbital['coverageMinutes']?.points?.map((x: { altitude: number; }) => x.altitude) ?? [selectedUser.altitude],
                y: dataset.modelData.orbital['coverageMinutes']?.points?.map((x: { inclination: number; }) => x.inclination) ?? [0],
                z: dataset.modelData.orbital['coverageMinutes']?.points?.map((x: { value: number; }) => x.value) ?? [0],
                mode: 'markers',
                type: 'scatter3d',
                opacity: 1,
                marker: {
                    color: SCATTER_COLORS[0],
                    size: 2
                }
            }]);
        }else{
            setIs3D(false);
            setPlotData([{
                x: dataset.modelData.orbital['coverageMinutes']?.points?.map((x: { altitude: number; }) => x.altitude) ?? [selectedUser.altitude],
                y: dataset.modelData.orbital['coverageMinutes']?.points?.map((x: { value: number; }) => x.value) ?? [0],
                name: '',
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'red' }
            }]);
        }
    }, [dataset]);

    return (
        <>
            <Grid container >
                <Grid item md={10} />
                <Grid item md={1}>
                    <IconButton
                        id={'metricsButton'}
                        onClick={(e) => { setShowDialog(true) }}
                        aria-label="settings"
                    >
                        <ExitToAppRoundedIcon color='primary' />
                    </IconButton>
                </Grid>
                <Grid item md={1} />
                <Grid item md={12} >
                    {primaryPlot(false,is3D)}
                </Grid>
                <Grid item md={12} >
                    <AnalyticsPlot data={{
                        title: "",
                        sections: [{
                            name: "Running Coverage Average",
                            values: [
                                {
                                    name: "",
                                    value: 1,
                                    showGraph: true,
                                    config: { displayModeBar: false },
                                    graphData: [{
                                        x: traces ? traces['coverage']?.xTraces : null,
                                        y: traces ? traces['coverage']?.yTraces : null,
                                        name: 'Contact Event Duration',
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'red' }
                                    },
                                    {
                                        x: traces ? traces['coverage']?.xTraces : null,
                                        y: traces ? traces['coverage']?.yTraces : null,
                                        name: 'Running Average',
                                        type: 'scatter',
                                        marker: { color: 'blue' }
                                    }],
                                    layout: {
                                        paper_bgcolor: "primary",
                                        plot_bgcolor: "primary",
                                        width: 500,
                                        height: 400,
                                        showlegend: false,
                                        legend: {
                                            orientation: 'h',
                                            xanchor: 'center',
                                            font: {
                                                family: 'sans-serif',
                                                size: 12,
                                                color: "primary"
                                            }
                                        },
                                        margin: {
                                            l: 60,
                                            b: 0,
                                            r: 30,
                                            t: 30,
                                            pad: 5
                                        },
                                        xaxis: {
                                            title: 'Coverage Event Number',
                                            titlefont: {
                                                size: 12,
                                                color: "primary"
                                            },
                                            showgrid: true,
                                            zerolinecolor: '#969696',
                                            zerolinewidth: 1,
                                            color: "primary"
                                        },
                                        yaxis: {
                                            title: `Coverage Duration (min)`,
                                            titlefont: {
                                                size: 12,
                                                color: "primary"
                                            },
                                            showgrid: true,
                                            zerolinecolor: '#969696',
                                            zerolinewidth: 1,
                                            color: "primary"
                                        }
                                    }
                                }


                            ]
                        }]
                    }} />
                </Grid>
                <Grid item md={12} >
                    <AnalyticsPlot data={{
                        title: "",
                        sections: [{
                            name: "Coverage Distribution",
                            values: [
                                {
                                    name: "",
                                    value: 1,
                                    showGraph: true,
                                    config: { displayModeBar: false },
                                    graphData: [
                                        {
                                            y: traces ? traces['coverage_histogram']?.xTraces : null,
                                            boxpoints: 'all',
                                            name: '',
                                            type: 'box'
                                        }
                                    ],
                                    layout: {
                                        paper_bgcolor: "primary",
                                        plot_bgcolor: "primary",
                                        width: 500,
                                        height: 400,
                                        showlegend: false,
                                        legend: {
                                            orientation: 'h',
                                            xanchor: 'center',
                                            font: {
                                                family: 'sans-serif',
                                                size: 12,
                                                color: "primary"
                                            }
                                        },
                                        margin: {
                                            l: 60,
                                            b: 0,
                                            r: 30,
                                            t: 30,
                                            pad: 5
                                        },
                                        xaxis: {
                                            title: "Duration (min)",
                                            titlefont: {
                                                size: 12,
                                                color: "primary"
                                            },
                                            showgrid: true,
                                            zerolinecolor: '#969696',
                                            zerolinewidth: 1,
                                            color: "primary"
                                        },
                                        yaxis: {
                                            title: 'Occurrences',
                                            titlefont: {
                                                size: 12,
                                                color: "primary"
                                            },
                                            showgrid: true,
                                            zerolinecolor: '#969696',
                                            zerolinewidth: 1,
                                            color: "primary"
                                        }
                                    }
                                }
                            ]
                        }]
                    }} />
                </Grid>
                <Grid item md={12} >
                    <AnalyticsPlot data={{
                        title: "",
                        sections: [{
                            name: "Coverage Statistics",
                            values: [
                                {
                                    name: "",
                                    value: 1,
                                    showGraph: true,
                                    config: { displayModeBar: false },
                                    graphData: [
                                        {
                                            y: traces ? traces['coverage_histogram']?.xTraces : null,
                                            boxpoints: 'all',
                                            name: '',
                                            type: 'box'
                                        }
                                    ],
                                    layout: {
                                        paper_bgcolor: "primary",
                                        plot_bgcolor: "primary",
                                        width: 500,
                                        height: 400,
                                        margin: {
                                            l: 60,
                                            b: 0,
                                            r: 30,
                                            t: 30,
                                            pad: 5
                                        },
                                        yaxis: {
                                            title: "Duration (min)",
                                            titlefont: {
                                                size: 12,
                                                color: "primary"
                                            },
                                            showgrid: true,
                                            zerolinecolor: '#969696',
                                            zerolinewidth: 1,
                                            color: "primary"
                                        }
                                    }
                                }
                            ]
                        }]
                    }} />
                </Grid>
            </Grid>
            <PlotDialog
                isOpen={showDialog}
                close={() => setShowDialog(false)}
                title={"No RF Coverage"}>
                {primaryPlot}
            </PlotDialog>
        </>
    );

};

export default RFCoverage;