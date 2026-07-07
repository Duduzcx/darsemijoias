import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Produto } from '../data/types'
import { formatarPreco } from '../lib/format'
import { linkWhatsApp } from '../config/site'

export function ProductCard({ produto, index = 0 }: { produto: Produto; index?: number }) {
  const mensagem = `Olá! Tenho interesse na peça "${produto.nome}" (${formatarPreco(produto.preco)}) que vi no site.`
  const imagemHover = produto.imagens[1] ?? produto.imagens[0]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.04 }}
      className="group relative"
    >
      <Link to={`/produto/${produto.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-neve">
          <img
            src={produto.imagens[0]}
            alt={produto.nome}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={imagemHover}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {(produto.novo || produto.precoAntigo) && (
            <span className="absolute left-3 top-3 bg-branco px-2.5 py-1 text-[10px] uppercase tracking-wider text-tinta">
              {produto.novo ? 'Novo' : 'Oferta'}
            </span>
          )}

          {!produto.estoque && (
            <div className="absolute inset-0 flex items-center justify-center bg-branco/70">
              <span className="text-xs uppercase tracking-widest text-grafite">Esgotado</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-sm leading-snug text-tinta">{produto.nome}</h3>
          <div className="mt-1 flex items-baseline gap-2">
            {produto.precoAntigo && (
              <span className="text-xs text-grafite-claro line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
            <span className="text-sm text-tinta">{formatarPreco(produto.preco)}</span>
          </div>
        </div>
      </Link>

      {produto.estoque && (
        <a
          href={linkWhatsApp(mensagem)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-block text-xs uppercase tracking-wider text-camel underline decoration-camel/40 underline-offset-4 transition-colors hover:text-camel-escuro"
        >
          Comprar pelo WhatsApp
        </a>
      )}
    </motion.div>
  )
}
