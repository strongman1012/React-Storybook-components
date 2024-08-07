import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LinkBudgetEdit from "../../components/link-budget/implements/LinkBudgetEdit";
import { Row, ParamGroup } from "../../components/link-budget/types/LinkBudgetTypes";
import { dataSource, datasetName } from "./sampleData/data";
import { initWidths } from "../../components/link-budget/implements/initData";
import { sampleSource } from "src/components/link-budget/assets/sampleData";

const meta: Meta<typeof LinkBudgetEdit> = {
    title: 'Link-Budget/LinkBudgetEdit',
    component: LinkBudgetEdit,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof LinkBudgetEdit>;

export default meta;

type Story = StoryObj<typeof meta>;



export const LinkBudgetEditStory: Story = {
    args: {
        isEngineer: true,
        isGroupedEnabled: true,
        isUpdateTemplateEnabled: true,
        dataSource: dataSource,
        initColWidths: initWidths,
        externalSource: sampleSource,
        datasetName: datasetName,
        onAddNewRow: (rowsData: Row[]) => { },
        onNewDataset: () => { },
        onSaveData: (rowsData: Row[]) => { },
        onOpenDataset: () => { },
        onSaveAs: () => { },
        onRefresh: (rowsData: Row[] | null, sourceData: ParamGroup | null) => { },
        onSetTemplateAsDefault: () => { },
        onDoneEditMode: () => { },
        onRowEdit: (rowdata: Row) => { },
        onShowErrorMessage: (errMsg: string) => { },
    }
}