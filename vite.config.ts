import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { ROUTES } from './src/lib/routes';

/**
 * Search and share extras, written at build time. The site's address comes from
 * SITE_URL, or on Vercel from its production domain. With an address, it makes
 * the share-card image URLs absolute (WhatsApp and LinkedIn need that) and adds a
 * sitemap; robots.txt is always written.
 */
function seo(siteUrl: string | undefined): Plugin {
  const base = siteUrl?.replace(/\/$/, '');
  return {
    name: 'auv-seo',
    apply: 'build',
    transformIndexHtml(html) {
      if (!base) return html;
      return html
        .replace(/content="\/og-image\.jpg"/g, `content="${base}/og-image.jpg"`)
        .replace('</head>', `  <link rel="canonical" href="${base}/" />\n</head>`);
    },
    generateBundle() {
      const lines = ['User-agent: *', 'Allow: /'];
      if (base) {
        lines.push(`Sitemap: ${base}/sitemap.xml`);
        const urls = Object.keys(ROUTES)
          .map((route) => `  <url><loc>${base}${route === '/' ? '/' : route}</loc></url>`)
          .join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: lines.join('\n') + '\n' });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      seo(env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) || undefined),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
