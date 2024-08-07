import React from "react";
import {
  comparisonData,
  comparisonData1,
  defaultComparisonInputsEqual,
  defaultComparisonSortingOptions,
  groupsDefinition,
  rowsDefinition,
} from "src/stories/ComparisonTable/sampleData/comparison-table-data";
import ComparisonTable from "../implementation/ComparisonTable";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * Function to select an option from the menu
 * @param option - the option to select
 */
const selectOption = (option: string): HTMLCollection => {
  // get the h3 element has text "Compare"
  const compareTitle = screen.getByRole("heading", { name: "Compare" });
  const menuButton = compareTitle.nextSibling as HTMLElement;
  // click on the menu button
  fireEvent.click(menuButton);
  // get the menu
  const menu = screen.getByRole("menu");
  // get the menu items
  const menuItems = menu.children;
  // Filter the menuItems that has text "Toggle Compression"
  const optionItem = Array.from(menuItems).filter(
    (menuItem) => menuItem.textContent === option
  )[0];
  // optionItem should be in the document
  expect(optionItem).toBeInTheDocument();
  // click on the  menu item
  fireEvent.click(optionItem);
  return menuItems;
};

/**
 * Get all columns
 * @param titleColumn
 */
const getAllColumns = (): HTMLCollection => {
  // get the h3 element has text "Compare"
  const compareTitle = screen.getByRole("heading", { name: "Compare" });
  // get the parent of the compareTitle
  const gridContainers = compareTitle.parentElement?.parentElement
    ?.parentElement as Element;
  // get child of gridContainers
  const gridContainerChildren = gridContainers.children;

  return gridContainerChildren;
};

const checkTitleColumn = (titleColumn: Element) => {
  // get children of title column
  const children = titleColumn.children;
  // expect the first child to contain text "Parameters"
  expect(children[0].children[0]).toHaveTextContent("Parameters");
  // epext the second child to contain text "Altitude (km)"
  expect(children[0].children[1]).toHaveTextContent("Altitude (km)");
  // expect the third child to contain text "Inclination (deg)"
  expect(children[0].children[2]).toHaveTextContent("Inclination (deg)");
  // expect the fourth child to contain text "Performance"
  expect(children[1].children[0]).toHaveTextContent("Performance");
  // expect the fifth child to contain text "Mean Contacts per Day"
  expect(children[1].children[1]).toHaveTextContent("Mean Contacts per Day");
  // expect the sixth child to contain text "RF Coverage (min/day)"
  expect(children[1].children[2]).toHaveTextContent("RF Coverage (min/day)");
  // expect the seventh child to contain text "Antenna Options (User Burden)"
  expect(children[2].children[0]).toHaveTextContent("Antenna Options (User Burden)");
  // expect the eighth child to contain text "EIRP (dbw)"
  expect(children[2].children[1]).toHaveTextContent("EIRP (dbw)");
};

// # Standard
// - Empty data set displays only title column
it("Empty Data set Display only title column", () => {
  const mockOnpin = jest.fn();
  const mockOnRemovePin = jest.fn();
  const mockInputsAreEqual = jest.fn();
  const mockSortingOptions = [
    {
      sortName: "mockSort",
      compare: jest.fn(),
    },
  ];
  const mockOnOpenCustomRanking = jest.fn();
  const mockOnOpenViewRankScripts = jest.fn();

  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={[]}
      onPin={mockOnpin}
      onRemovePin={mockOnRemovePin}
      inputsAreEqual={mockInputsAreEqual}
      sortingOptions={mockSortingOptions}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={mockOnOpenCustomRanking}
      onOpenViewRankScripts={mockOnOpenViewRankScripts}
    />
  );

  // get the h3 element has text "Compare"
  const compareTitle = screen.getByRole("heading", { name: "Compare" });
  expect(compareTitle).toBeInTheDocument();
  // get the title column
  const titleColumn = getTitleColumnRows(screen);
  // check the title column
  checkTitleColumn(titleColumn);

  // get the parent of the compareTitle
  const gridContainers = compareTitle.parentElement?.parentElement
    ?.parentElement as Element;
  // get child of gridContainers
  const gridContainerChildren = gridContainers.children;
  // expect gridContainerChildren to have length 1
  expect(gridContainerChildren).toHaveLength(1);
});


function getTitleColumnRows(screenObj: typeof screen) {
  return screenObj.getByTestId('comparison-title-children');
}

// - Data set of size 1 displays title column and single data column
// - The title column lists all groups with the group name as the top row, followed by the items in the group as determined by the row definition
it("Data set of size 1 displays title column and single data column & // - The title column lists all groups with the group name as the top row, followed by the items in the group as determined by the row definition", () => {
  const mockOnpin = jest.fn();
  const mockOnRemovePin = jest.fn();
  const mockInputsAreEqual = jest.fn();
  const mockSortingOptions = [
    {
      sortName: "mockSort",
      compare: jest.fn(),
    },
  ];
  const mockOnOpenCustomRanking = jest.fn();
  const mockOnOpenViewRankScripts = jest.fn();

  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={comparisonData1}
      onPin={mockOnpin}
      onRemovePin={mockOnRemovePin}
      inputsAreEqual={mockInputsAreEqual}
      sortingOptions={mockSortingOptions}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={mockOnOpenCustomRanking}
      onOpenViewRankScripts={mockOnOpenViewRankScripts}
    />
  );

  // get the h3 element has text "Compare"
  const compareTitle = screen.getByRole("heading", { name: "Compare" });
  expect(compareTitle).toBeInTheDocument();
  // get the title column
  const titleColumn = getTitleColumnRows(screen);
  // check the title column
  checkTitleColumn(titleColumn);
  // get the parent of the compareTitle
  const gridContainers = compareTitle.parentElement?.parentElement
    ?.parentElement as Element;
  // get child of gridContainers
  const gridContainerChildren = gridContainers.children;
  // expect gridContainerChildren to have length 2
  expect(gridContainerChildren).toHaveLength(2);

  // get the second child of gridContainerChildren
  const dataColumn = gridContainerChildren[1];
  // get the children of dataColumn
  const dataColumnChildren = dataColumn.children;
  // expect dataColumnChildren[0] to have text "Oregon"
  expect(dataColumnChildren[0]).toHaveTextContent("Oregon");
  // expect dataColumnChildren[1] to have Input text
  expect(dataColumnChildren[1]).toHaveTextContent("Input");
  // expect dataColumnChildren[2] to have Output text
  expect(dataColumnChildren[2]).toHaveTextContent("Output");
  // expect dataColumnChildren[3] to have text "300" Altitude Input column
  expect(dataColumnChildren[3]).toHaveTextContent("300");
  // expect dataColumnChildren[4] to have text "300" Altitude Output column
  expect(dataColumnChildren[4]).toHaveTextContent("300");
  // expect dataColumnChildren[5] to have text "30" Inclination Input column
  expect(dataColumnChildren[5]).toHaveTextContent("30");
  // expect dataColumnChildren[6] to have text "30" Inclination Output column
  expect(dataColumnChildren[6]).toHaveTextContent("30");
  // expect dataColumnChildren[7] to have empty text in Input column
  expect(dataColumnChildren[7]).toHaveTextContent("");
  // expect dataColumnChildren[8] to have empty text in Output column\
  expect(dataColumnChildren[8]).toHaveTextContent("");
  // expect dataColumnChildren[9] to have text "---" Mean Contacts per Day Input column
  expect(dataColumnChildren[9]).toHaveTextContent("---");
  // expect dataColumnChildren[10] to have text "11" Mean Contacts per Day Output column
  expect(dataColumnChildren[10]).toHaveTextContent("11");
  // expect dataColumnChildren[11] to have text "---" RF Coverage (min/day) Input column
  expect(dataColumnChildren[11]).toHaveTextContent("---");
  // expect dataColumnChildren[12] to have text "230" RF Coverage (min/day) Output column
  expect(dataColumnChildren[12]).toHaveTextContent("230");
  // expect dataColumnChildren[13] to have empty text in Input column
  expect(dataColumnChildren[13]).toHaveTextContent("");
  // expect dataColumnChildren[14] to have empty text in Output column
  expect(dataColumnChildren[14]).toHaveTextContent("");
  // expect dataColumnChildren[13] to have text "---" EIRP (dbw) Input column
  expect(dataColumnChildren[15]).toHaveTextContent("---");
  // expect dataColumnChildren[14] to have text "1.5" EIRP (dbw) Output column
  expect(dataColumnChildren[16]).toHaveTextContent("1.5");
});

describe("ComparisonTable with dataitems", () => {
  let mockOnpin = jest.fn();
  let mockOnRemovePin = jest.fn();
  let mockSortingOptions = [
    {
      sortName: "mockSort",
      compare: jest.fn(),
    },
  ];
  let mockOnOpenCustomRanking = jest.fn();
  let mockOnOpenViewRankScripts = jest.fn();
  let allColumns: HTMLCollection;
  let menuButton: HTMLElement;
  beforeEach(() => {
    mockOnpin = jest.fn();
    mockOnRemovePin = jest.fn();
    mockSortingOptions = [
      {
        sortName: "mockSort",
        compare: jest.fn(),
      },
    ];
    mockOnOpenCustomRanking = jest.fn();
    mockOnOpenViewRankScripts = jest.fn();

    render(
      <ComparisonTable
        rowsDefinition={rowsDefinition}
        groupsDefinition={groupsDefinition}
        data={comparisonData}
        onPin={mockOnpin}
        onRemovePin={mockOnRemovePin}
        inputsAreEqual={defaultComparisonInputsEqual}
        sortingOptions={mockSortingOptions}
        noInputValuePlaceholder={undefined}
        onOpenCustomRanking={mockOnOpenCustomRanking}
        onOpenViewRankScripts={mockOnOpenViewRankScripts}
      />
    );

    // get the h3 element has text "Compare"
    const compareTitle = screen.getByRole("heading", { name: "Compare" });
    menuButton = compareTitle.nextSibling as HTMLElement;
    // get the parent of the compareTitle
    allColumns = getAllColumns();
  });

  // - An unpinned data column has a "pin" icon next to the column title
  it('An unpinned data column has a "pin" icon next to the column title', () => {
    // get the Oregon data column
    const dataColumnOregon = allColumns[1];
    // get the children of dataColumnOregon
    const dataColumnOregonChildren = dataColumnOregon.children;
    // expect dataColumnOregonChildren[0] to have text "Oregon"
    expect(dataColumnOregonChildren[0]).toHaveTextContent("Oregon");
    // find element that has data-testid "PushPinIcon" within dataColumnOregonChildren
    const pinIcon = within(
      dataColumnOregonChildren[0] as HTMLElement
    ).getByTestId("PushPinIcon");
    // expect pinIcon to be in the document
    expect(pinIcon).toBeInTheDocument();
  });
  // - A pinned data column as a "unpin" icon next to the column title
  it('A pinned data column as a "unpin" icon next to the column title', () => {
    // get the Ohio_0 data column
    const dataColumnOhio = allColumns[2];
    // get the children of dataColumnOhio
    const dataColumnOhioChildren = dataColumnOhio.children;
    // expect dataColumnOhioChildren[0] to have text "Ohio_0"
    expect(dataColumnOhioChildren[0]).toHaveTextContent("Ohio_0");
    // find element that has data-testid "PushPinIcon" within dataColumnOhioChildren
    const unpinIcon = within(
      dataColumnOhioChildren[0] as HTMLElement
    ).getByTestId("DeleteIcon");
    // expect unpinIcon to be in the document
    expect(unpinIcon).toBeInTheDocument();
  });
  // - Clicking the "pin" icon on a data column calls the "onPin" prop
  it('Clicking the "pin" icon on a data column calls the "onPin" prop', () => {
    // get the Oregon data column
    const dataColumnOregon = allColumns[1];
    // get the children of dataColumnOregon
    const dataColumnOregonChildren = dataColumnOregon.children;
    // find element that has data-testid "PushPinIcon" within dataColumnOregonChildren
    const pinIcon = within(
      dataColumnOregonChildren[0] as HTMLElement
    ).getByTestId("PushPinIcon");
    // click on the pinIcon
    fireEvent.click(pinIcon);
    // expect mockOnpin to be called
    expect(mockOnpin).toHaveBeenCalled();
  });
  // - Clicking the "unpin" icon calls the "onRemovePin" prop
  it('Clicking the "unpin" icon calls the "onRemovePin" prop', () => {
    // get the Ohio_0 data column
    const dataColumnOhio = allColumns[2];
    // get the children of dataColumnOhio
    const dataColumnOhioChildren = dataColumnOhio.children;
    // find element that has data-testid "PushPinIcon" within dataColumnOhioChildren
    const unpinIcon = within(
      dataColumnOhioChildren[0] as HTMLElement
    ).getByTestId("DeleteIcon");
    // click on the unpinIcon
    fireEvent.click(unpinIcon);
    // expect mockOnRemovePin to be called
    expect(mockOnRemovePin).toHaveBeenCalled();
  });

  // # Compressing
  // - Clicking the menu button opens the menu
  it("Clicking the menu button opens the menu", () => {
    // click on the menu button
    fireEvent.click(menuButton);
    // get the menu
    const menu = screen.getByRole("menu");
    // expect menu to be in the document
    expect(menu).toBeInTheDocument();
    // get the menu items
    const menuItems = menu.children;
    // expect menuItems to have length 4
    expect(menuItems).toHaveLength(4);
    // expect menuItems[0] to have text "Rank By >"
    expect(menuItems[0]).toHaveTextContent("Rank By >");
    // expect menuItems[1] to have text "Custom Ranking"
    expect(menuItems[1]).toHaveTextContent("Custom Ranking");
    // expect menuItems[2] to have text "View Rank Scripts"
    expect(menuItems[2]).toHaveTextContent("View Rank Scripts");
    // expect menuItems[3] to have text "Toggle Compression"
    expect(menuItems[3]).toHaveTextContent("Toggle Compression");
  });
  // - Compressing table causes data column n to hide input if column n-1 has the same input where n=1
  it("Compressing table causes data column n to hide input if column n-1 has the same input where n=1", () => {
    selectOption("Toggle Compression");
    // get the ohio_0 data column
    const dataColumnOhio = allColumns[2];
    // get the children of dataColumnOhio
    const dataColumnOhioChildren = dataColumnOhio.children;
    // expect dataColumnOhioChildren[1] to have text "Output"
    expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");
  });
});

// - Selecting "compress table" in the menu calls the "inputsAreEqual" function when the data set is at least length 2
it('Selecting "compress table" in the menu calls the "inputsAreEqual" function when the data set is at least length 2', () => {
  const mockInputsAreEqual = jest.fn();
  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={comparisonData}
      onPin={jest.fn()}
      onRemovePin={jest.fn()}
      inputsAreEqual={mockInputsAreEqual}
      sortingOptions={[]}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={jest.fn()}
      onOpenViewRankScripts={jest.fn()}
    />
  );

  selectOption("Toggle Compression");
  // expect mockInputsAreEqual to be called
  expect(mockInputsAreEqual).toHaveBeenCalled();
});
// - Compressing table causes data column n to hide input if column n-1 has the same input where n=3
it("Compressing table causes data column n to hide input if column n-1 has the same input where n=3", () => {
  // move Lebron_J to the first index of comparisonData
  const updatedComparisonData = [
    comparisonData[comparisonData.length - 1],
    ...comparisonData.slice(0, comparisonData.length - 1),
  ];
  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={updatedComparisonData}
      onPin={jest.fn()}
      onRemovePin={jest.fn()}
      inputsAreEqual={defaultComparisonInputsEqual}
      sortingOptions={[]}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={jest.fn()}
      onOpenViewRankScripts={jest.fn()}
    />
  );

  selectOption("Toggle Compression");
  // get all columns
  const allColumns = getAllColumns();
  // get ohio_0 data column
  const dataColumnOhio = allColumns[2];
  // get the children of dataColumnOhio
  const dataColumnOhioChildren = dataColumnOhio.children;
  // expect dataColumnOhioChildren[1] to have text "Output";
  expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");
  // expect dataColumnOhioChildren[2] to have text "300";
  expect(dataColumnOhioChildren[3]).toHaveTextContent("300");
});
// - Compressing table does not cause data column n to hide if column n-1 has different input where n=1
it("Compressing table does not cause data column n to hide if column n-1 has different input where n=1", () => {
  // move lerbron_J to the second index of comparisonData
  const updatedComparisonData = [
    comparisonData[0],
    comparisonData[comparisonData.length - 1],
    ...comparisonData.slice(1, comparisonData.length - 1),
  ];
  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={updatedComparisonData}
      onPin={jest.fn()}
      onRemovePin={jest.fn()}
      inputsAreEqual={defaultComparisonInputsEqual}
      sortingOptions={[]}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={jest.fn()}
      onOpenViewRankScripts={jest.fn()}
    />
  );
  selectOption("Toggle Compression");
  // get all columns
  const allColumns = getAllColumns();
  // get ohio_0 data column
  const dataColumnOhio = allColumns[2];
  // get the children of dataColumnOhio
  const dataColumnOhioChildren = dataColumnOhio.children;
  // expect dataColumnOhioChildren[1] to have text "Input";
  expect(dataColumnOhioChildren[1]).toHaveTextContent("Input");
  // expect dataColumnOhioChildren[2] to have text "Output";
  expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");
});
// - Compressing table does not cause data column n to hide if column n-1 has different input where n=2
it("Compressing table does not cause data column n to hide if column n-1 has different input where n=2", () => {
  // move lerbron_J to the second index of comparisonData
  const updatedComparisonData = [
    comparisonData[0],
    comparisonData[comparisonData.length - 1],
    ...comparisonData.slice(1, comparisonData.length - 1),
  ];
  render(
    <ComparisonTable
      rowsDefinition={rowsDefinition}
      groupsDefinition={groupsDefinition}
      data={updatedComparisonData}
      onPin={jest.fn()}
      onRemovePin={jest.fn()}
      inputsAreEqual={defaultComparisonInputsEqual}
      sortingOptions={[]}
      noInputValuePlaceholder={undefined}
      onOpenCustomRanking={jest.fn()}
      onOpenViewRankScripts={jest.fn()}
    />
  );

  selectOption("Toggle Compression");
  // get all columns
  const allColumns = getAllColumns();
  // get ohio_0 data column
  const dataColumnOhio = allColumns[2];
  // get the children of dataColumnOhio
  const dataColumnOhioChildren = dataColumnOhio.children;
  // expect dataColumnOhioChildren[1] to have text "Input";
  expect(dataColumnOhioChildren[1]).toHaveTextContent("Input");
  // expect dataColumnOhioChildren[2] to have text "Output";
  expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");
});
describe("Sorting", () => {
  // # Sorting
  let allColumns: HTMLCollection;
  const mockOnOpenCustomRanking = jest.fn();
  const mockOnOpenViewRankScripts = jest.fn();
  beforeEach(() => {
    render(
      <ComparisonTable
        rowsDefinition={rowsDefinition}
        groupsDefinition={groupsDefinition}
        data={comparisonData}
        onPin={jest.fn()}
        onRemovePin={jest.fn()}
        inputsAreEqual={defaultComparisonInputsEqual}
        sortingOptions={defaultComparisonSortingOptions}
        noInputValuePlaceholder={"missing"}
        onOpenCustomRanking={mockOnOpenCustomRanking}
        onOpenViewRankScripts={mockOnOpenViewRankScripts}
      />
    );
    allColumns = getAllColumns();
  });
  // - By default data columns are ordered in the same way as they are passed in through props
  it("By default data columns are ordered in the same way as they are passed in through props", () => {
    // get the first data column
    const dataColumn1 = allColumns[1];
    // get the children of dataColumn1
    const dataColumn1Children = dataColumn1.children;
    // expect dataColumn1Children[0] to have text "Oregon"
    expect(dataColumn1Children[0]).toHaveTextContent("Oregon");
    // get the second data column
    const dataColumn2 = allColumns[2];
    // get the children of dataColumn2
    const dataColumn2Children = dataColumn2.children;
    // expect dataColumn2Children[0] to have text "Ohio_0"
    expect(dataColumn2Children[0]).toHaveTextContent("Ohio_0");
    // get the third data column
    const dataColumn3 = allColumns[3];
    // get the children of dataColumn3
    const dataColumn3Children = dataColumn3.children;
    // expect dataColumn3Children[0] to have text "Lebron_J"
    expect(dataColumn3Children[0]).toHaveTextContent("Lebron_J");
  });
  // - Providing a list to the "sortingOptions" prop has all values display in the "Rank by" submenu
  it('Providing a list to the "sortingOptions" prop has all values display in the "Rank by" submenu', () => {
    selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // expect menuItems[0] to have text "Best Coverage"
    expect(menuItems[0]).toHaveTextContent("Best Coverage");
    // expect menuItems[1] to have text "Highest Mean Contacts"
    expect(menuItems[1]).toHaveTextContent("Highest Mean Contacts");
  });

  // - Selecting a sorting option will call the paired sorting function for each render while selected
  // - After having a sort selected, switching to another sort causes thew new sorting function to be called for each following render
  it("Selecting a sorting option will call the paired sorting function for each render while selected ", () => {
    const mainMenuItems: HTMLCollection = selectOption("Rank By >");
    const menuParent = screen.getByRole("menu");
    // get the menu items
    const menuItems = menuParent.children;
    // click on the "Best Coverage" menu item
    fireEvent.click(menuItems[0]);
    // click somewhere else to close the menu
    // fireEvent.click(document.body);
    // get the first data column
    const dataColumn1 = allColumns[1];
    // get the children of dataColumn1
    const dataColumn1Children = dataColumn1.children;
    // expect dataColumn1Children[0] to have text "Oregon"
    expect(dataColumn1Children[0]).toHaveTextContent("Oregon");
    // get the second data column
    const dataColumn2 = allColumns[2];
    // get the children of dataColumn2
    const dataColumn2Children = dataColumn2.children;
    // expect dataColumn2Children[0] to have text "Lebron_J"
    expect(dataColumn2Children[0]).toHaveTextContent("Lebron_J");
    // get the third data column
    const dataColumn3 = allColumns[3];
    // get the children of dataColumn3
    const dataColumn3Children = dataColumn3.children;
    // expect dataColumn3Children[0] to have text "Ohio_0"
    expect(dataColumn3Children[0]).toHaveTextContent("Ohio_0");

    // After having a sort selected, switching to another sort causes thew new sorting function to be called for each following render
    const rankByOption = Array.from(mainMenuItems).filter(
      (menuItem) => menuItem.textContent === "Rank By >"
    )[0];
    // click on the "Rank By" menu item
    fireEvent.click(rankByOption);
    // click on the "Highest Mean Contacts" menu item
    fireEvent.click(menuItems[1]);
    // get the first data column
    const dataColumn1Updated = allColumns[1];
    // get the children of dataColumn1
    const dataColumn1UpdatedChildren = dataColumn1Updated.children;
    // expect dataColumn1UpdatedChildren[0] to have text "Lebron_J"
    expect(dataColumn1UpdatedChildren[0]).toHaveTextContent("Lebron_J");
    // get the second data column
    const dataColumn2Updated = allColumns[2];
    // get the children of dataColumn2
    const dataColumn2UpdatedChildren = dataColumn2Updated.children;
    // expect dataColumn2UpdatedChildren[0] to have text "Oregon"
    expect(dataColumn2UpdatedChildren[0]).toHaveTextContent("Oregon");
    // get the third data column
    const dataColumn3Updated = allColumns[3];
    // get the children of dataColumn3
    const dataColumn3UpdatedChildren = dataColumn3Updated.children;
    // expect dataColumn3UpdatedChildren[0] to have text "Ohio_0"
    expect(dataColumn3UpdatedChildren[0]).toHaveTextContent("Ohio_0");
  });
  // - Deselecting a sorting option restores the original order of the data columns
  it("Deselecting a sorting option restores the original order of the data columns", () => {
    const mainMenuItems: HTMLCollection = selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // click on the "Best Coverage" menu item
    fireEvent.click(menuItems[0]);

    // get the first data column
    const dataColumn1 = allColumns[1];
    // get the children of dataColumn1
    const dataColumn1Children = dataColumn1.children;
    // expect dataColumn1Children[0] to have text "Oregon"
    expect(dataColumn1Children[0]).toHaveTextContent("Oregon");
    // get the second data column
    const dataColumn2 = allColumns[2];
    // get the children of dataColumn2
    const dataColumn2Children = dataColumn2.children;
    // expect dataColumn2Children[0] to have text "Lebron_J"
    expect(dataColumn2Children[0]).toHaveTextContent("Lebron_J");
    // get the third data column
    const dataColumn3 = allColumns[3];
    // get the children of dataColumn3
    const dataColumn3Children = dataColumn3.children;
    // expect dataColumn3Children[0] to have text "Ohio_0"
    expect(dataColumn3Children[0]).toHaveTextContent("Ohio_0");

    const rankByOption = Array.from(mainMenuItems).filter(
      (menuItem) => menuItem.textContent === "Rank By >"
    )[0];
    // click on the "Rank By" menu item
    fireEvent.click(rankByOption);
    // click on the "Best Coverage" menu item
    fireEvent.click(menuItems[0]);

    // get the first data column
    const dataColumn1Updated = allColumns[1];
    // get the children of dataColumn1
    const dataColumn1UpdatedChildren = dataColumn1Updated.children;
    // expect dataColumn1UpdatedChildren[0] to have text "Oregon"
    expect(dataColumn1UpdatedChildren[0]).toHaveTextContent("Oregon");
    // get the second data column
    const dataColumn2Updated = allColumns[2];
    // get the children of dataColumn2
    const dataColumn2UpdatedChildren = dataColumn2Updated.children;
    // expect dataColumn2UpdatedChildren[0] to have text "Ohio_0"
    expect(dataColumn2UpdatedChildren[0]).toHaveTextContent("Ohio_0");
    // get the third data column
    const dataColumn3Updated = allColumns[3];
    // get the children of dataColumn
    const dataColumn3UpdatedChildren = dataColumn3Updated.children;
    // expect dataColumn3UpdatedChildren[0] to have text "Lebron_J"
    expect(dataColumn3UpdatedChildren[0]).toHaveTextContent("Lebron_J");
  });

  // # Sorting and Compressing

  // - With some sort selected, compressing table causes data column n to hide input if column n-1 has the same input where n=3
  it("With some sort selected, compressing table causes data column n to hide input if column n-1 has the same input where n=3", () => {
    const parentMenuOption: HTMLCollection = selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // click on the "Highest Mean Contacts" menu item
    fireEvent.click(menuItems[1]);
    // get "Toggle Compression" menu item from parentMenuOption
    const toggleCompressionOption = Array.from(parentMenuOption).filter(
      (menuItem) => menuItem.textContent === "Toggle Compression"
    )[0];
    // click on the "Toggle Compression" menu item
    fireEvent.click(toggleCompressionOption);
    // get Ohio_0 data column
    const dataColumnOhio = allColumns[3];
    // get the children of dataColumnOhio
    const dataColumnOhioChildren = dataColumnOhio.children;
    // expect dataColumnOhioChildren[0] to have text "Ohio_0"
    expect(dataColumnOhioChildren[0]).toHaveTextContent("Ohio_0");
    // expect dataColumnOhioChildren[1] to have text "Output"
    expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");
    // expect dataColumnOhioChildren[2] to have text "300"
    expect(dataColumnOhioChildren[3]).toHaveTextContent("300");
  });

  // - With some sort selected, compressing table does not cause data column n to hide if column n-1 has different input where n=1
  it("With some sort selected, compressing table does not cause data column n to hide if column n-1 has different input where n=1", () => {
    const parentMenuOption: HTMLCollection = selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // click on the "Highest Mean Contacts" menu item
    fireEvent.click(menuItems[1]);
    // get "Toggle Compression" menu item from parentMenuOption
    const toggleCompressionOption = Array.from(parentMenuOption).filter(
      (menuItem) => menuItem.textContent === "Toggle Compression"
    )[0];
    // click on the "Toggle Compression" menu item
    fireEvent.click(toggleCompressionOption);
    // get Oregon data column
    const dataColumnOregon = allColumns[2];
    // get the children of dataColumnOregon
    const dataColumnOregonChildren = dataColumnOregon.children;
    // expect dataColumnOregonChildren[0] to have text "Oregon"
    expect(dataColumnOregonChildren[0]).toHaveTextContent("Oregon");
    // expect dataColumnOregonChildren[1] to have text "Input"
    expect(dataColumnOregonChildren[1]).toHaveTextContent("Input");
    // expect dataColumnOregonChildren[2] to have text "Output"
    expect(dataColumnOregonChildren[2]).toHaveTextContent("Output");
  });

  // - With some sort selected, compressing table does not cause data column n to hide if column n-1 has different input where n=2
  it("With some sort selected, compressing table does not cause data column n to hide if column n-1 has different input where n=2", () => {
    const parentMenuOption: HTMLCollection = selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // click on the "Best Converage" menu item
    fireEvent.click(menuItems[0]);
    // get "Toggle Compression" menu item from parentMenuOption
    const toggleCompressionOption = Array.from(parentMenuOption).filter(
      (menuItem) => menuItem.textContent === "Toggle Compression"
    )[0];
    // click on the "Toggle Compression" menu item
    fireEvent.click(toggleCompressionOption);
    // get Oregon data column
    const dataColumnOregon = allColumns[3];
    // get the children of dataColumnOregon
    const dataColumnOregonChildren = dataColumnOregon.children;
    // expect dataColumnOregonChildren[0] to have text "Ohio_0"
    expect(dataColumnOregonChildren[0]).toHaveTextContent("Ohio_0");
    // expect dataColumnOregonChildren[1] to have text "Input"
    expect(dataColumnOregonChildren[1]).toHaveTextContent("Input");
    // expect dataColumnOregonChildren[2] to have text "Output"
    expect(dataColumnOregonChildren[2]).toHaveTextContent("Output");
  });

  // - With some sort selected, compressing table causes data column n to hide input if column n-1 has the same input where n=1
  it("With some sort selected, compressing table causes data column n to hide input if column n-1 has the same input where n=1", () => {
    const parentMenuOption: HTMLCollection = selectOption("Rank By >");
    const menu = screen.getByRole("menu");
    // get the menu items
    const menuItems = menu.children;
    // click on the "Inclination" menu item
    fireEvent.click(menuItems[2]);
    // get "Toggle Compression" menu item from parentMenuOption
    const toggleCompressionOption = Array.from(parentMenuOption).filter(
      (menuItem) => menuItem.textContent === "Toggle Compression"
    )[0];
    // click on the "Toggle Compression" menu item
    fireEvent.click(toggleCompressionOption);
    // get Oregon data column
    const dataColumnOregon = allColumns[2];
    // get the children of dataColumnOregon
    const dataColumnOregonChildren = dataColumnOregon.children;
    // expect dataColumnOregonChildren[0] to have text "Ohio_0"
    expect(dataColumnOregonChildren[0]).toHaveTextContent("Ohio_0");
    // expect dataColumnOregonChildren[1] to have text "Output"
    expect(dataColumnOregonChildren[2]).toHaveTextContent("Output");
    // expect dataColumnOregonChildren[2] to have text "300"
    expect(dataColumnOregonChildren[3]).toHaveTextContent("300");
  });

  // # Column/Rows
  describe("Column/Rows", () => {
    // - Any column with missing data uses the placeholder prop value as the value for a missing row/column position
    it("Any column with missing data uses the placeholder prop value as the value for a missing row/column position", () => {
      const noInputValuePlaceholderLocal = "missing";
      // get the Ohio_0 data column
      const dataColumnOhio = allColumns[2];
      // get the children of dataColumnOhio_0
      const dataColumnOhioChildren = dataColumnOhio.children;
      // expect dataColumnOregonChildren[0] to have text "Ohio_0"
      expect(dataColumnOhioChildren[0]).toHaveTextContent("Ohio_0");
      // expect dataColumnOhioChildren[9] to have text "missing"
      expect(dataColumnOhioChildren[9]).toHaveTextContent(
        noInputValuePlaceholderLocal
      );
      // expect dataColumnOhioChildren[11] to have text "missing"
      expect(dataColumnOhioChildren[11]).toHaveTextContent(
        noInputValuePlaceholderLocal
      );

      // get the Lebron_J data column
      const dataColumnLebron = allColumns[3];
      // get the children of dataColumnLebron
      const dataColumnLebronChildren = dataColumnLebron.children;
      // expect dataColumnLebronChildren[0] to have text "Lebron_J"
      expect(dataColumnLebronChildren[0]).toHaveTextContent("Lebron_J");
      // expect dataColumnLebronChildren[11] to have text "missing"
      expect(dataColumnLebronChildren[11]).toHaveTextContent(
        noInputValuePlaceholderLocal
      );
      // expect dataColumnLebronChildren[15] to have text "missing"
      expect(dataColumnLebronChildren[15]).toHaveTextContent(
        noInputValuePlaceholderLocal
      );
    });

    // - Each data column has an input and output column when table is not compressed
    it("Each data column has an input and output column when table is not compressed", () => {
      // get the Oregon data column
      const dataColumnOregon = allColumns[1];
      // get the children of dataColumnOregon
      const dataColumnOregonChildren = dataColumnOregon.children;
      // expect dataColumnOregonChildren[0] to have text "Oregon"
      expect(dataColumnOregonChildren[0]).toHaveTextContent("Oregon");
      // expect dataColumnOregonChildren[1] to have text "Input"
      expect(dataColumnOregonChildren[1]).toHaveTextContent("Input");
      // expect dataColumnOregonChildren[2] to have text "Output"
      expect(dataColumnOregonChildren[2]).toHaveTextContent("Output");

      // get the Ohio_0 data column
      const dataColumnOhio = allColumns[2];
      // get the children of dataColumnOhio
      const dataColumnOhioChildren = dataColumnOhio.children;
      // expect dataColumnOhioChildren[0] to have text "Ohio_0"
      expect(dataColumnOhioChildren[0]).toHaveTextContent("Ohio_0");
      // expect dataColumnOhioChildren[1] to have text "Input"
      expect(dataColumnOhioChildren[1]).toHaveTextContent("Input");
      // expect dataColumnOhioChildren[2] to have text "Output"
      expect(dataColumnOhioChildren[2]).toHaveTextContent("Output");

      // get the Lebron_J data column
      const dataColumnLebron = allColumns[3];
      // get the children of dataColumnLebron
      const dataColumnLebronChildren = dataColumnLebron.children;
      // expect dataColumnLebronChildren[0] to have text "Lebron_J"
      expect(dataColumnLebronChildren[0]).toHaveTextContent("Lebron_J");
      // expect dataColumnLebronChildren[1] to have text "Input"
      expect(dataColumnLebronChildren[1]).toHaveTextContent("Input");
      // expect dataColumnLebronChildren[2] to have text "Output"
      expect(dataColumnLebronChildren[2]).toHaveTextContent("Output");
    });
    // # Misc
    describe("Misc", () => {
      // - Selecting the "View Rank Scripts" menu option calls the "onOpenViewRankScripts" prop
      it('Selecting the "View Rank Scripts" menu option calls the "onOpenViewRankScripts" prop', () => {
        selectOption("View Rank Scripts");
        // expect mockOnOpenViewRankScripts to be called
        expect(mockOnOpenViewRankScripts).toHaveBeenCalled();
      });
      // - Selecting the "Custom Ranking" menu option calls the "onOpenCustomRanking" prop
      it('Selecting the "Custom Ranking" menu option calls the "onOpenCustomRanking" prop', () => {
        selectOption("Custom Ranking");
        // expect mockOnOpenCustomRanking to be called
        expect(mockOnOpenCustomRanking).toHaveBeenCalled();
      });
    });
  });
});
