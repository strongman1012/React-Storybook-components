import React from "react";
import { FC, useEffect, useState } from "react";
import { Box, Card, CardHeader, Container, Divider, FormControlLabel } from "@mui/material";
import DVSideBar from "./DVSideBar";
import DVContent from "./DVContent";
import { Query } from "../types/dataViewer";
import { dataApiService } from "src/services";

const DataViewer: FC = () => {

    const [queries, setQueries] = useState<Query[]>([]);
    const [activeQuery, setActiveQuery] = useState<Query>();

    useEffect(() => {
        getQueryData();
    }, []);

    /**
     * Get Query Data
     */
    const getQueryData = async () => {

        const getResponse = await dataApiService.getQueries();

        if (getResponse.data) {
            setQueries(getResponse.data);
            const internalQueries = getResponse.data.filter((query: Query) => query.isExternal === false);

            // Set first internal Query as Active
            activeQuery === undefined && setActiveQuery(internalQueries[0]);
        }
    }

    /**
     * Handle Query Change
     */
    const handleOnChange = (query: Query) => {
        setActiveQuery(query);
    }

    return (
        <>
            <Container maxWidth={false} sx={{ paddingTop: 1 }}>
                <Card>
                    <CardHeader title={activeQuery?.name} />
                    <Divider />
                    <Box sx={{ display: "flex", height: '100%' }}>
                        <DVSideBar query={activeQuery} queries={queries} onChange={handleOnChange} />
                        <DVContent query={activeQuery} />
                    </Box>
                </Card>
            </Container>
        </>
    )
}

export default DataViewer;