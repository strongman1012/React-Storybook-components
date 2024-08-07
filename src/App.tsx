import React from 'react';
import 'devexpress-gantt/dist/dx-gantt.css';
import { FC, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import TestDashboard from './components/TestDashboard';
import { THEMES } from './utills/constatnts/general';
import MuiThemes from './utills/styles/theme';
import themes from 'devextreme/ui/themes';
import { refreshTheme } from "devextreme/viz/themes";

const App: FC = () => {

	const [themeName, setThemeName] = useState<string>(THEMES.LIGHT);
	const [currentTheme, setCurrentTheme] = useState(MuiThemes.light);

	useEffect(() => {
		const newTheme = themeName === THEMES.DARK ? MuiThemes.dark : MuiThemes.light;
		setCurrentTheme(newTheme);
		changeDvExpressTheme(themeName);
	}, [themeName]);

	/**
	 * Handle Change Theme
	 * @param name 
	 */
	const handleChangeTheme = (name: string) => {
		setThemeName(name);
		changeDvExpressTheme(name);
	}

	/**
	 * Handle DevExpress Theme
	 */
	const changeDvExpressTheme = (name: string) => {
		name === THEMES.DARK ? themes.current('generic.dark') : themes.current('generic.light');
		refreshTheme();
	}

	return (
		<>
			<ThemeProvider theme={currentTheme}>
				<TestDashboard themeName={themeName} onChangeTheme={handleChangeTheme} />
			</ThemeProvider>
		</>
	);
}

export default App;
