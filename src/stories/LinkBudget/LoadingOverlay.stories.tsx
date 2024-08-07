import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import LoadingOverlay from '../../components/link-budget/implements/LoadingOverlay'; // Adjust the import path as necessary

const meta: Meta<typeof LoadingOverlay> = {
    title: 'Link-Budget/LoadingOverlay',
    component: LoadingOverlay,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof LoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingOverlayStory: Story = {
    args: {
        isLoading: true,
        status: "Loading....",
        subtextStatus: "subStatus...",
        progress: 50,
        className: "flex",
        showCancelButton: true,
        cancelAction: () => { }
    }
}