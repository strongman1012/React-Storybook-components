import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SaveAs from "../../../components/link-budget/implements/popups/SaveAs";
import { datasetName } from "../sampleData/data";

const meta: Meta<typeof SaveAs> = {
    title: 'Link-Budget/Popups/SaveAs',
    component: SaveAs,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof SaveAs>;

export default meta;

type Story = StoryObj<typeof meta>;



export const SaveAsStory: Story = {
    args: {
        visible: true,
        datasetName: datasetName,
        onChange: (e: any) => { },
        onHide: () => { },
        onOk: (name: string) => { }
    }
}