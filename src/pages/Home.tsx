import { useMemo, useState } from 'react'
import { Hero } from '../components/Hero'
import { CategoryFilter } from '../components/CategoryFilter'
import { SearchBar } from '../components/SearchBar'
import { ProductGrid } from '../components/ProductGrid'
import { useLoja } from '../store/LojaContext'
import type { Categoria } from '../data/types'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { normalizarTexto } from '../lib/format'

export function Home() {
  const { produtos } = useLoja()
  const [filtro, setFiltro] = useState<'todos' | Categoria>('todos')
  const [busca, setBusca] = useState('')

  useDocumentMeta({
    title: 'Dar Semijoias — Joias e óculos',
    description: 'Peças que contam histórias. Joias e óculos selecionados peça a peça, compre direto pelo WhatsApp.',
  })

  const produtosFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca)
    return produtos.filter(
      (p) => (filtro === 'todos' || p.categoria === filtro) && (!termo || normalizarTexto(p.nome).includes(termo)),
    )
  }, [filtro, busca, produtos])

  return (
    <>
      <Hero />
      <section id="vitrine" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl text-tinta">Toda a vitrine</h2>
          <SearchBar value={busca} onChange={setBusca} />
        </div>
        <div className="mb-8">
          <CategoryFilter ativo={filtro} onChange={setFiltro} />
        </div>
        <ProductGrid produtos={produtosFiltrados} />
      </section>
    </>
  )
}
