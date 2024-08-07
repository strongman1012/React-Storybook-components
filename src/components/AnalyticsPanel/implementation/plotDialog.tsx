import React, { FC, ReactNode, useState } from 'react';
import {
    Grid,
    Button,
    Box,
    Tooltip,
    Typography,
    makeStyles,
    useTheme,
    Theme,
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import DialogBox from 'src/components/global/DialogBox';

interface PlotDialogProps {
    children: (hideData?: boolean, is3D?: boolean) => ReactNode;
    isOpen: boolean;
    close: () => void;
    title: string;
    regression?: {
        selectedRegression: string,
        currentRegression: string,
        regressionModelListExt: boolean,
        rmseModelValues: { [key: string]: number },
        showRegressionDisabled: boolean,
        setAsDefault: () => {},
        clearDefault: () => {}
    };
};

const myStyles = makeStyles((theme: Theme) => ({
    low: {
        color: '#FF0000',
        textAlign: 'right'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.background.default
    },
    medium: {
        color: '#E5A001',
        textAlign: "right"
    },
    high: {
        color: '#00A500',
        textAlign: "right"
    },
    none: {
        color: '#808080',
        textAlign: "right"
    },
    dialogStyle: {
        '& > div > div': {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            backgroundColor: theme.palette.background.default,
            height: '62vh'
        }
    },
    title: {
        margin: 0,
        padding: theme.spacing(2, 4),
        backgroundColor: theme.palette.primary.main,
        color: "white",
        display: 'flex',
        alignItems: 'center'
    },
    activeBtnView: {
    },
    btnView: {
        color: theme.palette.grey[700],
    },
    defaultBtnView: {
        border: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,10%)',
        borderRadius: '8px',
        fontSize: '1rem',
        padding: '4px 12px',
        marginTop: '4px',
        marginBottom: '4px',
        '&:hover': {
            border: 'none',
        }
    },
    loading: {
        zIndex: 8
    },
    defaultSelectBox: {
        border: 'none',
        boxShadow: '0 4px 14px rgba(0,0,0,10%)',
        borderRadius: '8px',
        '& fieldset': {
            border: 'none'
        }
    }
}));

const PlotDialog: FC<PlotDialogProps> = ({
    children,
    isOpen,
    close,
    title,
    regression
}) => {
    const myClasses = myStyles();
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const [viewMethod, setViewMethod] = useState('2d_view');
    const [plotOptions, setPlotOptions] = useState<{ show_surface: boolean; show_scatter: boolean }>({ show_surface: true, show_scatter: true });


    return (
        <>

            <DialogBox
                title={title}
                isOpen={isOpen}
                onClose={() => close()}
            >
                <Grid container>
                    <Grid
                        item
                        md={3}
                        style={{ backgroundColor: theme.palette.background.paper, height: '58vh' }}
                    >
                        <Box
                            p={5}
                            mr={4}
                            justifyContent="center"
                            display="flex"
                            flexDirection="column"
                        >
                            <Box>
                                <Box mb={2}>
                                    <Typography variant="body1" component="p" color="textPrimary">
                                        View
                                    </Typography>
                                </Box>
                                <>
                                    <Button
                                        name="2d_view"
                                        variant={viewMethod === '2d_view' ? 'contained' : 'outlined'}
                                        size="small"
                                        color="primary"
                                        onClick={(e) => setViewMethod('2d_view')}
                                        className={`${viewMethod === '2d_view' ? myClasses.activeBtnView : myClasses.btnView} ${myClasses.defaultBtnView}`}
                                        fullWidth
                                    >
                                        2D
                                    </Button>
                                    <Button
                                        name="3d_view"
                                        variant={viewMethod === '3d_view' ? 'contained' : 'outlined'}
                                        size="small"
                                        color="primary"
                                        disabled={true}
                                        onClick={(e) => setViewMethod('3d_view')}
                                        className={`${viewMethod === '3d_view' ? myClasses.activeBtnView : myClasses.btnView} ${myClasses.defaultBtnView}`}
                                        fullWidth
                                    >
                                        3D
                                    </Button>
                                </>
                            </Box>
                            <Box>
                                {regression && (<>
                                    <Box mb={2} mt={6}>
                                        <Typography variant="body1" component="p" color="textPrimary">
                                            Regression Type
                                        </Typography>
                                    </Box>
                                    <FormControl variant="filled" size="small" fullWidth>
                                        <Select
                                            fullWidth
                                            name="regressionType"
                                            variant="outlined"
                                            value={regression?.selectedRegression ?? ''}
                                            //@ts-ignore
                                            onChange={event => { updateSelectedRegression(event.target.value) }}
                                            // {event => onState('regressionTypes', { ...state[0].regressionTypes, [metricType]: event.target.value.toString() })}
                                            className={myClasses.defaultSelectBox}
                                        >
                                            <MenuItem value="" disabled>
                                                <em>{`None`}</em>
                                            </MenuItem>
                                            <MenuItem value="gam">GAM</MenuItem>

                                            {/*dynamically render MenuItems for each key value pair==> "HuberRegresssor":0.042 */}
                                            {
                                                (regression?.regressionModelListExt && regression?.rmseModelValues) ? Object.keys(regression?.rmseModelValues).map((key) => {
                                                    return (
                                                        <MenuItem value={key}>{key}: +/-{regression?.rmseModelValues[key]}</MenuItem>
                                                    )
                                                }) : <MenuItem value="glm">GLM</MenuItem>
                                            }


                                        </Select>
                                    </FormControl>
                                    <span>
                                        <Button
                                            name="setAsDefault"
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => { regression?.setAsDefault() }}
                                            style={{ marginTop: '10px' }}
                                            fullWidth
                                            disabled={regression?.selectedRegression === regression?.currentRegression}
                                        >
                                            Set As Default
                                        </Button>
                                    </span>
                                    <span>
                                        <Button
                                            name="clearDefault"
                                            variant="outlined"
                                            color="primary"
                                            onClick={regression?.clearDefault}
                                            style={{ marginTop: '10px' }}
                                            fullWidth
                                            disabled={!regression}
                                        >
                                            Clear Default
                                        </Button>
                                    </span>
                                </>)}

                            </Box>
                            <Box my={10}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="show_surface"
                                            checked={plotOptions.show_surface}
                                            size="small"
                                            onChange={(e) => setPlotOptions({ show_scatter: plotOptions.show_scatter, show_surface: !plotOptions.show_surface })}
                                            disabled={!regression}
                                        />
                                    }
                                    label="Show Regression"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="show_scatter"
                                            checked={plotOptions.show_scatter}
                                            size="small"
                                            onChange={(e) => setPlotOptions({ show_scatter: !plotOptions.show_scatter, show_surface: plotOptions.show_surface })}
                                            color="primary"
                                        />
                                    }
                                    label="Show Data"
                                />
                            </Box>
                            <Box flexGrow={1} />
                            <Box mt={7}>
                                <Tooltip
                                    title={
                                        <Typography
                                            gutterBottom
                                            component="p"
                                            variant="body1"
                                            dangerouslySetInnerHTML={{
                                                __html: 'Reset Plot'
                                            }}
                                        />
                                    }
                                    placement="top-start"
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    <span>
                                        <Button
                                            name="Reset"
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => { }}
                                            fullWidth
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={9} style={{ position: 'relative' }}>
                        <Box display="flex" justifyContent="center" alignItems="center" p={2} style={{
                            height: '100%'
                        }}>
                            <Box style={{
                                boxShadow: '0 4px 14px rgba(0,0,0,10%)'
                            }}>
                                {children(!plotOptions.show_scatter, viewMethod === '3d_view')}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogBox>
        </>
    );
}

export default PlotDialog;