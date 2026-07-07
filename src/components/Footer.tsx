import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import { SITE, linkWhatsApp } from '../config/site'
import { CATEGORIAS } from '../data/types'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-veludo-2 bg-obsidian">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.15em] text-perola">{SITE.nome}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fumo">{SITE.tagline}</p>
          <a
            href={`https://instagram.com/${SITE.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-fumo transition-colors hover:text-ouro-claro"
          >
            <InstagramIcon />
            {SITE.instagram}
          </a>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest text-ouro">Categorias</p>
          <ul className="mt-4 flex flex-col gap-2">
            {Object.entries(CATEGORIAS).map(([slug, nome]) => (
              <li key={slug}>
                <Link
                  to={`/categoria/${slug}`}
                  className="text-sm text-fumo transition-colors hover:text-perola"
                >
                  {nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-widest text-ouro">Atendimento</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-fumo">
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
          <p className="font-body text-xs uppercase tracking-widest text-ouro">Compre pelo WhatsApp</p>
          <p className="mt-4 text-sm leading-relaxed text-fumo">
            Escolha a peça na vitrine e finalize sua compra diretamente com a gente.
          </p>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-ouro px-5 py-2.5 text-sm font-semibold text-obsidian transition-colors hover:bg-ouro-claro"
          >
            Iniciar conversa
          </a>
        </div>
      </div>

      <div className="border-t border-veludo-2 px-5 py-5 text-center text-xs text-fumo-escuro md:px-8">
        © {new Date().getFullYear()} {SITE.nomeCompleto}. Todos os direitos reservados.
      </div>
    </footer>
  )
}
