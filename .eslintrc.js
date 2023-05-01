// eslint-disable-next-line no-undef
module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"plugin:vue/recommended",
	],
	"overrides": [
	],
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"vue/multi-word-component-names": 0,
		"vue/valid-v-for": "off",
		"vue/no-unused-vars": "off",
		"vue/valid-v-model": "off",
		"vue/no-side-effects-in-computed-properties": "off",
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
	}
}
