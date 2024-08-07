import { Grid, Typography, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { PanelBoxProps } from "../types/types";
import { THEMES } from "../../utils/constants/general";

const useStyles = makeStyles((theme) => (
    {
        overviewTitle: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '8px 8px 0px 0px',
        },
        overviewContext: {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.default,
            height: '100%', //'calc(100% - 4.4rem)',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: theme.palette.background.default,
                webkitBoxShadow: theme.palette.background.default
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor:
                    theme.palette.type === THEMES.LIGHT
                        ? theme.palette.grey[400]
                        : theme.palette.grey[700],
                borderRadius: '5px'
            }
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '4px',
            paddingBottom: '0px',
            paddingLeft: '1rem',
            borderRadius: '8px 8px 0px 0px',
            textAlign: 'left',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            color: 'white'
        }
    }
))

function borderStyles(borders: { left: string | null, right: string | null, bottom: string | null }): { borderLeftWidth?: string, borderRightWidth?: string, borderBottomWidth?: string } {
    return {
        ...(borders.left != null ? { borderLeftWidth: borders.left } : {}),
        ...(borders.right != null ? { borderRightWidth: borders.right } : {}),
        ...(borders.bottom != null ? { borderBottomWidth: borders.bottom } : {})
    };
}

function radiusStyles(borders: { topLeft: string | null, topRight: string | null, bottomLeft: string | null, bottomRight: string | null }): { borderTopLeftRadius?: string, borderTopRightRadius?: string, borderBottomLeftRadius?: string, borderBottomRightRadius?: string } {
    return {
        ...(borders.topLeft != null ? { borderTopLeftRadius: borders.topLeft } : {}),
        ...(borders.topRight != null ? { borderTopRightRadius: borders.topRight } : {}),
        ...(borders.bottomLeft != null ? { borderBottomLeftRadius: borders.bottomLeft } : {}),
        ...(borders.bottomRight != null ? { borderBottomRightRadius: borders.bottomRight } : {})
    };
}

const PanelBox: FC<PanelBoxProps> = (props) => {
    const classes = useStyles();

    const leftBorderWidth = props.omitBorder?.left ? '0px' : null;
    const rightBorderWidth = props.omitBorder?.right ? '0px' : null;
    const bottomBorderWidth = props.omitBorder?.bottom ? '0px' : null;

    const bodyBorder = borderStyles({ left: leftBorderWidth, right: rightBorderWidth, bottom: bottomBorderWidth });

    const topLeftRadius = props.omitBorderRadius?.topLeft ? '0px' : null;
    const topRightRadius = props.omitBorderRadius?.topRight ? '0px' : null;
    const bottomLeftRadius = props.omitBorderRadius?.bottomLeft ? '0px' : null;
    const bottomRightRadius = props.omitBorderRadius?.bottomRight ? '0px' : null;

    const radiusBorder = radiusStyles({
        topLeft: topLeftRadius,
        topRight: topRightRadius,
        bottomLeft: bottomLeftRadius,
        bottomRight: bottomRightRadius
    });

    return (<>
        <Grid className={classes.overviewTitle} style={radiusBorder}>
            <Typography
                variant="h3"
                component="h3"
                className={classes.header}
                color="textPrimary"
                style={radiusBorder}
            >
                {props.title}
            </Typography>
        </Grid>
        <Grid className={classes.overviewContext} style={bodyBorder}>
            {props.children}
        </Grid>
    </>);
}

export default PanelBox;
