import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Open from "../../../components/link-budget/implements/popups/Open";
import { datasetNames, datasetName } from "../sampleData/data";

const meta: Meta<typeof Open> = {
    title: 'Link-Budget/Popups/Open',
    component: Open,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof Open>;

export default meta;

type Story = StoryObj<typeof meta>;



export const OpenStory: Story = {
    args: {
        visible: true,
        selected: datasetName,
        datasetNames: datasetNames,
        loadLinkBudgetDatasetNames: () => { },
        onHide: () => { },
        onOk: (name: string, id: number) => { }
    }
}