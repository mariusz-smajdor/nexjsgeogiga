import baseConfig from '@geogiga/eslint-config/base-config';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	...baseConfig,
	{
		languageOptions: {
			globals: globals.node,
		},
	},
]);
