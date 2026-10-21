import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  webpack: (config, { webpack, isServer }) => {
    // Next ships polyfills for Array.prototype.at/flat, Object.fromEntries and similar. The browserslist
    // in package.json only targets browsers that already have them, so drop the polyfill module from the client bundle.
    if (!isServer) {
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(/build[\/]polyfills[\/]polyfill-module/, path.join(here, 'src/lib/empty-polyfill.js')));
    }
    return config;
  },
};
export default nextConfig;
