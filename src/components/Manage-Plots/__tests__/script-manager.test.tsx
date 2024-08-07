// script-manager.test.tsx

export { };
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import ScriptManager from "../implements/ScriptManager";

// Mocking sampleData and templateScriptData for testing purposes
jest.mock('../assets/data', () => ({
    sampleData: [
        { id: 1, name: 'Script-1', ext: '.js', script: 'console.log("Script 1")' },
        { id: 2, name: 'Script-2', ext: '.py', script: 'print("Script 2")' }
    ],
    templateScriptData: [
        { ext: '.js', script: 'console.log("Template JS")' },
        { ext: '.py', script: 'print("Template Python")' }
    ]
}));

describe('ScriptManager Component', () => {

    beforeEach(() => {
        // Render Component
        render(<ScriptManager />);
    });

    it('renders ScriptManager component correctly', () => {
        // Check if Script-1.js is rendered
        const menuScript1 = screen.getByText(/Script-1.js/i);
        expect(menuScript1).toBeInTheDocument();
    
        // Check if the Create New button is present
        const btnCreateNew = screen.getByText(/Create New/i);
        expect(btnCreateNew).toBeInTheDocument();
    
        // Check if the Save Changes button is present
        const btnSaveChanges = screen.getByText(/Save Changes/i);
        expect(btnSaveChanges).toBeInTheDocument();

        // Check if the Delete Script button is present
        const btnDelete = screen.getByText(/Delete Script/i);
        expect(btnDelete).toBeInTheDocument();
    });

    it('ensures that the selection between files displays the corresponding scripts', async () => {
        // Click on the menu item for Script-1.js
        const menuScript1 = screen.getByText(/Script-1.js/i);
        fireEvent.click(menuScript1);
    
        // Wait for the script editor to display the content of Script-1.js
        await waitFor(() => {
            const elementScript1 = screen.getByText('console.log("Script 1")');
            expect(elementScript1).toBeInTheDocument();
        });
    
        // Click on the menu item for Script-2.py
        const menuScript2 = screen.getByText(/Script-2.py/i);
        fireEvent.click(menuScript2);
    
        // Wait for the script editor to display the content of Script-2.py
        await waitFor(() => {
            const elementScript2 = screen.getByText('print("Script 2")');
            expect(elementScript2).toBeInTheDocument();
        });
    });

    it('creates a new script correctly', async () => {
        // Click on the "Create New" button
        const createNewButton = screen.getByText(/Create New/i);
        fireEvent.click(createNewButton);
    
        // Wait for the new script dialog to appear
        await waitFor(() => {
            const newScriptDialog = screen.getByText(/Create a script/i);
            expect(newScriptDialog).toBeInTheDocument();
        });
    
        // Get the script name input element
        const scriptNameInput = screen.getByPlaceholderText(/Please add Script Name/i);
        expect(scriptNameInput).toBeInTheDocument();
    
        // Enter the script name
        fireEvent.change(scriptNameInput, { target: { value: 'NewScript' }});
    
        // Click the "Ok" button
        const okButton = screen.getByText(/Ok/i);
        fireEvent.click(okButton);
    
        // Wait for the new scripts to appear
        await waitFor(() => {
            const newScriptElements = screen.getAllByText(/NewScript.js/i);
            expect(newScriptElements.length).toBe(2);
        });
    });

    it('updates the script correctly', async () => {
        // Click on the first script menu item
        const menuItemScript1 = screen.getByText(/Script-1.js/i);
        fireEvent.click(menuItemScript1);

        // Wait for the script editor to be available
        const scriptEditor = await screen.findByPlaceholderText('Please enter .js code.');
        expect(scriptEditor).toBeInTheDocument();

        // Update the script content
        fireEvent.change(scriptEditor, { target: { value: 'console.log("Script Update")' } });

        // Click the Save Changes button
        const btnSave = screen.getByText(/Save Changes/i);
        fireEvent.click(btnSave);

        // Click on the second script menu item
        const menuItemScript2 = screen.getByText(/Script-2.py/i);
        fireEvent.click(menuItemScript2);

        // Click again on the first script menu item
        fireEvent.click(menuItemScript1);

        // Wait for the updated script content to appear
        const elementScriptUpdate = await screen.findByText('console.log("Script Update")');
        expect(elementScriptUpdate).toBeInTheDocument();
    });

    it('delete script button works correctly', async () => {
        // Click on the second script menu item
        const menuItemScript2 = screen.getByText(/Script-2.py/i);
        fireEvent.click(menuItemScript2);
    
        const btnDelete = screen.getByText(/Delete Script/i);
        fireEvent.click(btnDelete);
    
        // Confirm dialog should appear
        const confirmDialog = await screen.findByText(/Confirm/i);
        expect(confirmDialog).toBeInTheDocument();
    
        // Click OK to confirm deletion
        const btnOk = screen.getByText(/Ok/i);
        fireEvent.click(btnOk);
    
        // Wait for confirm dialog to disappear
        await waitFor(() => {
            expect(confirmDialog).not.toBeInTheDocument();
    
            // Ensure that the script item is removed from the menu
            expect(menuItemScript2).not.toBeInTheDocument();
            // Ensure that the script content is removed from the screen
            expect(screen.queryByText('print("Script 2")')).not.toBeInTheDocument();
        });
    });

    it('Ensure the changes without saving should not be saved', async () => {
        // Click on the second script menu item
        const menuItemScript2 = screen.getByText(/Script-2.py/i);
        fireEvent.click(menuItemScript2);
    
        // Wait for the script editor to be available
        const scriptEditor = await screen.findByPlaceholderText('Please enter .py code.');
        expect(scriptEditor).toBeInTheDocument();
    
        // Update the script content
        fireEvent.change(scriptEditor, { target: { value: 'print("Script Updated")' } });
    
        // Close the script tab
        const btnClose = screen.getByRole('button', { name: /Close Script-2.py tab/i });
        fireEvent.click(btnClose);
    
        // Wait for the confirmation dialog to appear
        const confirmDialog = await screen.findByText(/Changes have been made to this file. Close without saving/i);
        expect(confirmDialog).toBeInTheDocument();
    
        // Click OK to confirm deletion
        const btnOk = screen.getByText(/Ok/i);
        fireEvent.click(btnOk);
    
        // Wait for confirm dialog and tab to disappear
        await waitFor(() => {
            expect(confirmDialog).not.toBeInTheDocument();
        });

        await waitFor(() => {
            const btnCloseAgain = screen.queryByRole('button', { name: /Close Script-2.py tab/i });
            expect(btnCloseAgain).not.toBeInTheDocument();
        });
    
        // Click on the script menu item again
        fireEvent.click(menuItemScript2);
    
        // Ensure that the updated script content is not present
        await waitFor(() => {
            const scriptElement = screen.queryByText('print("Script Updated")');
            expect(scriptElement).not.toBeInTheDocument();
        });
    });

    it('Ensure the script name does not contain special characters', async () => {
        // Click on the "Create New" button
        const createNewButton = screen.getByText(/Create New/i);
        fireEvent.click(createNewButton);
    
        // Wait for the new script dialog to appear
        await waitFor(() => {
            const newScriptDialog = screen.getByText(/Create a script/i);
            expect(newScriptDialog).toBeInTheDocument();
        });
    
        // Get the script name input element
        const scriptNameInput = screen.getByPlaceholderText(/Please add Script Name/i) as HTMLInputElement;
        expect(scriptNameInput).toBeInTheDocument();
    
        // Enter the script name with special characters
        fireEvent.change(scriptNameInput, { target: { value: 'New@Script' } });
    
        // Verify that the special characters are removed
        expect(scriptNameInput.value).toBe('');

        const specialCharaters = '~!@#$%^&*()';
        for (let i = 0; i < specialCharaters.length; i++) {
            fireEvent.keyPress(scriptNameInput, { key: specialCharaters[i] });
        }
        expect(scriptNameInput.value).toBe('');
    });

    it('Ensure the script name cannot be empty', async () => {
        // Click on the "Create New" button
        const createNewButton = screen.getByText(/Create New/i);
        fireEvent.click(createNewButton);
    
        // Wait for the new script dialog to appear
        await waitFor(() => {
            const newScriptDialog = screen.getByText(/Create a script/i);
            expect(newScriptDialog).toBeInTheDocument();
        });
    
        // Get the script name input element
        const scriptNameInput = screen.getByPlaceholderText(/Please add Script Name/i);
        expect(scriptNameInput).toBeInTheDocument();
    
        // Simulate change event with empty value
        fireEvent.change(scriptNameInput, { target: { value: '' } });
    
        // Check if the Ok button is disabled
        const okButton = screen.queryByRole('button', { name: /Button Ok/i });
        expect(okButton).toBeDisabled();
    });

    it('Ensure script download works (right-click script and select "download")', async () => {

        const mockCreateObjectURL = jest.fn();
        const mockRevokeObjectURL = jest.fn();
        URL.createObjectURL = mockCreateObjectURL;
        URL.revokeObjectURL = mockRevokeObjectURL;
        const fileContent = 'console.log("Script 1")';

        const menuItemScript1 = screen.getByText(/Script-1.js/i);
        fireEvent.contextMenu(menuItemScript1);

        // Wait for the context menu to appear
        await waitFor(() => {
            const menu = screen.getByRole('menu');
            expect(menu).toBeVisible();

            return expect(within(menu).getByText(/Download/i)).toBeInTheDocument();
        });

        const downloadItem = within(screen.getByRole('menu')).getByText(/Download/i);

        fireEvent.click(downloadItem);

        // Wait for the file to be downloaded
        await waitFor(() => {
            // Check that URL.createObjectURL was called with the correct content
            expect(mockCreateObjectURL).toHaveBeenCalledWith(new Blob([fileContent], { type: 'text/plain' }));
        });
    });

    // it('File upload works (right-click script and select "Upload Custom Script")', async () => {

    //     const menuItemScript2 = screen.getByText(/Script-2.py/i);
    //     fireEvent.contextMenu(menuItemScript2);

    //     // Wait for the context menu to appear
    //     await waitFor(() => {
    //         const menu = screen.getByRole('menu');
    //         expect(menu).toBeVisible();

    //         return expect(within(menu).getByText(/Upload Custom Script/i)).toBeInTheDocument();
    //     });
    // });
});