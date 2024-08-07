import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LinkBudget from "../../components/link-budget/implements/LinkBudget";
import { datasetNames } from "./sampleData/data";
import { sampleSource } from "src/components/link-budget/assets/sampleData";
import { withTests } from "@storybook/addon-jest";
import results from '../../../.jest-test-results.json';

const meta: Meta<typeof LinkBudget> = {
    title: 'Link-Budget/LinkBudget',
    component: LinkBudget,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [withTests({ results })],
    argTypes: {
    },
} satisfies Meta<typeof LinkBudget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkBudgetStory: Story = {
    args: {
        source: sampleSource,
        templateId: 13,
        preRunResults: [],
        isEngineer: true,
        linkBudgetDatasetNames: datasetNames,
        loadLinkBudgetDatasetNames: () => { },
        linkBudgetTemplates: [],
        linkBudgetLoaded: true,
        saveLinkBudget: () => { },
        loadLinkBudget: () => { },
        themeName: 'light',
        onChangeTheme: (name: string) => { }
    },
    parameters: {
        jest: ['link-budget.test.tsx']
    }
}