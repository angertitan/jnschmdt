module.exports = {
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-standard',
		'stylelint-prettier/recommended'
	],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer']
			}
		],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null
	}
};
