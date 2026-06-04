import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
	},
	server: {
		open: true,
		// port: 3000,
		headers: {
			'Cross-Origin-Embedder-Policy': 'unsafe-none',
			'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
			'Cross-Origin-Resource-Policy': 'cross-origin'
		}
	},
	build: {
		target: 'es2020',
		outDir: 'dist',
		sourcemap: false,
		minify: 'esbuild'
	},
	plugins: [react()],
});
