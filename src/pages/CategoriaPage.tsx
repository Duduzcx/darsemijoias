import { useParams, Navigate } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid'
import { useLoja } from '../store/LojaContext'
import { CATEGORIAS, type Categoria } from '../data/types'

export function CategoriaPage() {
  const { slug } = useParams<{ slug: string }>()
  const { produtos } = useLoja()

  if (!slug || !(slug in CATEGORIAS)) {
    return <Navigate to="/" replace />
  }

  const categoria = slug as Categoria
  const produtosDaCategoria = produtos.filter((p) => p.categoria === categoria)

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-malva">Coleção</p>
      <h1 className="mt-2 font-display text-3xl text-tinta md:text-4xl">{CATEGORIAS[categoria]}</h1>
      <div className="mt-10">
        <ProductGrid produtos={produtosDaCategoria} />
      </div>
    </section>
  )
}
