import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, MessageCircle, Lock } from 'lucide-react'
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

const linksNav = [
  { to: '/', label: 'Início', end: true },
  { to: '/categoria/aneis', label: CATEGORIAS.aneis },
  { to: '/categoria/colares', label: CATEGORIAS.colares },
  { to: '/categoria/brincos', label: CATEGORIAS.brincos },
  { to: '/categoria/pulseiras', label: CATEGORIAS.pulseiras },
  { to: '/categoria/oculos', label: CATEGORIAS.oculos },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {linksNav.map((l, i) => (
        <motion.div
          key={l.to}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.04 * i }}
        >
          <NavLink
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 py-2.5 font-body text-[13px] uppercase tracking-wider transition-colors ${
                isActive ? 'text-tinta' : 'text-grafite hover:text-tinta'
              }`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive ? 'w-5 bg-tinta' : 'w-2.5 bg-grafite-claro group-hover:w-5 group-hover:bg-tinta'
                  }`}
                />
                {l.label}
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </nav>
  )
}

export function Sidebar() {
  const [aberto, setAberto] = useState(false)

  // trava o scroll do body quando o drawer mobile está aberto
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <>
      {/* Barra superior mobile */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-linha bg-branco px-5 py-4 md:hidden">
        <Link to="/" className="font-display text-xl tracking-[0.2em] text-tinta">
          {SITE.nome}
        </Link>
        <button aria-label="Abrir menu" onClick={() => setAberto(true)} className="text-tinta">
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar fixa — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-linha bg-branco px-7 py-9 md:flex">
        <Link to="/" className="font-display text-2xl leading-tight tracking-[0.15em] text-tinta">
          {SITE.nome}
        </Link>
        <p className="mt-2 text-xs leading-relaxed text-grafite-claro">{SITE.tagline}</p>

        <div className="mt-10">
          <NavLinks />
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-grafite transition-colors hover:text-tinta"
          >
            <InstagramIcon />
            {SITE.instagram}
          </a>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-tinta py-3 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
          >
            <MessageCircle size={15} />
            Fale conosco
          </a>
          <Link
            to="/admin"
            className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-grafite-claro transition-colors hover:text-grafite"
          >
            <Lock size={12} />
            Área restrita
          </Link>
        </div>
      </aside>

      {/* Drawer — mobile */}
      <AnimatePresence>
        {aberto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setAberto(false)}
              className="fixed inset-0 z-40 bg-tinta/40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-xs flex-col bg-branco px-7 py-8 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.2em] text-tinta">{SITE.nome}</span>
                <button aria-label="Fechar menu" onClick={() => setAberto(false)} className="text-tinta">
                  <X size={22} />
                </button>
              </div>

              <div className="mt-8">
                <NavLinks onNavigate={() => setAberto(false)} />
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-grafite"
                >
                  <InstagramIcon />
                  {SITE.instagram}
                </a>
                <a
                  href={linkWhatsApp()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-tinta py-3 text-xs uppercase tracking-wider text-branco"
                >
                  <MessageCircle size={15} />
                  Fale conosco
                </a>
                <Link
                  to="/admin"
                  onClick={() => setAberto(false)}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-grafite-claro"
                >
                  <Lock size={12} />
                  Área restrita
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
