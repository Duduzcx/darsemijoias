import { motion } from 'framer-motion'
import { CATEGORIAS, type Categoria } from '../data/types'

type FiltroValor = 'todos' | Categoria

export function CategoryFilter({
  ativo,
  onChange,
}: {
  ativo: FiltroValor
  onChange: (v: FiltroValor) => void
}) {
  const opcoes: { valor: FiltroValor; label: string }[] = [
    { valor: 'todos', label: 'Todos' },
    ...Object.entries(CATEGORIAS).map(([valor, label]) => ({ valor: valor as Categoria, label })),
  ]

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {opcoes.map((o) => (
        <button
          key={o.valor}
          onClick={() => onChange(o.valor)}
          className={`relative pb-1 text-xs uppercase tracking-wider transition-colors ${
            ativo === o.valor ? 'text-tinta' : 'text-grafite hover:text-tinta'
          }`}
        >
          {o.label}
          {ativo === o.valor && (
            <motion.span
              layoutId="filtro-ativo"
              className="absolute -bottom-px left-0 h-px w-full bg-tinta"
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
