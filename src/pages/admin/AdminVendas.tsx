import { useMemo, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLoja } from '../../store/LojaContext'
import { formatarPreco } from '../../lib/format'

function hoje() {
  return new Date().toISOString().slice(0, 10)
}

export function AdminVendas() {
  const { produtos, vendas, addVenda, removeVenda } = useLoja()
  const [produtoId, setProdutoId] = useState(produtos[0]?.id ?? '')
  const [quantidade, setQuantidade] = useState('1')
  const [valorUnitario, setValorUnitario] = useState('')
  const [data, setData] = useState(hoje())

  const produtoSelecionado = produtos.find((p) => p.id === produtoId)

  function onSelecionarProduto(id: string) {
    setProdutoId(id)
    const p = produtos.find((x) => x.id === id)
    if (p) setValorUnitario(String(p.preco))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!produtoSelecionado) return
    addVenda({
      produtoId: produtoSelecionado.id,
      produtoNome: produtoSelecionado.nome,
      categoria: produtoSelecionado.categoria,
      quantidade: Number(quantidade) || 1,
      valorUnitario: Number(valorUnitario) || produtoSelecionado.preco,
      data,
    })
    setQuantidade('1')
  }

  const vendasOrdenadas = useMemo(() => [...vendas].sort((a, b) => (a.data < b.data ? 1 : -1)), [vendas])

  const totalPeriodo = vendas.reduce((acc, v) => acc + v.quantidade * v.valorUnitario, 0)

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-tinta">Fechamentos</h2>
        <p className="text-sm text-grafite">
          Registre aqui as vendas fechadas pelo WhatsApp. Isso alimenta os relatórios.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mb-8 grid gap-3 border border-linha p-5 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wider text-grafite">Produto</label>
          <select
            value={produtoId}
            onChange={(e) => onSelecionarProduto(e.target.value)}
            className="mt-1.5 w-full border border-linha bg-branco px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
          >
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-grafite">Qtd.</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-grafite">Valor unit. (R$)</label>
          <input
            type="number"
            step="0.01"
            placeholder={produtoSelecionado ? String(produtoSelecionado.preco) : ''}
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
            className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-grafite">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
          />
        </div>
        <div className="sm:col-span-4">
          <button
            type="submit"
            className="bg-tinta px-6 py-2.5 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
          >
            Registrar fechamento
          </button>
        </div>
      </form>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-grafite">{vendas.length} fechamentos registrados</p>
        <p className="text-sm text-tinta">Total: {formatarPreco(totalPeriodo)}</p>
      </div>

      <div className="overflow-x-auto border border-linha">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-linha bg-neve text-xs uppercase tracking-wider text-grafite">
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Qtd.</th>
              <th className="px-4 py-3">Valor unit.</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendasOrdenadas.map((v) => (
              <tr key={v.id} className="border-b border-linha last:border-0">
                <td className="px-4 py-3 text-grafite">{v.data}</td>
                <td className="px-4 py-3 text-tinta">{v.produtoNome}</td>
                <td className="px-4 py-3 text-grafite">{v.quantidade}</td>
                <td className="px-4 py-3 text-grafite">{formatarPreco(v.valorUnitario)}</td>
                <td className="px-4 py-3 text-tinta">{formatarPreco(v.quantidade * v.valorUnitario)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeVenda(v.id)}
                    aria-label="Remover fechamento"
                    className="text-grafite hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {vendasOrdenadas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-grafite">
                  Nenhum fechamento registrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
