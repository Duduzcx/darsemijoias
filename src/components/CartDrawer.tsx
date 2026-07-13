import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '../store/CartContext'
import { useLoja } from '../store/LojaContext'
import { getProdutoPorId } from '../data/produtos'
import { formatarPreco } from '../lib/format'
import { linkWhatsAppCarrinho } from '../config/site'

export function CartDrawer({ aberto, onClose }: { aberto: boolean; onClose: () => void }) {
  const { itens, removeItem, updateQuantidade, clear } = useCart()
  const { produtos } = useLoja()

  const linhas = itens
    .map((item) => {
      const produto = getProdutoPorId(produtos, item.produtoId)
      return produto ? { produto, quantidade: item.quantidade } : null
    })
    .filter((l): l is { produto: NonNullable<ReturnType<typeof getProdutoPorId>>; quantidade: number } => l !== null)

  const total = linhas.reduce((soma, l) => soma + l.produto.preco * l.quantidade, 0)

  const linkFinalizar = linkWhatsAppCarrinho(
    linhas.map((l) => ({ nome: l.produto.nome, quantidade: l.quantidade, preco: l.produto.preco })),
    formatarPreco,
  )

  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-tinta/40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-branco px-6 py-7"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-tinta">Carrinho</h2>
              <button aria-label="Fechar carrinho" onClick={onClose} className="text-tinta">
                <X size={22} />
              </button>
            </div>

            {linhas.length === 0 ? (
              <p className="mt-10 text-sm text-grafite">Seu carrinho está vazio.</p>
            ) : (
              <>
                <div className="mt-6 flex flex-1 flex-col gap-5 overflow-y-auto">
                  {linhas.map(({ produto, quantidade }) => (
                    <div key={produto.id} className="flex gap-3">
                      <img
                        src={produto.imagens[0]}
                        alt={produto.nome}
                        className="h-16 w-16 shrink-0 object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-tinta">{produto.nome}</p>
                        <p className="mt-0.5 text-xs text-grafite-claro">{formatarPreco(produto.preco)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            aria-label="Diminuir quantidade"
                            onClick={() => updateQuantidade(produto.id, quantidade - 1)}
                            className="text-grafite hover:text-tinta"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center text-xs">{quantidade}</span>
                          <button
                            aria-label="Aumentar quantidade"
                            onClick={() => updateQuantidade(produto.id, quantidade + 1)}
                            className="text-grafite hover:text-tinta"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            aria-label="Remover item"
                            onClick={() => removeItem(produto.id)}
                            className="ml-auto text-grafite-claro hover:text-tinta"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-linha pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-grafite">Total</span>
                    <span className="font-display text-lg text-tinta">{formatarPreco(total)}</span>
                  </div>
                  <a
                    href={linkFinalizar}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-malva-escuro py-3.5 text-sm font-semibold uppercase tracking-wider text-branco transition-colors hover:bg-malva-hover"
                  >
                    <MessageCircle size={18} />
                    Finalizar no WhatsApp
                  </a>
                  <button
                    onClick={clear}
                    className="mt-3 w-full text-xs uppercase tracking-wider text-grafite-claro hover:text-grafite"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
