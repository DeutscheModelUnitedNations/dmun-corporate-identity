import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
	if (mode === 'lib') {
		// Library build configuration
		return {
			build: {
				lib: {
					entry: resolve(__dirname, 'src/index.ts'),
					name: 'DMUNCorporateIdentity',
					formats: ['es', 'cjs'],
					fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
				},
				rollupOptions: {
					external: ['fs', 'path', 'url', 'js-yaml'],
					output: {
						globals: {
							'js-yaml': 'jsyaml'
						}
					}
				},
				outDir: 'lib'
			},
			plugins: [
				dts({
					insertTypesEntry: true,
					outDir: 'lib'
				})
			]
		};
	}

	// Default SvelteKit configuration for development
	return {
		plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
	};
});
