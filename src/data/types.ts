export type Categoria = 'aneis' | 'colares' | 'brincos' | 'pulseiras' | 'oculos'

export interface Produto {
  id: string
  nome: string
  categoria: Categoria
  preco: number
  precoAntigo?: number
  descricao: string
  detalhes: string[] // material, medidas, etc — lista curta
  imagens: string[]
  destaque?: boolean
  novo?: boolean
  estoque: boolean
}

export const CATEGORIAS: Record<Categoria, string> = {
  aneis: 'Anéis',
  colares: 'Colares',
  brincos: 'Brincos',
  pulseiras: 'Pulseiras',
  oculos: 'Óculos',
}
