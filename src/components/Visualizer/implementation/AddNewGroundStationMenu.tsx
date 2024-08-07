/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import Menu, { Item } from 'devextreme-react/menu';
import { Theme, makeStyles } from '@material-ui/core';


interface AddNewGroundStationMenuProps {
    selection: {latitude: number, longitude: number, altitude: number, x: number, y: number} | undefined;
    handleAddNewGroundStation: (latitude: number, longitude: number, altitude: number) => void;
    handleRefresh: () => void;
};


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
        fontWeight: 'bold',
        cursor: 'pointer',
        webkitUserSelect: 'none', /* Safari */
        msUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none', /* Standard syntax */
        '& .dx-item-content.dx-menu-item-content': {
            padding: '0px 4px',
        },
        '& .dx-menu-item': {
            color: '#000000',
        }
    }
}));


const AddNewGroundStationMenu: FC<AddNewGroundStationMenuProps> = ({
    selection,
    handleAddNewGroundStation,
    handleRefresh
}) => {
    const classes = useStyles();
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setVisible(true);
    }, [selection]);

    useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    },[]);

    const onItemClick = (event: any) => {
        switch (event.itemIndex) {
            case 0:
                handleRefresh();
                break;
            case 1:
                if (selection) {
                    handleAddNewGroundStation(selection.latitude, selection.longitude, selection.altitude);
                }
                break;
        }
        setVisible(false);
    }
    return(
        <div>
            {
            selection &&
            visible && 
            <div className={classes.root} style={{left: selection.x + 'px', top: selection.y + 'px'}}>
                <Menu
                    className={classes.root}
                    onItemClick={onItemClick}
                    orientation={'vertical'}
                >
                    <Item>Refresh</Item>
                    <Item>Add New Station</Item>
                </Menu>
            </div>
            }
        </div>
    );

}

export default AddNewGroundStationMenu;
