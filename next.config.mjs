import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(import.meta.dirname, 'src', 'styles')],
	},
};

export default nextConfig;
