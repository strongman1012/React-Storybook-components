import { DialogProps } from "@material-ui/core";

/**
 * Basic Dialog Component Props. Extends off of normal MUI dialog props.
 */
export type BasicDialogProps = DialogProps & {
    /**
     * Any DialogActions. Will be placed in the dialog actions section.
     */
    actions?: JSX.Element[];
    /**
     * Set the content width using css.
     */
    contentWidth: string;
    /**
     * Set the content height using css.
     */
    contentHeight: string;
    /**
     * The dialog title.
     */
    title: string;
    /**
     * Should the close button be hidden?
     */
    hideCloseButton?: boolean;
    /**
     * Close event.
     * @param event 
     * @returns 
     */
    onClose: (event: unknown) => void;
}
