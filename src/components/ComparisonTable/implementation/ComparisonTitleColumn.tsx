import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, ReactNode } from "react";
import { FC } from "react";
import { useComparisonStyles } from "./ComparisonTable";
import ComparisonMenu from "./ComparisonMenu";

/**
 * Title column props
 */
type ComparisonTitleColumnProps = {
    /**
     * The title for the column
     */
    title: string;
    /**
     * The width (css in js: '5%' '10px' ...etc)
     */
    width: string;
    /**
     * Called when the "Compress table" or "Decompress table" menu item is
     * selected 
     */
    compressTable: () => void;
    /**
     * A list of sorting scripts to display in the "Rank by" menu
     */
    sortingScripts?: { onClick: () => void, name: string, selected?: boolean }[];
    /**
     * Called when "Custom Rank" menu item is selected
     */
    onOpenCustomRanking: () => void;
    /**
     * Called when the "View Rank Scripts" menu item is selected
     */
    onOpenViewRankScripts: () => void;
    children?: ReactNode
};


/**
 * A column to be used in the ComparisonTable component. Serves as the 
 * left-most column and provides row / group information.
 */
const ComparisonTitleColumn: FC<ComparisonTitleColumnProps> = (props) => {
    //Use styles from parent component
    const comparisonClasses = useComparisonStyles();
    //Position for menu when menu button clicked. null when menu should not be displayed.
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number, subOpen?: boolean } | null>(null);

    return (
        <Grid container data-testid="comparison-title-column" style={{
            width: props.width
        }}>
            <Grid item xs={12} className={comparisonClasses.header} style={{
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'flex-start',
                height: '38px'
            }}>
                <Typography
                    variant="h3"
                    component="h3"
                >
                    {props.title}
                </Typography>
                <React.Fragment>
                    <Button
                        onClick={(event) => {
                            setMenuPosition({
                                x: event.clientX,
                                y: event.clientY
                            });
                        }}
                        variant="contained"
                        color="primary"
                        key="ellipsisBtn"
                        style={{
                            minWidth: '24px',
                            marginLeft: '10px',
                            boxShadow: 'none',
                            padding: '0',
                            paddingTop: '4px'
                        }}
                    >
                        ⋯
                    </Button>
                    {/* Main Menu */}
                    <ComparisonMenu
                        open={menuPosition != null}
                        onClose={() => { setMenuPosition(null) }}
                        anchorReference="anchorPosition"
                        anchorPosition={{
                            top: menuPosition?.y ?? 0,
                            left: menuPosition?.x ?? 0
                        }}
                        transitionDuration={{
                            appear: 500,
                            enter: 500,
                            exit: 0
                        }}
                        menuItems={[
                            {
                                onClick: () => { setMenuPosition((old) => old ? { ...old, subOpen: true } : old); },
                                itemName: 'Rank By >'
                            },
                            {
                                onClick: () => { props.onOpenCustomRanking(); setMenuPosition(null) },
                                itemName: 'Custom Ranking'
                            },
                            {
                                onClick: () => { props.onOpenViewRankScripts(); setMenuPosition(null) },
                                itemName: 'View Rank Scripts'
                            },
                            {
                                onClick: () => { props.compressTable(); setMenuPosition(null) },
                                itemName: 'Toggle Compression'
                            }
                        ]}
                    />
                    {/** Sub menu after clicking on ranked options */}
                    {
                        props.sortingScripts != null && props.sortingScripts.length > 0 &&
                        <ComparisonMenu
                            open={menuPosition != null && menuPosition.subOpen === true}
                            onClose={() => { setMenuPosition((old) => old ? { ...old, subOpen: false } : old) }}
                            anchorReference="anchorPosition"
                            anchorPosition={{
                                top: menuPosition?.y ?? 0,
                                left: (menuPosition?.x ?? 0) + 130
                            }}
                            transitionDuration={{
                                appear: 500,
                                enter: 500,
                                exit: 0
                            }}
                            menuItems={props.sortingScripts.map((option) => {
                                return ({
                                    onClick: () => { option.onClick(); setMenuPosition((old) => old ? { ...old, subOpen: false } : old); },
                                    itemName: option.name + (option.selected ? ' ✓' : '')
                                })
                            })}
                        />
                    }

                </React.Fragment>
            </Grid>
            <Grid item xs={12} data-testid="comparison-title-children" style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default ComparisonTitleColumn;
