import { FC, useEffect, useState } from "react";
import { AnalyticsPanelProps, userParams } from "../types/types";
import React from "react";
import { Button, Grid, IconButton, MenuItem, Select, Theme, Tooltip, Typography, makeStyles } from "@material-ui/core";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { THEMES } from "src/utills/constatnts/general";
import CustomPlots from "./CustomPlots";
import DialogBox from "src/components/global/DialogBox";
import CodeEditor from "src/components/Manage-Plots/implements/CodeEditor";
import CustomManagePlots from "./CustomManagePlots";
import { TFile } from "src/components/Manage-Plots/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  hide: {
    display: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  overviewTitle: {
    backgroundColor: theme.palette.primary.main,
  },
  overviewContext: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.default,
    height: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: theme.palette.background.default,
      webkitBoxShadow: theme.palette.background.default
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.type === THEMES.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700],
      borderRadius: '5px'
    }
  },
  overviewFooter: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0px 0px 8px 8px',
    minHeight: '30px',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  popoutDialog: {
    minWidth: '50vw !important',
    maxWidth: '52vw !important',
    minHeight: '75vh !important',
    maxHeight: '78vh !important'
  },
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
  btnUpload: {
    color: theme.palette.background.default,
  },
  dialog: {
    width: '25vw'
  },
  manage_dialog: {
    minWidth: '65vw'
  },
  btn: {
    margin: theme.spacing(2)
  },
  button: {
    border: 'none !important',
  },
  buttonDisabled: {
    border: 'none !important',
    color: `#FFFFFF !important`,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '4px',
    paddingBottom: '0px',
    paddingLeft: '1rem',
    paddingRight: '1rem',

    background: '#E34747',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px 8px 0px 0px',

    textAlign: 'left',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: 'white'
  },
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
}));

const AnalyticsPanel: FC<AnalyticsPanelProps> = ({
  dataset,
  users,
  getAllPlotScripts,
  plotScripts,
  templateScript,
  manageTemplateScript,
  apiURL,
  filterMultiSelect,
  updatePlotSelections,
  handleUpdateScript,
  handleDeleteScript,
  downloadResults,
  savePoints
}) => {

  const classes = useStyles();
  const [dataType, setDataType] = useState<string>('custom-plots');
  const [updateRegression, setUpdateRegression] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<boolean>(false);
  const [savingData, setSavingData] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<userParams>(users.length > 0 ? users[0] : { isOrbital: true });
  const [showScriptManager, setShowScriptManager] = useState<boolean>(false);
  const [plots, setPlots] = useState<TFile[]>([]);
  const [plot, setPlot] = useState<TFile>();
  const [fetchStatus, setFetchStatus] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleSelect = (event: any) => {
    if (event.target.value === "manage-plot-scripts") {
      setShowScriptManager(true);
      return true;
    }
    setDataType(event.target.value);
    const getPlot = plots.find((plot) => plot.name === event.target.value);
    setPlot(getPlot);
  };

  const uploadData = async () => {
    setSaveData(false);
    setSavingData(true);
    savePoints();
  }

  useEffect(() => {
    setSelectedUser(users.length > 0
      ? users[0]
      : { isOrbital: true }
    );
  }, [users]);

  useEffect(() => {
    if (fetchStatus) {
      fetchGetPlots();
      setFetchStatus(false);
    }
  }, [fetchStatus]);

  // Function to fetch plot names
  const fetchGetPlots = async () => {
    try {
      const response = await fetch(`${apiURL}/getAllPlots`);
      const plots = await response.json();
      setPlots(plots);
    } catch (error) {
      console.error('Failed to fetch plot names:', error);
    }
  };

  const updateFetchStatus = (fetchStatus: boolean) => {
    setFetchStatus(fetchStatus);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.header} alignItems="center">
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: 'normal' }}
          >
            Analytics
          </Typography>
          {dataType !== 'custom-plots' && (
            <IconButton
              color="inherit"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FilterAltIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid item className={classes.overviewContext} xs={12}>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: '20px', width: '97%', marginLeft: '1.5%', marginRight: '1.5%' }}>
            <Typography className={classes.subSummary}>
              <Select
                disableUnderline
                value={dataType}
                onChange={handleSelect}
              >
                {
                  plots.length > 0 && plots.map((plot, index) => (
                    <MenuItem
                      key={index}
                      value={plot.name}
                      style={{ textIndent: '10px' }}
                    >
                      {plot.name}
                    </MenuItem>
                  ))
                }
                <MenuItem
                  value="custom-plots"
                  style={{ textIndent: '10px' }}
                >
                  Custom Plots
                </MenuItem>
                <MenuItem
                  value="manage-plot-scripts"
                  style={{ textIndent: '10px' }}
                >
                  Manage Plot Scripts
                </MenuItem>
              </Select>
            </Typography>
          </Grid>
          {dataType === 'custom-plots' &&
            <CustomPlots
              dataset={dataset}
              user={selectedUser}
              isEditable={true}
              updateSelections={updatePlotSelections}
              templateScript={templateScript}
              handleUpdateScript={handleUpdateScript}
              handleDeleteScript={handleDeleteScript}
              getAllPlotScripts={getAllPlotScripts}
              plotScripts={plotScripts}
            />}
          {dataType !== 'custom-plots' && <CustomManagePlots data={plot as TFile} filterMultiSelect={filterMultiSelect} showFilter={showFilter} />}
          {dataType !== "custom-plots" && <>
            <Grid item xs={12} style={{ marginTop: '65px', marginBottom: '20px', width: '97%', marginLeft: '1.5%', marginRight: '1.5%' }}>
              <Typography className={classes.subSummary}>
                Manage Results
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ width: '97%', marginBottom: '10px', marginRight: '10px' }}>
              <Tooltip title='Save these results for a Regression Estimation Analysis'>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!dataset}
                  className={!dataset ? classes.buttonDisabled : classes.button}
                  onClick={async () => { await setUpdateRegression(false); setSaveData(true); }}
                  style={{ margin: '5px', float: 'right' }}
                >
                  {savingData ? 'Save Complete' : 'Save Data'}
                </Button>
              </Tooltip>
              <Button
                style={{ margin: '5px', float: 'right' }}
                variant="outlined"
                color="primary"
                disabled={!dataset}
                onClick={downloadResults}
              >
                Download Simulation Data
              </Button>
            </Grid>
          </>}
          <DialogBox
            title={`Save Data`}
            isOpen={saveData}
            onClose={() => {
              setSaveData(false);
            }}
            className={{ paper: classes.dialog }}
          >
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item md={12}>
                <Typography>
                  {updateRegression ? 'Are you sure you wish to both save this data as well as generate a regression?' : 'Are you sure you wish to save this data?'}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Button onClick={uploadData} color="primary" variant="contained" style={{ float: 'right', marginRight: '5px' }}>
                  OK
                </Button>
                <Button
                  onClick={() => {
                    setSaveData(false);
                  }}
                  color="primary"
                  variant="outlined"
                  style={{ float: 'right', marginRight: '5px' }}
                >
                  Cancel
                </Button>

              </Grid>
            </Grid>
          </DialogBox>
          <DialogBox
            isOpen={showScriptManager}
            title={"Manage Plot Scripts"}
            onClose={() => setShowScriptManager(false)}
            className={{ paper: classes.manage_dialog }}
          >
            <CodeEditor
              scriptList={plots}
              updateFetchStatus={updateFetchStatus}
              isEditable={true}
              templateScripts={[
                { ext: '.js', script: manageTemplateScript }
              ]}
              extTypes={['.js']}
              apiCall={() => `${apiURL}/savePlot`}
              deleteScript={handleDeleteScript}
              updateScript={handleUpdateScript}
              refreshScripts={getAllPlotScripts}
              setChangesMade={() => { }}
            />
          </DialogBox>
        </Grid>
      </Grid>
    </>
  )
};

export default AnalyticsPanel;
