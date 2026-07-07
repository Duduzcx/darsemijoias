import { useEffect } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { getProdutoPorId, getRelacionados } from '../data/produtos'
import { useLoja } from '../store/LojaContext'
import { CATEGORIAS } from '../data/types'
import { formatarPreco } from '../lib/format'
import { linkWhatsApp } from '../config/site'
import { ProductGallery } from '../components/ProductGallery'
import { RelatedProducts } from '../components/RelatedProducts'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { produtos } = useLoja()
  const produto = id ? getProdutoPorId(produtos, id) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!produto) {
    return <Navigate to="/" replace />
  }

  const relacionados = getRelacionados(produtos, produto)
  const mensagem = `Olá! Tenho interesse na peça "${produto.nome}" (${formatarPreco(produto.preco)}) que vi no site.`

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-grafite transition-colors hover:text-tinta"
        >
          <ChevronLeft size={15} />
          Voltar
        </motion.button>
      </div>

      <nav className="mb-8 flex items-center gap-1.5 text-xs text-grafite">
        <Link to="/" className="hover:text-tinta">
          Início
        </Link>
        <ChevronRight size={12} />
        <Link to={`/categoria/${produto.categoria}`} className="hover:text-tinta">
          {CATEGORIAS[produto.categoria]}
        </Link>
        <ChevronRight size={12} />
        <span className="text-grafite-claro">{produto.nome}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGallery imagens={produto.imagens} nome={produto.nome} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-camel">{CATEGORIAS[produto.categoria]}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-tinta md:text-4xl">
            {produto.nome}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {produto.precoAntigo && (
              <span className="text-base text-grafite-claro line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
            <span className="font-display text-2xl text-tinta">{formatarPreco(produto.preco)}</span>
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-grafite">{produto.descricao}</p>

          <ul className="mt-6 flex flex-col gap-2">
            {produto.detalhes.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-grafite">
                <Check size={14} className="text-camel" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {produto.estoque ? (
              <a
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-tinta py-3.5 text-sm font-semibold uppercase tracking-wider text-branco transition-colors hover:opacity-80 sm:w-auto sm:px-10"
              >
                <MessageCircle size={18} />
                Comprar pelo WhatsApp
              </a>
            ) : (
              <div className="flex w-full items-center justify-center border border-linha py-3.5 text-sm uppercase tracking-wider text-grafite sm:w-auto sm:px-10">
                Peça esgotada
              </div>
            )}
            <p className="mt-3 text-xs text-grafite-claro">
              Você será direcionado para o WhatsApp com a peça já identificada na mensagem.
            </p>
          </div>
        </motion.div>
      </div>

      <RelatedProducts produtos={relacionados} />
    </section>
  )
}
