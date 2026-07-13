import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface ItemCarrinho {
  produtoId: string
  quantidade: number
}

interface CartContextValue {
  itens: ItemCarrinho[]
  addItem: (produtoId: string) => void
  removeItem: (produtoId: string) => void
  updateQuantidade: (produtoId: string, quantidade: number) => void
  clear: () => void
  totalItens: number
}

const CartContext = createContext<CartContextValue | null>(null)

const CARRINHO_KEY = 'darsemijoias:carrinho:v1'

function carregar(): ItemCarrinho[] {
  try {
    const raw = localStorage.getItem(CARRINHO_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ItemCarrinho[]
  } catch {
    return []
  }
}

function salvar(itens: ItemCarrinho[]) {
  try {
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(itens))
  } catch {
    // localStorage indisponível — segue sem persistir
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => carregar())

  useEffect(() => salvar(itens), [itens])

  const value = useMemo<CartContextValue>(
    () => ({
      itens,
      addItem: (produtoId) => {
        setItens((prev) => {
          const existente = prev.find((i) => i.produtoId === produtoId)
          if (existente) {
            return prev.map((i) => (i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i))
          }
          return [...prev, { produtoId, quantidade: 1 }]
        })
      },
      removeItem: (produtoId) => {
        setItens((prev) => prev.filter((i) => i.produtoId !== produtoId))
      },
      updateQuantidade: (produtoId, quantidade) => {
        if (quantidade <= 0) {
          setItens((prev) => prev.filter((i) => i.produtoId !== produtoId))
          return
        }
        setItens((prev) => prev.map((i) => (i.produtoId === produtoId ? { ...i, quantidade } : i)))
      },
      clear: () => setItens([]),
      totalItens: itens.reduce((soma, i) => soma + i.quantidade, 0),
    }),
    [itens],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}
