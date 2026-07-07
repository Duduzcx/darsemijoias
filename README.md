# DAR SEMIJOIAS — Vitrine Online

Site vitrine para loja de semijoias e óculos. Stack: React 19 + Vite + TypeScript + Tailwind 4, com Framer Motion para as micro-interações e Supabase preparado (mas não obrigatório ainda) para os dados.

## Como rodar

```bash
npm install
npm run dev
```

## Direção visual

Paleta branca/editorial (fundo branco, tinta quase-preta, acento camel discreto), tipografia enxuta, navegação em texto simples com sublinhado no item ativo, hover trocando a foto do produto — inspirado em grandes varejistas de moda (Zara e similares).

## O que já funciona

- **Menu lateral fixo** (desktop) com "Início" + categorias, WhatsApp e Instagram; vira um drawer animado no mobile.
- **~100 produtos** de exemplo (20 por categoria), cada um com nome, descrição, preço, detalhes e 3 imagens.
- **Animações**: transição entre páginas, entrada escalonada dos cards no grid, indicador animado no filtro de categoria, drawer do menu mobile deslizando.
- **Hero** com a peça de destaque como imagem de capa + CTA "Ver coleção completa".
- **Vitrine** (Home) com filtro por categoria em abas de texto.
- **Página de categoria** (/categoria/aneis, /categoria/oculos, etc).
- **Página de produto** (/produto/:id) com galeria de imagens, descrição, detalhes e botão Comprar pelo WhatsApp — já manda o nome e preço da peça na mensagem.
- **Produtos relacionados** (mesma categoria) abaixo do produto.
- **Botão flutuante de WhatsApp** em todas as páginas.
- Hover troca a foto do produto pela segunda imagem do catálogo (efeito clássico de e-commerce de moda).

## Sobre as imagens

As fotos usadas agora são reais, de banco gratuito (Unsplash, licença de uso comercial livre, sem necessidade de atribuição) — não são mais placeholders de texto. Ainda assim são fotos de estoque, não do catálogo real do cliente. Antes de divulgar o site publicamente para venda, troque pelas fotos reais das peças (mesma estrutura em `src/data/produtos.ts`).

## Trocar pelos dados reais do cliente

1. Abra `src/config/site.ts` e confirme/ajuste nome da loja, WhatsApp, Instagram, endereço e horário.
2. Abra `src/data/produtos.ts` e substitua o array `PRODUTOS` pelos produtos reais (nome, preço, descrição, imagens).
3. (Opcional, quando quiser sair do mock) Crie uma tabela `produtos` no Supabase com os mesmos campos de `src/data/types.ts`, preencha `.env` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, e troque as chamadas de `PRODUTOS` pelas queries via `src/lib/supabase.ts`.

## Estrutura

```
src/
  components/    # Header, Footer, ProductCard, ProductGrid, ProductGallery, RelatedProducts, CategoryFilter, WhatsAppFloating, Hero
  pages/         # Home, CategoriaPage, ProductPage
  data/          # types.ts (modelo de Produto) e produtos.ts (mock com fotos reais)
  config/        # site.ts (nome da loja, whatsapp, redes)
  lib/           # supabase.ts (stub) e format.ts (formatação de preço)
```

## Próximos passos sugeridos

- Substituir fotos de estoque pelas fotos reais das peças do cliente.
- Migrar PRODUTOS para o Supabase quando o catálogo estiver maior.
- Deploy via Netlify.


## Área restrita (admin)

Acesse `/admin` no site para logar. Senha padrão definida em `src/config/admin.ts` (**troque antes de divulgar o site**).

O que dá pra fazer lá dentro:

- **Produtos**: criar, editar e excluir peças — nome, categoria, preço, promoção (preço antigo), descrição, detalhes, fotos, destaque/novo/estoque. Tudo que é editado no painel aparece na hora no site (mesmo estado compartilhado).
- **Fechamentos**: como a compra acontece pelo WhatsApp (fora do site), não tem como capturar a venda automaticamente. Por isso essa aba existe: depois de fechar uma venda no WhatsApp, registre aqui (produto, quantidade, valor, data).
- **Relatórios**: gráficos gerados a partir dos fechamentos — quantidade vendida por produto, faturamento por categoria, faturamento por produto, mais vendido, total do período.

**Importante sobre a persistência:** por enquanto os dados (produtos e fechamentos) ficam salvos no navegador (localStorage), não em um banco de dados. Funciona bem para uso individual, mas não sincroniza entre computadores/celulares diferentes, e limpar os dados do navegador apaga tudo. Quando quiser evoluir para algo multi-dispositivo de verdade, o caminho é migrar para Supabase (mesmo padrão do painel da Neve na Nave) — te aviso quando for a hora.

**Importante sobre segurança:** a senha do admin é checada no próprio navegador, então não é proteção real — é só pra evitar que qualquer visitante mexa no catálogo. Não é o suficiente para dados sensíveis de verdade (isso pediria Supabase Auth).
