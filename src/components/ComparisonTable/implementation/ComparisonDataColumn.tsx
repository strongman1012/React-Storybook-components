import { Grid, IconButton, Typography } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useComparisonStyles } from "./ComparisonTable";
import React from "react";

/**
 * Props for comparison data column
 */
type ComparisonDataColumnProps = {
    /**
     * The title for the column
     */
    title: string;
    idx: any;
    ids: any[];
    updateIds: (newIds: number[]) => void;
    /**
     * The width (css in js: '5%' '10px' ...etc)
     */
    width: string;
    /**
     * The data to display. Groups display in the order of the array
     */
    groupedData: {
        rows: {
            input?: unknown,
            output: unknown
        }[]
    }[];
    /**
     * Icon next to title. Uses on click prop
     */
    columnIcon: JSX.Element;
    /**
     * Called when column icon is clicked
     */
    onClick: () => void;
    /**
     * Value used when no data found for an input cell
     */
    placeholderValue: string;
}

/**
 * One group of data
 */
const DataGroup = (props: { data: ComparisonDataColumnProps['groupedData'][number], placeholderValue: string, renderInputColumn: boolean }) => {
    //Data is either two columns or one column
    const finalData: [any, any][] | [any][] = props.renderInputColumn ? (
        props.data.rows.map((row) => ([row.input ?? props.placeholderValue, row.output]))
    ) : (
        props.data.rows.map((row) => ([row.output]))
    );

    return (<>
        {finalData.map((rowItem, index) => (
            rowItem.length === 1 ? (
                <Grid key={`${index}-${rowItem[0]}`} item xs={12}>
                    {rowItem[0]}
                </Grid>
            ) : (<React.Fragment key={`${index}-${rowItem[0]}-${rowItem[1]}`}>
                <Grid item xs={6}>
                    {rowItem[0]}
                </Grid>
                <Grid item xs={6}>
                    {rowItem[1]}
                </Grid>
            </React.Fragment>)
        ))}
    </>);
}

/**
 * A data column for the comparison table. Renders the title, each group,
 * and input/output. If no input passed, only renders output.
 */
const ComparisonDataColumn: FC<ComparisonDataColumnProps> = (props) => {
    const comparisonClasses = useComparisonStyles();
    const [dragOver, setDragOver] = useState<string>("")
    const ids = props.ids;

    // console.log(props.idx,'aaa')
    const hasInputColumn = props.groupedData.some((group) => group.rows.some((row) => row.input != null));

    const handleDragStart = (e: any) => {
        const { id } = e.target;
        const idx = ids.findIndex(item => item == id);
        e.dataTransfer.setData("colIdx", idx);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        const { id } = e.target.closest(".MuiGrid-container");
        setDragOver(id);
    }
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragOver("");
    };

    const handleDrop = (e: any) => {
        const { id } = e.target.closest(".MuiGrid-container");
        const droppedColIdx = ids.findIndex(item => item == id);
        const draggedColIdx = e.dataTransfer.getData("colIdx");
        const tempCols = [...ids];
        const draggedColValue = tempCols.splice(draggedColIdx, 1)[0];
        tempCols.splice(droppedColIdx, 0, draggedColValue);
        setDragOver("");
        props.updateIds(tempCols);
    }

    return (
        <Grid
            draggable
            id={props.idx}
            key={props.idx}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            container style={{
                width: props.width,
                borderLeft: dragOver !== "" ? '2px solid #029CFD' : 'none'
            }}>
            <Grid item xs={12} className={comparisonClasses.header} style={{
                borderRadius: '0',
                flexDirection: 'row',
                display: 'flex',
                height: '38px',
                cursor: 'pointer'
            }}>
                <IconButton
                    size={'small'}
                    onClick={props.onClick}
                    className={comparisonClasses.iconButton}
                >
                    {props.columnIcon}
                </IconButton>
                <Typography
                    variant="h3"
                    component="h3"
                >
                    {props.title}
                </Typography>

            </Grid>
            {
                props.groupedData.map((data, idx) => (<React.Fragment key={idx}>
                    {hasInputColumn && (<>
                        <Grid item xs={6} className={comparisonClasses.groupCell}>
                            {idx === 0 ? 'Input' : <>&nbsp;</>}
                        </Grid>
                    </>)}
                    <Grid item xs={hasInputColumn ? 6 : 12} className={comparisonClasses.groupCell}>
                        {idx === 0 ? 'Output' : <>&nbsp;</>}
                    </Grid>
                    <DataGroup
                        data={data}
                        placeholderValue={props.placeholderValue}
                        renderInputColumn={hasInputColumn}
                    />
                </React.Fragment>))
            }
        </Grid>
    );
}

export default ComparisonDataColumn;
