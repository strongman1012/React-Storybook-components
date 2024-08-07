/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import Menu, { Item } from 'devextreme-react/menu';
import { Theme, makeStyles } from '@material-ui/core';


interface AntennaPatternMenuProps {
    visible: boolean;
    handleSelect: (antennaPattern: boolean) => void;
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


const AntennaPatternMenu: FC<AntennaPatternMenuProps> = ({
    visible,
    handleSelect
}) => {
    const classes = useStyles();

    useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }, []);

    const onItemClick = (event: any) => {
        switch (event.itemIndex) {
            case 0:
                handleSelect(false);
                break;
            case 1:
                handleSelect(true);
                break;
        }

    }

    return (
        <div>
            {
                visible &&
                <div className={classes.root} style={{ right: 306 + 'px', top: 28 + 'px' }}>
                    <Menu
                        className={classes.root}
                        onItemClick={onItemClick}
                        orientation={'vertical'}
                    >
                        <Item text={'Antenna Coverage Cone'} icon={'images/gsCone.png'}></Item>
                        <Item text={'Antenna Radiation Pattern'} icon={'images/radiationPattern.png'}></Item>
                    </Menu>
                </div>
            }
        </div>
    );

}

export default AntennaPatternMenu;
