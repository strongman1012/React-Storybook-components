import React, { FC, useState, useEffect } from 'react';
import {
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    Collapse,
    ListItemIcon,
} from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { LayerManagerData } from './model';

const useStyles = makeStyles((theme: Theme) => ({
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '420px'
    },
    formControlLabel: {
        margin: 0,
        paddingLeft: '3.5rem'
    },
    color: {
        color: '#eee !important'
    }
}));

interface LayerManagerState {
    [key: string]: boolean;
}

interface LayerManagerProps {
    className: string;
    data: LayerManagerData;
    updateData: (updateData: LayerManagerData) => void;
    parentOpen: LayerManagerState;
    updateParentOpen: (updateOpen: LayerManagerState) => void;
    activeTab: string;
}

const LayerManager: FC<LayerManagerProps> = ({ className, data, updateData, parentOpen, updateParentOpen, activeTab }) => {
    const classes = useStyles();
    // Initialize state for checked and open items
    const [checked, setChecked] = useState<LayerManagerState>({});
    const [open, setOpen] = useState<LayerManagerState>(parentOpen);

    useEffect(() => {
        const initialChecked: LayerManagerState = {};
        const initialOpen: LayerManagerState = {};
        data.forEach(item => {
            initialChecked[item.parent.displayName] = item.parent.status;
            initialOpen[item.parent.displayName] = false; // Initially collapse all items
            item.children.forEach(child => {
                initialChecked[child.displayName] = child.status;
            });
        });
        if (Object.keys(open).length === 0)
            setOpen(initialOpen);
        setChecked(initialChecked);
    }, [data]);

    const handleRFToggle = (rfLinkName: string, isChecked: boolean, currentData: LayerManagerData) => {
        const [satelliteName, groundStationName] = rfLinkName.split(' - ');

        const newData = currentData.map(item => {
            // Update satellites and user satellites
            if (item.parent.displayName === 'User Satellites' || item.parent.displayName === 'Satellites') {
                const updatedChildren = item.children.map(child =>
                    child.displayName === satelliteName ? { ...child, status: isChecked } : child
                );
                const allChildrenChecked = updatedChildren.every(child => child.status);
                return {
                    ...item,
                    parent: { ...item.parent, status: allChildrenChecked },
                    children: updatedChildren,
                };
            }

            // Update ground stations and user ground stations
            if (item.parent.displayName === 'Ground Stations' || item.parent.displayName === 'User Ground Stations') {
                const updatedChildren = item.children.map(child =>
                    child.displayName === groundStationName ? { ...child, status: isChecked } : child
                );
                const allChildrenChecked = updatedChildren.every(child => child.status);
                return {
                    ...item,
                    parent: { ...item.parent, status: allChildrenChecked },
                    children: updatedChildren,
                };
            }

            return item;
        });

        return newData;
    };

    const handleToggle = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        let newData = data.map(item => {
            if (item.parent.displayName === name) {
                // Toggle parent and all children
                return {
                    parent: { ...item.parent, status: isChecked },
                    children: item.children.map(child => ({ ...child, status: isChecked }))
                };
            }

            if (item.children.some(child => child.displayName === name)) {
                // Toggle the specific child
                const newChildren = item.children.map(child => {
                    if (child.displayName === name) {
                        return { ...child, status: isChecked };
                    }
                    return child;
                });

                // Update parent status based on the new state of its children
                const allChildrenChecked = newChildren.every(child => child.status);
                return {
                    parent: { ...item.parent, status: allChildrenChecked },
                    children: newChildren
                };
            }

            return item;
        });

        // Special case for RF Links
        if (name === 'RF Links') {
            newData = newData.map(item => {
                if (item.parent.displayName === 'RF Links') {
                    return {
                        parent: { ...item.parent, status: isChecked },
                        children: item.children.map(child => ({ ...child, status: isChecked }))
                    };
                }
                else if (item.parent.displayName === 'Satellites' || item.parent.displayName === 'User Satellites' || item.parent.displayName === 'Ground Stations' || item.parent.displayName === 'User Ground Stations') {
                    return {
                        parent: { ...item.parent, status: isChecked },
                        children: item.children.map(child => ({ ...child, status: isChecked }))
                    };
                }
                return item;
            });
        } else if (name.includes(' - ')) {
            newData = handleRFToggle(name, isChecked, newData);
        }

        updateData(newData);
        updateParentOpen(open);
    };

    const handleClick = (name: string) => {
        setOpen((prevState) => ({ ...prevState, [name]: !prevState[name] }));
    };

    return (
        <div className={className}>
            {activeTab === "platforms" && (
                <List className={classes.listContainer}>
                    {data.filter(item => item.parent.displayName !== 'RF Links').map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem style={{ padding: 0 }}>
                                <ListItemIcon style={{ minWidth: 'auto' }} onClick={() => handleClick(item.parent.displayName)}>
                                    {open[item.parent.displayName] ? <ArrowDropDown fontSize='large' htmlColor='#eee' style={{ cursor: 'pointer' }} /> : <ArrowRight fontSize='large' htmlColor='#eee' style={{ cursor: 'pointer' }} />}
                                </ListItemIcon>
                                <FormControlLabel
                                    style={{ margin: 0 }}
                                    control={<Checkbox className={classes.color} checked={checked[item.parent.displayName] ?? false} onChange={handleToggle(item.parent.displayName)} />}
                                    label={item.parent.displayName}
                                />
                            </ListItem>
                            <Collapse in={open[item.parent.displayName]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child, childIndex) => (
                                        <ListItem style={{ padding: 0 }} key={childIndex}>
                                            <FormControlLabel
                                                className={classes.formControlLabel}
                                                control={<Checkbox checked={checked[child.displayName] ?? false} onChange={handleToggle(child.displayName)} className={classes.color} />}
                                                label={child.displayName}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            )}
            {activeTab === "rfLinks" && (
                <List className={classes.listContainer} style={{ paddingLeft: '0.5rem' }}>
                    {data
                        .filter(item => item.parent.displayName === 'RF Links')
                        .flatMap(item => item.children)
                        .map((child, childIndex) => (
                            <ListItem style={{ padding: 0 }} key={childIndex}>
                                <FormControlLabel
                                    style={{ margin: 0 }}
                                    control={<Checkbox checked={checked[child.displayName] ?? false} onChange={handleToggle(child.displayName)} className={classes.color} />}
                                    label={child.displayName}
                                />
                            </ListItem>
                        ))}
                </List>
            )}
            {activeTab === "esri" && (
                <List className={classes.listContainer} style={{ paddingLeft: '0.5rem' }}>
                    {data
                        .filter(item => item.parent.displayName === 'ESRI Map')
                        .flatMap(item => item.children)
                        .map((child, childIndex) => (
                            <ListItem style={{ padding: 0 }} key={childIndex}>
                                <FormControlLabel
                                    style={{ margin: 0 }}
                                    control={<Checkbox checked={checked[child.displayName] ?? false} onChange={handleToggle(child.displayName)} className={classes.color} />}
                                    label={child.displayName}
                                />
                            </ListItem>
                        ))}
                </List>
            )}
        </div>
    );
};

export default LayerManager;
