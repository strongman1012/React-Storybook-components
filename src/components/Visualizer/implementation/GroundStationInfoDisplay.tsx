/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import DataGrid, { LoadPanel, Column } from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { GroundStationInfo } from './model';
import { GroundStation } from './groundStation';


interface GroundStationInfoDisplayProps {
    selection: {groundStationInfo: GroundStationInfo, groundStation: GroundStation, x: number, y: number} | undefined
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
        fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
        webkitUserSelect: 'none', /* Safari */
        msUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none', /* Standard syntax */
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


const GroundStationInfoDisplay: FC<GroundStationInfoDisplayProps> = ({
    selection
}) => {
    const classes = useStyles();
    const [groundStationAttributes, setGroundStationAttributes] = useState<{property: string, value: number|string}[]>();
    const [showContextMenu, setShowContextMenu] = useState<boolean>(true);

    useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }, []);

    useEffect(() => {
        setShowContextMenu(true);
    },[selection]);

    useEffect(() => {
        if (selection) {
            var gs = selection.groundStationInfo;
            setGroundStationAttributes([
                {
                    property: "latitude",
                    value: gs.latitude.toFixed(4)
                },
                {
                    property: "longitude",
                    value: gs.longitude.toFixed(4)
                },
                {
                    property: "altitude",
                    value: (gs.altitude ? gs.altitude : 0)  + "m"
                },
                {
                    property: "min elev. angle",
                    value: (gs.minElevationAngle ? gs.minElevationAngle : '') + '°'
                },
            ]);
        } else {
            setGroundStationAttributes(undefined);
        }
    }, [selection]);


    return(
        <div>
            {selection && showContextMenu &&
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                <div className={classes.name}>{selection.groundStationInfo.name}</div>
                <DataGrid
                    className={classes.table}
                    dataSource={groundStationAttributes}
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

export default GroundStationInfoDisplay;
