import { Grid, Theme, Typography, makeStyles } from "@material-ui/core";
import React, { FC, Fragment } from "react";
import { AnalyticsGraph, AnalyticsPlotProps, AnalyticsStructure, GenericGraph, PlotlyGraph } from "../types/types";
import PlotComponent from "../../Plot/implementation/PlotComponent";

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
}));


const AnalyticsPlot: FC<AnalyticsPlotProps> = ({
  data,
}) => {

  const classes = useStyles();

  function loadAnalyticsGeneral(data: GenericGraph[]) {
    return data.map((graphInfo: GenericGraph, index: number) => {
      return (
        <Fragment key={`general-${graphInfo.name}-${index}`}>
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', width: '97%', marginRight: '1.5%', marginLeft: '1.5%' }}>
            <Typography className={classes.subSummary}>
              {graphInfo.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {graphInfo.values.map((graph: any, i: number) => (
              <Fragment key={i.toString()}>
                {graph}
              </Fragment>
            ))}
          </Grid>
        </Fragment>
      )
    })
  }

  function isPlotlyGraphData(obj: AnalyticsStructure['sections']): obj is PlotlyGraph[] {
    for (const section of obj) {
      if (section.values.length === 0)
        continue;
      const firstVal = section.values[0];
      const doesNotHaveGraphData = !('graphData' in firstVal && firstVal.graphData != null)
      if (doesNotHaveGraphData)
        //Not plotly graph 
        return false;

    }
    return true;
  }

  function loadAnalyticsGraphs(data: PlotlyGraph[]) {
    return data.map((graphInfo: PlotlyGraph, index: number) => {
      return (
        <Fragment key={`plotly-${graphInfo.name}-${index}`}>
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', width: '97%', marginRight: '1.5%', marginLeft: '1.5%' }}>
            <Typography className={classes.subSummary}>
              {graphInfo.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {graphInfo.values.map((graph: AnalyticsGraph, index: number) => (
              <PlotComponent
                key={`${graph.name}-${index}`}
                data={graph.graphData}
                layout={graph.layout}
                config={graph.config ?? undefined}
              />
            ))}
          </Grid>
        </Fragment>
      )
    })
  }

  return (
    <>
      {isPlotlyGraphData(data.sections) ? loadAnalyticsGraphs(data.sections) : loadAnalyticsGeneral(data.sections)}
    </>
  );
};

export default AnalyticsPlot;