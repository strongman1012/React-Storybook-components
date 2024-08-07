import React, { useState, useEffect } from "react";
import { ComparisonProps } from "../types/comparison-table-types";
import { Container, Grid, Theme, makeStyles } from "@material-ui/core";
import { THEMES } from "../../utils/constants/general";
import ComparisonTitleColumn from "./ComparisonTitleColumn";
import ComparisonDataColumn from "./ComparisonDataColumn";
import { toMapStacked } from "../../utils/functions/accumulators";
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import { logErrorOnNull } from "../../utils/functions/errors";


export const useComparisonStyles = makeStyles((theme: Theme) => ({
    groupCell: {
        backgroundColor:
            theme.palette.type === THEMES.DARK
                ? theme.palette.grey[800]
                : theme.palette.grey[300],
        fontWeight: 'bold',
        paddingLeft: '4px'
    },
    header: {
        display: 'inline-block',
        float: 'left',
        justifyContent: 'center',
        paddingTop: '4px',
        paddingBottom: '8px',
        paddingLeft: '1rem',

        background: '#E34747',
        borderRadius: '8px 8px 0px 0px',

        textAlign: 'left',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: 'white'
    },
    iconButton: {
        color: 'white',
        marginRight: 8,
        cursor: 'pointer',
        marginTop: -1
    }
}));

type Optional<T, OPTIONALS extends keyof T> = Omit<T, OPTIONALS> & Partial<Pick<T, OPTIONALS>>;

const DEFAULT_COLUMN_WIDTH_PX: number = 350;

/**
 * ComparisonTable component. Uses components {@link ComparisonTitleColumn} and {@link ComparisonDataColumn} to 
 * create a table to display result data. Allows configuration of groups and rows through props. Includes 
 * the ability to sort based on the sorting props, and compress / decompress by checking the input of each
 * item and hiding the input column if the previous input was the same as the current input.
 */
const ComparisonTable = <GROUPS extends string, ROWS extends string>(props: ComparisonProps<GROUPS, ROWS>) => {
    const classes = useComparisonStyles();

    //True, if duplicate inputs should be collapsed.
    const [collapsed, setCollapsed] = useState<boolean>(false);
    //The current sort selected from the props. null to use default ordering
    const [selectedSortingId, setSelectedSortingId] = useState<string | null>(null);

    const columnWidth = props.columnWidth ?? DEFAULT_COLUMN_WIDTH_PX;

    //Gets all row ids
    const rowKeyData = Object.keys(props.rowsDefinition) as (keyof typeof props.rowsDefinition)[];

    //Get group name for each row,
    const groupedRowData = rowKeyData.map((rowId) => {
        const rowInfo = props.rowsDefinition[rowId];
        return {
            groupName: rowInfo.groupName,
            rowId: rowId
        };
    })//then group rows by their group name
        .reduce(toMapStacked('groupName'), new Map());

    const sortingFunc = selectedSortingId ? props.sortingOptions.find((sort) => sort.sortName === selectedSortingId)?.compare ?? null : null;

    //Make sure not to accidentally sort the input data! Make a new array
    const sortedData = sortingFunc == null ? [...props.data] : [...props.data].sort((a, b) => sortingFunc(a.data, b.data));

    const sortedGroupInformation = Array.from(groupedRowData.keys()).map((key) => ({ ...props.groupsDefinition[key], groupId: key })).sort((a, b) => a.groupPosition - b.groupPosition);

    const dataSetsWithSortedGroups = sortedData.map((dataSet) => {
        const groupedData = sortedGroupInformation.map((group) => {
            const rowItemsForGroup = logErrorOnNull(groupedRowData.get(group.groupId), [], `No items found for group ${group.groupId}`);

            const ioForGroup = rowItemsForGroup.map((item) => ({ input: dataSet.input[item.rowId], output: dataSet.data[item.rowId] }));

            return {
                rows: ioForGroup
            }
        });

        return {
            ...dataSet,
            //Retrieve data for each row in each group
            dataItems: groupedData
        };
    });

    //Collapse data
    const initialCollapsedData = collapsed ? dataSetsWithSortedGroups.reduce((acc, cv) => {
        if (acc.length === 0) return [cv];
        const lastEntry = acc[acc.length - 1];
        //check if the last entry with an input item has the same input as the current
        const lastEntryWithInput = [...acc].reverse().find((item) => item.dataItems.some((item) => item.rows.some(row => row.input != null)));

        const lastEntryHasSameInput = lastEntry.input != null && props.inputsAreEqual(lastEntry.input, cv.input);
        const lastEntryWithInputHasSameInput = lastEntryWithInput != null && lastEntryWithInput.input != null && props.inputsAreEqual(lastEntryWithInput.input, cv.input);

        if (lastEntryHasSameInput || lastEntryWithInputHasSameInput) {
            //remove 'input'
            return [...acc, { ...cv, dataItems: cv.dataItems.map((item) => ({ rows: item.rows.map((r) => ({ output: r.output })) })) }];
        } else {
            return [...acc, cv];
        }
    }, [] as (Omit<(typeof dataSetsWithSortedGroups)[number], 'dataItems'> & { dataItems: { rows: (Optional<(typeof dataSetsWithSortedGroups)[number]['dataItems'][number]['rows'][number], 'input'>)[] }[] })[]) : dataSetsWithSortedGroups;

    const initialIds = initialCollapsedData.map(item => item.id);
    const [ids, setIds] = useState<any[]>(initialIds);
    const [collapsedData, setCollapsedData] = useState<any[]>(initialCollapsedData);
    const [status, setStatus] = useState<boolean>(true);

    useEffect(() => {
        if (status) {
            setCollapsedData(initialCollapsedData);
            setStatus(false);
        }
    }, [initialCollapsedData]);

    const updateIds = (newIds: number[]) => {
        const tempCollapseData = [...collapsedData];
        // Map the objects to their positions in the ID array
        const positions = newIds.map(id => tempCollapseData.findIndex(child => child.id === id));
        // Sort the array of objects based on these positions
        const sortedCollapseData = tempCollapseData.sort((a, b) => positions[tempCollapseData.indexOf(a)] - positions[tempCollapseData.indexOf(b)]);
        setCollapsedData(sortedCollapseData)
        setIds(newIds);
    }
    return (<>
        <Container maxWidth="xl" style={{ height: '100%', overflowY: 'hidden', display: 'flex', flexDirection: 'row' }}>
            <ComparisonTitleColumn
                title="Compare"
                width={`${columnWidth}px`}
                compressTable={() => setCollapsed((prev) => !prev)}
                sortingScripts={props.sortingOptions.map((option) => {
                    return ({
                        onClick: () => { setSelectedSortingId(selectedSortingId === option.sortName ? null : option.sortName); setStatus(true); },
                        name: option.sortName,
                        selected: selectedSortingId === option.sortName
                    })
                })}
                onOpenCustomRanking={props.onOpenCustomRanking}
                onOpenViewRankScripts={props.onOpenViewRankScripts}
            >
                {
                    sortedGroupInformation.map((group) => (
                        <Grid container key={group.groupId}>
                            <Grid item xs={12} className={classes.groupCell}>
                                {props.groupsDefinition[group.groupId].groupName}
                            </Grid>
                            {(groupedRowData.get(group.groupId) ?? []).map((row) => (
                                <Grid item xs={12} key={row.rowId}>
                                    {props.rowsDefinition[row.rowId].rowName}
                                </Grid>
                            ))}
                        </Grid>
                    ))
                }
            </ComparisonTitleColumn>
            {collapsedData.map((data) => (
                <ComparisonDataColumn
                    key={data.id}
                    idx={data.id}
                    ids={ids}
                    updateIds={updateIds}
                    title={data.name}
                    width={data.dataItems.some((i: any) => i.rows.some((r: any) => r.input != null)) ? `${columnWidth}px` : `${columnWidth / 2}px`}
                    groupedData={data.dataItems}
                    onClick={() => { data.pinned ? props.onRemovePin(data) : props.onPin(data) }}
                    columnIcon={data.pinned ? <DeleteIcon /> : <PushPinIcon />}
                    placeholderValue={props.noInputValuePlaceholder ?? '---'}
                />
            ))}
        </Container>
    </>);
};

export default ComparisonTable;
