// import { Layout } from "plotly.js";

import { Config, Layout } from "plotly.js";

export type AnalyticsPlotProps = {
    data: AnalyticsStructure;
};

export type AnalyticsStructure = {
    title: string,
    sections: GenericGraph[] | PlotlyGraph[];
}

export type GenericGraph = {
    name: string | null;
    values: GenericData[];
};

export type PlotlyGraph = {
    name: string | null;
    values: AnalyticsGraph[];
};

export type AnalyticsGraph = {
    name: string;
    value: number;
    showGraph: boolean;
    graphType?: string;
    config?: Partial<Config>;
    graphData: Plotly.Data[];
    layout: Partial<Layout>;
}

export type GenericData = {
    object: unknown;
}
