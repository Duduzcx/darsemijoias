import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { useLoja } from '../../store/LojaContext'
import { CATEGORIAS } from '../../data/types'
import { formatarPreco } from '../../lib/format'

const CORES_CATEGORIA: Record<string, string> = {
  aneis: '#a9824c',
  colares: '#17160f',
  brincos: '#8a6a3c',
  pulseiras: '#55524a',
  oculos: '#9b968b',
}

export function AdminRelatorios() {
  const { vendas } = useLoja()

  const porProduto = useMemo(() => {
    const mapa = new Map<string, { nome: string; quantidade: number; faturamento: number }>()
    for (const v of vendas) {
      const atual = mapa.get(v.produtoId) ?? { nome: v.produtoNome, quantidade: 0, faturamento: 0 }
      atual.quantidade += v.quantidade
      atual.faturamento += v.quantidade * v.valorUnitario
      mapa.set(v.produtoId, atual)
    }
    return [...mapa.values()].sort((a, b) => b.quantidade - a.quantidade).slice(0, 10)
  }, [vendas])

  const porCategoria = useMemo(() => {
    const mapa = new Map<string, number>()
    for (const v of vendas) {
      mapa.set(v.categoria, (mapa.get(v.categoria) ?? 0) + v.quantidade * v.valorUnitario)
    }
    return [...mapa.entries()].map(([categoria, valor]) => ({
      categoria,
      nome: CATEGORIAS[categoria as keyof typeof CATEGORIAS],
      valor,
    }))
  }, [vendas])

  const totalFaturamento = vendas.reduce((acc, v) => acc + v.quantidade * v.valorUnitario, 0)
  const totalPecas = vendas.reduce((acc, v) => acc + v.quantidade, 0)
  const maisVendido = porProduto[0]

  if (vendas.length === 0) {
    return (
      <div>
        <h2 className="font-display text-xl text-tinta">Relatórios</h2>
        <p className="mt-4 text-sm text-grafite">
          Ainda não há fechamentos registrados. Assim que você lançar vendas na aba "Fechamentos", os
          gráficos aparecem aqui.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-xl text-tinta">Relatórios</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="border border-linha p-5">
          <p className="text-xs uppercase tracking-wider text-grafite">Faturamento total</p>
          <p className="mt-2 font-display text-2xl text-tinta">{formatarPreco(totalFaturamento)}</p>
        </div>
        <div className="border border-linha p-5">
          <p className="text-xs uppercase tracking-wider text-grafite">Peças vendidas</p>
          <p className="mt-2 font-display text-2xl text-tinta">{totalPecas}</p>
        </div>
        <div className="border border-linha p-5">
          <p className="text-xs uppercase tracking-wider text-grafite">Mais vendido</p>
          <p className="mt-2 text-sm text-tinta">{maisVendido?.nome ?? '—'}</p>
          <p className="text-xs text-grafite">{maisVendido?.quantidade ?? 0} unidades</p>
        </div>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-wider text-grafite">
          Quantidade vendida por produto (top 10)
        </p>
        <div className="h-80 border border-linha p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porProduto} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e2dc" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#55524a' }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="nome"
                width={160}
                tick={{ fontSize: 11, fill: '#17160f' }}
              />
              <Tooltip
                formatter={((value: unknown) => [`${Number(value)} un.`, 'Vendidos']) as any}
                contentStyle={{ border: '1px solid #e5e2dc', fontSize: 12 }}
              />
              <Bar dataKey="quantidade" fill="#17160f" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-grafite">Faturamento por categoria</p>
          <div className="h-72 border border-linha p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={porCategoria}
                  dataKey="valor"
                  nameKey="nome"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {porCategoria.map((entry) => (
                    <Cell key={entry.categoria} fill={CORES_CATEGORIA[entry.categoria] ?? '#a9824c'} />
                  ))}
                </Pie>
                <Tooltip formatter={((value: unknown) => formatarPreco(Number(value))) as any} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-grafite">Faturamento por produto (top 10)</p>
          <div className="h-72 border border-linha p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porProduto}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e2dc" />
                <XAxis dataKey="nome" tick={{ fontSize: 10, fill: '#55524a' }} hide />
                <YAxis tick={{ fontSize: 12, fill: '#55524a' }} />
                <Tooltip
                  formatter={((value: unknown) => formatarPreco(Number(value))) as any}
                  contentStyle={{ border: '1px solid #e5e2dc', fontSize: 12 }}
                />
                <Bar dataKey="faturamento" fill="#a9824c" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
