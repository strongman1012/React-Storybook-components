/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Menu, { Item } from 'devextreme-react/menu';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { GroundStationInfo } from './model';
import { GroundStation } from './groundStation';


interface GroundStationContextMenuProps {
    selection: {groundStationInfo: GroundStationInfo, groundStation: GroundStation, x: number, y: number} | undefined,
    handleActivateNode: (node: GroundStationInfo) => void,
    handleDeactivateNode: (node: GroundStationInfo) => void,
    handleRemoveNode: (node: GroundStationInfo) => void
    handleViewPlatformDetails: (node: GroundStationInfo) => void;
    handleViewCoverageStatistics: () => void;
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


const GroundStationContextMenu: FC<GroundStationContextMenuProps> = ({
    selection,
    handleActivateNode,
    handleDeactivateNode,
    handleRemoveNode,
    handleViewPlatformDetails,
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
            handleViewPlatformDetails(selection.groundStationInfo);
        }
    }

    const onItemClick = (event: any) => {
        if (selection?.groundStationInfo) {
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
            {selection && selection.groundStationInfo.id !== -1 && selection.groundStationInfo.activated && visible &&
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
        {/* {selection && selection.groundStation.id !== -1 && !selection.groundStation.activated && visible &&
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                <Menu
                    className={classes.root}
                    onItemClick={() => handleRemoveNode(selection.groundStation)}
                    orientation={'vertical'}
                >
                   <Item
                        text="Remove"
                    ></Item>
                </Menu>
            </div>
        } */}
        </div>
    );

}

export default GroundStationContextMenu;
