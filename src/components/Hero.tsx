import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getDestaques } from '../data/produtos'
import { formatarPreco } from '../lib/format'
import { SITE } from '../config/site'

export function Hero() {
  const destaques = getDestaques()

  return (
    <section className="relative overflow-hidden border-b border-veludo-2">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-ouro"
        >
          Coleção atual
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 max-w-2xl font-display text-4xl leading-tight text-perola md:text-6xl"
        >
          {SITE.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-md text-sm text-fumo"
        >
          Joias e óculos selecionados peça a peça. Escolha na vitrine e finalize sua compra direto no WhatsApp.
        </motion.p>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-5 pb-8 md:px-8">
        {destaques.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <Link
              to={`/produto/${p.id}`}
              className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-sm border border-veludo-2 bg-veludo md:w-[260px]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={p.imagens[0]}
                  alt={p.nome}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
              </div>
              <div className="p-3">
                <p className="font-display text-sm text-perola">{p.nome}</p>
                <p className="mt-1 text-xs text-ouro-claro">{formatarPreco(p.preco)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
