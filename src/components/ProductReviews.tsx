import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { listarAprovadas, enviarAvaliacao, supabaseConfigurado, type Avaliacao } from '../lib/reviews'

function Estrelas({ nota, tamanho = 14 }: { nota: number; tamanho?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={tamanho}
          className={n <= nota ? 'fill-malva text-malva' : 'text-linha'}
        />
      ))}
    </div>
  )
}

export function ProductReviews({ produtoId }: { produtoId: string }) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [carregando, setCarregando] = useState(true)
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true
    setCarregando(true)
    listarAprovadas(produtoId).then((dados) => {
      if (ativo) {
        setAvaliacoes(dados)
        setCarregando(false)
      }
    })
    return () => {
      ativo = false
    }
  }, [produtoId])

  const media =
    avaliacoes.length > 0 ? avaliacoes.reduce((soma, a) => soma + a.nota, 0) / avaliacoes.length : 0

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    if (!nome.trim() || nota === 0) {
      setErro('Preencha seu nome e escolha uma nota.')
      return
    }
    setEnviando(true)
    try {
      await enviarAvaliacao({ produtoId, nome: nome.trim(), nota, comentario: comentario.trim() })
      setEnviado(true)
      setNome('')
      setNota(0)
      setComentario('')
    } catch {
      setErro('Não foi possível enviar sua avaliação agora. Tente novamente mais tarde.')
    } finally {
      setEnviando(false)
    }
  }

  if (!supabaseConfigurado) return null

  return (
    <section className="mt-16 border-t border-linha pt-10">
      <h2 className="font-display text-2xl text-tinta">Avaliações</h2>

      {!carregando && avaliacoes.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <Estrelas nota={Math.round(media)} tamanho={16} />
          <span className="text-sm text-grafite">
            {media.toFixed(1)} de 5 · {avaliacoes.length} avaliaç{avaliacoes.length === 1 ? 'ão' : 'ões'}
          </span>
        </div>
      )}

      {!carregando && avaliacoes.length === 0 && (
        <p className="mt-3 text-sm text-grafite-claro">Esta peça ainda não tem avaliações.</p>
      )}

      <div className="mt-6 flex flex-col gap-5">
        {avaliacoes.map((a) => (
          <div key={a.id} className="border-b border-linha pb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-tinta">{a.nome}</span>
              <Estrelas nota={a.nota} />
            </div>
            {a.comentario && <p className="mt-2 text-sm leading-relaxed text-grafite">{a.comentario}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-md">
        <h3 className="text-sm uppercase tracking-wider text-tinta">Deixe sua avaliação</h3>
        {enviado ? (
          <p className="mt-3 text-sm text-grafite">
            Obrigado! Sua avaliação foi recebida e aparecerá aqui após aprovação.
          </p>
        ) : (
          <form onSubmit={handleEnviar} className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-linha bg-branco px-3 py-2.5 text-sm text-tinta placeholder:text-grafite-claro focus:border-tinta focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-grafite">Sua nota:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} estrelas`}
                    onClick={() => setNota(n)}
                  >
                    <Star size={20} className={n <= nota ? 'fill-malva text-malva' : 'text-linha'} />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Conte como foi sua experiência (opcional)"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              className="border border-linha bg-branco px-3 py-2.5 text-sm text-tinta placeholder:text-grafite-claro focus:border-tinta focus:outline-none"
            />
            {erro && <p className="text-xs text-red-600">{erro}</p>}
            <button
              type="submit"
              disabled={enviando}
              className="mt-1 bg-malva-escuro py-3 text-xs uppercase tracking-wider text-branco transition-colors hover:bg-malva-hover disabled:opacity-60"
            >
              {enviando ? 'Enviando...' : 'Enviar avaliação'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
