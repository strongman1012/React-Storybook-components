// Import the path module
import path from 'path';
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  webpackFinal: async (config, { configType }) => {
    // Check if config.resolve exists before trying to modify it
    if (config.resolve) {
      // Check if config.resolve.alias exists before trying to modify it
      if (config.resolve.alias) {
        // Add or modify the alias for 'src' paths
        config.resolve.alias['src'] = path.resolve(__dirname, '../src');
      }
    }
    return config;
  },
  stories: ["../src/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-jest',
      options: {
        // The path to your Jest test results JSON file
        results: require('../.jest-test-results.json'),
      },
    },
  ],
  staticDirs: ['../public'],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
