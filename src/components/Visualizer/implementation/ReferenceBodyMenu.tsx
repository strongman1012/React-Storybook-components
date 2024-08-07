/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import Menu, { Item } from 'devextreme-react/menu';
import { Theme, makeStyles } from '@material-ui/core';


interface ReferenceBodyMenuProps {
    visible: boolean;
    handleSelect: (referenceBody: string) => void;
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


const ReferenceBodyMenu: FC<ReferenceBodyMenuProps> = ({
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
                handleSelect('EARTH');
                break;
            case 1:
                handleSelect('MOON');
                break;
        }

    }

    return (
        <div>
            {
                visible &&
                <div className={classes.root} style={{ right: 246 + 'px', top: 28 + 'px' }}>
                    <Menu
                        className={classes.root}
                        onItemClick={onItemClick}
                        orientation={'vertical'}
                    >
                        <Item text={'Earth'} icon={'images/earth.png'}></Item>
                        <Item text={'Moon'} icon={'images/moon.png'}></Item>
                    </Menu>
                </div>
            }
        </div>
    );

}

export default ReferenceBodyMenu;
