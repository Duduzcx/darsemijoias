// Config central da loja.
// Quando tiver os dados reais do cliente, troque só aqui.

export const SITE = {
  nome: 'DAR SEMIJOIAS',
  nomeCompleto: 'Dar Semijoias',
  tagline: 'Peças que contam histórias',
  whatsapp: '5511937696256', // formato: 55 + DDD + número, sem espaços/símbolos
  instagramUrl: 'https://www.instagram.com/dar.semijoias',
  instagram: '@dar.semijoias',
  email: 'contato@aurea.com.br',
  endereco: 'Rua Exemplo, 123 — São Paulo, SP',
  horario: 'Seg a Sáb, 10h às 19h',
  desenvolvidoPor: 'zcxpages',
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

/**
 * Gera o link do WhatsApp com todos os itens do carrinho listados na mensagem.
 */
export function linkWhatsAppCarrinho(
  itens: { nome: string; quantidade: number; preco: number }[],
  formatarPreco: (v: number) => string,
) {
  const linhas = itens.map((i) => `• ${i.quantidade}x ${i.nome} — ${formatarPreco(i.preco * i.quantidade)}`)
  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0)
  const mensagem = `Olá! Gostaria de finalizar esta compra:\n${linhas.join('\n')}\n\nTotal: ${formatarPreco(total)}`
  return linkWhatsApp(mensagem)
}
