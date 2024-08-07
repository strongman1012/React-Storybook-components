import { Menu, MenuItem, MenuProps } from "@material-ui/core";
import React from "react";
import { FC } from "react";

type ComparisonPanelProps = MenuProps & {
    menuItems: {
        onClick: (e: React.MouseEvent) => void;
        itemName: string;
    }[]
}
const ComparisonMenu: FC<ComparisonPanelProps> = (props) => {
    const { menuItems, ...otherProps } = props;
    return (
        <Menu {...otherProps}>
            {menuItems.map((menuItem) => {
                return (
                    <MenuItem key={menuItem.itemName} onClick={menuItem.onClick}>
                        {menuItem.itemName}
                    </MenuItem>
                )
            })

            }
        </Menu>
    )
}

export default ComparisonMenu;
