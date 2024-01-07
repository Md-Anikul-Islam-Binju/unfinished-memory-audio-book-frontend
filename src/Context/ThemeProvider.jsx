/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light')
	const [selectedLanguage, setSelectedLanguage] = useState(
		localStorage.getItem('language') || 'bn'
	);

	const handleLanguageChange = (code) => {
		setSelectedLanguage(code);
		localStorage.setItem('language', code);
	};
	
	useEffect(() => {
		if (localStorage.getItem('theme') === null) {
			localStorage.setItem('theme', 'light');
		}
	}, []);
	useEffect(() => {
		const html = document.querySelector('html');
		if (localStorage.getItem('theme') === 'dark') {
			html.classList.add('dark');
			setTheme('dark');
		} else {
			html.classList.remove('dark');
			setTheme('light');
		}
	}, [theme]);

	const handleThemeSwitch = () => {
		if (localStorage.getItem('theme') === 'light') {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			setTheme('light');
			localStorage.setItem('theme', 'light');
		}
	};

	const themeInfo = {
		theme,
		setTheme,
		handleLanguageChange,
		selectedLanguage,
		setSelectedLanguage,
		handleThemeSwitch
	}
	return (
		<ThemeContext.Provider value={ themeInfo }>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider