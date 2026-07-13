import { useMemo, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid'
import { SearchBar } from '../components/SearchBar'
import { useLoja } from '../store/LojaContext'
import { CATEGORIAS, type Categoria } from '../data/types'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { normalizarTexto } from '../lib/format'

export function CategoriaPage() {
  const { slug } = useParams<{ slug: string }>()
  const { produtos } = useLoja()
  const [busca, setBusca] = useState('')

  const categoriaValida = slug && slug in CATEGORIAS
  useDocumentMeta({
    title: categoriaValida ? `${CATEGORIAS[slug as Categoria]} — Dar Semijoias` : 'Dar Semijoias',
    description: categoriaValida
      ? `Confira nossa coleção de ${CATEGORIAS[slug as Categoria].toLowerCase()} — Dar Semijoias.`
      : 'Joias e óculos selecionados peça a peça.',
  })

  const produtosDaCategoria = useMemo(() => {
    if (!categoriaValida) return []
    const categoria = slug as Categoria
    const termo = normalizarTexto(busca)
    return produtos.filter(
      (p) => p.categoria === categoria && (!termo || normalizarTexto(p.nome).includes(termo)),
    )
  }, [produtos, slug, categoriaValida, busca])

  if (!categoriaValida) {
    return <Navigate to="/" replace />
  }

  const categoria = slug as Categoria

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-malva">Coleção</p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl text-tinta md:text-4xl">{CATEGORIAS[categoria]}</h1>
        <SearchBar value={busca} onChange={setBusca} />
      </div>
      <div className="mt-10">
        <ProductGrid produtos={produtosDaCategoria} />
      </div>
    </section>
  )
}
