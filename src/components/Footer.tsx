import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { SITE, linkWhatsApp } from '../config/site'
import { CATEGORIAS } from '../data/types'

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="border-t border-linha bg-branco"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-xl tracking-[0.2em] text-tinta">{SITE.nome}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-grafite">{SITE.tagline}</p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-grafite transition-colors hover:text-tinta"
          >
            <InstagramIcon />
            {SITE.instagram}
          </a>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest text-camel">Categorias</p>
          <ul className="mt-4 flex flex-col gap-2">
            {Object.entries(CATEGORIAS).map(([slug, nome]) => (
              <li key={slug}>
                <Link
                  to={`/categoria/${slug}`}
                  className="text-sm text-grafite transition-colors hover:text-tinta"
                >
                  {nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest text-camel">Atendimento</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-grafite">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              {SITE.endereco}
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0" />
              {SITE.horario}
            </li>
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest text-camel">Compre pelo WhatsApp</p>
          <p className="mt-4 text-sm leading-relaxed text-grafite">
            Escolha a peça na vitrine e finalize sua compra diretamente com a gente.
          </p>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block bg-tinta px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
          >
            Iniciar conversa
          </a>
        </div>
      </div>

      <div className="border-t border-linha px-5 py-5 text-center text-xs text-grafite-claro md:px-8">
        © {new Date().getFullYear()} {SITE.nomeCompleto}. Todos os direitos reservados. · Desenvolvido por{' '}
        {SITE.desenvolvidoPor}
      </div>
    </motion.footer>
  )
}
