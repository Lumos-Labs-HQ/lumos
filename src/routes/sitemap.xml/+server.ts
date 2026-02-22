export async function GET() {
	const baseUrl = 'https://lumoslab.tech';
	const pages = [
		{ url: '', changefreq: 'weekly', priority: '1.0' },
		{ url: '/about', changefreq: 'monthly', priority: '0.8' },
		{ url: '/blog', changefreq: 'weekly', priority: '0.9' },
		{ url: '/blog/new', changefreq: 'monthly', priority: '0.7' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
