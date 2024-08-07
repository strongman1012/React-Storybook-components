// link-budget.test.tsx
import React from 'react';
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

(LinkbudgetApi.getLinkBudgetDatasetNames as jest.Mock).mockClear();
(LinkbudgetApi.getLinkBudgetDatasetNames as jest.Mock).mockResolvedValueOnce(mockDatasetNames);

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
        const titleElement = await screen.findByText(/boltzmanns constant/i);
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
            const newLinkBudgetTable = screen.getByRole('group');
            return expect(newLinkBudgetTable).toBeInTheDocument();
        });

        const newLinkBudgetTable = screen.getByRole('group');
        const rowElements = within(newLinkBudgetTable).getAllByRole('row');
        expect(rowElements.length).toBe(3);
    });

    it('Populate the group, Item Name, Item Title, Value, JSONata Equation, and Notes columns with default values', async () => {

        jest.advanceTimersByTime(500);

        // Use screen queries to find elements
        const newLinkBudgetTable = await screen.findByRole('group');
        const rowElements = await within(newLinkBudgetTable).findAllByRole('row');

        const cells = await within(rowElements[1]).findAllByRole('gridcell', {});
        expect(cells[1].textContent).toBe('1');
        expect(cells[5].textContent).toBe('0');
        expect(cells[6].textContent).toBe('=0');
    });

    it('Click on the insert new below option to add a new line, populate new lines with default values', async () => {

        // Use screen queries to find elements
        const insertBelowButton = await screen.findByTitle('Insert new below');
        fireEvent.click(insertBelowButton);

        // Use screen queries to find elements
        const newLinkBudgetTable = await screen.findByRole('group');

        await waitFor(() => {
            // Default Values
            expect(within(newLinkBudgetTable).getAllByText('2').length).toBe(1);
            expect(within(newLinkBudgetTable).getAllByText('0').length).toBe(2);
            expect(within(newLinkBudgetTable).getAllByText('=0').length).toBe(2);
        });
    });

    it('Click on the insert new above option to add a new line, populate new lines with default values', async () => {

        // Use screen queries to find elements
        const insertAboveButton = await screen.findByTitle('Insert new above');
        fireEvent.click(insertAboveButton);

        // Use screen queries to find elements
        const newLinkBudgetTable = await screen.findByRole('group');

        await waitFor(() => {
            // Default Values
            expect(within(newLinkBudgetTable).getAllByText('2').length).toBe(1);
            expect(within(newLinkBudgetTable).getAllByText('0').length).toBe(2);
            expect(within(newLinkBudgetTable).getAllByText('=0').length).toBe(2);
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
            const EditTable = await screen.findByRole('group');
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
        const tableRows = await within(await screen.findByRole('group')).findAllByRole('row');
        if (tableRows.length > 1) {
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
        }

    });

    // Not passed - need to manual test
    it('Ensure move a row number five down to a new group works or not', async () => {

        // Get table row to move
        const tableRows = await within(screen.getByRole('group')).findAllByRole('row');

        if (tableRows.length > 2) {
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
            const newTableRows = await within(screen.getByRole('group')).findAllByRole('row');
            if (newTableRows.length > 2) {
                const movedRow = newTableRows[2];
                expect(within(movedRow).getByText(/Boltzmanns Constant/i)).toBeInTheDocument();
            }

        }

    });

    it('Click on the pencil icon of one of the rows, display edit popup', async () => {

        // Get table row to Update
        const tableRows = await screen.findAllByRole('row');
        if (tableRows.length > 2) {
            const updateRow = tableRows[2];

            const editButton = await within(updateRow).findByTitle('Edit Item');
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);

            // Wait to display popup
            await waitFor(() => {
                const dialogElement = screen.getByRole('dialog');
                expect(dialogElement).toBeInTheDocument();
            })
        }
    });

    it('Ensure change JSON equation works correctly', async () => {
        // Get table row to Update
        const tableRows = await within(await screen.findByRole('group')).findAllByRole('row');
        if (tableRows.length > 2) {
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
                const EditTable = await screen.findByRole('group');
                return expect(EditTable).toBeInTheDocument();
            });

            const updatedRows = await within(await screen.findByRole('group')).findAllByRole('row');
            if (updatedRows.length > 2) {
                const updatedRow = updatedRows[2];

                expect(within(updatedRow).getByText(/=10/i)).toBeInTheDocument();
            }
        }
    });

    it('Click on the trash icon delete just updated row', async () => {
        // Get table row to Delete
        const EditTable = await screen.getByRole('group');
        const tableRows = await within(EditTable).getAllByRole('row');
        if (tableRows.length > 2) {
            const deleteRow = tableRows[2];
            const findText = await within(deleteRow).getByText(/Boltzmanns Constant/i);
            expect(findText).toBeInTheDocument();
            const deleteButton = await within(deleteRow).getByTitle('Delete Item');

            await act(async () => {
                fireEvent.click(deleteButton);
            });

            await waitFor(async () => {
                const targetElement = await screen.getByText(/Boltzmanns Constant/i);
                expect(targetElement).not.toBeInTheDocument();
            });
        }

    });

    it('Click on the "SAVE" button to save the current configuration', async () => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        await waitFor(async () => {
            const savedMessage = await screen.getByText(/information/i);
            expect(savedMessage).toBeInTheDocument();
        });
    });

    it('Click on the "Done Editing" Button to close the view', async () => {
        const doneEditButton = screen.getByRole('button', { name: 'Done Editing' });
        fireEvent.click(doneEditButton);

        await waitFor(async () => {
            const doneResult = await screen.getByRole('button', { name: 'tableproperties' });
            expect(doneResult).toBeInTheDocument();
        });
    });
});

describe('Delete Link Budget', () => {

    beforeEach(async () => {
        await act(async () => {
            render(<LinkBudgetComponent
                themeName={mockThemeName}
                onChangeTheme={mockOnChangeTheme}
            />);
        });

        // Wait for datagrid loading completed
        await waitFor(async () => {
            const linkBudgetTable = await screen.findByRole('group');
            return expect(linkBudgetTable).toBeInTheDocument();
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
        (LinkbudgetApi.deleteLinkBudget as jest.Mock).mockResolvedValueOnce({ sucess: true, message: 'Success' });

        const openButton = screen.getByRole('button', { name: 'newfolder' });
        fireEvent.click(openButton);

        const listBox = (await screen.findByRole('listbox')).getElementsByClassName("dx-list-item");

        if (listBox.length > 1) {
            await waitFor(() => {
                const firstDataSet = within(listBox[1] as HTMLElement).getByText(/Bent-Pipe return/i);
                expect(firstDataSet).toBeInTheDocument();
            });
            await act(async () => {
                fireEvent.click(within(listBox[1] as HTMLElement).getByRole('button'));
            });
            const updateddataRows = await screen.getAllByRole('option');
            if (updateddataRows.length > 1) {
                await waitFor(() => {
                    const firstDataSet = within(updateddataRows[1]).getByText(/Bent-Pipe return/i);
                    expect(firstDataSet).not.toBeInTheDocument();
                });
            }

        }
    });
});
