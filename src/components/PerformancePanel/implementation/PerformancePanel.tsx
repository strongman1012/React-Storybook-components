import { Grid, Theme, Typography, makeStyles, Select, MenuItem, ListItemText, IconButton, Button, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import React, { FC, useState, useEffect } from "react";
import PerformancePanelRow from "./PerformancePanelRow";
import { PerformancePanelProps } from "../types/types";
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogBox from "src/components/global/DialogBox";
import CodeEditor from "src/components/Manage-Plots/implements/CodeEditor";
import { TFile } from "src/components/Manage-Plots/types";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const sectionMargins = {
    marginLeft: '1.5%',
    marginRight: '1.5%'
};
const useStyles = makeStyles((theme: Theme) => ({
    rootElement: {
        backgroundColor: theme.palette.background.default
    },
    header: {
        background: '#E34747',
        color: "#fff",
        padding: '0 1rem',
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px 8px 0px 0px',
    },
    headerTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '4px',
        paddingBottom: '0px',
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: "#fff"
    },
    overviewContext: {
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.background.default,
        height: '90vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '1rem 0',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: theme.palette.background.default,
            webkitBoxShadow: theme.palette.background.default
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.background.default,
            borderRadius: '5px'
        }
    },
    sectionHeaderText: {
        fontSize: '18px',
        fontStyle: "normal",
        lineHeight: "21px",
        display: "flex",
        alignItems: "center",
        color: theme.palette.primary.main,
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        paddingLeft: '1rem',
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        width: '97%',
        ...sectionMargins
    },
    sectionContent: {
        ...sectionMargins
    },
    manage_dialog: {
        minWidth: '65vw'
    },
    filterLabel: {
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontSize: "17px",
        lineHeight: "32px",
        marginRight: "0.5rem",
        minWidth: '180px'
    },
    filterRow: {
        marginBottom: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const PerformancePanel: FC<PerformancePanelProps> = (props) => {
    const classes = useStyles();
    const [showScriptManager, setShowScriptManager] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [showDisplayedStatistics, setShowDisplayedStatistics] = useState<boolean>(false);
    const [fetchStatus, setFetchStatus] = useState<boolean>(true);
    const [performanceData, setPerformanceData] = useState<TFile[]>([]);
    const [allSectionData, setAllSectionData] = useState<any[]>(props.sections);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [displayedStatistics, setDisplayedStatistics] = useState<string[]>([]);
    const [allStatistics, setAllStatistics] = useState<string[]>([]);

    useEffect(() => {
        if (fetchStatus) {
            fetchGetPerformanceData();
            setFetchStatus(false);
        }
    }, [fetchStatus]);

    useEffect(() => {
        if (performanceData.length > 0) {
            const fetchSectionData: any[] = [];
            performanceData.forEach((item, index) => {
                const cleanScript = item.script.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim(); // Remove comments
                const getData = new Function(cleanScript)();
                fetchSectionData.push({
                    sectionId: getData.category + index,
                    sectionName: getData.category,
                    filteredValues: getData.filteredValues,
                    sectionData: getData.performanceData.map((data: any) => ({
                        name: data.name,
                        value: data.value,
                        ...(data.accordionContent ? { dropdownContent: data.accordionContent } : data.clickableContent ? { dialogContent: data.clickableContent.content, dialogTitle: data.clickableContent.title } : {})
                    }))
                });
            });
            const concatSectionData = props.sections.concat(fetchSectionData);
            setAllSectionData(concatSectionData);
        }
    }, [performanceData]);

    useEffect(() => {
        const initialSelectedFilters: { [key: string]: string[] } = {};
        props.filters.forEach(filter => {
            initialSelectedFilters[filter.options[0].key] = ['---'];
        });
        setSelectedFilters(initialSelectedFilters);

        const allNames = new Set<string>();
        allSectionData.forEach(section => {
            section.sectionData.forEach((dataRow: any) => {
                allNames.add(dataRow.name);
            });
        });
        const allStats = Array.from(allNames);
        setAllStatistics(allStats);
        setDisplayedStatistics(allStats);
    }, [allSectionData, props.filters]);

    const fetchGetPerformanceData = async () => {
        try {
            const response = await fetch(`${props.apiURL}/getAllPerformance`);
            const getData = await response.json();
            setPerformanceData(getData);
        } catch (error) {
            console.error('Failed to fetch plot names:', error);
        }
    };

    const updateFetchStatus = (fetchStatus: boolean) => {
        setFetchStatus(fetchStatus);
    };

    const handleFilterChange = (filterKey: string, event: any) => {
        const newSelectedFilters = { ...selectedFilters };
        newSelectedFilters[filterKey] = [event.target.value];
        setSelectedFilters(newSelectedFilters);
    };

    const handleDisplayedStatisticsChange = (event: any, value: string[]) => {
        setDisplayedStatistics(value);
    };

    const filterData = (section: any) => {
        return Object.keys(selectedFilters).every(filterKey => {
            const filterValues = selectedFilters[filterKey];
            if (filterValues.includes('---')) return true;
            return filterValues.includes(section.filteredValues[filterKey]);
        });
    };

    const filteredSections = allSectionData.filter(section => filterData(section));

    return (
        <>
            <Grid container>
                <Grid item container xs={12} justifyContent="space-between" alignItems="center" className={classes.header}>
                    <Typography
                        variant="h3"
                        component="h3"
                        className={classes.headerTitle}
                        color="textPrimary"
                        style={{ fontWeight: 'normal' }}
                    >
                        Performance
                    </Typography>
                    <div>
                        <IconButton
                            color="inherit"
                            onClick={() => setShowDisplayedStatistics(!showDisplayedStatistics)}
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FilterAltIcon />
                        </IconButton>
                        {props.scriptManagerOpen && (
                            <Button
                                startIcon={<EditIcon />}
                                style={{ color: "#fff" }}
                                onClick={() => setShowScriptManager(true)}
                            />
                        )}
                    </div>
                </Grid>
            </Grid>
            <Grid item className={classes.overviewContext} xs={12}>
                <Grid container className={classes.rootElement}>
                    {showFilters && (
                        <>
                            <Grid item xs={12}>
                                <Typography component="p" className={classes.sectionHeaderText}>
                                    Filters
                                </Typography>
                            </Grid>
                            {showDisplayedStatistics && (
                                <Grid container justifyContent="flex-start" alignItems="center" className={classes.filterRow} style={{ width: '97%', marginLeft: '2%' }}>
                                    <Typography className={classes.filterLabel}>Displayed Statistic</Typography>
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={allStatistics}
                                        value={displayedStatistics}
                                        onChange={handleDisplayedStatisticsChange}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Select Statistics" />
                                        )}
                                        sx={{ width: '500px' }}
                                    />
                                </Grid>
                            )}
                            {props.filters.map((filter, filterIndex) => (
                                <Grid container justifyContent="flex-start" alignItems="center" className={classes.filterRow} style={{ width: '97%', marginLeft: '2%' }} key={filter.name + "-" + filterIndex}>
                                    <Typography className={classes.filterLabel}>{filter.name}</Typography>
                                    <Select
                                        value={selectedFilters[filter.options[0].key] || ['---']}
                                        onChange={(event) => handleFilterChange(filter.options[0].key, event)}
                                        style={{ fontSize: '16px', marginRight: '1rem' }}
                                        displayEmpty
                                    >
                                        <MenuItem value="---">
                                            No Filter
                                        </MenuItem>
                                        {filter.options.map((option) => (
                                            <MenuItem key={option.key} value={option.value}>
                                                <ListItemText primary={option.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            ))}
                        </>
                    )}
                    {filteredSections.map((section, index) => (
                        <React.Fragment key={section.sectionId + "-" + index}>
                            <Grid item xs={12}>
                                <Accordion className={classes.rootElement}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        {section.sectionName && (
                                            <Grid item xs={12} key={`name-${section.sectionId}-${index}`}>
                                                <Typography component="p" className={classes.sectionHeaderText}>
                                                    {section.sectionName}
                                                </Typography>
                                            </Grid>
                                        )}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid item xs={12} key={`body-${section.sectionId}-${index}`}>
                                            {section.sectionData
                                                .filter((dataRow: any) => displayedStatistics.includes(dataRow.name))
                                                .map((dataRow: any, index: number) => (
                                                    <div className={classes.sectionContent} key={dataRow.name + "-" + index}>
                                                        <PerformancePanelRow
                                                            attributeName={dataRow.name}
                                                            value={dataRow.value}
                                                            dropdownContent={dataRow.dropdownContent ?? undefined}
                                                            dialogContent={
                                                                dataRow.dialogContent ? {
                                                                    content: dataRow.dialogContent,
                                                                    title: dataRow.dialogTitle
                                                                } : undefined
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Grid>
            <DialogBox
                isOpen={showScriptManager}
                title={"Performance Script"}
                onClose={() => setShowScriptManager(false)}
                className={{ paper: classes.manage_dialog }}
            >
                <CodeEditor
                    scriptList={performanceData}
                    updateFetchStatus={updateFetchStatus}
                    isEditable={true}
                    templateScripts={[
                        { ext: '.js', script: props.templateScript }
                    ]}
                    extTypes={['.js']}
                    apiCall={() => `${props.apiURL}/savePerformance`}
                    deleteScript={() => { alert('Script Deleted') }}
                    updateScript={() => { alert('Script Updated') }}
                    refreshScripts={() => { alert('Script Refreshed') }}
                    setChangesMade={() => { }}
                />
            </DialogBox>
        </>
    );
};

export default PerformancePanel;
