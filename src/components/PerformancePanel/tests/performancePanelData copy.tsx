
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
	category: "Metric Data",
	filteredValues: {
		frequencyBand: 'x-band'
	},
	performanceData: [
		{
			name: "RF Coverage (min/day)",
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
        	      name: "Ohio",
        	      id: 67,
        	      duration: 1440,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5370,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 59400,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5430,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5310,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 65070,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.duration / 60),
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
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Contacts Per Day",
			value: 0,
			accordionContent: `
			const graph = undefined;
			const table={
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Average Contact Duration (minutes)",
			value: 0,
			accordionContent: `
			 	const modelData = [
 			       {
 			         altitude: 300,
 			         inclination: 30,
 			         eccentricity: 0,
 			         value: 8.498524561708036,
 			       },
 			       {
 			         altitude: 300,
 			         inclination: 35,
 			         eccentricity: 0,
 			         value: 21.99618121853845,
 			       },
 			       {
 			         altitude: 300,
 			         inclination: 40,
 			         eccentricity: 0,
 			         value: 29.49487936122201,
 			       },
 			       {
 			         altitude: 350,
 			         inclination: 30,
 			         eccentricity: 0,
 			         value: 12.997743447318175,
 			       },
 			       {
 			         altitude: 350,
 			         inclination: 35,
 			         eccentricity: 0,
 			         value: 27.74518312792918,
 			       },
 			       {
 			         altitude: 350,
 			         inclination: 40,
 			         eccentricity: 0,
 			         value: 34.993924665856625,
 			       },
 			       {
 			         altitude: 400,
 			         inclination: 30,
 			         eccentricity: 0,
 			         value: 16.747092518659954,
 			       },
 			       {
 			         altitude: 400,
 			         inclination: 35,
 			         eccentricity: 0,
 			         value: 29.744835965978133,
 			       },
 			       {
 			         altitude: 400,
 			         inclination: 40,
 			         eccentricity: 0,
 			         value: 37.49349071341781,
 			       },
 			     ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map(e => e.altitude),
 			       y: modelData.map(e => e.inclination),
 			       z: modelData.map(e => e.value / 60), //DIVIDE BY 60 TO CONVERT SECONDS -> MINUTES
 			       type: 'scatter3d',
 			       mode: 'markers',
 			       marker: { color: markColor, size: 4 }
				}];
 			   const layout = {
 			       width: 500,
 			       height: 400,
 			       paper_bgcolor: bgColor,
 			       plot_bgcolor: bgColor,
 			       font: { color: textColor },
 			       showlegend: false,
				  scene: { xaxis: { title: 'Altitude' }, yaxis: { title: 'Inclination' }, zaxis: { title: 'Coverage' } }
 			   };
 			 const graph={ data, layout, config: { displayModeBar: false } };
			 const table=undefined
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Max Coverage Duration (minutes)",
			value: 0,
			accordionContent: `
 			 const graph=undefined;
			 const table={
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Average Gap (minutes)",
			value: 5760.50,
			accordionContent: `
			 			 const modelData = [
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 1440,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5370,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 59400,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5430,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5310,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 65070,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(0,0,255)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.duration / 60),
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
			 const table=undefined
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Max Gap (minutes)",
			value: 5760.50,
			accordionContent: `
			const graph= undefined
			 const table={
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Mean Response Time (minutes)",
			value: 2880.25,
			accordionContent: `
			const modelData = [
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 1440,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5370,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 59400,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5430,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5310,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 65070,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(0,255,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.duration / 60),
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
			 const table=undefined
			const returnData = {graph, table}
 			return returnData;
			`
		},
		{
			name: "Data Rate (Mbps)",
			value: 64
		},
		{
			name: "Throughput (Gb/day)",
			value: 0.13
		}
	]
};

const performanceAntennaData: PerformancePanelMap = {
	category: "User Burden: Antenna Options",
	filteredValues: {
		frequencyBand: 'ka-band'
	},
	performanceData: [
		{
			name: "EIRP (dBW)",
			value: 0.00,
			clickableContent: {
				title: 'test',
				content: `Insert some component here...`
			}
		},
		{
			name: "Parabolic Antenna Diameter (m)",
			value: 0.03
		},
		{
			name: "Parabolic Antenna Mass (kg)",
			value: 0.00,
		},
		{
			name: "Electronically Steerable Antenna Size (m²)",
			value: 0.01,
			clickableContent: {
				title: 'test',
				content: `Insert some component here...`
			}
		},
		{
			name: "Helical Antenna Height (m)",
			value: 0.01,
		},
		{
			name: "Patch Antenna Size (m²)",
			value: 1.75,
			clickableContent: { title: 'test', content: `Insert some component here...` }
		},
		{
			name: "Dipole Antenna Size (m)",
			value: 0.04,
		}
	]
};

const performanceNavTrackingData: PerformancePanelMap = {
	category: "Nav and Tracking",
	filteredValues: {
		frequencyBand: 's-band'
	},
	performanceData: [
		{
			name: "Tracking Accuracy (m)",
			value: 'N/A'
		},
		{
			name: "GNSS Availability",
			value: 'Yes'
		}
	]
};
export const filters: FilterInfo[] = [
	{
		name: 'Frequency Band',
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
	const category = "Custom Data";
	const filteredValues = {
			frequencyBand: 'x-band'
		};
	const performanceData = [
		{
			name: "RF Coverage (min/day)",
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
        	      name: "Ohio",
        	      id: 67,
        	      duration: 1440,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5370,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 59400,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5430,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5310,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 65070,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	    {
        	      name: "Ohio",
        	      id: 67,
        	      duration: 5340,
        	    },
        	  ]

 			 const bgColor = "white";
 			 const textColor = "black";
 			 const markColor = "rgb(255,0,0)";

 			   const data = [{
 			       x: modelData.map((e, i) => i),
 			       y: modelData.map(e => e.duration / 60),
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
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			\`
		},
		{
			name: "Contacts Per Day",
			value: 0,
			accordionContent: \`
			const graph = undefined;
			const table={
			 	header: ['Station', 'Antenna', 'Coverage Per Day (min)'],
				body: [
				  ['Stockholm', 'ST1 S-Band Rx Service', 23.75],
				  ['Oregon', 'OR1 S-Band Rx Service', 19.50],
				  ['Ohio', 'OH1 S-Band Rx Service', 13.75]
				]
			 }
			const returnData = {graph, table}
 			return returnData;
			\`
		},
		{
			name: "EIRP (dBW)",
			value: 0.00,
			clickableContent: {
				title: 'test',
				content: \`Insert some component here...\`
			}
		},
		{
			name: "Parabolic Antenna Diameter (m)",
			value: 0.03
		}
	]

	const returnData={category, filteredValues, performanceData}
	return returnData;
`
