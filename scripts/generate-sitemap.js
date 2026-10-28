import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://maxcnfront.vercel.app';

const routes = [
  { url: '/', priority: '1.00', changefreq: 'daily' },
  { url: '/about', priority: '0.80', changefreq: 'monthly' },
  { url: '/contact', priority: '0.80', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.70', changefreq: 'monthly' },
  { url: '/terms-of-service', priority: '0.70', changefreq: 'monthly' },
  { url: '/docs', priority: '0.90', changefreq: 'weekly' },
  { url: '/solutions/api-health', priority: '0.80', changefreq: 'weekly' },
  { url: '/solutions/sla-governance', priority: '0.80', changefreq: 'weekly' },
  { url: '/solutions/revenue-shield', priority: '0.80', changefreq: 'weekly' },
  { url: '/tools/roi-calculator', priority: '0.90', changefreq: 'weekly' }
];

const now = new Date().toISOString();

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .map(
    route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicPath, sitemapContent, 'utf-8');
console.log(`Successfully generated sitemap at: ${publicPath} with ${routes.length} canonical URLs.`);
