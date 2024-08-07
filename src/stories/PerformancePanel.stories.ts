import type { Meta, StoryObj } from '@storybook/react';
import PerformancePanel from '../components/PerformancePanel/implementation/PerformancePanel';
import { performanceContent, templateScript, filters } from '../components/PerformancePanel/tests/performancePanelData';
import { PerformancePanelProps } from '../components/PerformancePanel/types/types';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PerformancePanel> = {
  title: 'Core/PerformancePanel',
  component: PerformancePanel,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof PerformancePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerformancePanelBasic: Story = {
  args: {
    sections: performanceContent.map((item, index): PerformancePanelProps['sections'][number] => ({
      sectionId: item.category + index,
      sectionName: item.category,
      filteredValues: item.filteredValues,
      sectionData: item.performanceData.map((data) => ({
        name: data.name,
        value: data.value,
        ...(data.accordionContent ? { dropdownContent: data.accordionContent } : data.clickableContent ? { dialogContent: data.clickableContent.content, dialogTitle: data.clickableContent.title } : {})
      }))
    })),
    filters: filters,
    apiURL: "http://localhost:5000/api/v0/",
    templateScript: templateScript,
    scriptManagerOpen: true,
    closeScriptManager: () => { alert('close script') },
  }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
