import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// Add the keyframes for the blink animation
			keyframes: {
				blink: {
					"0%": { opacity: "0" },
					"10%": { opacity: "1" },
					"20%": { opacity: "0" },
					"30%": { opacity: "1" },
					"40%": { opacity: "0" },
					"50%": { opacity: "1" },
					"60%": { opacity: "0" },
					"70%": { opacity: "1" },
					"80%": { opacity: "0" },
					"90%": { opacity: "1" },
				},
				scaleUp: {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				scaleDown: {
					"0%": { transform: "scale(1.1)", opacity: "1" },
					"100%": { transform: "scale(1)", opacity: "0" },
				},
			},
			// Add the animation class
			animation: {
				blink: "blink 5s infinite steps(1)",
				scaleUp: "scaleUp 0.3s cubic-bezier(0.25,0.1,0.25,1) forwards",
				scaleDown: "scaleDown 0.3s cubic-bezier(0.25,0.1,0.25,1) forwards",
			},
			transitionTimingFunction: {
				easy: "cubic-bezier(0.25,0.1,0.25,1)",
			},
			fontFamily: {
				serif: ['Tobias', ...defaultTheme.fontFamily.serif],
			},
			colors: {
				uppbeat: '#F23D75',
			},
		},
	},
	plugins: [require('@tailwindcss/container-queries')],
}
