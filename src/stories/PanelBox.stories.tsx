import type { Meta, StoryObj } from '@storybook/react';
import PanelBox from '../components/PanelBox/implementation/PanelBox';
import React from 'react';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PanelBox> = {
  title: 'Core/PanelBox',
  component: PanelBox,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof PanelBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPanelBox: Story = {
    args:{
        title: `Test Title (km)`,
        omitBorder: {
          bottom: true
        },
        children: (<>
          <h1>gaming</h1>
          <h2>wahoo</h2>
        </>)
    }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
