import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, getByTestId, getByRole, within, act } from '@testing-library/react';
import RfAttribute from "../implements/RfAttribute";
import RenderEbNo from '../implements/RenderEbNo';
import user from '@testing-library/user-event';
import { prettyDOM } from '@testing-library/react';
import exp from 'constants';
import EbNoModal from '../implements/EbNoModal';
import ModulationModal from '../implements/ModulationModal';
import CodingRateModal from '../implements/CodingRateModal';
import CodingAndModulation from '../implements/CodingAndModulation';
import EbNo from '../implements/EbNo';
import { MockcodingRateOptions, MockcodingTypeOptions, MockmodulationOptions, 
	MockebnoData, MockcodingRates, Mockmodulations } from '../assets/data';
import { waitForDebugger } from 'inspector';
import React from 'react';

describe('RfAttribute component', () => {

	it('Check if the component is rendered', async () => {
		const { getByRole, getByText, findAllByText } = render(<RenderEbNo />);
		const ebNoTable = getByText('Eb/No Table');
		expect(ebNoTable).toBeInTheDocument();

		// two BPSKs are present
		const BPSKs = await findAllByText(/BPSK/i);
		expect(BPSKs.length).toBe(2);

		// Click on the edit mode 
		const editModeButton = getByRole('checkbox')
		fireEvent.click(editModeButton);

		// Check new eb/no button visibility
		const newEbNoButton = getByRole('button', { name: /New Eb\/No/i });
		expect(newEbNoButton).toBeInTheDocument();
		expect(newEbNoButton).not.toBeDisabled();

		// Click on the Coding & Modulation Options tab
		const codingModulationTab = getByRole('tab', { name: /Coding & Modulation Options/i });
		fireEvent.click(codingModulationTab);

		// Check if the modulation table has UQPSK entry
		const UQPSK = await findAllByText(/UQPSK/i);
		expect(UQPSK.length).toBe(1);
		// Check if the coding table has Rate 5/6 entry
		const Rate56 = await findAllByText(/Rate 5\/6/i);
		expect(Rate56.length).toBe(1);
		// Check if the new modulation button is present
		const newModulationButton = getByRole('button', { name: /New Modulation/i });
		expect(newModulationButton).toBeInTheDocument();
		// Check if the new coding button is present
		const newCodingButton = getByRole('button', { name: /New Coding Rate/i });
		expect(newCodingButton).toBeInTheDocument();
	});
});

describe('Modulation Modal', () => {
	const mockHandleCreateModulation = jest.fn();
	beforeEach(async () => {
		await act(async () => {
			render(<ModulationModal
				open={true}
				onOpen={() => { }}
				modulations={Mockmodulations}
				handleCreateModulation={mockHandleCreateModulation}
			/>);
		});
	});

	it('Component should have one textbox', () => {
		const nameInput = screen.getByRole('textbox');
		expect(nameInput).toBeInTheDocument();
	});

	// Check creating a new modulation
	it('Check creating a new modulation', async () => {
		const newModulationName = 'Test';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newModulationName } });
		// click on the submit button
		const submitButton = screen.getByRole('button', { name: /OK/i });
		fireEvent.click(submitButton);
		await waitFor(() => {
			// Assertion to make sure 'HandleCreateModulation' is called
			expect(mockHandleCreateModulation).toHaveBeenCalledTimes(1);
			expect(mockHandleCreateModulation).toHaveBeenCalledWith({ name: newModulationName, submit: null });
		});
	});

	it('Check new modulation button with value name more than 10 characters', async () => {
		const newModulationName = 'TestTestTest';

		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newModulationName } });
		// click outside the input field
		fireEvent.blur(nameInput);

		await waitFor(() => {
			// should display error message
			const errorMessageTemp = screen.getByText(/name must be at most 10 characters/i);
			expect(errorMessageTemp).toBeInTheDocument();
		});
	});

	it('Check new modulation button with duplicate name', async () => {
		const newModulationName = 'BPSK';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newModulationName } });
		// click outside the input field
		fireEvent.blur(nameInput);

		await waitFor(() => {
			// should display error message
			const errorMessage = screen.getByText(/name already exists/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});

	it('Check new modulation button with empty value', async () => {
		const newModulationName = '';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newModulationName } });
		// click outside the input field
		fireEvent.blur(nameInput);
		await waitFor(() => {
			// should display error message
			const errorMessage = screen.getByText(/name is required/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});
});

describe('Coding Rate Modal', () => {
	const mockHandleCreateCodingRate = jest.fn();
	beforeEach(() => {
		render(<CodingRateModal
			open={true}
			onOpen={() => { }}
			codingRates={MockcodingRates}
			handleCreateCodingRate={mockHandleCreateCodingRate}
		/>);
	});

	it('Component should have one textbox', () => {
		const nameInput = screen.getByRole('textbox');
		expect(nameInput).toBeInTheDocument();
	});

	// Check creating a new coding rate
	it('Check creating a new coding rate', async () => {
		const newCodingRateName = 'Test';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newCodingRateName } });
		// click on the submit button
		const submitButton = screen.getByRole('button', { name: /OK/i });
		fireEvent.click(submitButton);
		await waitFor(() => {
			// Assertion to make sure 'HandleCreateCodingRate' is called
			expect(mockHandleCreateCodingRate).toHaveBeenCalledTimes(1);
			expect(mockHandleCreateCodingRate).toHaveBeenCalledWith({ name: newCodingRateName, submit: null });
		});
	});

	it('Check new coding rate button with value name more than 10 characters', async () => {
		const newCodingRateName = 'TestTestTest';

		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newCodingRateName } });
		// click outside the input field
		fireEvent.blur(nameInput);
		await waitFor(() => {
			// should display error message
			const errorMessageTemp = screen.getByText(/name must be at most 10 characters/i);
			expect(errorMessageTemp).toBeInTheDocument();
		});
	});

	it('Check new coding rate button with duplicate name', async () => {
		const newCodingRateName = 'Uncoded';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newCodingRateName } });
		// click outside the input field
		fireEvent.blur(nameInput);
		await waitFor(() => {
			// should display error message
			const errorMessage = screen.getByText(/name already exists/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});

	it('Check new coding rate button with empty value', async () => {
		const newCodingRateName = '';
		// get the name input field
		const nameInput = screen.getByRole('textbox');
		// enter the name
		fireEvent.change(nameInput, { target: { value: newCodingRateName } });
		// click outside the input field
		fireEvent.blur(nameInput);
		await waitFor(() => {
			// should display error message
			const errorMessage = screen.getByText(/name is required/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});
});

describe('CodingAndModulation component', () => {
	const mockHandleCreateModulation = jest.fn();
	const mockHandleCodingRemove = jest.fn();
	const mockHandleCodingRateUpdate = jest.fn();
	const mockHandleModulationRemove = jest.fn();
	const mockHandleModulationUpdate = jest.fn();
	
	beforeEach(() => {
		render(<CodingAndModulation
			editMode={true}
			codingRates={MockcodingRates}
			modulations={Mockmodulations}
			handleModulationUpdate={mockHandleModulationUpdate}
			handleCodingUpdate={mockHandleCodingRateUpdate}
			handleCodingRemove={mockHandleCodingRemove}
			handleModulationRemove={mockHandleModulationRemove}
			handleCreateCodingRate={() => { }}
			handleCreateModulation={mockHandleCreateModulation}
		/>);
	});

	it('Test render modulation data', async () => {
		// find all row in the modulation table
		const modulationRows = await within(await screen.findByTestId('modulationTable')).findAllByRole('row');
		expect(modulationRows.length).toBe(5);
	});

	it('Render modulation names', async () => {
		// find all row in the modulation table
		const modulationRows = await within(await screen.findByTestId('modulationTable')).findAllByRole('row');
		// get the second row
		const thirdRow = modulationRows[2];
		// the second row should contain the name 'BPSK'
		const BPSK = within(thirdRow).getByText('BPSK');
		expect(BPSK).toBeInTheDocument();
	});

	it('Test render coding rate data', async () => {
		await waitFor(async () => {
			// find all row in the modulation table
			const codingRateRows = await within(await screen.findByTestId('codingRateTable')).findAllByRole('row');
			expect(codingRateRows.length).toBe(5);
		});
	});

	it('Render coding rate names', async () => {
		await waitFor(async () => {
			// find all row in the modulation table
			const codingRateRows = await within(await screen.findByTestId('codingRateTable')).findAllByRole('row');
			// get the second row
			const secondRow = codingRateRows[2];
			// the second row should contain the name 'Rate 1/2'
			const rate12 = within(secondRow).getByText('Uncoded');
			expect(rate12).toBeInTheDocument();
		});
	});

	it('Delete a modulation entry', async () => {
		const modulationRows = await within(await screen.findByTestId('modulationTable')).findAllByRole('row');
		const deleteButton = within(modulationRows[2]).getByText(/Delete/i);
		fireEvent.click(deleteButton);
		// A confirm dialog should appear
		const confirmDialog = await screen.findByText(/Are you sure you want to delete this record?/i);
		expect(confirmDialog).toBeInTheDocument();
		// Click on the Yes button
		const yesButton = await screen.findByRole('button', { name: /Yes/i });
		expect(yesButton).toBeInTheDocument();
		fireEvent.click(yesButton);
		// The row should be deleted
		await waitFor(() => {
			expect(mockHandleModulationRemove).toHaveBeenCalledTimes(1);
		});
	});

	it('Delete a coding rate entry', async () => {
		const codingRateRows = await within(await screen.findByTestId('codingRateTable')).findAllByRole('row');
		const deleteButton = within(codingRateRows[2]).getByText(/Delete/i);
		fireEvent.click(deleteButton);
		// A confirm dialog should appear
		const confirmDialog = await screen.findByText(/Are you sure you want to delete this record?/i);
		expect(confirmDialog).toBeInTheDocument();
		// Click on the Yes button
		const yesButton = await screen.findByRole('button', { name: /Yes/i });
		expect(yesButton).toBeInTheDocument();
		fireEvent.click(yesButton);
		// The row should be deleted
		await waitFor(() => {
			expect(mockHandleCodingRemove).toHaveBeenCalledTimes(1);
		});
	});

	it('Update Modulation entry', async () => {
		
		// Wait for the DataGrid to finish loading
		await waitFor(async () => {
			return expect(await screen.findByTestId('modulationTable')).toBeInTheDocument();
		});

		const modulationTable = screen.getByTestId('modulationTable');
		const modulationRows = within(modulationTable).getAllByRole('row');
		const editButton = within(modulationRows[2]).getByText(/Edit/i);
		fireEvent.click(editButton);

		await waitFor(() => {
			const newModRows = within(screen.getByTestId('modulationTable')).getAllByRole('row');
			const valueInput = within(newModRows[2]).getAllByRole('textbox');
			return expect(valueInput.length).toBeGreaterThan(0);
		});

		const newModRows = within(screen.getByTestId('modulationTable')).getAllByRole('row');
		const valueInput = within(newModRows[2]).getByRole('textbox');
		fireEvent.change(valueInput, { target: { value: 'BPSK-TEST' } });

		// Simulate confirming the update action
		const saveButton = within(newModRows[2]).getByText(/Save/i);
		fireEvent.click(saveButton);
	
		await waitFor(() => {
			expect(mockHandleModulationUpdate).toHaveBeenCalledTimes(1);
		});
	});

	it('Update Coding Rate entry', async () => {

		// Wait for the DataGrid to finish loading
		await waitFor(async () => {
			return expect(await screen.findByTestId('codingRateTable')).toBeInTheDocument();
		});
		
		const codeRateTable = screen.getByTestId('codingRateTable');
		const codeRateRows = within(codeRateTable).getAllByRole('row');
		const editButton = within(codeRateRows[2]).getByText(/Edit/i);
		fireEvent.click(editButton);

		await waitFor(() => {
			const newCodeRateRows = within(screen.getByTestId('codingRateTable')).getAllByRole('row');
			const valueInput = within(newCodeRateRows[2]).getAllByRole('textbox');
			return expect(valueInput.length).toBeGreaterThan(0);
		});

		const newCodeRateRows = within(screen.getByTestId('codingRateTable')).getAllByRole('row');
		const valueInput = within(newCodeRateRows[2]).getByRole('textbox');
		fireEvent.change(valueInput, { target: { value: 'Uncoded-TEST' } });

		// Simulate confirming the update action
		const saveButton = within(newCodeRateRows[2]).getByText(/Save/i);
		fireEvent.click(saveButton);
	
		await waitFor(() => {
			expect(mockHandleCodingRateUpdate).toHaveBeenCalledTimes(1);
		});
	});
});

describe('EbNoModal component', () => {
	const mockHandleCreateEbNo = jest.fn();
	beforeEach(() => {

	});

	it('Component should have three dropdowns and one textbox', async () => {
		const { container } = render(<EbNoModal
			open={true}
			onOpen={() => { }}
			codingTypeOptions={MockcodingTypeOptions}
			codingRateOptions={MockcodingRateOptions}
			modulationOptions={MockmodulationOptions}
			handleCreateEbNo={mockHandleCreateEbNo}
		/>);
		const codingTypeDropdown = screen.getByRole('spinbutton');
		expect(codingTypeDropdown).toBeInTheDocument();

		// Coding Type dropdown box 
		const codingTypeDropdownBox = screen.getAllByRole('textbox', { hidden: true })
		expect(codingTypeDropdownBox.length).toBe(3);
	});
});

describe('EbNo component', () => {
	const mockHandleRemoveEbNo = jest.fn();
	const mockHandleUpdateEbNo = jest.fn();
	const mockHandleCreateEbNo = jest.fn();

	beforeEach(async () => {
		render(<EbNo
			ebnoData={MockebnoData}
			codingTypeOptions={MockcodingTypeOptions}
			codingRateOptions={MockcodingRateOptions}
			modulationOptions={MockmodulationOptions}
			handleCreateEbNo={mockHandleCreateEbNo}
			handleUpdateEbNo={mockHandleUpdateEbNo}
			handleRemoveEbNo={mockHandleRemoveEbNo}
			editMode={true}
		/>);

		// Wait for the DataGrid to finish loading
        await waitFor(() => {
            const ebNoTable = screen.queryByTestId('ebNoTable');
            return expect(ebNoTable).toBeInTheDocument();
        });
	});

	it('Check if the ebno table is rendered', async () => {
		const ebNoRows = await within(screen.getByTestId('ebNoTable')).findAllByRole('row');
		expect(ebNoRows.length).toBeGreaterThan(1);
	});

	it('Delete an ebno entry', async () => {
		const ebNoRows = await within(screen.getByTestId('ebNoTable')).findAllByRole('row');
		const deleteButton = within(ebNoRows[2]).getByText(/Delete/i);
		fireEvent.click(deleteButton);

		// A confirm dialog should appear
		const confirmDialog = await screen.findByText(/Are you sure you want to delete this record?/i);
		expect(confirmDialog).toBeInTheDocument();

		// Click on the Yes button
		const yesButton = await screen.findByRole('button', { name: /Yes/i });
		expect(yesButton).toBeInTheDocument();
		fireEvent.click(yesButton);

		// The row should be deleted
		await waitFor(() => {
			expect(mockHandleRemoveEbNo).toHaveBeenCalledTimes(1);
		});
	});

	// Not completed - Table did not updated
	it('Create new Eb/No entry ', async () => {

		const ebNoRows = await within(await screen.findByTestId('ebNoTable')).findAllByRole('row');
		expect(ebNoRows.length).toBeGreaterThan(1);

		const newEbNoButton = screen.getByRole('button', { name: /New Eb\/No/i });
		expect(newEbNoButton).toBeInTheDocument();

		// Simulate click new button
		fireEvent.click(newEbNoButton);

		// Check Dialog box appeared
		const dialogBoxElement = screen.getByRole('dialog');
		expect(dialogBoxElement).toBeVisible();

		// Check dialog box is correct or not
		expect(within(dialogBoxElement).getByText(/Coding Type/i)).toBeInTheDocument();
		expect(within(dialogBoxElement).getByText(/Modulation/i)).toBeInTheDocument();
		expect(within(dialogBoxElement).getByText(/Coding Rate/i)).toBeInTheDocument();
		expect(within(dialogBoxElement).getByText('Eb/No')).toBeInTheDocument();

		// Simulate change Coding Types Dropdown
		const codingTypeDropDown = screen.getByTestId('test_id_coding_type');
		const codingTypeButton = within(codingTypeDropDown).getByRole('button');
		expect(codingTypeButton).toBeInTheDocument();
		fireEvent.mouseDown(codingTypeButton);
		const codingTypeList = within(screen.getByRole('presentation')).getByRole('listbox');
		fireEvent.click(within(codingTypeList).getByText(/LDPC/i));
		expect(codingTypeButton).toHaveTextContent(/LDPC/i);

		// Simulate change modulation Dropdown
		const modulationDropDown = screen.getByTestId('test_id_modulation');
		const modulationButton = within(modulationDropDown).getByRole('button');
		expect(modulationButton).toBeInTheDocument();
		fireEvent.mouseDown(modulationButton);
		const modulationList = within(screen.getByRole('presentation')).getByRole('listbox');
		fireEvent.click(within(modulationList).getByText(/UQPSK/i));
		expect(modulationButton).toHaveTextContent(/UQPSK/i);

		// Simulate change Coding rates Dropdown
		const codingRateDropDown = screen.getByTestId('test_id_coding_rate');
		const codingRateButton = within(codingRateDropDown).getByRole('button');
		expect(codingRateButton).toBeInTheDocument();
		fireEvent.mouseDown(codingRateButton);
		const codingRateList = within(screen.getByRole('presentation')).getByRole('listbox');
		fireEvent.click(within(codingRateList).getByText(/Rate 5\/6/i));
		expect(codingRateButton).toHaveTextContent(/Rate 5\/6/i);

		// Simulate change Eb/No
		const ebnoInput = screen.getByTestId('test_id_ebno').querySelector('input') as HTMLInputElement;
		fireEvent.change(ebnoInput, {target: { value: '0.5'}});
		expect(ebnoInput.value).toBe('0.5');

		// Simulate click OK button
		const okButton = screen.getByTestId('test_id_ok');
		fireEvent.click(okButton);

		// Check table updated or not
		await waitFor(() => {
			expect(mockHandleCreateEbNo).toHaveBeenCalledTimes(1);
		});
	});

	it('Update existing Eb/No entry', async () => {
		
		// Find the rows in the DataGrid
		const ebNoRows = await within(screen.getByTestId('ebNoTable')).findAllByRole('row');
		const updateRow = ebNoRows[2];

		const editButton = within(updateRow).getByText(/Edit/i);
		fireEvent.click(editButton);
		
		await waitFor(() => {
			const newEbNoRows = within(screen.getByTestId('ebNoTable')).getAllByRole('row');
			const valueInput = within(newEbNoRows[2]).getAllByRole('textbox');
			return expect(valueInput.length).toBeGreaterThan(0);
		});
	
		// Simulate changing the value of the textbox
		const newEbNoRows = within(screen.getByTestId('ebNoTable')).getAllByRole('row');
		const valueInput = within(newEbNoRows[2]).getByRole('textbox');
		fireEvent.change(valueInput, { target: { value: '10' } });
	
		// Simulate confirming the update action
		const saveButton = within(newEbNoRows[2]).getByText(/Save/i);
		fireEvent.click(saveButton);
	
		await waitFor(() => {
			expect(mockHandleUpdateEbNo).toHaveBeenCalledTimes(1);
		});
	});
});
