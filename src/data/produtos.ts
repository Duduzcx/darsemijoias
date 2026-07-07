import type { Produto } from './types'

// Fotos reais (banco gratuito, uso comercial livre). Troque pelas fotos do
// catálogo real do cliente quando estiverem disponíveis — mesma estrutura.
function foto(id: string) {
  return `https://images.unsplash.com/${id}?w=1000&h=1000&fit=crop&auto=format&q=80`
}

export const PRODUTOS: Produto[] = [
  {
    id: 'anel-ouro-rose',
    nome: 'Anel Ouro Rosé Solitário',
    categoria: 'aneis',
    preco: 289.9,
    descricao:
      'Anel folheado a ouro rosé com zircônia central lapidação brilhante. Peça delicada para uso diário ou ocasiões especiais.',
    detalhes: ['Folheado a ouro rosé 18k', 'Zircônia central 5mm', 'Aro ajustável', 'Antialérgico'],
    imagens: [
      foto('photo-1622398925373-3f91b1e275f5'),
      foto('photo-1598560917807-1bae44bd2be8'),
      foto('photo-1705326455036-0fab8ecba04d'),
    ],
    destaque: true,
    novo: true,
    estoque: true,
  },
  {
    id: 'anel-duplo-ouro',
    nome: 'Anel Duplo Ouro Amarelo',
    categoria: 'aneis',
    preco: 219.9,
    descricao: 'Anel de duas camadas entrelaçadas, acabamento fosco e brilhante em contraste.',
    detalhes: ['Folheado a ouro 18k', 'Acabamento misto fosco/brilho', 'Aro 15 ao 22'],
    imagens: [foto('photo-1631982690223-8aa4be0a2497'), foto('photo-1543294001-f7cd5d7fb516')],
    estoque: true,
  },
  {
    id: 'colar-ponto-luz',
    nome: 'Colar Ponto de Luz',
    categoria: 'colares',
    preco: 179.9,
    precoAntigo: 229.9,
    descricao:
      'Colar clássico com pingente de zircônia, corrente cartier fina. Combina com qualquer look, do casual ao social.',
    detalhes: ['Folheado a ouro 18k', 'Corrente 45cm + extensor', 'Pingente zircônia 4mm'],
    imagens: [
      foto('photo-1611107683227-e9060eccd846'),
      foto('photo-1705326454924-f6777522b030'),
      foto('photo-1569397288884-4d43d6738fbd'),
    ],
    destaque: true,
    estoque: true,
  },
  {
    id: 'colar-camada-dupla',
    nome: 'Colar Camadas Duplas',
    categoria: 'colares',
    preco: 249.9,
    descricao: 'Duas correntes sobrepostas de espessuras diferentes, tendência atual de layering.',
    detalhes: ['Folheado a ouro 18k', 'Correntes 40cm e 45cm', 'Fecho reforçado'],
    imagens: [foto('photo-1685970731194-e27b477e87ba'), foto('photo-1601121141461-9d6647bca1ed')],
    novo: true,
    estoque: true,
  },
  {
    id: 'brinco-argola-media',
    nome: 'Brinco Argola Média Texturizada',
    categoria: 'brincos',
    preco: 149.9,
    descricao: 'Argola média com textura martelada artesanal, leve para uso o dia todo.',
    detalhes: ['Folheado a ouro 18k', 'Diâmetro 3cm', 'Fecho click seguro'],
    imagens: [foto('photo-1767210338407-54b9264c326b'), foto('photo-1638854254875-a2416fe0fec2')],
    estoque: true,
  },
  {
    id: 'brinco-perola-vitor',
    nome: 'Brinco Pérola Vitoriano',
    categoria: 'brincos',
    preco: 169.9,
    descricao: 'Brinco inspirado no design vitoriano, pérola sintética premium e base cravejada.',
    detalhes: ['Folheado a ouro 18k', 'Pérola sintética 8mm', 'Fecho borboleta'],
    imagens: [
      foto('photo-1761479267937-4c5c7a903760'),
      foto('photo-1758995115555-766abbd9a491'),
      foto('photo-1769078595478-5f756986b818'),
    ],
    destaque: true,
    estoque: true,
  },
  {
    id: 'pulseira-riviera',
    nome: 'Pulseira Riviera Cravejada',
    categoria: 'pulseiras',
    preco: 199.9,
    descricao: 'Pulseira riviera com zircônias cravejadas em toda a extensão, brilho contínuo.',
    detalhes: ['Folheado a ouro 18k', '18cm + extensor 3cm', 'Zircônias AAA'],
    imagens: [foto('photo-1689397136362-dce64e557fcc'), foto('photo-1744472457504-f99a96ecbd3e')],
    estoque: true,
  },
  {
    id: 'pulseira-elos-ouro',
    nome: 'Pulseira Elos Cadeado',
    categoria: 'pulseiras',
    preco: 229.9,
    descricao: 'Elos grossos estilo cadeado, tendência statement para compor looks minimalistas.',
    detalhes: ['Folheado a ouro 18k', '19cm ajustável', 'Fecho reforçado'],
    imagens: [foto('photo-1602173574767-37ac01994b2a'), foto('photo-1655707063092-5c4509de41b8')],
    novo: true,
    estoque: false,
  },
  {
    id: 'oculos-aviador-dourado',
    nome: 'Óculos Aviador Dourado',
    categoria: 'oculos',
    preco: 259.9,
    descricao: 'Clássico aviador com armação dourada e lente degradê. Proteção UV400.',
    detalhes: ['Armação metal dourado', 'Lente degradê UV400', 'Acompanha estojo'],
    imagens: [foto('photo-1567473810954-507d59716c25'), foto('photo-1511499767150-a48a237f0083')],
    destaque: true,
    estoque: true,
  },
  {
    id: 'oculos-gatinho-preto',
    nome: 'Óculos Gatinho Preto Fosco',
    categoria: 'oculos',
    preco: 219.9,
    descricao: 'Formato gatinho com acabamento fosco, lente solar preta. Ideal para rosto redondo ou quadrado.',
    detalhes: ['Armação acetato', 'Lente solar preta UV400', 'Acompanha estojo e flanela'],
    imagens: [foto('photo-1584036553516-bf83210aa16c'), foto('photo-1611222777277-61319d63ca94')],
    novo: true,
    estoque: true,
  },
  {
    id: 'oculos-quadrado-tartaruga',
    nome: 'Óculos Quadrado Tartaruga',
    categoria: 'oculos',
    preco: 239.9,
    precoAntigo: 279.9,
    descricao: 'Armação quadrada em acetato tartaruga, lente marrom degradê. Visual atemporal.',
    detalhes: ['Armação acetato tartaruga', 'Lente marrom degradê UV400', 'Acompanha estojo'],
    imagens: [foto('photo-1577803645773-f96470509666'), foto('photo-1610136649349-0f646f318053')],
    estoque: true,
  },
  {
    id: 'oculos-redondo-fine',
    nome: 'Óculos Redondo Fine Metal',
    categoria: 'oculos',
    preco: 189.9,
    descricao: 'Armação redonda fina metálica, estilo retrô minimalista, lente cinza clássica.',
    detalhes: ['Armação metal fino', 'Lente cinza UV400', 'Acompanha estojo'],
    imagens: [foto('photo-1502767089025-6572583495f9'), foto('photo-1589642380614-4a8c2147b857')],
    estoque: true,
  },
]

export function getProdutoPorId(id: string) {
  return PRODUTOS.find((p) => p.id === id)
}

export function getRelacionados(produto: Produto, limite = 4) {
  return PRODUTOS.filter((p) => p.categoria === produto.categoria && p.id !== produto.id).slice(0, limite)
}

export function getDestaques() {
  return PRODUTOS.filter((p) => p.destaque)
}
