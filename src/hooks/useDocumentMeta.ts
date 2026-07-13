import { useEffect } from 'react'

interface DocumentMeta {
  title: string
  description: string
  image?: string
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/** Atualiza title/meta tags da página e restaura os valores padrão do index.html ao desmontar. */
export function useDocumentMeta({ title, description, image }: DocumentMeta) {
  useEffect(() => {
    const tituloAnterior = document.title
    const descAnterior = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    const ogTituloAnterior = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? ''
    const ogDescAnterior = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? ''
    const ogImagemAnterior = document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? ''

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    if (image) setMeta('meta[property="og:image"]', 'content', image)

    return () => {
      document.title = tituloAnterior
      setMeta('meta[name="description"]', 'content', descAnterior)
      setMeta('meta[property="og:title"]', 'content', ogTituloAnterior)
      setMeta('meta[property="og:description"]', 'content', ogDescAnterior)
      setMeta('meta[name="twitter:title"]', 'content', ogTituloAnterior)
      setMeta('meta[name="twitter:description"]', 'content', ogDescAnterior)
      if (image) setMeta('meta[property="og:image"]', 'content', ogImagemAnterior)
    }
  }, [title, description, image])
}
