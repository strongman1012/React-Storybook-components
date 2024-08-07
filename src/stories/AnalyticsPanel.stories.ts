import type { Meta, StoryObj } from '@storybook/react';
import { ANALYTICS_MOCK_DATA, MOCK_SCRIPTS, SCRIPT_TEMPLATE_JS, MANAGE_SCRIPT_TEMPLATE_JS } from '../components/AnalyticsPanel/tests/sampleData';
import AnalyticsPanel from 'src/components/AnalyticsPanel/implementation';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AnalyticsPanel> = {
  title: 'Core/AnalyticsPanel',
  component: AnalyticsPanel,
  parameters: {
    // Optional parameter to fullscreen the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof AnalyticsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnalyticsPanelView: Story = {
  args: {
    dataset: ANALYTICS_MOCK_DATA.performancePanel,
    users: [{
      isOrbital: true,
      altitude: 300,
      inclination: 30,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 300,
      inclination: 35,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 300,
      inclination: 40,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 350,
      inclination: 30,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 350,
      inclination: 35,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 350,
      inclination: 40,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 400,
      inclination: 30,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 400,
      inclination: 35,
      eccentricity: 0
    },
    {
      isOrbital: true,
      altitude: 400,
      inclination: 40,
      eccentricity: 0
    },
    ],
    plotScripts: MOCK_SCRIPTS,
    getAllPlotScripts: () => { return MOCK_SCRIPTS },
    templateScript: SCRIPT_TEMPLATE_JS,
    manageTemplateScript: MANAGE_SCRIPT_TEMPLATE_JS,
    apiURL: "http://localhost:5000/api/v0/",
    filterMultiSelect: false,
    updatePlotSelections: () => { console.log('Plot selection has been updated in DB') },
    handleDeleteScript: () => { alert('Script Deleted') },
    handleUpdateScript: () => { alert('Script Updated') },
    downloadResults: () => { alert('Data has been downloaded...') },
    savePoints: () => { alert('Save Triggered') }
  }
}
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
