import '@testing-library/jest-dom';
import { LinkbudgetApi } from 'src/services/link-budget/api-linkbudget';
import LinkBudget from '../implements/LinkBudget';
import { render, waitFor, screen, act, fireEvent, within } from '@testing-library/react';
import { mockData, mockDatasetNames } from './mockData';
import { sampleSource as mockSource } from '../assets/sampleData';

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

const onSaveLinkBudgetMock = jest.fn();
const onLoadLinkBudgetMock = jest.fn();
const onChangeThemeMock = jest.fn();
const loadLinkBudgetDatasetNamesMock = jest.fn();

describe('LinkBudget Component', () => {

    // Reset mock implementation before each test
    (LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockClear();
    (LinkbudgetApi.getLinkBudgetDataById as jest.Mock).mockResolvedValueOnce(mockData);

    (LinkbudgetApi.getLinkBudgetData as jest.Mock).mockClear();
    (LinkbudgetApi.getLinkBudgetData as jest.Mock).mockResolvedValueOnce(mockData);

    beforeEach(async () => {

        await act(async () => {
            render(
                <LinkBudget 
                    source={mockSource}
                    templateId={1}
                    preRunResults={[]}
                    isEngineer={true}
                    linkBudgetDatasetNames={mockDatasetNames}
                    linkBudgetTemplates={[]}
                    linkBudgetLoaded={true}
                    saveLinkBudget={onSaveLinkBudgetMock}
                    loadLinkBudget={onLoadLinkBudgetMock}
                    themeName={'light'}
                    onChangeTheme={onChangeThemeMock} 
                    loadLinkBudgetDatasetNames={loadLinkBudgetDatasetNamesMock}
                />
            );
        });

        // Wait for datagrid loading completed
        await waitFor(async () => {
            const linkBudgetTable = await screen.findByRole('grid');
            return expect(linkBudgetTable).toBeInTheDocument();
        });
    });

    it('Render Correctly or not', async () => {

        const linkBudgetTitle = screen.getByText(/Dataset 1/i);
        expect(linkBudgetTitle).toBeInTheDocument();
    });

    it('Edit mode is working correctly or not', async () => {

        const linkBudgetTable = screen.getByRole('grid');

        // Find the element by its role and click for edit mode
        const editButton = within(linkBudgetTable).getByRole('button', { name: 'tableproperties' });
        fireEvent.click(editButton);

        // Wait for switch edit mode
        await waitFor(() => {
            const doneEditButton = screen.getByRole('button', { name: /Done Editing/i });
            expect(doneEditButton).toBeVisible();
        });
    });

    fit('Click on the new button on toolbar, display new Link budget screen', async () => {

        // Get default link budget Datagrid
        const linkBudgetTable = screen.getByRole('grid');

        // Find the element by its role and click for edit mode
        const editButton = within(linkBudgetTable).getByRole('button', { name: 'tableproperties' });
        fireEvent.click(editButton);

        // Wait for switch edit mode
        await waitFor(() => {
            const doneEditButton = screen.getByRole('button', { name: 'New' });
            return expect(doneEditButton).toBeVisible();
        });

        // Find and click the "New" button, then wait for new elements to appear
        const newButton = screen.getByRole('button', { name: 'New' });
        await act(async () => {
            fireEvent.click(newButton);
        });

        // Wait for new linkbudget edit mode
        await waitFor(() => {
            const newLinkBudgetTable = screen.getByRole('grid');
            return expect(newLinkBudgetTable).toBeInTheDocument();
        });

        const newLinkbudgetTitle = screen.getByText(/new_data_set/i);
        expect(newLinkbudgetTitle).toBeInTheDocument();

        // Get New Linkbudget Table
        const newLinkBudgetTable = await screen.findByRole('grid');
		
        const tableRows = within(newLinkBudgetTable).getAllByRole('row', {});
        expect(tableRows.length).toBeGreaterThan(0);

        const tableRow = tableRows[2];
        expect(within(tableRow).getAllByText(/New Group/i).length).toBe(1);
        
        // expect(within(linkBudgetTable).getAllByText(/New Group/i).length).toBe(1);
        // expect(within(linkBudgetTable).getAllByText(/New Name/i).length).toBe(1);
        // expect(within(linkBudgetTable).getAllByText(/New Title/i).length).toBe(1);
        // expect(within(linkBudgetTable).getAllByText(/=0/i).length).toBe(1);
        // expect(within(linkBudgetTable).getAllByText(/New Note/i).length).toBe(1);
    });
});