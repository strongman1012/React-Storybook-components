import { Tab, Tabs } from "@material-ui/core";
import { Paper } from "@mui/material";
import { useState } from "react";
import { TabViewerProps } from "../types/tab-viewer-types";
import React from "react";

/**
 * A Tab Viewer. Creates a clickable bar using the MUI "Tabs" component
 * and displays the currently selected tab.
 */
const TabViewer = (props: TabViewerProps) => {
    const [tabController, setTabController] = useState<number>(0);

    return (
        <>
            <Paper>
                <Tabs
                    value={tabController}
                    onChange={(event, value) => setTabController(value)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {props.tabs.map((tab, index) => (
                        <Tab value={index} label={tab.name} />
                    ))}
                </Tabs>
            </Paper>
            {tabController > props.tabs.length ? null : props.tabs[tabController].component}
        </>
    );
};

export default TabViewer;
