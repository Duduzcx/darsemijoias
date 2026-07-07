import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Produto, Categoria } from '../../data/types'
import { CATEGORIAS } from '../../data/types'

interface Props {
  produtoInicial?: Produto
  onSalvar: (dados: Omit<Produto, 'id'>) => void
  onFechar: () => void
}

const categoriaOpcoes = Object.entries(CATEGORIAS) as [Categoria, string][]

export function ProdutoForm({ produtoInicial, onSalvar, onFechar }: Props) {
  const [nome, setNome] = useState(produtoInicial?.nome ?? '')
  const [categoria, setCategoria] = useState<Categoria>(produtoInicial?.categoria ?? 'aneis')
  const [preco, setPreco] = useState(String(produtoInicial?.preco ?? ''))
  const [precoAntigo, setPrecoAntigo] = useState(
    produtoInicial?.precoAntigo != null ? String(produtoInicial.precoAntigo) : '',
  )
  const [descricao, setDescricao] = useState(produtoInicial?.descricao ?? '')
  const [detalhes, setDetalhes] = useState(produtoInicial?.detalhes.join(', ') ?? '')
  const [imagens, setImagens] = useState(produtoInicial?.imagens.join('\n') ?? '')
  const [destaque, setDestaque] = useState(produtoInicial?.destaque ?? false)
  const [novo, setNovo] = useState(produtoInicial?.novo ?? false)
  const [estoque, setEstoque] = useState(produtoInicial?.estoque ?? true)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const listaImagens = imagens
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const listaDetalhes = detalhes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    onSalvar({
      nome,
      categoria,
      preco: Number(preco) || 0,
      precoAntigo: precoAntigo ? Number(precoAntigo) : undefined,
      descricao,
      detalhes: listaDetalhes.length ? listaDetalhes : ['—'],
      imagens: listaImagens.length ? listaImagens : ['https://placehold.co/900x900/f2f0ec/17160f?text=Sem+foto'],
      destaque,
      novo,
      estoque,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-tinta/40 p-4 py-10"
      onClick={onFechar}
    >
      <motion.form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl bg-branco p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl text-tinta">
            {produtoInicial ? 'Editar produto' : 'Novo produto'}
          </h2>
          <button type="button" onClick={onFechar} className="text-grafite hover:text-tinta">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">Nome</label>
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-grafite">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
              className="mt-1.5 w-full border border-linha bg-branco px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            >
              {categoriaOpcoes.map(([valor, label]) => (
                <option key={valor} value={valor}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-grafite">Preço (R$)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-grafite">Preço antigo</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="opcional"
                value={precoAntigo}
                onChange={(e) => setPrecoAntigo(e.target.value)}
                className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">Descrição</label>
            <textarea
              required
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">
              Detalhes (separados por vírgula)
            </label>
            <input
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              placeholder="Folheado a ouro 18k, Aro ajustável, Antialérgico"
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">
              Imagens (uma URL por linha)
            </label>
            <textarea
              rows={3}
              value={imagens}
              onChange={(e) => setImagens(e.target.value)}
              placeholder="https://..."
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={novo} onChange={(e) => setNovo(e.target.checked)} />
              Novo
            </label>
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={estoque} onChange={(e) => setEstoque(e.target.checked)} />
              Em estoque
            </label>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-tinta py-3 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onFechar}
            className="flex-1 border border-linha py-3 text-xs uppercase tracking-wider text-grafite hover:border-tinta hover:text-tinta"
          >
            Cancelar
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}
