import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full sm:w-64">
      <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-grafite-claro" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar peça..."
        aria-label="Buscar peça"
        className="w-full border border-linha bg-branco py-2.5 pl-9 pr-9 text-sm text-tinta placeholder:text-grafite-claro focus:border-tinta focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-grafite-claro hover:text-tinta"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
