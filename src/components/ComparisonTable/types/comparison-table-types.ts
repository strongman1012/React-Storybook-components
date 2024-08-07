
/**
 * Configuration for each row to show up in the comparison panel
 */
type ComparisonRowsDescriptor<GROUPS extends string, ROWS extends string> = {
  [R in ROWS]: {
    /**
     * Display name for row
     */
    rowName: string;
    /**
     * Group (id) this row belongs to
     */
    groupName: GROUPS;
  }
}

/**
 * Configuration for each group to be used and show up in the comparison panel
 */
type ComparisonGroupsDescriptor<GROUPS extends string> = {
  [G in GROUPS]: {
    /**
     * The display name of the group
     */
    groupName: string;
    groupPosition: number;
  }
}

/**
 * Data format for a column of data (output)
 */
type ComparisonColumnData<ROWS extends string> = {
  [K in ROWS]: unknown;
};

/**
 * Data format for a column of data (input)
 */
type ComparisonColumnInput<ROWS extends string> = {
  [K in ROWS]?: unknown;
};


/**
 * Props for the comparison panel. Groups is a union of strings which corresponds to each group id.
 * Rows is a union of strings which corresponds to each row id.
 */
export type ComparisonProps<GROUPS extends string, ROWS extends string> = {
  /**
   * Definition for each row
   */
  rowsDefinition: ComparisonRowsDescriptor<GROUPS, ROWS>;
  /**
   * Definition for each group
   */
  groupsDefinition: ComparisonGroupsDescriptor<GROUPS>;
  /**
   * List of data
   */
  readonly data: { input: ComparisonColumnInput<ROWS>, data: ComparisonColumnData<ROWS>, id: number | string, name: string, pinned?: boolean }[];
  /**
   * Called when an pin icon was selected
   * @param pinnedItem The data item being pinned
   * @returns void
   */
  onPin: (pinnedItem: ComparisonProps<GROUPS, ROWS>['data'][number]) => void;
  /**
 * Called when an unpin icon was selected
 * @param pinnedItem The data item being unpinned
 * @returns void
 */
  onRemovePin: (pinnedItem: ComparisonProps<GROUPS, ROWS>['data'][number]) => void;
  /**
   * Required to determine where columns can collapse
   * @param inputA 
   * @param inputB 
   * @returns 
   */
  inputsAreEqual: (inputA: ComparisonColumnInput<ROWS>, inputB: ComparisonColumnInput<ROWS>) => boolean;
  /**
   * List of sorting options to display in "Rank By" menu option
   */
  sortingOptions: {
    /**
     * The name of the sorting option, which doubles as the id
     */
    sortName: string;
    /**
     * Function to compare data set A and B. See javascript "sort" function
     * @param dataA Data item A
     * @param dataB Data item B
     * @returns A negative value indicates that a should come before b.
     * A positive value indicates that a should come after b.
     * Zero or NaN indicates that a and b are considered equal.
     */
    compare: (dataA: ComparisonColumnData<ROWS>, dataB: ComparisonColumnData<ROWS>) => number;
  }[];
  /**
   * In the event that an input item has no data, display this placeholder
   */
  noInputValuePlaceholder?: string;
  /**
   * Called when "Custom Rank" menu item is clicked
   */
  onOpenCustomRanking: () => void;
  /**
   * Called when "View Rank Scripts" menu item is clicked
   */
  onOpenViewRankScripts: () => void;
  /**
   * Width of each column in pixels when not collapsed.
   */
  columnWidth?: number;
}
