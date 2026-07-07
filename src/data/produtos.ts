import type { Produto } from './types'

// Imagens placeholder no estilo da marca (fundo veludo + texto dourado).
// Troque cada URL pela foto real do produto quando o cliente enviar o material.
function ph(texto: string, bg = '1e1a16', fg = 'c9a15a') {
  return `https://placehold.co/900x900/${bg}/${fg}?text=${encodeURIComponent(texto)}`
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
    imagens: [ph('Anel Ouro Rosé — Vista 1'), ph('Anel Ouro Rosé — Vista 2'), ph('Anel Ouro Rosé — Detalhe')],
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
    imagens: [ph('Anel Duplo — Vista 1'), ph('Anel Duplo — Vista 2')],
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
    imagens: [ph('Colar Ponto de Luz — Vista 1'), ph('Colar Ponto de Luz — Vista 2'), ph('Colar — Detalhe')],
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
    imagens: [ph('Colar Camadas — Vista 1'), ph('Colar Camadas — Vista 2')],
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
    imagens: [ph('Brinco Argola — Vista 1'), ph('Brinco Argola — Vista 2')],
    estoque: true,
  },
  {
    id: 'brinco-perola-vitor',
    nome: 'Brinco Pérola Vitoriano',
    categoria: 'brincos',
    preco: 169.9,
    descricao: 'Brinco inspirado no design vitoriano, pérola sintética premium e base cravejada.',
    detalhes: ['Folheado a ouro 18k', 'Pérola sintética 8mm', 'Fecho borboleta'],
    imagens: [ph('Brinco Pérola — Vista 1'), ph('Brinco Pérola — Vista 2'), ph('Brinco Pérola — Detalhe')],
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
    imagens: [ph('Pulseira Riviera — Vista 1'), ph('Pulseira Riviera — Vista 2')],
    estoque: true,
  },
  {
    id: 'pulseira-elos-ouro',
    nome: 'Pulseira Elos Cadeado',
    categoria: 'pulseiras',
    preco: 229.9,
    descricao: 'Elos grossos estilo cadeado, tendência statement para compor looks minimalistas.',
    detalhes: ['Folheado a ouro 18k', '19cm ajustável', 'Fecho reforçado'],
    imagens: [ph('Pulseira Elos — Vista 1'), ph('Pulseira Elos — Vista 2')],
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
    imagens: [ph('Óculos Aviador — Vista 1'), ph('Óculos Aviador — Vista 2'), ph('Óculos Aviador — Detalhe')],
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
    imagens: [ph('Óculos Gatinho — Vista 1'), ph('Óculos Gatinho — Vista 2')],
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
    imagens: [ph('Óculos Tartaruga — Vista 1'), ph('Óculos Tartaruga — Vista 2')],
    estoque: true,
  },
  {
    id: 'oculos-redondo-fine',
    nome: 'Óculos Redondo Fine Metal',
    categoria: 'oculos',
    preco: 189.9,
    descricao: 'Armação redonda fina metálica, estilo retrô minimalista, lente cinza clássica.',
    detalhes: ['Armação metal fino', 'Lente cinza UV400', 'Acompanha estojo'],
    imagens: [ph('Óculos Redondo — Vista 1'), ph('Óculos Redondo — Vista 2')],
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
