import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import HeatMapSlider from "../../components/heatmap-slider/implements/HeatMapSlider";

const meta: Meta<typeof HeatMapSlider> = {
    title: 'HeatMapSlider',
    component: HeatMapSlider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof HeatMapSlider>;

export default meta;

type Story = StoryObj<typeof meta>;



export const HeatMapSliderStory: Story = {
}