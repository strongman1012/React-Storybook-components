/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Menu, { Item } from 'devextreme-react/menu';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { SatelliteInfo } from './model';
import { Satellite } from './satellite';


interface SatelliteContextMenuProps {
    selection: {satelliteInfo: SatelliteInfo, satellite: Satellite, x: number, y: number} | undefined,
    handleActivateNode: (node: SatelliteInfo) => void, 
    handleDeactivateNode: ((node: SatelliteInfo) => void),
    handleRemoveNode: ((node: SatelliteInfo) => void),
    handleViewSatellitePlatformDetails: ((node: SatelliteInfo) => void),
    handleViewCoverageStatistics: () => void
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
        '& .dx-item-content.dx-menu-item-content': {
            padding: '0px 4px',
        },
        '& .dx-menu-item': {
            color: '#000000',
        }
    },
    hide: {
        display: 'none'
    },
    name: {
        fontWeight: 'bold',
        padding: '0px 4px',
    },
    platformMenu: {
        fontWeight: 'bold',
        '& .dx-item-content.dx-menu-item-content': {
            padding: '0px 4px',
        },
        '& .dx-menu-item': {
            color: '#000000',
        }
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


const SatelliteContextMenu: FC<SatelliteContextMenuProps> = ({
    selection,
    handleActivateNode,
    handleDeactivateNode,
    handleRemoveNode,
    handleViewSatellitePlatformDetails,
    handleViewCoverageStatistics
}) => {
    const classes = useStyles();
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
    }, []);

    useEffect(() => {
        setVisible(true);
    },[selection]);

    const onDetailsClick = () => {
        if (selection) {
            handleViewSatellitePlatformDetails(selection.satelliteInfo);
        }
    }

    const onItemClick = (event: any) => {
        if (selection?.satelliteInfo) {
            switch (event.itemIndex) {
                case 0:
                    onDetailsClick();
                    break;
                case 1:
                    handleViewCoverageStatistics();
                    break;
            }
            setVisible(false);
        }
    }

    return(
        <div>
            {selection && visible && selection.satelliteInfo.id !== -1 && selection.satelliteInfo.activated &&
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                <Menu
                    className={classes.root}
                    onItemClick={onItemClick}
                    orientation={'vertical'}
                >
                    <Item
                        text="View Platform Details"
                    ></Item>
                    <Item
                        text="Coverage Statistics"
                    ></Item>
                </Menu>
            </div>
        }
        </div>
    );

}

export default SatelliteContextMenu;
