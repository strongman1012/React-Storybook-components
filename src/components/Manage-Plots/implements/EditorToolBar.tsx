import React from 'react';
import { FC, useEffect, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { CodeEditorProps } from './CodeEditor';
import { THEMES } from 'src/utills/constatnts/general';
import { Theme, useTheme } from '@material-ui/core';
import Confirm from './popups/Confirm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TFile } from "../types";

const drawerWidth = 240;
const CEToolBar = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export interface EditorToolbarProps extends CodeEditorProps {
    codeChanged: boolean;
    fileOpen: boolean;
    setSaveTrigger: (boolean: boolean) => void;
    setDeleteTrigger: (boolean: boolean) => void;
    currentFile: TFile | undefined;
    updateFetchStatus?: (fetchStatus: boolean) => void;
}

const EditorToolBar: FC<EditorToolbarProps> = ({
    codeChanged,
    fileOpen,
    apiCall,
    isEditable,
    setSaveTrigger,
    setDeleteTrigger,
    currentFile,
    updateFetchStatus
}) => {

    const [message, setMessage] = useState<string>('');
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

    const [lightMode, setLightMode] = useState<boolean>();
    const currentTheme = useTheme<Theme>();

    useEffect(() => {
        currentTheme.palette.type === THEMES.LIGHT ? setLightMode(true) : setLightMode(false);
    }, [currentTheme]);

    const handleSave = async (e: any) => {
        try {
            const response = await fetch(`${apiCall()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentFile)
            });
            if (!response.ok) { // Check if response is ok (i.e., status is 200-299)
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const responseData = await response.json();
            console.log('File saved successfully:', responseData);
            // Update the UI or store after the successful API call
            setSaveTrigger(true);
            updateFetchStatus?.(true);
        } catch (error) {
            console.error('Error saving the file:', error);
        }
    }

    const handleDelete = () => {
        setMessage('Are you sure you want to delete this file?');
        setOpenConfirmModal(true);
    }

    return (
        <>
            <CEToolBar open={true}>
                <Box sx={{
                    display: (isEditable ? "flex" : "none"),
                    padding: "5px 12px",
                    justifyContent: "space-between",
                    backgroundColor: `${lightMode ? '#FFFFFF' : '#1E1E1E'}`,
                    color: `${lightMode ? '#212121' : '#FFFFFF'}`
                }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="text"
                            startIcon={<SaveOutlinedIcon />}
                            onClick={handleSave}
                            sx={{
                                color: `${!codeChanged
                                    ? lightMode ? '#c5c5c5 !important' : '#555 !important'
                                    : lightMode ? '#000 !important' : '#FFF !important'
                                    }`
                            }}
                            disabled={!codeChanged}
                        >Save Changes
                        </Button>
                    </Box>
                    <Box className="center"></Box>
                    <Box className="after">
                        <Button variant="text"
                            startIcon={<DeleteForeverIcon />}
                            onClick={handleDelete}
                            sx={{
                                color: `${!fileOpen
                                    ? lightMode ? '#c5c5c5 !important' : '#555 !important'
                                    : lightMode ? '#000 !important' : '#FFF !important'
                                    }`
                            }}
                            disabled={!fileOpen}
                        >Delete Script
                        </Button>
                    </Box>
                </Box>
            </CEToolBar>
            <Confirm
                open={openConfirmModal}
                message={message}
                onOpen={() => { setOpenConfirmModal(false); setMessage(''); }}
                onConfirm={() => setDeleteTrigger(true)}
            />
        </>
    )
}

export default EditorToolBar;