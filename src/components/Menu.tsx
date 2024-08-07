import React from "react";
import { FC } from "react";
import { Box, Divider, Drawer, IconButton, ListItemButton, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface MenuProps {
    open: boolean,
    handleClose: () => void,
    handleChange: (key: string) => void
}

const menuItems = [
    {
        title: 'Connect Account Setup Guide',
        key: 'connect-account-setup-guide'
    },
    {
        title: 'Data Viewer',
        key: 'data-viewer'
    },
    {
        title: 'Script Manager',
        key: 'script-manager'
    },
    {
        title: 'RfAttribute',
        key: 'rfAttribute'
    },
    {
        title: 'Link Budget',
        key: 'link-budget'
    },
    {
        title: 'HeatMap Slider',
        key: 'heatmap-slider'
    }
]

export const DrawerMenu: FC<MenuProps> = (props: MenuProps) => {

    return (
        <Drawer
            anchor="left"
            open={props.open}
            onClose={props.handleClose}
        >
            <Box
                sx={{
                    p: 2,
                    height: 1,
                    minWidth: 250
                }}
            >
                <IconButton
                    sx={{ mb: 2 }}
                    onClick={props.handleClose}
                >
                    <CloseIcon />
                </IconButton>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>

                    {menuItems.map((item, idx: number) => {
                        return (
                            <ListItemButton
                                key={idx}
                                onClick={() => {
                                    props.handleClose();
                                    props.handleChange(item.key)
                                }}
                            >
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        )
                    })}
                </Box>
            </Box>
        </Drawer>
    )
}

export default DrawerMenu;