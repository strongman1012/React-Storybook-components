
import React from "react";

type PerformancePanelMap = {
	category: string;
	filteredValues?: { [key: string]: string };
	performanceData: PerformanceInfo[];
}
type PerformanceInfo = {
	name: string;
	value: string | number;
	accordionContent?: string;
	clickableContent?: {
		content: string,
		title: string
	};
}
export type FilterInfo = {
	name: string;
	options: FilterOption[];
}
type FilterOption = {
	name: string;
	key: string;
	value: string;
}

const performanceMetricData: PerformancePanelMap = {
	category: "Transit Steer (Forward, S-Band)",
	filteredValues: {
		frequencyBand: 's-band',
		serviceType: 'rx'
	},
	performanceData: [
		{
			name: "Direction",
			value: "Forward"
		},
		{
			name: "Frequency Band",
			value: "s"
		},
		{
			name: "Data Rate",
			value: 0.01
		},
		{
			name: "Data Volume",
			value: 1.2
		},
		{
			name: "Primary Hours",
			value: 103.02
		},
		{
			name: "Primary Time Percentage",
			value: 73.51
		},
		{
			name: "Primary User Satisfaction",
			value: 98.87
		},
		{
			name: "Backup Hours",
			value: 102.96
		},
		{
			name: "BackupTime Percentage",
			value: 73.46
		},
		{
			name: "Backup User Satisfaction",
			value: 98.81
		},
		{
			name: "Duration Hours",
			value: 103.02447916666665
		},
		{
			name: "Requested Hours",
			value: 104.20000076293945
		},
		{
			name: "Max Outage Hours",
			value: 0.31
		},
		{
			name: "Total Outage Hours",
			value: 37.13
		},
		{
			name: "Hours Per Station",
			value: 0,
			accordionContent: `
			  /* 
 			 * This is the performance panel script what user want
 			 * @params 
 			 * @returns returnData = { graph, table }
			 * const graph = { data, layout, config }
 			 * If graph is empty, the value is undefined
			 * const table = { header, body }
 			 * If table is empty, the value is undefined 
 			 */

 			 const modelData = [
          		{
          		  station: "Madrid",
          		  hours: 99.64
          		},
          		{
          		  station: "Canberra",
          		  hours: 34.68
          		},
          		{
          		  station: "Goldstone",
          		  hours: 71.67
          		},
          		{
          		  station: "DSN",
          		  hours: 205.98
          		},
          		{
          		  station: "NSN",
          		  hours: 0
          		},
          		{
          		  station: "Gateway",
          		  hours: 0
          		},
          		{
          		  station: "ESTRACK",
          		  hours: 0
          		},
          		{
          		  station: "LCN",
          		  hours: 0
          		}
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.hours / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: markColor, size: 8 },
                  line: { color: markColor, width: 2 },
				}];
 			   const layout = {
 			       width: 500,
 			       height: 400,
 			       paper_bgcolor: bgColor,
 			       plot_bgcolor: bgColor,
 			       font: { color: textColor },
 			       showlegend: false,
              	   xaxis: { title: 'Altitude (km), Inclination = 90 deg', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor },
              	   yaxis: { title: 'RF Coverage (minutes/day)', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor }
 			   };
 			 const graph={ data, layout, config: { displayModeBar: false } };
			 const table={
			 	header: ['Station', 'Hours'],
				body: [
				  ['Madrid', 99.64],
				  ['Canberra', 34.68],
				  ['Goldstone', 71.67],
				  ['DSN', 205.98],
				  ['NSN', 0],
				  ['Gateway', 0],
				  ['ESTRACK', 0],
				  ['LCN', 0],
				]
			  }
			const returnData = {graph, table}
 			return returnData;
			`
		}
	]
};

const performanceAntennaData: PerformancePanelMap = {
	category: "Descent Steer (Return, S-Band)",
	filteredValues: {
		frequencyBand: 's-band',
		serviceType: 'tx'
	},
	performanceData: [
		{
			name: "Direction",
			value: "Return"
		},
		{
			name: "Frequency Band",
			value: "s"
		},
		{
			name: "Data Rate",
			value: 0.01
		},
		{
			name: "Data Volume",
			value: 0.07
		},
		{
			name: "Primary Hours",
			value: 5.93
		},
		{
			name: "Primary Time Percentage",
			value: 4.23
		},
		{
			name: "Primary User Satisfaction",
			value: 99.72
		},
		{
			name: "Backup Hours",
			value: 5.93
		},
		{
			name: "BackupTime Percentage",
			value: 4.23
		},
		{
			name: "Backup User Satisfaction",
			value: 99.72
		},
		{
			name: "Duration Hours",
			value: 5.933333333333344
		},
		{
			name: "Requested Hours",
			value: 5.950000762939453
		},
		{
			name: "Max Outage Hours",
			value: 0
		},
		{
			name: "Total Outage Hours",
			value: 134.22
		},
		{
			name: "Hours Per Station",
			value: 0,
			accordionContent: `
			  /* 
 			 * This is the performance panel script what user want
 			 * @params 
 			 * @returns returnData = { graph, table }
			 * const graph = { data, layout, config }
 			 * If graph is empty, the value is undefined
			 * const table = { header, body }
 			 * If table is empty, the value is undefined 
 			 */

 			 const modelData = [
          		{
          		  station: "Madrid",
          		  hours: 0
          		},
          		{
          		  station: "Canberra",
          		  hours: 11.87
          		},
          		{
          		  station: "Goldstone",
          		  hours: 0
          		},
          		{
          		  station: "DSN",
          		  hours: 11.87
          		},
          		{
          		  station: "NSN",
          		  hours: 0
          		},
          		{
          		  station: "Gateway",
          		  hours: 0
          		},
          		{
          		  station: "ESTRACK",
          		  hours: 0
          		},
          		{
          		  station: "LCN",
          		  hours: 0
          		}
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.hours / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: markColor, size: 8 },
                  line: { color: markColor, width: 2 },
				}];
 			   const layout = {
 			       width: 500,
 			       height: 400,
 			       paper_bgcolor: bgColor,
 			       plot_bgcolor: bgColor,
 			       font: { color: textColor },
 			       showlegend: false,
              	   xaxis: { title: 'Altitude (km), Inclination = 90 deg', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor },
              	   yaxis: { title: 'RF Coverage (minutes/day)', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor }
 			   };
 			 const graph={ data, layout, config: { displayModeBar: false } };
			 const table={
			 	header: ['Station', 'Hours'],
				body: [
				  ['Madrid', 0],
				  ['Canberra', 11.87],
				  ['Goldstone', 0],
				  ['DSN', 11.87],
				  ['NSN', 0],
				  ['Gateway', 0],
				  ['ESTRACK', 0],
				  ['LCN', 0],
				]
			  }
			const returnData = {graph, table}
 			return returnData;
			`
		}
	]
};

const performanceNavTrackingData: PerformancePanelMap = {
	category: "Ascent Steer (Return, Ka-Band)",
	filteredValues: {
		frequencyBand: 'ka-band',
		serviceType: 'rx'
	},
	performanceData: [
		{
			name: "Direction",
			value: "Return"
		},
		{
			name: "Frequency Band",
			value: "ka"
		},
		{
			name: "Data Rate",
			value: 10.0
		},
		{
			name: "Data Volume",
			value: 35.21
		},
		{
			name: "Primary Hours",
			value: 5.77
		},
		{
			name: "Primary Time Percentage",
			value: 4.12
		},
		{
			name: "Primary User Satisfaction",
			value: 96.13
		},
		{
			name: "Backup Hours",
			value: 2.06
		},
		{
			name: "BackupTime Percentage",
			value: 1.47
		},
		{
			name: "Backup User Satisfaction",
			value: 34.27
		},
		{
			name: "Duration Hours",
			value: 5.7679687500000085
		},
		{
			name: "Requested Hours",
			value: 6.0
		},
		{
			name: "Max Outage Hours",
			value: 0.22
		},
		{
			name: "Total Outage Hours",
			value: 134.38
		},
		{
			name: "Hours Per Station",
			value: 0,
			accordionContent: `
			  /* 
 			 * This is the performance panel script what user want
 			 * @params 
 			 * @returns returnData = { graph, table }
			 * const graph = { data, layout, config }
 			 * If graph is empty, the value is undefined
			 * const table = { header, body }
 			 * If table is empty, the value is undefined 
 			 */

 			 const modelData = [
          		{
          		  station: "Madrid",
          		  hours: 3.71
          		},
          		{
          		  station: "Canberra",
          		  hours: 4.11
          		},
          		{
          		  station: "Goldstone",
          		  hours: 0
          		},
          		{
          		  station: "DSN",
          		  hours: 7.82
          		},
          		{
          		  station: "NSN",
          		  hours: 0
          		},
          		{
          		  station: "Gateway",
          		  hours: 0
          		},
          		{
          		  station: "ESTRACK",
          		  hours: 0
          		},
          		{
          		  station: "LCN",
          		  hours: 0
          		}
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.hours / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: markColor, size: 8 },
                  line: { color: markColor, width: 2 },
				}];
 			   const layout = {
 			       width: 500,
 			       height: 400,
 			       paper_bgcolor: bgColor,
 			       plot_bgcolor: bgColor,
 			       font: { color: textColor },
 			       showlegend: false,
              	   xaxis: { title: 'Altitude (km), Inclination = 90 deg', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor },
              	   yaxis: { title: 'RF Coverage (minutes/day)', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor }
 			   };
 			 const graph={ data, layout, config: { displayModeBar: false } };
			 const table={
			 	header: ['Station', 'Hours'],
				body: [
				  ['Madrid', 3.71],
				  ['Canberra', 4.11],
				  ['Goldstone', 0],
				  ['DSN', 7.82],
				  ['NSN', 0],
				  ['Gateway', 0],
				  ['ESTRACK', 0],
				  ['LCN', 0],
				]
			  }
			const returnData = {graph, table}
 			return returnData;
			`
		}
	]
};
export const filters: FilterInfo[] = [
	{
		name: 'Frequency Band Filter',
		options: [
			{
				name: 'X-Band',
				key: 'frequencyBand',
				value: 'x-band'
			},
			{
				name: 'S-Band',
				key: 'frequencyBand',
				value: 's-band'
			},
			{
				name: 'Ka-Band',
				key: 'frequencyBand',
				value: 'ka-band'
			},
			{
				name: 'Ku-Band',
				key: 'frequencyBand',
				value: 'ku-band'
			}
		]
	},
	{
		name: 'Service Type',
		options: [
			{
				name: 'Rx',
				key: 'serviceType',
				value: 'rx'
			},
			{
				name: 'Tx',
				key: 'serviceType',
				value: 'tx'
			}
		]
	}
];
export const performanceContent = [performanceMetricData, performanceAntennaData, performanceNavTrackingData];
export const dataPlot: Plotly.Data[] = [
	{
		x: [1, 2, 3],
		y: [2, 6, 3],
		type: "scatter",
		mode: "lines+markers",
		marker: { color: "red" }
	}
];
export const templateScript = `
	/*
	*@params
	*@returns returnData = {category, performanceData}
	*category is the name of section
	*performanceData is the Item list of the section
	*/
	const category = "Custom User";
	const filteredValues = {
			frequencyBand: 'x-band',
			serviceType: 'rx'
		};
	const performanceData = [
		{
			name: "Direction",
			value: "Forward"
		},
		{
			name: "Frequency Band",
			value: "x"
		},
		{
			name: "Data Rate",
			value: 0.01
		},
		{
			name: "Data Volume",
			value: 1.2
		},
		{
			name: "Primary Hours",
			value: 103.02
		},
		{
			name: "Primary Time Percentage",
			value: 73.51
		},
		{
			name: "Primary User Satisfaction",
			value: 98.87
		},
		{
			name: "Backup Hours",
			value: 102.96
		},
		{
			name: "BackupTime Percentage",
			value: 73.46
		},
		{
			name: "Backup User Satisfaction",
			value: 98.81
		},
		{
			name: "Duration Hours",
			value: 103.02447916666665
		},
		{
			name: "Requested Hours",
			value: 104.20000076293945
		},
		{
			name: "Max Outage Hours",
			value: 0.31
		},
		{
			name: "Total Outage Hours",
			value: 37.13
		},
				{
			name: "Hours Per Station",
			value: 0,
			accordionContent: \`
			  /* 
 			 * This is the performance panel script what user want
 			 * @params 
 			 * @returns returnData = { graph, table }
			 * const graph = { data, layout, config }
 			 * If graph is empty, the value is undefined
			 * const table = { header, body }
 			 * If table is empty, the value is undefined 
 			 */

 			 const modelData = [
          		{
          		  station: "Madrid",
          		  hours: 99.64
          		},
          		{
          		  station: "Canberra",
          		  hours: 34.68
          		},
          		{
          		  station: "Goldstone",
          		  hours: 71.67
          		},
          		{
          		  station: "DSN",
          		  hours: 205.98
          		},
          		{
          		  station: "NSN",
          		  hours: 0
          		},
          		{
          		  station: "Gateway",
          		  hours: 0
          		},
          		{
          		  station: "ESTRACK",
          		  hours: 0
          		},
          		{
          		  station: "LCN",
          		  hours: 0
          		}
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.hours / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: markColor, size: 8 },
                  line: { color: markColor, width: 2 },
				}];
 			   const layout = {
 			       width: 500,
 			       height: 400,
 			       paper_bgcolor: bgColor,
 			       plot_bgcolor: bgColor,
 			       font: { color: textColor },
 			       showlegend: false,
              	   xaxis: { title: 'Altitude (km), Inclination = 90 deg', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor },
              	   yaxis: { title: 'RF Coverage (minutes/day)', titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor }
 			   };
 			 const graph={ data, layout, config: { displayModeBar: false } };
			 const table={
			 	header: ['Station', 'Hours'],
				body: [
				  ['Madrid', 99.64],
				  ['Canberra', 34.68],
				  ['Goldstone', 71.67],
				  ['DSN', 205.98],
				  ['NSN', 0],
				  ['Gateway', 0],
				  ['ESTRACK', 0],
				  ['LCN', 0],
				]
			  }
			const returnData = {graph, table}
 			return returnData;
			\`
		}
	]

	const returnData={category, filteredValues, performanceData}
	return returnData;
`
