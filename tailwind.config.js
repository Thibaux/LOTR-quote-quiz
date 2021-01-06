module.exports = {
	purge: ['./public/index.html', './src/**/*.{vue,js}'],
	darkMode: false,
	theme: {
		extend: {
			backgroundImage: theme => ({
				'hero': "url('./assets/bg.jpg')",
				'git': "url('./assets/GitHub-Mark.png')",
				'linked': "url('./assets/linkedin-logo.png')",
			})
		}
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}