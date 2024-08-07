// data-viewer.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { mockQueries, mockQueryData, mockColumns, mockQueryData2 } from './mockData';
import { dataApiService } from 'src/services';
import DataViewer from '../implements/DataViewer';
import ColumnFilterModal, { ColumnFilter } from '../implements/ColumnFilterModal';

// Mock the dataApiService
jest.mock('src/services', () => ({
    dataApiService: {
        getQueries: jest.fn(),
        getFileData: jest.fn()
    },
}));

describe('DataViewer component', () => {

    beforeEach(async () => {

        (dataApiService.getQueries as jest.Mock).mockClear();
        (dataApiService.getQueries as jest.Mock).mockResolvedValueOnce({ data: mockQueries });

        // Reset mock implementation before each test
        (dataApiService.getFileData as jest.Mock).mockClear();
        (dataApiService.getFileData as jest.Mock).mockResolvedValueOnce({ data: mockQueryData });

        render(<DataViewer />);

        // Wait to render datagrid
        await waitFor(() => {
            const datagrid = screen.getByTestId('datagrid');
            return expect(datagrid).toBeInTheDocument();
        });
    });

    it('renders with default query', async () => {
        // Check if the default card header title and leftside menu is rendered with the name of the default query
        expect(screen.getAllByText('Query 1').length).toBe(2);
    });

    it('handles query change, change header title - (Ensure that switching between datasets works correctly)', async () => {

        (dataApiService.getFileData as jest.Mock).mockClear();
        (dataApiService.getFileData as jest.Mock).mockResolvedValueOnce({ data: mockQueryData2 });

        // Click on the second query in the sidebar
        const query2Sidebar = await screen.findByTestId('Query 2');
        fireEvent.click(query2Sidebar);

        await waitFor(() => {

            // Check if the card header title is updated to the name of the selected query
            const query2Header = screen.getByText('Query 2', { selector: '.MuiCardHeader-title' });
            expect(query2Header).toBeInTheDocument();

            // Check new dataset for query 2 is loaded
            const cake2 = screen.getByText(/Cake/i);
            expect(cake2).toBeInTheDocument();
        });
    });

    it('renders sidebar tabs by flag - (Internal or External and appear in their respective list)', async () => {

        // initialy Internal Tab is loaded
        const internalTabElement = screen.getByText('Internal');
        expect(internalTabElement).toBeInTheDocument();

        const ExternalTabElement = screen.getByText('External');
        fireEvent.click(ExternalTabElement);

        await waitFor(() => {
            const query3Sidebar = screen.getByTestId('Query 3');
            expect(query3Sidebar).toBeInTheDocument();
        });
    });

    it('renders datagrid with json data - (Ensure that datasets with multiple levels appear correctly.)', async () => {

        const datagrid = await screen.findByTestId('datagrid');
        const dataRows = await within(datagrid).findAllByRole('row');
        expect(dataRows.length).toBe(5);

        const firstRow = dataRows[1];
        const firstCells = within(firstRow).getAllByRole('gridcell');
        expect(firstCells.length).toBe(11);

        // Check Address Sub Datagrid display or not
        const addressShowButton = within(firstCells[8]).getByText(/Show/i);
        expect(addressShowButton).toBeInTheDocument();

        fireEvent.click(addressShowButton);

        await waitFor(() => {
            const addressTitle = screen.getByText(/Address/i, { selector: '.MuiTypography-root' });
            expect(addressTitle).toBeInTheDocument();
        });

        // Check Coordinate Sub Datagrid display or not
        const dataRowsWithLevel1 = await within(datagrid).findAllByRole('row');
        const level1Datagrid = await within(dataRowsWithLevel1[2]).findByRole('grid');
        expect(level1Datagrid).toBeVisible();

        const level1Rows = await within(level1Datagrid).findAllByRole('row');
        expect(level1Rows.length).toBe(2);

        const level1Row = level1Rows[1];
        const level1RowCells = within(level1Row).getAllByRole('gridcell');
        expect(level1RowCells.length).toBe(6);

        const level1ShowButton = within(level1RowCells[3]).getByText(/Show/i);

        fireEvent.click(level1ShowButton);

        await waitFor(() => {
            const coodinateTitle = screen.getByText(/Coordinates/i, { selector: '.MuiTypography-root' });
            expect(coodinateTitle).toBeInTheDocument();
        })
    });

    it('Search input updates search results - (Ensure that search functionality works)', async () => {

        // Find the search input element
        const searchInput = screen.getByLabelText('Search in the data grid');

        // Simulate user typing in the search box
        fireEvent.change(searchInput, { target: { value: 'Sheldon' } });
        await waitFor(() => {
            expect((searchInput as HTMLInputElement).value).toBe('Sheldon');
        });

        // Wait for the datagrid to update with search results
        const datagrid = await screen.findByTestId('datagrid');
        const dataRows = await within(datagrid).findAllByRole('row');
        expect(dataRows.length).toBe(2);
        expect(within(dataRows[1]).getByText('Sheldon')).toBeInTheDocument();
    });

    it('Column filters functionality - (Ensure that the column filters work)', async () => {

        // Find Filter icon button
        const filterIcon = await screen.findByTestId('FilterAltIcon');

        // Simulate user click the icon button
        fireEvent.click(filterIcon);

        // Wait for the datagrid to update with filter results
        const datagrid = await screen.findByTestId('datagrid');
        const dataRows = await within(datagrid).findAllByRole('row');
        expect(dataRows.length).toBe(6);

        // Find Filter cells
        const filterInputs = await within(dataRows[1]).findAllByRole('textbox', { name: 'Filter cell' });
        expect(filterInputs.length).toBe(5);

        for (let i = 0; i < filterInputs.length; i++) {
            expect(filterInputs[i]).toBeVisible();
        }

        const filterSpins = await within(dataRows[1]).findAllByRole('spinbutton', { name: 'Filter cell' });
        expect(filterSpins.length).toBe(2);

        for (let i = 0; i < filterSpins.length; i++) {
            expect(filterSpins[i]).toBeVisible();
        }

        fireEvent.change(filterInputs[0], { target: { value: 'Terrill' } });
        expect((filterInputs[0] as HTMLInputElement).value).toBe('Terrill');

        await waitFor(async () => {
            const datagrid = screen.getByTestId('datagrid');
            const dataRows = within(datagrid).getAllByRole('row');
            expect(dataRows.length).toBe(3);
            expect(within(dataRows[2]).getByText('Terrill')).toBeInTheDocument();
        });
    });

    // it('PDF export functionality - (Ensure that dataset with multiple levels displays on PDF when export)', async () => {

    //     const originalOpen = window.open;
    //     window.open = jest.fn();

    //     // Mock the getFiledata function to return mockQueries
    //     (dataApiService.getFileData as jest.Mock).mockResolvedValueOnce({ data: mockQueryData });

    //     render(<DataViewer />);

    //     const exportButton = screen.getByRole('button', { name: 'export' });
    //     expect(exportButton).toBeInTheDocument();

    //     fireEvent.click(exportButton);

    //     waitFor(async () => {
    //         const exportPDFbutton = await screen.findByText('Export all data to PDF');
    //         expect(exportPDFbutton).toBeInTheDocument();

    //         // Simulate a click on the export PDF button
    //         fireEvent.click(exportPDFbutton);

    //         // Assert that window.open is called with the expected parameters
    //         expect(window.open).toHaveBeenCalledWith('data.pdf', '_blank');

    //         // Restore the original window.open function
    //         window.open = originalOpen;
    //     });
        
    // });

    // it('Excel export functionality - (Ensure that dataset with multiple levels displays on Excel when export)', async () => {

    //     const originalOpen = window.open;
    //     window.open = jest.fn();

    //     // Mock the getFiledata function to return mockQueries
    //     (dataApiService.getFileData as jest.Mock).mockResolvedValueOnce({ data: mockQueryData });

    //     render(<DataViewer />);

    //     const exportButton = screen.getByRole('button', { name: 'export' });
    //     expect(exportButton).toBeInTheDocument();

    //     fireEvent.click(exportButton);

    //     waitFor(async () => {
    //         const exportXLSbutton = await screen.findByText('Export all data to EXCEL');
    //         expect(exportXLSbutton).toBeInTheDocument();

    //         // Simulate a click on the export xlsx button
    //         fireEvent.click(exportXLSbutton);

    //         // Assert that window.open is called with the expected parameters
    //         expect(window.open).toHaveBeenCalledWith('data.xlsx', '_blank');

    //         // Restore the original window.open function
    //         window.open = originalOpen;
    //     });
        
    // });
});

describe('ColumnFilterModal component', () => {

    it('Select All checkbox selects all columns when clicked', async () => {
        // Mock function to track the onSelectAll callback
        const mockOnSelectAll = jest.fn();
        const selectAllStatus = true;

        // Render the ColumnFilterModal with mock props
        const { getByLabelText, getByTestId } = render(
            <ColumnFilterModal
                isOpen={true}
                columns={mockColumns}
                onClose={() => {}}
                onColumnToggle={() => {}}
                onSelectAll={mockOnSelectAll}
            />
        );

        // Find the Select All checkbox
        const selectAllCheckbox = getByLabelText('Select All');
        fireEvent.click(selectAllCheckbox);

        // Verify that onSelectAll function is called with the correct argument
        expect(mockOnSelectAll).toHaveBeenCalledWith(!selectAllStatus);
    });

    it('Individual column checkboxes toggle column selection when clicked', () => {
        const mockOnClose = jest.fn();
        const mockOnColumnToggle = jest.fn();
        const mockOnSelectAll = jest.fn();

        render(
            <ColumnFilterModal
                isOpen={true}
                columns={mockColumns}
                onClose={mockOnClose}
                onColumnToggle={mockOnColumnToggle}
                onSelectAll={mockOnSelectAll}
            />
        );

        const column1Checkbox = screen.getByLabelText('Column 1');

        // Simulate clicking on the checkbox for Column 1
        fireEvent.click(column1Checkbox);

        // Verify that onColumnToggle function is called with the correct argument
        expect(mockOnColumnToggle).toHaveBeenCalledWith(mockColumns[0]);
    });
});
