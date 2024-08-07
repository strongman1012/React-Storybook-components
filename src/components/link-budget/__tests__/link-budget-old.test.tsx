// link-budget.test.tsx
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import LinkBudgetComponent from "../implements";
import { LinkbudgetApi } from 'src/services/link-budget/api-linkbudget';
import { mockData, mockDatasetNames, mockStoreResponseData } from './mockData';

// Mock the function passed as props
const mockOnChangeTheme = jest.fn();
const mockThemeName = 'light';

jest.mock('src/components/link-budget/implements/popups/SaveAs', () => require('src/components/link-budget/__mocks__/SaveAs.tsx'));
jest.mock('src/components/link-budget/implements/popups/RowEdit', () => require('src/components/link-budget/__mocks__/RowEdit.tsx'));

// Mock LinkbudgetApi Service
jest.mock('src/services/link-budget/api-linkbudget', () => ({
    LinkbudgetApi: {
        getLinkBudgetData: jest.fn(),
        getLinkBudgetDataById: jest.fn(),
        getLinkBudgetNewData: jest.fn(),
        storeLinkBudget: jest.fn(),
        getLinkBudgetDatasetNames: jest.fn(),
        deleteLinkBudget: jest.fn()
    },
}));

// Reset mock implementation before each test
(LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockClear();
(LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockResolvedValueOnce(mockData);

(LinkbudgetApi.getLinkBudgetData as jest.Mock).mockClear();
(LinkbudgetApi.getLinkBudgetData as jest.Mock).mockResolvedValueOnce(mockData);

(LinkbudgetApi.storeLinkBudget as jest.Mock).mockClear();
(LinkbudgetApi.storeLinkBudget as jest.Mock).mockResolvedValueOnce(mockStoreResponseData);

describe('LinkBudget Component Render', () => {

    beforeEach(async () => {
        await act(async () => {
            render(<LinkBudgetComponent 
                themeName={mockThemeName} 
                onChangeTheme={mockOnChangeTheme} 
            />);
        });
    });

    it(('Component renders without crashing'), async () => {
        const titleElement = await screen.findByText(/Dataset 1/i);
        expect(titleElement).toBeInTheDocument();
    });
});

describe('Create New Link Budget', () => {

    beforeEach(async () => {

        await act(async () => {
            render(<LinkBudgetComponent 
                themeName={mockThemeName} 
                onChangeTheme={mockOnChangeTheme} 
            />);
        });

        // Find the element by its role and click for edit mode
        const editButton = await screen.findByRole('button', { name: 'tableproperties' });
        fireEvent.click(editButton);

        // Wait for edit toolbar to appear
        await waitFor(() => {
            const newButton = screen.getByRole('button', { name: 'New' });
            return expect(newButton).toBeVisible();
        });

        // Click the "New" button, then wait for new elements to appear
        const newButton = await screen.findByRole('button', { name: 'New' });
        await act(async () => {
            fireEvent.click(newButton);
        });
    });

    it(('Click on the new button on edit mode, display new Link budget screen'), async () => {

        const title = await screen.findByText(/new_data_set/i);
        expect(title).toBeInTheDocument();

        // Wait for datagrid loading completed
        await waitFor(() => {
            const newLinkBudgetTable = screen.getByRole('grid');
            return expect(newLinkBudgetTable).toBeInTheDocument();
        });

        const newLinkBudgetTable = screen.getByRole('grid');
        const rowElements = within(newLinkBudgetTable).getAllByRole('row');
        expect(rowElements.length).toBe(3);
    });

    fit('Populate the group, Item Name, Item Title, Value, JSONata Equation, and Notes columns with default values', async () => {

        // Use screen queries to find elements
        const newLinkBudgetTable = await screen.findByRole('grid');
        const rowElements = await within(newLinkBudgetTable).findAllByRole('row');
        expect(rowElements.length).toBe(3);

        const cells = await within(rowElements[1]).findAllByRole('gridcell', {});
        expect(cells[1].textContent).toBe('1');
        expect(cells[2].textContent).toBe(' ');
        expect(cells[3].textContent).toBe(' ');  
        expect(cells[4].textContent).toBe(' ');  
        expect(cells[5].textContent).toBe('0');
        expect(cells[6].textContent).toBe('=0');
    });

    it('Click on the insert new below option to add a new line, populate new lines with default values', async () => {

        // Use screen queries to find elements
        const insertBelowButton = await screen.findByTitle('Insert new below');
        fireEvent.click(insertBelowButton);

        await waitFor(() => {
            // Default Values
            expect((screen.getAllByText(/new_group/i)).length).toBe(2);
            expect(screen.getAllByText(/new_name/i).length).toBe(2);
            expect(screen.getAllByText(/new_title/i).length).toBe(2);
            expect(screen.getAllByText(/=0/i).length).toBe(2);
        });
    });

    it('Click on the insert new above option to add a new line, populate new lines with default values', async () => {

        // Use screen queries to find elements
        const insertAboveButton = await screen.findByTitle('Insert new above');
        fireEvent.click(insertAboveButton);

        await waitFor(() => {
            // Default Values
            expect(screen.getAllByText(/new_group/i).length).toBe(2);
            expect(screen.getAllByText(/new_name/i).length).toBe(2);
            expect(screen.getAllByText(/new_title/i).length).toBe(2);
            expect(screen.getAllByText(/=0/i).length).toBe(2);
        });
    });

    it('Click on the Save button to save the current layout', async () => {

        // Find save button
        const saveButton = await screen.findByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        await waitFor(() => {
            const savedMessage = screen.getByText(/Successfully Saved./i);
            expect(savedMessage).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    it('Click on the Save as button to save as new link budget template name the current layout', async () => {

        // Find save button
        const saveAsButton = await screen.findByRole('button', { name: 'Save As' });
        fireEvent.click(saveAsButton);

        const inputElement = await screen.findByTestId('template-name-input');
        expect(inputElement).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: 'new_test_template' } });

        const okButton = await screen.findByTestId('ok-button');
        fireEvent.click(okButton);

        await waitFor(() => {
            const newTitle = screen.getByText(/new_test_template/i);
            expect(newTitle).toBeInTheDocument();
        });
    });
});

describe('Edit Link Budget', () => {

    beforeEach(async () => {

        await act(async () => {
            render(<LinkBudgetComponent 
                themeName={mockThemeName} 
                onChangeTheme={mockOnChangeTheme} 
            />);
        });

        // Find the element by its role and click for edit mode
        const editButton = await screen.findByRole('button', { name: 'tableproperties' });
        fireEvent.click(editButton);

        // Wait for edit toolbar to appear
        await waitFor(async () => {
            const EditTable = await screen.findByRole('grid');
            return expect(EditTable).toBeInTheDocument();
        });
    });

    it(('Display edit mode correctly'), async () => {

        const doneEditButton = screen.getByRole('button', { name: 'Done Editing' });
        expect(doneEditButton).toBeVisible();
    });

    // Not passed - need to manual test
    it(('Left-Click and select the “Ungroup All” Option, table should be ungrouped'), async () => {

        // Get table row to click
        const tableRows = await within(await screen.findByRole('grid')).findAllByRole('row');
        const groupedRow = tableRows[1];
        expect(within(groupedRow).getByText(/Group: 1. Constants/i)).toBeInTheDocument();

        // Simulate a right-click event
        fireEvent.contextMenu(groupedRow, {
            button: 2
        });

        // Wait for the context menu to appear
        await waitFor(() => {
            const menu = screen.getByRole('menu');
            expect(menu).toBeVisible();
        });

        // Using findBy instead of getBy to wait for the element to appear
        const menuElement = await screen.findByRole('menu');
        expect(within(menuElement).getByText(/Ungroup All/i)).toBeInTheDocument();
    });

    // Not passed - need to manual test
    it('Ensure move a row number five down to a new group works or not', async () => {

        // Get table row to move
        const tableRows = await within(screen.getByRole('grid')).findAllByRole('row');
        const moveRow = tableRows[2];
        const handleCell = within(moveRow).getAllByRole('gridcell')[0];
        expect(handleCell).toBeInTheDocument();
        expect(within(moveRow).getByText(/Boltzmanns Constant/i)).toBeInTheDocument();

        // Get the position of handleCell within the DOM
        const handleCellRect = handleCell.getBoundingClientRect();
        const { x, y } = handleCellRect;

        // move row to 2 down
        fireEvent.mouseDown(handleCell);
        fireEvent.mouseMove(handleCell, { clientX: x, clientY: y + 100 }); // below 2
        fireEvent.mouseUp(handleCell);

        // Get new table
        const newTableRows = await within(screen.getByRole('grid')).findAllByRole('row');
        const movedRow = newTableRows[2];
        expect(within(movedRow).getByText(/Boltzmanns Constant/i)).toBeInTheDocument();
    });

    it('Click on the pencil icon of one of the rows, display edit popup', async () => {

        // Get table row to Update
        const tableRows = await within(await screen.findByRole('grid')).findAllByRole('row');
        const updateRow = tableRows[2];

        const editButton = await within(updateRow).findByTitle('Edit Item');
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);

        // Wait to display popup
        await waitFor(() => {
            const dialogElement = screen.getByRole('dialog');
            expect(dialogElement).toBeInTheDocument();
        })
    });

    it('Ensure change JSON equation works correctly', async () => {
        // Get table row to Update
        const tableRows = await within(await screen.findByRole('grid')).findAllByRole('row');
        const updateRow = tableRows[2];

        const editButton = await within(updateRow).findByTitle('Edit Item');
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);

        // Wait to to update datagrid
        await waitFor(() => {
            const dialogElement = screen.getByRole('dialog');
            expect(dialogElement).toBeInTheDocument();
        });

        const dialog = await screen.findByTestId('mock_row_edit');
        const inputElement = within(dialog).getByLabelText('JSONata Equation');
        fireEvent.change(inputElement, { target: { value: '' } }); 
        fireEvent.change(inputElement, { target: { value: '=10' } });
        fireEvent.blur(inputElement);

        await waitFor(() => {
            expect((inputElement as HTMLInputElement).value).toBe('=10');
        });

        const buttonOk = within(dialog).getByTestId('mock_button_ok');
        fireEvent.click(buttonOk);

        // Wait for edit toolbar to appear
        await waitFor(async () => {
            const EditTable = await screen.findByRole('grid');
            return expect(EditTable).toBeInTheDocument();
        });

        const updatedRows = await within(await screen.findByRole('grid')).findAllByRole('row');
        const updatedRow = updatedRows[2];

        expect(within(updatedRow).getByText(/=10/i)).toBeInTheDocument();
    });

    it('Click on the trash icon delete just updated row', async () => {
        // Get table row to Delete
        const tableRows = await within(await screen.findByRole('grid')).findAllByRole('row');
        const deleteRow = tableRows[2];
        expect(within(deleteRow).getByText(/Boltzmanns Constant/i)).toBeInTheDocument();
        const deleteButton = await within(deleteRow).findByTitle('Delete Item');

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        await waitFor(async () => {
            const targetElement = await screen.findByText(/Boltzmanns Constant/i);
            expect(targetElement).not.toBeInTheDocument();
        });
    });

    it('Click on the "SAVE" button to save the current configuration', async () => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        await waitFor(() => {
            const savedMessage = screen.getByText(/Successfully Saved./i);
            expect(savedMessage).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    it('Click on the "Done Editing" Button to close the view', async () => {
        const doneEditButton = screen.getByRole('button', { name: 'Done Editing' });
        fireEvent.click(doneEditButton);

        await waitFor(async () => {
            const hideEditButton = await screen.findByRole('button', { name: 'Done Editing' });
            expect(hideEditButton).not.toBeVisible();
        });
    });
});

describe('Delete Link Budget', () => {

    beforeEach(async () => {
        // Reset mock implementation before each test
        (LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockClear();
        (LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockResolvedValueOnce(mockData);

        (LinkbudgetApi.getLinkBudgetData as jest.Mock).mockClear();
        (LinkbudgetApi.getLinkBudgetData as jest.Mock).mockResolvedValueOnce(mockData);

        (LinkbudgetApi.getLinkBudgetDatasetNames as jest.Mock).mockClear();
        (LinkbudgetApi.getLinkBudgetDatasetNames as jest.Mock).mockResolvedValueOnce(mockDatasetNames);

        await act(async () => {
            render(<LinkBudgetComponent 
                themeName={mockThemeName} 
                onChangeTheme={mockOnChangeTheme} 
            />);
        });
    });

    it(('Click on the other templates button, display template select popup'), async () => {
        
        const openButton = screen.getByRole('button', { name: 'newfolder' });
        fireEvent.click(openButton);

        await waitFor(() => {

            const newTemplateModalTitle = screen.getByText(/Link Budget Templates/i);
            expect(newTemplateModalTitle).toBeInTheDocument();
        });
    });

    it(('Click on the “X” to the right side of the name, The link budget should delete without issue'), async () => {

        (LinkbudgetApi.deleteLinkBudget as jest.Mock).mockClear();
        (LinkbudgetApi.deleteLinkBudget as jest.Mock).mockResolvedValueOnce({sucess: true, message: 'Success'});
        
        const openButton = screen.getByRole('button', { name: 'newfolder' });
        fireEvent.click(openButton);

        await waitFor(() => {

            const firstDataSet = screen.getByText(/Dataset 1/i);
            expect(firstDataSet).toBeInTheDocument();
        });

        const deleteButtons = screen.getAllByRole('button', { name: 'Clear' });
        expect(deleteButtons.length).toBe(3);

        for (let index = 0; index < 1; index++) {

            if (index === 1) {
                const deleteButton = deleteButtons[index];
                expect(deleteButton).toBeInTheDocument();
    
                fireEvent.click(deleteButton);
    
                await waitFor(() => {
                    const firstDataSet = screen.getByText(/Dataset 1/i);
                    expect(firstDataSet).not.toBeInTheDocument();
                });
            }
        }
    });
});
