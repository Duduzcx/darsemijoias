import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, ExternalLink } from 'lucide-react'
import { sairAdmin } from '../../config/admin'
import { SITE } from '../../config/site'
import { AdminProdutos } from './AdminProdutos'
import { AdminVendas } from './AdminVendas'
import { AdminRelatorios } from './AdminRelatorios'

type Aba = 'produtos' | 'vendas' | 'relatorios'

const ABAS: { valor: Aba; label: string }[] = [
  { valor: 'produtos', label: 'Produtos' },
  { valor: 'vendas', label: 'Fechamentos' },
  { valor: 'relatorios', label: 'Relatórios' },
]

export function AdminDashboard() {
  const [aba, setAba] = useState<Aba>('produtos')

  return (
    <div className="min-h-screen bg-branco-osso">
      <header className="border-b border-linha bg-branco px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="font-display text-lg tracking-wide text-tinta">{SITE.nome} — Painel</p>
            <p className="text-xs text-grafite">Área restrita</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-grafite hover:text-tinta"
            >
              <ExternalLink size={14} />
              Ver site
            </Link>
            <button
              onClick={() => {
                sairAdmin()
                window.location.href = '/admin'
              }}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-grafite hover:text-tinta"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="mb-8 flex gap-6 border-b border-linha">
          {ABAS.map((a) => (
            <button
              key={a.valor}
              onClick={() => setAba(a.valor)}
              className={`relative pb-3 text-xs uppercase tracking-wider transition-colors ${
                aba === a.valor ? 'text-tinta' : 'text-grafite hover:text-tinta'
              }`}
            >
              {a.label}
              {aba === a.valor && (
                <motion.span
                  layoutId="admin-aba-ativa"
                  className="absolute -bottom-px left-0 h-0.5 w-full bg-tinta"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={aba}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {aba === 'produtos' && <AdminProdutos />}
          {aba === 'vendas' && <AdminVendas />}
          {aba === 'relatorios' && <AdminRelatorios />}
        </motion.div>
      </div>
    </div>
  )
}
