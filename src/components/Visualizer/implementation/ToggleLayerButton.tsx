/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { IconButton, Theme, makeStyles } from '@material-ui/core';


interface ToggleLayerButtonProps {
    toggleLayerManager: boolean;
    handleClick: (status: boolean) => void;
}


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
    },
    bodyButton: {
        position: 'absolute',
        top: '0px',
        right: '241px',
        padding: '5px',
        paddingTop: '0px !important',
        webkitUserSelect: 'none', /* Safari */
        msUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none', /* Standard syntax */
        cursor: 'default',
        opacity: 0.5,
        '&:hover': {
            opacity: '1 !important'
        },
        '&:focus': {
            outline: '0 !important'
        }
    },
    bodyButtonImage: {
        width: '48px',
        height: '35px',
    },
}));


const ToggleLayerButton: FC<ToggleLayerButtonProps> = ({ toggleLayerManager, handleClick }) => {
    const classes = useStyles();
    const handleToggleLayer = (e: any) => {
        handleClick(!toggleLayerManager)
    }

    return (
        <IconButton onClick={handleToggleLayer} className={classes.bodyButton}>
            <img src='images/toggleLayer.png' alt='toggleLayer' className={classes.bodyButtonImage} />
        </IconButton>
    );

}

export default ToggleLayerButton;
