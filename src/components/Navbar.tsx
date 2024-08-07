import React from 'react';
import { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import DrawerMenu from './Menu';

interface NavbarProps {
    onStart: () => void;
    onSelectComponent: (key: string) => void;
}

const DashboardNavbar: FC<NavbarProps> = (props: NavbarProps) => {

    const [open, setState] = useState(false);

    /**
     * Handle Click Start
     */
    const handleClickStart = () => {
        props.onStart();
    }

    const toggleDrawer = (open: boolean) => {
        //changes the function state according to the value of open
        setState(open);
    };

    return (
        <>
            <AppBar elevation={0} >
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Test Component
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            variant='outlined'
                            sx={{ color: 'white', border: '1px solid #ffffff8f' }}
                            onClick={handleClickStart}
                        >Start Test</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <DrawerMenu
                open={open}
                handleClose={() => toggleDrawer(false)}
                handleChange={(key: string) => props.onSelectComponent(key)}
            />
        </>

    );
}

export default DashboardNavbar;