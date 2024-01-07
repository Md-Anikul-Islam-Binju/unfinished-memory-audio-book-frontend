/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'sm': '576px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px'
		},
		extend: {
			keyframes: {
				"shimmer": {
					"100%": {
						"transform": "translateX(100%)",
					},
				},
			},
			fontFamily: {
				'hindSiliguri': ['Hind Siliguri', 'sans-serif'],
				'openSans': ['Open Sans', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'solaimanLipi': ['SolaimanLipi', 'sans-serif'],
			},
			colors: {
				// ? Text and Border Color
				'theme-body-text': 'rgba(47, 47, 60, 0.8)',
				'theme-heading-text': 'rgba(47, 47, 60, 1)',
				'theme-menu-link': 'rgb(47 47 60 / 73%)',
				'theme-border': '#D9D9D9',
				'theme-white': '#fff',
				'theme-black': '#000',
				'theme-dark': '#1e293b',
				// ? Books Color 
				'theme-books-bn': '#E6EDDD',
				'theme-books-en': '#EFE7D6',
				// ? Line Highlight Color
				'theme-line-highlight': '#FEFD0C',
				// ? Bookmark Icon Color
				'theme-bookmark-icon': '#E6332E',
				// ? Language Switcher Color
				'theme-lang-switcher': '#0094FF',
			},
			borderWidth: {
				'theme-border-1': '1px'
			},
			boxShadow: {
				'theme-book-shadow': '6px 6px 10px 0px rgba(0, 0, 0, 0.15)',
				'theme-chapter-shadow': '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
				'theme-search-shadow': '0px 8px 22px 0px rgba(0, 0, 0, 0.10)',
			},
			backgroundImage: {
				'notFound': "url('/assets/images/notfound.jpg')"
			}
		},
	},
	plugins: [],
}