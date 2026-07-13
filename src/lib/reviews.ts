import { supabase, supabaseConfigurado } from './supabase'

export interface Avaliacao {
  id: string
  produto_id: string
  nome: string
  nota: number
  comentario: string | null
  created_at: string
}

export async function listarAprovadas(produtoId: string): Promise<Avaliacao[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('id, produto_id, nome, nota, comentario, created_at')
    .eq('produto_id', produtoId)
    .eq('aprovado', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar avaliações:', error.message)
    return []
  }
  return data ?? []
}

export async function enviarAvaliacao(dados: {
  produtoId: string
  nome: string
  nota: number
  comentario: string
}) {
  if (!supabase) throw new Error('Supabase não configurado')
  const { error } = await supabase.from('avaliacoes').insert({
    produto_id: dados.produtoId,
    nome: dados.nome,
    nota: dados.nota,
    comentario: dados.comentario || null,
    aprovado: false,
  })
  if (error) throw error
}

export { supabaseConfigurado }
