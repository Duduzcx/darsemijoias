// Gera public/sitemap.xml antes do build, a partir do catálogo mock em src/data/produtos.ts.
// Troque SITE_URL pelo domínio real do site.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const SITE_URL = 'https://darsemijoias.netlify.app'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CATEGORIAS = ['aneis', 'colares', 'brincos', 'pulseiras', 'oculos']
const POR_CATEGORIA = 20

const produtoIds = []
for (const categoria of CATEGORIAS) {
  for (let i = 0; i < POR_CATEGORIA; i++) {
    produtoIds.push(`${categoria}-${String(i + 1).padStart(2, '0')}`)
  }
}

const urls = [
  { loc: '/', priority: '1.0' },
  ...CATEGORIAS.map((slug) => ({ loc: `/categoria/${slug}`, priority: '0.8' })),
  ...produtoIds.map((id) => ({ loc: `/produto/${id}`, priority: '0.6' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml gerado com ${urls.length} URLs`)
