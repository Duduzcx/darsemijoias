import { useMemo, useState } from 'react'
import { Hero } from '../components/Hero'
import { CategoryFilter } from '../components/CategoryFilter'
import { ProductGrid } from '../components/ProductGrid'
import { useLoja } from '../store/LojaContext'
import type { Categoria } from '../data/types'

export function Home() {
  const { produtos } = useLoja()
  const [filtro, setFiltro] = useState<'todos' | Categoria>('todos')

  const produtosFiltrados = useMemo(
    () => (filtro === 'todos' ? produtos : produtos.filter((p) => p.categoria === filtro)),
    [filtro, produtos],
  )

  return (
    <>
      <Hero />
      <section id="vitrine" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl text-tinta">Toda a vitrine</h2>
          <CategoryFilter ativo={filtro} onChange={setFiltro} />
        </div>
        <ProductGrid produtos={produtosFiltrados} />
      </section>
    </>
  )
}
