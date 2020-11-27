const defaultTheme = require('tailwindcss/defaultConfig').theme;

module.exports = {
	theme: {
		extend: {
			fontSize: {
				'7xl': '6rem',
				title: '9rem'
			}
		},
		fontFamily: {
			sans: ['Cabin', ...defaultTheme.fontFamily.sans]
		}
	},
	purge: false,
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	}
};
