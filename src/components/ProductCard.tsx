import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import type { Produto } from '../data/types'
import { formatarPreco } from '../lib/format'
import { linkWhatsApp } from '../config/site'

export function ProductCard({ produto }: { produto: Produto }) {
  const mensagem = `Olá! Tenho interesse na peça "${produto.nome}" (${formatarPreco(produto.preco)}) que vi no site.`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link to={`/produto/${produto.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-veludo-2 bg-veludo">
          <img
            src={produto.imagens[0]}
            alt={produto.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Brilho de vidro de vitrine — desliza na diagonal ao passar o mouse */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden
          />

          {(produto.novo || produto.precoAntigo) && (
            <span className="absolute left-3 top-3 rounded-full bg-obsidian/80 px-2.5 py-1 text-[11px] uppercase tracking-wider text-ouro-claro backdrop-blur-sm">
              {produto.novo ? 'Novo' : 'Oferta'}
            </span>
          )}

          {!produto.estoque && (
            <div className="absolute inset-0 flex items-center justify-center bg-obsidian/70">
              <span className="text-sm uppercase tracking-widest text-fumo">Esgotado</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base leading-snug text-perola">{produto.nome}</h3>
            <div className="mt-1 flex items-baseline gap-2">
              {produto.precoAntigo && (
                <span className="text-xs text-fumo-escuro line-through">
                  {formatarPreco(produto.precoAntigo)}
                </span>
              )}
              <span className="text-sm text-ouro-claro">{formatarPreco(produto.preco)}</span>
            </div>
          </div>
        </div>
      </Link>

      {produto.estoque && (
        <a
          href={linkWhatsApp(mensagem)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ouro/30 py-2 text-xs uppercase tracking-wider text-ouro-claro transition-all duration-300 hover:border-ouro hover:bg-ouro/10 md:opacity-0 md:group-hover:opacity-100"
        >
          <MessageCircle size={14} />
          Comprar
        </a>
      )}
    </motion.div>
  )
}
