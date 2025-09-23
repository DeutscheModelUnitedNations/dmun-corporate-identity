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
						exports: 'named',
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
					outDir: 'lib',
					tsconfigPath: './tsconfig.lib.json'
				})
			],
			esbuild: {
				tsconfigRaw: JSON.stringify({
					compilerOptions: {
						target: 'ES2020',
						module: 'ESNext',
						moduleResolution: 'node',
						lib: ['ES2020'],
						declaration: true,
						declarationMap: true,
						outDir: './lib',
						rootDir: './src',
						strict: true,
						esModuleInterop: true,
						allowSyntheticDefaultImports: true,
						forceConsistentCasingInFileNames: true,
						skipLibCheck: true,
						resolveJsonModule: true,
						allowJs: false,
						noEmit: false,
						isolatedModules: true,
						verbatimModuleSyntax: false
					},
					include: ['src/**/*'],
					exclude: [
						'node_modules',
						'dist',
						'lib',
						'**/*.test.ts',
						'**/*.spec.ts',
						'src/routes',
						'src/app.html',
						'src/app.css'
					]
				})
			}
		};
	}

	// Default SvelteKit configuration for development
	return {
		plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
	};
});
