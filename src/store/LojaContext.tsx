import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Produto } from '../data/types'
import { gerarProdutosIniciais } from '../data/produtos'

export interface Venda {
  id: string
  produtoId: string
  produtoNome: string
  categoria: Produto['categoria']
  quantidade: number
  valorUnitario: number
  data: string // YYYY-MM-DD
  criadoEm: string
}

interface LojaContextValue {
  produtos: Produto[]
  vendas: Venda[]
  addProduto: (p: Omit<Produto, 'id'>) => void
  updateProduto: (id: string, patch: Partial<Produto>) => void
  removeProduto: (id: string) => void
  addVenda: (v: Omit<Venda, 'id' | 'criadoEm'>) => void
  removeVenda: (id: string) => void
  resetarCatalogo: () => void
}

const LojaContext = createContext<LojaContextValue | null>(null)

const PRODUTOS_KEY = 'darsemijoias:produtos:v1'
const VENDAS_KEY = 'darsemijoias:vendas:v1'

function carregar<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function salvar<T>(key: string, valor: T) {
  try {
    localStorage.setItem(key, JSON.stringify(valor))
  } catch {
    // localStorage indisponível (modo privado, etc.) — segue sem persistir
  }
}

function novoId(prefixo: string) {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function LojaProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>(() => carregar(PRODUTOS_KEY, gerarProdutosIniciais()))
  const [vendas, setVendas] = useState<Venda[]>(() => carregar(VENDAS_KEY, [] as Venda[]))

  useEffect(() => salvar(PRODUTOS_KEY, produtos), [produtos])
  useEffect(() => salvar(VENDAS_KEY, vendas), [vendas])

  const value = useMemo<LojaContextValue>(
    () => ({
      produtos,
      vendas,
      addProduto: (p) => {
        const produto: Produto = { ...p, id: novoId(p.categoria) }
        setProdutos((prev) => [produto, ...prev])
      },
      updateProduto: (id, patch) => {
        setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
      },
      removeProduto: (id) => {
        setProdutos((prev) => prev.filter((p) => p.id !== id))
      },
      addVenda: (v) => {
        const venda: Venda = { ...v, id: novoId('venda'), criadoEm: new Date().toISOString() }
        setVendas((prev) => [venda, ...prev])
      },
      removeVenda: (id) => {
        setVendas((prev) => prev.filter((v) => v.id !== id))
      },
      resetarCatalogo: () => {
        setProdutos(gerarProdutosIniciais())
      },
    }),
    [produtos, vendas],
  )

  return <LojaContext.Provider value={value}>{children}</LojaContext.Provider>
}

export function useLoja() {
  const ctx = useContext(LojaContext)
  if (!ctx) throw new Error('useLoja precisa estar dentro de <LojaProvider>')
  return ctx
}
