import { Box, Grid, Typography, makeStyles, ListItem, ListItemText, Link, Theme, AccordionSummary, Accordion, AccordionDetails, IconButton } from "@material-ui/core";
import DialogBox from "src/components/global/DialogBox";
import React, { FC, Fragment, useState, useEffect } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Plot from 'react-plotly.js';
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


type PerformancePanelRowProps = {
    attributeName: string;
    value: number | string;
    dialogContent?: {
        content: string | undefined,
        title: string | undefined
    },
    dropdownContent?: string
}

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        border: `0px !important`,
        '& .MuiTableCell-root': {
            border: `0px !important`,
            padding: '6px 12px 6px 8px'
        },
        '& .MuiTableCell-head': {
            color: `${theme.palette.text.primary}`
        },
    },
    parameter: {
        border: `0px !important`
    },
    resultComponent: {
        color: theme.palette.text.primary,
        width: '15%',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: ' 0.05em',
    },
    performanceBorder: {
        margin: '2px',
        borderRadius: '4px',
        backgroundColor: `${theme.palette.background.default}`
    },
    analyzeResultLink: {
        textDecoration: 'underline !important',
        '&:hover': {
            cursor: 'pointer !important',
            color: '#3f51b5 !important'
        }
    },
    accordion: {
        backgroundColor: theme.palette.background.default,
        '& .MuiAccordion-root': {
            border: '0px !important',
        },
        '& .Mui-expanded': {
            margin: 0
        }
    },
    accordionSummary: {
        backgroundColor: theme.palette.background.default,
        '& .MuiAccordionSummary-root': {
            margin: 0,
            minHeight: '2.5rem',
            padding: theme.spacing(0, 4),
            '& .MuiAccordionSummary-content': {
                alignItems: 'center'
            },
            border: '0px !important'
        },
        '& .Mui-expanded': {
            margin: 0
        }
    },
    accordionDetails: {
        '& .MuiAccordionDetails-root': {
            padding: theme.spacing(2)
        }
    },
    manage_dialog: {
        minWidth: '65vw'
    },
    item_dialog_button: {
        width: '500px',
        display: 'flex',
        justifyContent: 'end'
    }
}));


const PerformanceAccordionRow = (props: Pick<PerformancePanelRowProps, 'dropdownContent' | 'attributeName' | 'value'>) => {
    const classes = useStyles();
    const [plot, setPlot] = useState<any>(undefined);
    const [table, setTable] = useState<any>(undefined);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    useEffect(() => {
        if (props.dropdownContent) {
            const cleanScript = props.dropdownContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim(); // Remove comments
            const getData = new Function(cleanScript)();
            setPlot(getData.graph);
            setTable(getData.table);
        }
    }, [props.dropdownContent]);

    return (
        <>
            <Box className={classes.performanceBorder} data-testid='accordion'>
                <Accordion key={props.attributeName} className={classes.accordion}>
                    <AccordionSummary id={`${props.attributeName}-panel`} expandIcon={<ExpandMoreIcon />} className={classes.accordionSummary}>
                        <Typography
                            variant="body1"
                            component="p"
                            color="textPrimary"
                        >
                            {props.attributeName}

                        </Typography>
                        <Box flexGrow={1} />
                        <Box className={classes.resultComponent}>{props.value}</Box>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Grid container spacing={2}>
                            {
                                table && (
                                    <Grid item sm={12} md={6}>
                                        <Table aria-label="simple table" className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    {table.header.map((cell: string) => (
                                                        <TableCell key={cell}>{cell}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    table.body.map((row: any[], index: number) => (
                                                        <TableRow key={index}>
                                                            {row.map((cell: string | number) => (
                                                                <TableCell key={cell}>{cell}</TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                )
                            }
                            {plot && (
                                <Grid item sm={12} md={6}>
                                    <Grid item className={classes.item_dialog_button}>
                                        <IconButton
                                            id={'metricsButton'}
                                            onClick={(e) => { setShowDialog(true) }}
                                            aria-label="settings"
                                        >
                                            <ExitToAppRoundedIcon color='primary' />
                                        </IconButton>
                                    </Grid>
                                    <Plot
                                        data={plot.data}
                                        layout={plot.layout}
                                        config={plot.config}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <DialogBox
                    isOpen={showDialog}
                    title={props.attributeName}
                    onClose={() => setShowDialog(false)}
                >
                    {plot && <Plot
                        data={plot.data}
                        layout={plot.layout}
                        config={plot.config}
                    />}
                </DialogBox>
            </Box>
        </>
    )
}

const PerformanceDialogRow = (props: Pick<PerformancePanelRowProps, 'dialogContent' | 'attributeName' | 'value'>) => {
    const classes = useStyles();
    const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);

    const handleLinkDialog = () => {
        setIsLinkOpen(true);
    };

    return (<>
        <DialogBox
            isOpen={isLinkOpen}
            title={props.dialogContent?.title ?? ''}
            onClose={() => setIsLinkOpen(false)}
        >
            {props.dialogContent?.content}
        </DialogBox>
        <Box className={classes.performanceBorder} data-testid='performanceLink'>
            <ListItem className={classes.parameter}>
                <ListItemText
                    primary={
                        <Fragment>
                            <Typography
                                variant="body1"
                                component="p"
                                color="textPrimary"
                            >
                                {props.attributeName}
                            </Typography>
                        </Fragment>
                    }
                />
                <Box flexGrow={1} />
                <Box className={classes.resultComponent}>
                    <Link
                        className={classes.analyzeResultLink}
                        onClick={() => {
                            handleLinkDialog();
                        }}>
                        {props.value}
                    </Link>
                </Box>
            </ListItem>
        </Box>
    </>);
}

const PerformanceRow = (props: Pick<PerformancePanelRowProps, 'attributeName' | 'value'>) => {
    const classes = useStyles();

    return (<>
        <Box className={classes.performanceBorder} data-testid='performanceText'>
            <ListItem className={classes.parameter}>
                <ListItemText
                    primary={
                        <Fragment>
                            <Typography
                                variant="body1"
                                component="p"
                                color="textPrimary"
                            >
                                {props.attributeName}
                            </Typography>
                        </Fragment>
                    }
                />
                <Box flexGrow={1} />
                <Box className={classes.resultComponent}>{props.value}</Box>
            </ListItem>
        </Box>
    </>);
}


const PerformancePanelRow: FC<PerformancePanelRowProps> = (
    props
) => {

    const plainRow = props.dialogContent == null && props.dropdownContent == null;

    return (
        <>
            <Box>
                {
                    props.dialogContent && <PerformanceDialogRow dialogContent={props.dialogContent} attributeName={props.attributeName} value={props.value} />
                }
                {
                    props.dropdownContent && <PerformanceAccordionRow dropdownContent={props.dropdownContent} attributeName={props.attributeName} value={props.value} />
                }
                {
                    plainRow && <PerformanceRow attributeName={props.attributeName} value={props.value} />
                }

            </Box>
        </>
    );
};

export default PerformancePanelRow;

