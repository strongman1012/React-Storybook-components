import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RowEdit from "../../../components/link-budget/implements/popups/RowEdit";
import { Row } from "../sampleData/data";

const meta: Meta<typeof RowEdit> = {
    title: 'Link-Budget/Popups/RowEdit',
    component: RowEdit,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RowEdit>;

export default meta;

type Story = StoryObj<typeof meta>;



export const RowEditStory: Story = {
    args: {
        row: Row,
        visible: true,
        onChangeName: (e: any) => { },
        onChangeTitle: (e: any) => { },
        onChangeCode: (e: any) => { },
        onChangeNotes: (e: any) => { },
        onOk: () => { },
        onHide: () => { },
        error: undefined
    }
}