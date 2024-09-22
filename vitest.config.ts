import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		setupFiles: ['./tests/vitest.setup.ts'],
		environment: 'jsdom',
	},
});
