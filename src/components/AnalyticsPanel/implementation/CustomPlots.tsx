import { FC, useEffect, useState } from "react";
import { AnalyticsTraces, OrbitalCoverageEvent, OrbitalGapEvent, SPAOrbitalPoint, SPATerrestrialPoint, TerrestrialCoverageEvent, TerrestrialGapEvent, userParams } from "../types/types";
import { Box, Button, Checkbox, Chip, FormControl, Grid, ListItemText, MenuItem, Select, Theme, makeStyles } from "@material-ui/core";
import React from "react";
import RenderPlot, { scriptType } from "./RenderPlot";
import { THEMES } from "src/utills/constatnts/general";
import { toOrbitalPoint, stateToOrbitalPoint, toRunningAverage } from "../utils/misc";
import CodeEditor from "src/components/script-manager/implements/CodeEditor";
import DialogBox from "src/components/global/DialogBox";
import { TFile } from "src/components/script-manager/types";


export interface CustomPlotsProps {
  dataset: any,
  user: userParams,
  isEditable: boolean
  updateSelections: (selections: number[]) => void;
  templateScript: string;
  plotScripts: scriptType[],
  handleDeleteScript: (id: string) => void;
  handleUpdateScript: (file: TFile, actionType: string) => void;
  getAllPlotScripts: () => void;
}


const useStyles = makeStyles((theme: Theme) => ({
  multiselect: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    gap: '1px',
    textColor: theme.palette.text.primary,
    background: theme.palette.type === THEMES.LIGHT ? '#FFFFFF' : '#4c4c4c',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    paddingLeft: '14px',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '& .dx-checkbox-checked .dx-checkbox-icon': {
      backgroundColor: theme.palette.primary.main
    },
    '& .dx-dropdowneditor-input-wrapper .dx-texteditor-input': {
      color: theme.palette.text.primary
    },
    border: 'none',
    '& fieldset': {
      border: 'none'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0px'
    }
  },
  chip: {
    '& .MuiChip-label': {
      color: theme.palette.text.primary
    }
  },
  select: {
    background: theme.palette.type === THEMES.LIGHT ? '#FFFFFF' : '#4c4c4c',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    gap: '1px',
    border: '0px'
  },
  dialog: {
    minWidth: '65vw'
  },
}));

const CustomPlots: FC<CustomPlotsProps> = ({
  dataset,
  user,
  isEditable,
  updateSelections,
  templateScript,
  plotScripts,
  handleUpdateScript,
  handleDeleteScript,
  getAllPlotScripts
}) => {

  const classes = useStyles();
  const [showScriptManager, setShowScriptManager] = useState<boolean>(false);
  const [plotFilterData, setPlotFilterData] = useState<{ id: number, name: string, ext: string, script: string }[]>([]);
  const [plotFilters, setPlotFilters] = useState<string[]>([]);

  const [traces, setTraces] = useState<AnalyticsTraces>({ coverage: null, gap: null, histogram: null, boxPlot: null, coverage_histogram: null, gap_histogram: null });
  const [possiblePoints, setPossiblePoints] = useState<(SPAOrbitalPoint | SPATerrestrialPoint)[]>([]);

  useEffect(() => {
    plotScripts.length > 0 && setPlotFilterData(plotScripts);
  }, [plotScripts]);

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
        if (!user.isOrbital) {
          //something is probably wrong/strange here
          newPossiblePoints = (newPossiblePoints as SPAOrbitalPoint[]).map((point) => {
            return { latitude: point.inclination, longitude: point.eccentricity, altitude: point.altitude };
          });
        }
        setPossiblePoints(newPossiblePoints);
      }
      try {
        const p = possiblePoints.length > 0 ? toOrbitalPoint(possiblePoints[0]) : stateToOrbitalPoint(user.isOrbital, user.altitude, user.inclination, user.eccentricity, user.latitude, user.longitude);
        const { altitude, inclination, eccentricity } = p;


        //DIVIDE BY 60 TO CONVERT SECONDS -> MINUTES
        let coverageEvents;
        let gapEvents;
        if (user.isOrbital) {
          const ppce = dataset.coverageEvents as OrbitalCoverageEvent[];
          const ppge = dataset.gapEvents as OrbitalGapEvent[];
          coverageEvents = ppce.find((e) => e.altitude === altitude && e.eccentricity === eccentricity && e.inclination.toFixed(1) === (user.inclination ?? 0).toFixed(1))?.coverageEvents.map(e => ({ ...e, duration: e.duration / 60 }))
          gapEvents = ppge.find(e => e.altitude === altitude && e.eccentricity === eccentricity && e.inclination.toFixed(1) === (user.inclination ?? 0).toFixed(1))?.gapEvents.map(e => ({ ...e, duration: e.duration / 60 }))
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
  }, [dataset]);

  const onChangeCustomPlots = async (event: any) => {

    const plots = (event.target.value as string[]).filter((x) => x.length > 0)

    setPlotFilters(plots);

    const selectedIds: number[] = [];
    plotScripts.forEach(async (plotInfo: scriptType) => {

      if (plots.find((x) => x === plotInfo.name)) {
        selectedIds.push(plotInfo.id);
      }
    });

    updateSelections(selectedIds)
  }

  return (
    <>
      <Grid container style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <Grid item xs={9}>
          <FormControl
            variant="filled"
            size="small"
            fullWidth
            className={classes.select}
          >
            <Select
              style={{
                borderRadius: '4px',
                boxShadow: '0px 4px 14px rgb(0 0 0 / 10%)',
                color: "primary",
                width: '100%',
              }}
              className={classes.multiselect}
              variant="outlined"
              color="primary"
              multiple
              value={plotFilters.length > 0 ? plotFilters : [""]}
              renderValue={(selected) => (
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
                  {(selected as string[]).map((value) => {
                    if (value === '') {
                      return 'Select a Plot to display'
                    } else {
                      return (<Chip size="small" key={value} label={value} className={classes.chip} />)
                    }
                  })}
                </Box>
              )}

              onChange={async (event) => {
                await onChangeCustomPlots(event);
              }}
              label="Name"
            >
              <MenuItem disabled value="">
                <em>Select a Plot to display</em>
              </MenuItem>
              {plotFilterData.map((scriptInfo) => (
                <MenuItem
                  key={scriptInfo.id + scriptInfo.name}
                  value={scriptInfo.name}
                >
                  <Checkbox checked={plotFilters.includes(scriptInfo.name)} color={'primary'} />
                  <ListItemText primary={scriptInfo.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            style={{ margin: '0px 10px 0px 10px' }}
            variant='contained'
            color='primary'
            onClick={() => setShowScriptManager(true)}>
            Script
          </Button>
        </Grid>
      </Grid >
      <Grid item xs={12}>
        <RenderPlot
          performancePanel={dataset}
          traces={traces}
          plotFilters={plotFilters}
          scripts={plotScripts}
          onDeselect={(name) => {
            if (name.length > 0) {
              onChangeCustomPlots({ target: { value: plotFilters.filter(filter => filter !== name) } })
            }
          }}
        />
      </Grid>
      <DialogBox
        isOpen={showScriptManager}
        title={"Custom Algorithm"}
        onClose={() => setShowScriptManager(false)}
        className={{ paper: classes.dialog }}
      >
        <CodeEditor
          scriptList={plotScripts}
          isEditable={isEditable}
          templateScripts={[
            { ext: '.js', script: templateScript }
          ]}
          extTypes={['.js']}
          deleteScript={handleDeleteScript}
          updateScript={handleUpdateScript}
          refreshScripts={getAllPlotScripts}
          setChangesMade={() => { }}
        />
      </DialogBox>

    </>
  )
};

export default CustomPlots;