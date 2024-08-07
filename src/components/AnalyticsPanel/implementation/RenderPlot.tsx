/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { Theme, useTheme } from '@material-ui/core';
import React from 'react';
import AnalyticsPanel from 'src/components/AnalyticsPlot/implementation';
import { AnalyticsStructure } from 'src/components/AnalyticsPlot/types/types';
import DialogAlert from 'src/components/DialogAlert/implementation/DialogAlert';
import { AnalyticsTraces } from '../types/types';
import vm from 'vm-browserify';

interface RenderPlotProps {
	performancePanel: any,
	traces: AnalyticsTraces | {}
	plotFilters: string[]
	scripts: scriptType[]
	onDeselect: (name: string) => void
}

export interface scriptType {
	id: number;
	name: string;
	ext: string;
	script: string
	plotObj?: AnalyticsStructure;
}

const RenderPlot: FC<RenderPlotProps> = ({ performancePanel, traces, plotFilters, scripts, onDeselect }) => {

	const theme = useTheme<Theme>();
	const [scriptError, setScriptError] = useState(false);
	const [filterScript, setFilterScript] = useState<scriptType[]>([]);


	useEffect(() => {
		const filterScriptTemp: scriptType[] = [];
		if (plotFilters.length > 0) {
			plotFilters.forEach((name) => {
				const script = scripts.find((x) => x.name === name);
				if (script !== undefined) {
					try {
						const bgColor = theme.palette.primary.light;
						const textColor = theme.palette.text.primary;
						let scriptSandbox = new vm.Script(script.script);
						const sandbox = { createGraph: null, console: console };
						scriptSandbox.runInNewContext(sandbox, { timeout: 12 });
						// @ts-ignore
						const scriptOutput = sandbox.createGraph(
							performancePanel, traces, bgColor, textColor
						);
						if (scriptOutput !== undefined) {
							script.plotObj = scriptOutput
						}
						else {
							setScriptError(true);
							onDeselect(script.name);
						}
					}
					catch {
						setScriptError(true);
						if (script.name.length > 0) {
							onDeselect(script.name);
						}
						console.error(
							`There was an error while running the selected script: ${script.name}. If this was a custom script, please check your code and try again`,
							false,
							'Failed to run script'
						);
						// show a warning dialog saying something like 'An error was detected in the selected script
						// de-select the script and remove it from the list of selected scripts
					}
				}
				script?.plotObj !== undefined && filterScriptTemp.push(script);
			});
			filterScriptTemp && setFilterScript(filterScriptTemp);
		}
		else {
			setFilterScript([]);
		}

	}, [plotFilters]);

	return (
		<>
			{filterScript.map((script) => {
				return (
					<>
						{script.plotObj !== undefined &&
							<div key={script.id}>
								<AnalyticsPanel
									data={script.plotObj}
								/>
							</div>
						}
					</>
				);
			})}
			<DialogAlert
				isOpen={scriptError}
				onOpen={() => setScriptError(false)}
				title={'Error'}
				message={'There was an error while running the selected script. If this was a custom script, please check your code and try again'}
			/>
		</>
	);
};

export default RenderPlot;