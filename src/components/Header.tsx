import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { SITE, linkWhatsApp } from '../config/site'
import { CATEGORIAS } from '../data/types'

const linksNav = [
  { to: '/', label: 'Início', end: true },
  { to: '/categoria/aneis', label: CATEGORIAS.aneis },
  { to: '/categoria/colares', label: CATEGORIAS.colares },
  { to: '/categoria/brincos', label: CATEGORIAS.brincos },
  { to: '/categoria/pulseiras', label: CATEGORIAS.pulseiras },
  { to: '/categoria/oculos', label: CATEGORIAS.oculos },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolado, setRolado] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-branco transition-shadow duration-300 ${
        rolado ? 'border-b border-linha' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="font-display text-xl tracking-[0.2em] text-tinta">
          {SITE.nome}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {linksNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative py-1 font-body text-[13px] uppercase tracking-wider text-tinta transition-opacity hover:opacity-60 ${
                  isActive ? 'after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:bg-tinta' : ''
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] uppercase tracking-wider text-tinta transition-opacity hover:opacity-60"
          >
            <MessageCircle size={15} />
            Fale conosco
          </a>
        </div>

        <button
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
          className="text-tinta md:hidden"
        >
          {aberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {aberto && (
        <div className="border-t border-linha bg-branco px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col">
            {linksNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  `border-b border-linha py-3 font-body text-sm uppercase tracking-wider ${
                    isActive ? 'text-tinta' : 'text-grafite'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-tinta px-4 py-3 text-sm font-semibold uppercase tracking-wider text-branco"
          >
            <MessageCircle size={16} />
            Fale conosco no WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
