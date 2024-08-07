import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Confirm from "../../../components/link-budget/implements/popups/Confirm";

const meta: Meta<typeof Confirm> = {
    title: 'Link-Budget/Popups/Confirm',
    component: Confirm,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof Confirm>;

export default meta;

type Story = StoryObj<typeof meta>;



export const ConfirmStory: Story = {
    args: {
        visible: true,
        message: "Do you want to confirm",
        onHide: () => { },
        onOk: () => { }
    }
}