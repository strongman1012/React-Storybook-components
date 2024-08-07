import type { Meta, StoryObj } from '@storybook/react';
import { Visualizer } from '../components';
import { Constellation, GroundStationInfo, SatelliteInfo, VisualizerModel } from '../components/Visualizer/implementation/model';
import { visualizerData } from './sampleData/VisualizerSampleData';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Visualizer> = {
  title: 'Core/Visualizer',
  component: Visualizer,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Visualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisualizerStory: Story = {
  args: {
    model: visualizerData,
    height: '100%',
    width: 100,
    hideOrbitPaths: true,
    handleActivateGroundStation: () => { },
    handleDeactivateGroundStation: () => { },
    handleRemoveGroundStation: () => { },
    handleActivateSatellite: () => { },
    handleDeactivateSatellite: () => { },
    handleRemoveSatellite: () => { },
    handleViewGroundStationPlatformDetails: () => { },
    handleViewSatellitePlatformDetails: () => { },
    handleAddNewGroundStation: () => { },
    handleViewCoverageStatistics: () => { },
    handleRefresh: () => { },
  }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
