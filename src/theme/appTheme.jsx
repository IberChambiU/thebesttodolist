import { createContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { getDesignTokens } from "./theme";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const AppTheme = ({ children }) => {

	const [mode, setMode] = useState('light');

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		if (darkModeMediaQuery.matches) {
			setMode('dark');
		} else {
			setMode('light');
		}
	}, []);


	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
