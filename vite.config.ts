import { defineConfig } from 'vite';
import { resolve } from 'path';

function multiPageRewritePlugin() {
  return {
    name: 'multi-page-rewrite',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url?.split('?')[0];
        const pages = ['about', 'gallery', 'location', 'contact'];
        for (const page of pages) {
          if (rawUrl === `/${page}` || rawUrl === `/${page}/`) {
            req.url = `/${page}/index.html`;
            break;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [multiPageRewritePlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        location: resolve(__dirname, 'location/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
});
