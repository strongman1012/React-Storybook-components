import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import MuiThemes from '../src/utills/styles/theme';
import "../public/css/light.css";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    cssIsolation: 'none',
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
};


export const withMuiTheme = (Story, context) => {
  return (
    <ThemeProvider theme={MuiThemes.light}>
      <Story />
    </ThemeProvider>
  )
};

export const decorators = [withMuiTheme];

export default preview;
