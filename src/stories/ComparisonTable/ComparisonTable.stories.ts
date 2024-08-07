import type { Meta, StoryObj } from '@storybook/react';
import ComparisonTable from 'src/components/ComparisonTable/implementation/ComparisonTable';
import { comparisonData, defaultComparisonInputsEqual, defaultComparisonSortingOptions, groupsDefinition, rowsDefinition } from './sampleData/comparison-table-data';
import { withTests } from "@storybook/addon-jest";
import results from '../../../.jest-test-results.json';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ComparisonTable> = {
  title: 'Core/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [withTests({ results })],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicComparisonTable: Story = {
  args: {
    rowsDefinition: rowsDefinition,
    groupsDefinition: groupsDefinition,
    data: comparisonData,
    inputsAreEqual: defaultComparisonInputsEqual,
    sortingOptions: defaultComparisonSortingOptions,
    noInputValuePlaceholder: "???",
    onPin: (data) => {
      alert(`Content has been pinned, ${JSON.stringify(data)}`)
    },
    onRemovePin: (data) => {
      alert(`Content has been deleted, ${JSON.stringify(data)}`)
    },
    onOpenCustomRanking: () => { alert('Custom Ranked Scripts Opened') },
    onOpenViewRankScripts: () => { alert('View Ranked Scripts Opened') }
  },
  parameters: {
    jest: ['ComparisonTable.test.tsx']
  }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
