import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import { FC } from "react";

/**
 * This component really just exists to serve as a baseline for the jest tests,
 * and doesnt serve much functionality outside of that. I would not even recommend
 * making it part of the exported components
 */

const MyButton:FC<ButtonProps> = (props) => {
    const {children} = props
    return (
        <Button {...props}>
           {children}
        </Button>
    );
}

export default MyButton;