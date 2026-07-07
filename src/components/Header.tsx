import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { SITE, linkWhatsApp } from '../config/site'
import { CATEGORIAS } from '../data/types'

const linksNav = [
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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        rolado ? 'bg-obsidian/95 backdrop-blur-sm border-b border-veludo-2' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="font-display text-2xl tracking-[0.15em] text-perola">
          {SITE.nome}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {linksNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-body text-sm uppercase tracking-wider transition-colors ${
                  isActive ? 'text-ouro' : 'text-fumo hover:text-perola'
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
            className="flex items-center gap-2 rounded-full border border-ouro/40 px-4 py-2 text-sm text-ouro-claro transition-colors hover:border-ouro hover:bg-ouro/10"
          >
            <MessageCircle size={16} />
            Fale conosco
          </a>
        </div>

        <button
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
          className="text-perola md:hidden"
        >
          {aberto ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {aberto && (
        <div className="border-t border-veludo-2 bg-obsidian px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {linksNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  `border-b border-veludo-2 py-3 font-body text-sm uppercase tracking-wider ${
                    isActive ? 'text-ouro' : 'text-fumo'
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
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ouro px-4 py-3 text-sm font-semibold text-obsidian"
          >
            <MessageCircle size={16} />
            Fale conosco no WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
