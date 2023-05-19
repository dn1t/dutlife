import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import mixPlugin, { vercelAdapter } from 'vite-plugin-mix';
import type { Adapter } from 'vite-plugin-mix';

interface MixConfig {
  handler: string;
  adapter?: Adapter | undefined;
}

type MixPlugin = (config: MixConfig) => Plugin;

interface Mix {
  default: MixPlugin;
}

const mix = (mixPlugin as unknown as Mix).default;

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    mix({ handler: './src/handler.ts', adapter: vercelAdapter() }),
  ],
});
