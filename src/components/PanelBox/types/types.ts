import React, { ReactNode } from 'react';
export type PanelBoxProps = {
    /**
     * The panel title
     */
    title: string;
    /**
     * Omit border for specific sides
     */
    omitBorder?: {
        left?: boolean,
        right?: boolean,
        bottom?: boolean
    },
    omitBorderRadius?: {
        topLeft?: boolean,
        topRight?: boolean,
        bottomLeft?: boolean,
        bottomRight?: boolean
    },
    children?: ReactNode; // Add this line to include the children prop
}
