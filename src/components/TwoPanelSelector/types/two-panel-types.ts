
type IdType = string | number;

export type TwoPanelSelectorProps<T extends IdType | { id: IdType }> = {
    /**
     * The item list
     */
    items: T[];
    /**
     * Get the display value for an item
     * @param item The item to display
     * @returns The display value for this item
     */
    toDisplayValue: (item: T) => string;
    /**
     * Called when the user clicks create. 
     * @param itemList The list of items the user selected in order.
     * @returns void
     */
    onConfirm: (itemList: T[]) => void | Promise<boolean>;
    /**
     * Behavior options
     */
    options?: {
        /**
         * Create a filter used to filter the current available selection. Includes
         * the currently selected items.
         * @param selectedItems The currently selected items.
         * @returns A function which can be used in Array.filter
         */
        filterAvailableSelection?: (selectedItems: T[]) => (someItem: T) => boolean,
        /**
         * If true, the component will wait until the "onConfirm" either
         * returns, or if the return value is a promise, wait until
         * that promise resolves before clearing.
         */
        awaitConfirmResponseBeforeClearing?: boolean
    };
};

