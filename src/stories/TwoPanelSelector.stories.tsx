import type { Meta, StoryObj } from '@storybook/react';
import TwoPanelSelector from '../components/TwoPanelSelector/implementation';
import { sampleData } from './sampleData/TwoPanelSelectorSampleData';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TwoPanelSelector> = {
  title: 'Baseline/TwoPanelSelector',
  component: TwoPanelSelector,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof TwoPanelSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoPanelSelectorBasic: Story = {
  args: {
    items: sampleData.items,
    toDisplayValue: (item) => {
      return sampleData.toDisplayValue(item as any)
    },
    onConfirm: (items) => {
      sampleData.onConfirm(items as any)
    },
    options: {
      filterAvailableSelection: (selectedItems) => {
        return (item) => {
          if (selectedItems.length === 0) return true;
          const typedItems = selectedItems as (typeof sampleData)['items'];
          return typedItems.some((e) => e.pName === (item as (typeof sampleData.items)[number]).pName);
        }
      }
    }
  }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
