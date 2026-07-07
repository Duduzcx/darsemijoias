// Config central da loja.
// Quando tiver os dados reais do cliente, troque só aqui.

export const SITE = {
  nome: 'DAR SEMIJOIAS',
  nomeCompleto: 'Dar Semijoias',
  tagline: 'Peças que contam histórias',
  whatsapp: '5511999999999', // formato: 55 + DDD + número, sem espaços/símbolos
  instagram: '@aurea.acessorios',
  email: 'contato@aurea.com.br',
  endereco: 'Rua Exemplo, 123 — São Paulo, SP',
  horario: 'Seg a Sáb, 10h às 19h',
} as const

/**
 * Gera o link do WhatsApp já com a mensagem preenchida sobre o produto.
 */
export function linkWhatsApp(mensagemProduto?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`
  const mensagemPadrao = 'Olá! Vim pelo site e gostaria de mais informações.'
  const texto = encodeURIComponent(mensagemProduto ?? mensagemPadrao)
  return `${base}?text=${texto}`
}
