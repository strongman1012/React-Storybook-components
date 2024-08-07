import { AnalyticsStructure } from "../types/types";

const dataPlotRF: Plotly.Data[] = [
  {
    x: [1, 2, 3],
    y: [2, 6, 3],
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" },
    text: ['Text A', 'Text B', 'Text C']
  }
];

const layout = { width: 500, height: 400, title: '' };

export const ANALYTICS_MOCK_DATA: AnalyticsStructure = {
  title: "RF Coverage",
  sections: [
    {
      name: "RF Coverage",
      values: [
        {
          name: "RF Coverage",
          value: 2,
          showGraph: true,
          graphType: "scatter",
          graphData: dataPlotRF,
          layout: layout,
          config: { displayModeBar: false }
        }
      ]
    },
    {
      name: "Running Coverage Average",
      values: [
        {
          name: "Running Coverage Average",
          value: 3,
          showGraph: true,
          graphType: "scatter",
          graphData: dataPlotRF,
          layout: layout,
          config: { displayModeBar: false }
        }
      ]
    }
  ]
}

