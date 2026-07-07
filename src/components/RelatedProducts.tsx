import type { Produto } from '../data/types'
import { ProductCard } from './ProductCard'

export function RelatedProducts({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) return null

  return (
    <section className="mt-20 border-t border-veludo-2 pt-12">
      <p className="text-xs uppercase tracking-[0.3em] text-ouro">Você também pode gostar</p>
      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {produtos.map((p) => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </section>
  )
}
