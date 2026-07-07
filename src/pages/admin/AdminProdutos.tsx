import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useLoja } from '../../store/LojaContext'
import { CATEGORIAS } from '../../data/types'
import type { Produto } from '../../data/types'
import { formatarPreco } from '../../lib/format'
import { ProdutoForm } from './ProdutoForm'

export function AdminProdutos() {
  const { produtos, addProduto, updateProduto, removeProduto } = useLoja()
  const [editando, setEditando] = useState<Produto | null>(null)
  const [criando, setCriando] = useState(false)
  const [busca, setBusca] = useState('')

  const filtrados = produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))

  function confirmarExclusao(p: Produto) {
    if (confirm(`Excluir "${p.nome}"? Essa ação não pode ser desfeita.`)) {
      removeProduto(p.id)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-tinta">Produtos</h2>
          <p className="text-sm text-grafite">{produtos.length} peças no catálogo</p>
        </div>
        <div className="flex gap-3">
          <input
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border border-linha px-3 py-2 text-sm text-tinta outline-none focus:border-tinta"
          />
          <button
            onClick={() => setCriando(true)}
            className="flex items-center gap-1.5 bg-tinta px-4 py-2 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
          >
            <Plus size={15} />
            Novo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-linha">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-linha bg-neve text-xs uppercase tracking-wider text-grafite">
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id} className="border-b border-linha last:border-0">
                <td className="px-4 py-3">
                  <img src={p.imagens[0]} alt="" className="h-12 w-12 object-cover" />
                </td>
                <td className="px-4 py-3 text-tinta">{p.nome}</td>
                <td className="px-4 py-3 text-grafite">{CATEGORIAS[p.categoria]}</td>
                <td className="px-4 py-3 text-tinta">
                  {formatarPreco(p.preco)}
                  {p.precoAntigo && (
                    <span className="ml-2 text-xs text-grafite-claro line-through">
                      {formatarPreco(p.precoAntigo)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.destaque && (
                      <span className="bg-neve px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-camel">
                        Destaque
                      </span>
                    )}
                    {p.novo && (
                      <span className="bg-neve px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-tinta">
                        Novo
                      </span>
                    )}
                    {p.precoAntigo && (
                      <span className="bg-neve px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-red-600">
                        Promoção
                      </span>
                    )}
                    {!p.estoque && (
                      <span className="bg-neve px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-grafite-claro">
                        Esgotado
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditando(p)}
                      aria-label={`Editar ${p.nome}`}
                      className="text-grafite hover:text-tinta"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => confirmarExclusao(p)}
                      aria-label={`Excluir ${p.nome}`}
                      className="text-grafite hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(editando || criando) && (
          <ProdutoForm
            produtoInicial={editando ?? undefined}
            onFechar={() => {
              setEditando(null)
              setCriando(false)
            }}
            onSalvar={(dados) => {
              if (editando) {
                updateProduto(editando.id, dados)
              } else {
                addProduto(dados)
              }
              setEditando(null)
              setCriando(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
