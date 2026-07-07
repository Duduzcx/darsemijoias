import type { Categoria, Produto } from './types'

// Fotos reais (banco gratuito, uso comercial livre). Cada categoria tem um
// pool de fotos que é reaproveitado entre as peças — normal em catálogos
// mock. Troque pelas fotos reais do cliente em src/data/produtos.ts quando
// estiverem disponíveis (mesma estrutura, só trocar a função `foto`).
function foto(id: string) {
  return `https://images.unsplash.com/${id}?w=1000&h=1000&fit=crop&auto=format&q=80`
}

const POOLS: Record<Categoria, string[]> = {
  aneis: [
    'photo-1622398925373-3f91b1e275f5',
    'photo-1598560917807-1bae44bd2be8',
    'photo-1705326455036-0fab8ecba04d',
    'photo-1631982690223-8aa4be0a2497',
    'photo-1611955167811-4711904bb9f8',
    'photo-1543294001-f7cd5d7fb516',
  ],
  colares: [
    'photo-1611107683227-e9060eccd846',
    'photo-1705326454924-f6777522b030',
    'photo-1569397288884-4d43d6738fbd',
    'photo-1685970731194-e27b477e87ba',
    'photo-1601121141461-9d6647bca1ed',
  ],
  brincos: [
    'photo-1767210338407-54b9264c326b',
    'photo-1638854254875-a2416fe0fec2',
    'photo-1761479267937-4c5c7a903760',
    'photo-1758995115555-766abbd9a491',
    'photo-1769078595478-5f756986b818',
  ],
  pulseiras: [
    'photo-1689397136362-dce64e557fcc',
    'photo-1744472457504-f99a96ecbd3e',
    'photo-1602173574767-37ac01994b2a',
    'photo-1655707063092-5c4509de41b8',
    'photo-1655707063513-a08dad26440e',
  ],
  oculos: [
    'photo-1567473810954-507d59716c25',
    'photo-1511499767150-a48a237f0083',
    'photo-1584036553516-bf83210aa16c',
    'photo-1611222777277-61319d63ca94',
    'photo-1577803645773-f96470509666',
    'photo-1610136649349-0f646f318053',
    'photo-1502767089025-6572583495f9',
    'photo-1589642380614-4a8c2147b857',
  ],
}

interface CategoriaConfig {
  nomes: string[]
  variantes: string[]
  descricoes: (nome: string, variante: string) => string[]
  detalhes: (variante: string) => string[]
  precoBase: number
}

const CONFIG: Record<Categoria, CategoriaConfig> = {
  aneis: {
    nomes: [
      'Anel Solitário',
      'Anel Duplo',
      'Anel Trançado',
      'Anel Cravejado',
      'Anel Aro Fino',
      'Anel Ajustável',
      'Anel Vintage',
      'Anel Geométrico',
      'Anel Infinito',
      'Anel Coração',
    ],
    variantes: ['Ouro Rosé', 'Ouro Amarelo', 'Ouro Branco', 'Dourado Fosco', 'Prata Folheada', 'Banhado a Ouro 18k'],
    descricoes: (nome, variante) => [
      `${nome} em ${variante.toLowerCase()}, peça delicada para uso diário ou ocasiões especiais.`,
      `Design atemporal em ${variante.toLowerCase()}, acabamento impecável e conforto para o dia a dia.`,
      `${nome} com brilho suave em ${variante.toLowerCase()} — combina com qualquer produção.`,
    ],
    detalhes: (variante) => [`Folheado em ${variante.toLowerCase()}`, 'Aro ajustável', 'Antialérgico'],
    precoBase: 149,
  },
  colares: {
    nomes: [
      'Colar Ponto de Luz',
      'Colar Camadas',
      'Colar Corrente Cartier',
      'Colar Pingente Coração',
      'Colar Choker',
      'Colar Gargantilha',
      'Colar Corrente Grumet',
      'Colar Pérolas',
      'Colar Medalha',
      'Colar Veneziana',
    ],
    variantes: ['Ouro 18k', 'Ouro Rosé', 'Prata Folheada', 'Dourado Fosco', 'Ouro Amarelo'],
    descricoes: (nome, variante) => [
      `${nome} em ${variante.toLowerCase()}, corrente fina e fecho reforçado. Combina do casual ao social.`,
      `Peça clássica em ${variante.toLowerCase()}, ideal para compor looks em camadas.`,
      `${nome} com acabamento em ${variante.toLowerCase()} — leve, confortável e versátil.`,
    ],
    detalhes: (variante) => [`Folheado em ${variante.toLowerCase()}`, 'Corrente + extensor', 'Fecho reforçado'],
    precoBase: 159,
  },
  brincos: {
    nomes: [
      'Brinco Argola',
      'Brinco Ponto de Luz',
      'Brinco Pérola',
      'Brinco Cascata',
      'Brinco Ear Cuff',
      'Brinco Gota',
      'Brinco Botão',
      'Brinco Vitoriano',
      'Brinco Geométrico',
      'Brinco Franja',
    ],
    variantes: ['Ouro 18k', 'Ouro Rosé', 'Prata Folheada', 'Dourado Texturizado', 'Ouro Amarelo'],
    descricoes: (nome, variante) => [
      `${nome} em ${variante.toLowerCase()}, leve para uso o dia todo, fecho seguro.`,
      `${nome} com acabamento em ${variante.toLowerCase()} — do casual ao evento social.`,
      `Design delicado em ${variante.toLowerCase()}, conforto para longas horas de uso.`,
    ],
    detalhes: (variante) => [`Folheado em ${variante.toLowerCase()}`, 'Fecho seguro', 'Antialérgico'],
    precoBase: 119,
  },
  pulseiras: {
    nomes: [
      'Pulseira Riviera',
      'Pulseira Elos',
      'Pulseira Veneziana',
      'Pulseira Berloque',
      'Pulseira Tênis',
      'Pulseira Corrente',
      'Pulseira Ajustável',
      'Pulseira Coração',
      'Pulseira Infinito',
      'Pulseira Dupla',
    ],
    variantes: ['Ouro 18k', 'Ouro Rosé', 'Prata Folheada', 'Dourado Fosco', 'Ouro Amarelo'],
    descricoes: (nome, variante) => [
      `${nome} em ${variante.toLowerCase()}, ajuste confortável para o pulso.`,
      `${nome} com brilho contínuo em ${variante.toLowerCase()} — statement discreto no dia a dia.`,
      `Peça versátil em ${variante.toLowerCase()}, combina sozinha ou empilhada com outras.`,
    ],
    detalhes: (variante) => [`Folheado em ${variante.toLowerCase()}`, 'Ajuste com extensor', 'Fecho reforçado'],
    precoBase: 139,
  },
  oculos: {
    nomes: [
      'Óculos Aviador',
      'Óculos Gatinho',
      'Óculos Quadrado',
      'Óculos Redondo',
      'Óculos Retrô',
      'Óculos Oversized',
      'Óculos Clubmaster',
      'Óculos Hexagonal',
      'Óculos Esportivo',
      'Óculos Vintage',
    ],
    variantes: ['Dourado', 'Preto Fosco', 'Tartaruga', 'Prata', 'Metal Fino'],
    descricoes: (nome, variante) => [
      `${nome} armação ${variante.toLowerCase()}, lente com proteção UV400. Acompanha estojo.`,
      `${nome} em acabamento ${variante.toLowerCase()} — visual atemporal, conforto o dia todo.`,
      `Modelo ${nome.toLowerCase()} ${variante.toLowerCase()}, leve e resistente para uso diário.`,
    ],
    detalhes: (variante) => [`Armação ${variante.toLowerCase()}`, 'Lente UV400', 'Acompanha estojo'],
    precoBase: 179,
  },
}

const CATEGORIAS_ORDEM: Categoria[] = ['aneis', 'colares', 'brincos', 'pulseiras', 'oculos']
const POR_CATEGORIA = 20

function gerarProdutos(): Produto[] {
  const produtos: Produto[] = []

  for (const categoria of CATEGORIAS_ORDEM) {
    const cfg = CONFIG[categoria]
    const pool = POOLS[categoria]

    for (let i = 0; i < POR_CATEGORIA; i++) {
      const nome = cfg.nomes[i % cfg.nomes.length]
      const variante = cfg.variantes[Math.floor(i / cfg.nomes.length) % cfg.variantes.length]
      const nomeCompleto = `${nome} ${variante}`
      const descricoes = cfg.descricoes(nome, variante)
      const descricao = descricoes[i % descricoes.length]

      const preco = Math.round((cfg.precoBase + ((i * 17) % 140)) * 10) / 10 + 0.9
      const emOferta = i % 9 === 0
      const precoAntigo = emOferta ? Math.round((preco + 40) * 10) / 10 : undefined

      const imgA = pool[i % pool.length]
      const imgB = pool[(i + 1) % pool.length]
      const imgC = pool[(i + 2) % pool.length]

      produtos.push({
        id: `${categoria}-${String(i + 1).padStart(2, '0')}`,
        nome: nomeCompleto,
        categoria,
        preco,
        precoAntigo,
        descricao,
        detalhes: cfg.detalhes(variante),
        imagens: [foto(imgA), foto(imgB), foto(imgC)],
        destaque: i === 0 || i === 11,
        novo: i % 7 === 0,
        estoque: i === 0 ? true : i % 13 !== 0,
      })
    }
  }

  return produtos
}

export const PRODUTOS: Produto[] = gerarProdutos()

export function getProdutoPorId(id: string) {
  return PRODUTOS.find((p) => p.id === id)
}

export function getRelacionados(produto: Produto, limite = 4) {
  return PRODUTOS.filter((p) => p.categoria === produto.categoria && p.id !== produto.id).slice(0, limite)
}

export function getDestaques() {
  return PRODUTOS.filter((p) => p.destaque)
}
