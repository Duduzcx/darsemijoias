import { AnimatePresence, motion } from 'framer-motion'
import type { Produto } from '../data/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-24 text-center"
      >
        <p className="font-display text-xl text-tinta">Nenhuma peça encontrada</p>
        <p className="mt-2 text-sm text-grafite">Tente outra categoria ou volte mais tarde.</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {produtos.map((p, i) => (
          <ProductCard key={p.id} produto={p} index={i} />
        ))}
      </AnimatePresence>
    </div>
  )
}
