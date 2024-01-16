/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const baseFontSize = 0.875;
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontSize: {
			sm: `${baseFontSize * 0.8}rem`,
			base: `${baseFontSize}rem`,
			xl: `${baseFontSize * 1.25}rem`,
			"2xl": `${baseFontSize * 1.563}rem`,
			"3xl": `${baseFontSize * 1.953}rem`,
			"4xl": `${baseFontSize * 2.441}rem`,
			"5xl": `${baseFontSize * 3.052}rem`,
		},
		fontFamily: {
			almarai: ["Quicksand", "sans-serif"],
		},
		container: {
			center: true,
			padding: "1rem",
			screens: {
				lg: "1240px",
			},
		},
		extend: {
			colors: {
				primary: { ...colors.orange, DEFAULT: colors.orange[500] },
			},
		},
	},
	plugins: [],
};
