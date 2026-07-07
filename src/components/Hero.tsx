import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getDestaques } from '../data/produtos'
import { formatarPreco } from '../lib/format'
import { SITE } from '../config/site'

export function Hero() {
  const destaques = getDestaques()
  const capa = destaques[0]

  return (
    <section className="border-b border-linha">
      <div className="grid md:grid-cols-2">
        {/* Imagem de capa — a peça de destaque é o próprio herói da página */}
        <Link to={capa ? `/produto/${capa.id}` : '/'} className="group relative block aspect-[4/5] overflow-hidden bg-neve md:aspect-auto">
          {capa && (
            <>
              <img
                src={capa.imagens[0]}
                alt={capa.nome}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 bg-branco px-4 py-3">
                <p className="text-sm text-tinta">{capa.nome}</p>
                <p className="mt-0.5 text-xs text-camel">{formatarPreco(capa.preco)}</p>
              </div>
            </>
          )}
        </Link>

        <div className="flex flex-col justify-center px-6 py-14 md:px-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-camel"
          >
            Coleção atual
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 max-w-md font-display text-4xl leading-[1.1] text-tinta md:text-5xl"
          >
            {SITE.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-sm text-sm leading-relaxed text-grafite"
          >
            Joias e óculos selecionados peça a peça. Escolha na vitrine e finalize sua compra direto no
            WhatsApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#vitrine"
              className="mt-7 inline-block bg-tinta px-7 py-3.5 text-xs uppercase tracking-widest text-branco transition-opacity hover:opacity-80"
            >
              Ver coleção completa
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
