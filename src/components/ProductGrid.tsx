import type { Produto } from '../data/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-xl text-perola">Nenhuma peça encontrada</p>
        <p className="mt-2 text-sm text-fumo">Tente outra categoria ou volte mais tarde.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {produtos.map((p) => (
        <ProductCard key={p.id} produto={p} />
      ))}
    </div>
  )
}
