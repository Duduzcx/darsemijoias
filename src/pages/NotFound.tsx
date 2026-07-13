import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFound() {
  useDocumentMeta({
    title: 'Página não encontrada — Dar Semijoias',
    description: 'A página que você procura não existe ou foi movida.',
  })

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-malva">Erro 404</p>
      <h1 className="mt-3 font-display text-3xl text-tinta md:text-4xl">Página não encontrada</h1>
      <p className="mt-4 text-sm leading-relaxed text-grafite">
        A peça que você procura pode ter sido movida ou não existe mais.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-malva-escuro px-8 py-3.5 text-sm uppercase tracking-wider text-branco transition-colors hover:bg-malva-hover"
      >
        Voltar à vitrine
      </Link>
    </section>
  )
}
