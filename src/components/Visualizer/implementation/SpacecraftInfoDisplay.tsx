/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import DataGrid, { LoadPanel, Column } from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { SpacecraftInfo } from './model';
import { Spacecraft } from './spacecraft';
import { EARTH_MEAN_RADIUS } from './';


interface SpacecraftInfoDisplayProps {
    selection: {spacecraftInfo: SpacecraftInfo, spacecraft: Spacecraft, x: number, y: number} | undefined,
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


const SpacecraftInfoDisplay: FC<SpacecraftInfoDisplayProps> = ({
    selection,
}) => {
    const classes = useStyles();
    const [spacecraftAttributes, setSpacecraftAttributes] = useState<{property: string, value: number|string}[]>();

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (selection) {
            var attributes : Array<{property: string, value: number|string}> = [];
            var s = selection.spacecraftInfo;
            var position = selection.spacecraft.position;
            if (position.latitude && position.longitude && position.altitude) {
                attributes.push({
                    property: "latitude",
                    value: position.latitude.toFixed(4)
                });
                attributes.push({
                    property: "longitude",
                    value: position.longitude.toFixed(4)
                });
                attributes.push({
                    property: "altitude",
                    value: ((position.altitude)/1000).toFixed(2) + ' km'
                });
            }
            setSpacecraftAttributes(attributes);
        } else {
            setSpacecraftAttributes(undefined);
        }
    }, [selection, selection?.spacecraft.position.latitude]);

    return(
        <div>
            {selection &&
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                <div className={classes.name}>{selection.spacecraftInfo.name}</div>
                <DataGrid
                    className={classes.table}
                    dataSource={spacecraftAttributes}
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

export default SpacecraftInfoDisplay;
