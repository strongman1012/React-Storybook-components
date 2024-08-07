/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import DataGrid, { LoadPanel, Column } from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { SatelliteInfo, Constellation } from './model';
import { Satellite } from './satellite';
import { EARTH_MEAN_RADIUS } from './';


interface SatelliteInfoDisplayProps {
    selection: {satelliteInfo: SatelliteInfo, satellite: Satellite, constellation?: Constellation, x: number, y: number} | undefined,
};

const xOffset: number = 5;
const yOffset: number = 5;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: '#cccccc',
        color: '#000000',
        position: 'absolute',
        zIndex: 10,
        border: '1px solid #ffffff',
        borderRadius: '2px',
        padding: '2px',
        backgroundColor: '#cccccc',
        fontSize: '0.8em',
    },
    hide: {
        display: 'none'
    },
    name: {
        fontWeight: 'bold',
        paddingLeft: '4px',
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    detailsButton: {
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: '4px',
        width: '100%',
        backgroundColor: '#cccccc',
        '& .dx-button-content': {
            justifyContent: 'left',
        },
    },
    table: {
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        '& .dx-datagrid': {
            width: '240px'
        },
        '& .dx-row': {
            border: `none`
        },
        '& .dx-datagrid .dx-row-lines>td': {
            borderBottom: 'none',
            paddingTop: '3px',
            paddingBottom: '3px'
        }
    },
}));


const SatelliteInfoDisplay: FC<SatelliteInfoDisplayProps> = ({
    selection
}) => {
    const classes = useStyles();
    const [satelliteAttributes, setSatelliteAttributes] = useState<{property: string, value: number|string}[]>();

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (selection) {
            var attributes : Array<{property: string, value: number|string}> = [];
            var s = selection.satelliteInfo;
            if (selection.constellation) {
                var n = selection.constellation;
                attributes.push({
                        property: "Planes",
                        value: n.shells[0].nPlanes
                });
                attributes.push({
                        property: "Satellites Per Plane",
                        value: n.shells[0].nSatellitesPerPlane
                });
                attributes.push({
                        property: "Altitude (km)",
                        value: n.shells[0].altitude
                });
                attributes.push({
                        property: "Inclination (deg)",
                        value: n.shells[0].inclination.toFixed(1)
                });
            } else {
                if (s.eccentricity && s.eccentricity>0) {
                    var v = 0;
                    if (s.sma) {
                        v = s.sma;
                    } else {
                        if (s.altitude) {
                            v = s.altitude + (EARTH_MEAN_RADIUS/1000);
                        }
                    }
                    attributes.push({
                        property: "Semimajor Axis (km)",
                        value: v
                    });
                } else {
                    attributes.push({
                            property: "Altitude (km)",
                            value: s.altitude ?? 0
                    });
                }
                attributes.push({
                        property: "Inclination (deg)",
                        value: s.inclination.toFixed(1)
                });
                if (s.eccentricity && s.eccentricity>0) {
                    attributes.push({
                        property: "Eccentricity",
                        value: s.eccentricity ?? 0
                    });
                }
            }
            setSatelliteAttributes(attributes);
        } else {
            setSatelliteAttributes(undefined);
        }
    }, [selection]);

    return(
        <div>
            {selection && 
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                {selection.constellation ? 
                <div className={classes.name}>{selection.constellation.name} : {selection.satelliteInfo.name}</div> :
                <div className={classes.name}>{selection.satelliteInfo.name}</div>
                }
                <DataGrid
                    className={classes.table}
                    dataSource={satelliteAttributes}
                    columnAutoWidth={false}
                    showColumnHeaders={false}
                    showBorders={false}
                    showRowLines={true}
                    hoverStateEnabled={false}
                    wordWrapEnabled={true}
                >
                    <LoadPanel
                        enabled={false}
                    />
                    <Column dataField="property"></Column>
                    <Column dataField="value"></Column>
                </DataGrid>
            </div>
        }
        </div>
    );

}

export default SatelliteInfoDisplay;
