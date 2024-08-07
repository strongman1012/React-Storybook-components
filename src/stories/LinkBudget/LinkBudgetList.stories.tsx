import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LinkBudgetList from "../../components/link-budget/implements/LinkBudgetList";
import { Row, ParamGroup } from "../../components/link-budget/types/LinkBudgetTypes";
import { dataSource, datasetName } from "./sampleData/data";
import { initWidths } from "../../components/link-budget/implements/initData";
import { sampleSource } from "src/components/link-budget/assets/sampleData";

const meta: Meta<typeof LinkBudgetList> = {
    title: 'Link-Budget/LinkBudgetList',
    component: LinkBudgetList,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof LinkBudgetList>;

export default meta;

type Story = StoryObj<typeof meta>;



export const LinkBudgetListStory: Story = {
    args: {
        isEngineer: true,
        isGroupedEnabled: true,
        isUpdateTemplateEnabled: true,
        dataSource: dataSource,
        colWidths: initWidths,
        externalSource: sampleSource,
        datasetName: datasetName,
        onOpenDataset: () => { },
        onRefresh: (rowsData: Row[] | null, sourceData: ParamGroup | null) => { },
        onSetTemplateAsDefault: () => { },
        onLoadEditMode: () => { },
    }
}