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
    <div className="flex flex-wrap gap-2">
      {opcoes.map((o) => (
        <button
          key={o.valor}
          onClick={() => onChange(o.valor)}
          className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
            ativo === o.valor
              ? 'border-ouro bg-ouro text-obsidian'
              : 'border-veludo-2 text-fumo hover:border-ouro/50 hover:text-perola'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
