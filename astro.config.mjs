import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://danielleackerman.github.io',
  base: '/chaos-portal',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
