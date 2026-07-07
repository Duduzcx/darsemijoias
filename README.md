# ÁUREA — Vitrine Online (Joias & Óculos)

Site vitrine para loja de joias e óculos. Stack: React 19 + Vite + TypeScript + Tailwind 4, com Framer Motion para as micro-interações e Supabase preparado (mas não obrigatório ainda) para os dados.

## Como rodar

```bash
npm install
npm run dev
```

## O que já funciona

- **Menu profissional** (Header) com categorias, responsivo, com versão mobile em drawer.
- **Vitrine** (Home) com faixa de destaques + grid completo, filtro por categoria.
- **Página de categoria** (/categoria/aneis, /categoria/oculos, etc).
- **Página de produto** (/produto/:id) com galeria de imagens, descrição, detalhes e botão Comprar pelo WhatsApp — já manda o nome e preço da peça na mensagem.
- **Produtos relacionados** (mesma categoria) abaixo do produto.
- **Botão flutuante de WhatsApp** em todas as páginas.
- Efeito de "brilho de vitrine" no hover dos cards (assinatura visual do site).

## Trocar pelos dados reais do cliente

1. Abra src/config/site.ts e troque nome da loja, WhatsApp, Instagram, endereço e horário.
2. Abra src/data/produtos.ts e substitua o array PRODUTOS pelos produtos reais (nome, preço, descrição, imagens). As imagens hoje são placeholders (placehold.co) — troque pelas URLs reais das fotos.
3. (Opcional, quando quiser sair do mock) Crie uma tabela produtos no Supabase com os mesmos campos de src/data/types.ts, preencha .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY, e troque as chamadas de PRODUTOS pelas queries via src/lib/supabase.ts.

## Estrutura

```
src/
  components/    # Header, Footer, ProductCard, ProductGrid, ProductGallery, RelatedProducts, CategoryFilter, WhatsAppFloating, Hero
  pages/         # Home, CategoriaPage, ProductPage
  data/          # types.ts (modelo de Produto) e produtos.ts (mock)
  config/        # site.ts (nome da loja, whatsapp, redes)
  lib/           # supabase.ts (stub) e format.ts (formatação de preço)
```

## Próximos passos sugeridos

- Substituir imagens placeholder pelas fotos reais do cliente (idealmente quadradas, fundo neutro).
- Migrar PRODUTOS para o Supabase quando o catálogo estiver maior.
- Deploy via Netlify (mesmo fluxo do projeto anterior).
