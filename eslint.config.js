import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-config-prettier';
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import parser from '@typescript-eslint/parser';

const pluginNuxt = await createConfigForNuxt();

export default [
	// DO NOT CHANGE ORDER OF PLUGINS
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	...pluginNuxt,
	pluginPrettier,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: parser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		rules: {
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
		},
	},
	{
		ignores: ['node_modules/*', 'package-lock.json'],
	},
	{
		rules: {
			'vue/no-multiple-template-root': 'off',
			'vue/valid-v-slot': 'off',
		},
	},
	{
		files: ['**/*.vue', 'composables/*', 'middleware/*'],
		rules: {
			'no-undef': 'off',
		},
	},
	{
		files: ['pages/*.vue', 'layouts/*.vue'],
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},
	{
		files: [
			'styles/vuetify/themes/colors.js',
			'styles/vuetify/vuetifyDefaultProvider.ts',
		],
		rules: {
			'sort-keys': ['error', 'asc'],
		},
	},
];
