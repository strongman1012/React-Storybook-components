/**
 * TabViewer component props
 */
export type TabViewerProps = {
    /**
     * A title for each tab, and the component to display.
     * The title is displayed in the tab list.
     */
    tabs: { name: string, component: JSX.Element }[]
};
