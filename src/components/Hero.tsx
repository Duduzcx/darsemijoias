import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLoja } from '../store/LojaContext'
import { getDestaques } from '../data/produtos'
import { formatarPreco } from '../lib/format'
import { SITE } from '../config/site'

const INTERVALO_MS = 4500

// Guardado fora do componente (não no useState) para sobreviver a
// navegações: ao voltar pra Home, o carrossel continua de onde parou
// em vez de reiniciar no primeiro item.
let indiceCompartilhado = 0

export function Hero() {
  const { produtos } = useLoja()
  const [indice, setIndiceState] = useState(indiceCompartilhado)
  const [pausado, setPausado] = useState(false)
  const [progresso, setProgresso] = useState(0) // 0–100, progresso do item atual

  const inicioRef = useRef(Date.now())
  const decorridoRef = useRef(0) // ms já percorridos no item atual (usado ao pausar/retomar)
  const ultimoIndiceRef = useRef(indice)

  function setIndice(atualizar: number | ((i: number) => number)) {
    setIndiceState((atual) => {
      const proximo = typeof atualizar === 'function' ? atualizar(atual) : atualizar
      indiceCompartilhado = proximo
      return proximo
    })
  }

  // Peças que giram na capa: os destaques e, se houver poucos, completa com o restante do catálogo.
  const vitrineCapa = useMemo(() => {
    const destaques = getDestaques(produtos)
    if (destaques.length >= 4) return destaques
    const extras = produtos.filter((p) => !destaques.includes(p)).slice(0, 6 - destaques.length)
    return [...destaques, ...extras]
  }, [produtos])

  const capa = vitrineCapa[indice % vitrineCapa.length]

  useEffect(() => {
    // Trocou de item (automático ou clique manual) — zera o progresso do novo item.
    if (indice !== ultimoIndiceRef.current) {
      ultimoIndiceRef.current = indice
      decorridoRef.current = 0
      setProgresso(0)
    }

    if (pausado || vitrineCapa.length <= 1) return

    inicioRef.current = Date.now() - decorridoRef.current
    const tick = setInterval(() => {
      const decorrido = Date.now() - inicioRef.current
      const pct = Math.min(100, (decorrido / INTERVALO_MS) * 100)
      setProgresso(pct)
      if (pct >= 100) {
        setIndice((i) => (i + 1) % vitrineCapa.length)
      }
    }, 50)

    return () => {
      clearInterval(tick)
      decorridoRef.current = Date.now() - inicioRef.current
    }
  }, [pausado, indice, vitrineCapa.length])

  return (
    <section className="border-b border-linha">
      <div className="grid md:grid-cols-2">
        {/* Vitrine de capa — troca de peça automaticamente, como uma vitrine giratória */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-neve md:aspect-auto"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
        >
          <AnimatePresence mode="wait">
            {capa && (
              <motion.div
                key={capa.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Link to={`/produto/${capa.id}`} className="group block h-full w-full">
                  <img
                    src={capa.imagens[0]}
                    alt={capa.nome}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta/35 via-transparent to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="absolute bottom-0 left-0 bg-branco px-4 py-3"
                  >
                    <p className="text-sm text-tinta">{capa.nome}</p>
                    <p className="mt-0.5 text-xs text-malva">{formatarPreco(capa.preco)}</p>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {vitrineCapa.length > 1 && (
            <div className="absolute inset-x-4 top-4 flex gap-1.5">
              {vitrineCapa.map((p, i) => {
                const preenchido = i < indice ? 100 : i === indice ? progresso : 0
                return (
                  <button
                    key={p.id}
                    aria-label={`Ver ${p.nome}`}
                    onClick={() => setIndice(i)}
                    className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-branco/35"
                  >
                    <span
                      style={{ width: `${preenchido}%` }}
                      className="absolute inset-y-0 left-0 rounded-full bg-branco"
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-malva"
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
              className="mt-7 inline-block bg-malva-escuro px-7 py-3.5 text-xs uppercase tracking-widest text-branco transition-colors hover:bg-malva-hover"
            >
              Ver coleção completa
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
