import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Link2, Trash2 } from 'lucide-react'
import type { Produto, Categoria } from '../../data/types'
import { CATEGORIAS } from '../../data/types'

interface Props {
  produtoInicial?: Produto
  onSalvar: (dados: Omit<Produto, 'id'>) => void
  onFechar: () => void
}

const categoriaOpcoes = Object.entries(CATEGORIAS) as [Categoria, string][]

function arquivoParaDataUrl(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader()
    leitor.onload = () => resolve(leitor.result as string)
    leitor.onerror = reject
    leitor.readAsDataURL(arquivo)
  })
}

export function ProdutoForm({ produtoInicial, onSalvar, onFechar }: Props) {
  const [nome, setNome] = useState(produtoInicial?.nome ?? '')
  const [categoria, setCategoria] = useState<Categoria>(produtoInicial?.categoria ?? 'aneis')
  const [preco, setPreco] = useState(String(produtoInicial?.preco ?? ''))
  const [emPromocao, setEmPromocao] = useState(produtoInicial?.precoAntigo != null)
  const [precoAntigo, setPrecoAntigo] = useState(
    produtoInicial?.precoAntigo != null ? String(produtoInicial.precoAntigo) : '',
  )
  const [descricao, setDescricao] = useState(produtoInicial?.descricao ?? '')
  const [detalhes, setDetalhes] = useState(produtoInicial?.detalhes.join(', ') ?? '')
  const [imagens, setImagens] = useState<string[]>(produtoInicial?.imagens ?? [])
  const [urlImagem, setUrlImagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [destaque, setDestaque] = useState(produtoInicial?.destaque ?? false)
  const [novo, setNovo] = useState(produtoInicial?.novo ?? false)
  const [estoque, setEstoque] = useState(produtoInicial?.estoque ?? true)
  const inputArquivoRef = useRef<HTMLInputElement>(null)

  function adicionarUrl() {
    const url = urlImagem.trim()
    if (!url) return
    setImagens((prev) => [...prev, url])
    setUrlImagem('')
  }

  async function onArquivosSelecionados(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(e.target.files ?? [])
    if (arquivos.length === 0) return
    setEnviando(true)
    try {
      const dataUrls = await Promise.all(arquivos.map(arquivoParaDataUrl))
      setImagens((prev) => [...prev, ...dataUrls])
    } finally {
      setEnviando(false)
      if (inputArquivoRef.current) inputArquivoRef.current.value = ''
    }
  }

  function removerImagem(index: number) {
    setImagens((prev) => prev.filter((_, i) => i !== index))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const listaDetalhes = detalhes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    onSalvar({
      nome,
      categoria,
      preco: Number(preco) || 0,
      precoAntigo: emPromocao && precoAntigo ? Number(precoAntigo) : undefined,
      descricao,
      detalhes: listaDetalhes.length ? listaDetalhes : ['—'],
      imagens: imagens.length ? imagens : ['https://placehold.co/900x900/f2f0ec/17160f?text=Sem+foto'],
      destaque,
      novo,
      estoque,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-tinta/40 p-4 py-10"
      onClick={onFechar}
    >
      <motion.form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl bg-branco p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl text-tinta">
            {produtoInicial ? 'Editar produto' : 'Novo produto'}
          </h2>
          <button type="button" onClick={onFechar} className="text-grafite hover:text-tinta">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">Nome</label>
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-grafite">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
              className="mt-1.5 w-full border border-linha bg-branco px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            >
              {categoriaOpcoes.map(([valor, label]) => (
                <option key={valor} value={valor}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-grafite">Preço (R$)</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          {/* Promoção */}
          <div className="sm:col-span-2 border border-linha p-4">
            <label className="flex items-center gap-2 text-sm text-tinta">
              <input
                type="checkbox"
                checked={emPromocao}
                onChange={(e) => {
                  setEmPromocao(e.target.checked)
                  if (!e.target.checked) setPrecoAntigo('')
                }}
              />
              Peça em promoção
            </label>
            <AnimatePresence>
              {emPromocao && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3">
                    <label className="text-xs uppercase tracking-wider text-grafite">
                      Preço original (antes da promoção)
                    </label>
                    <input
                      required={emPromocao}
                      type="number"
                      step="0.01"
                      min="0"
                      value={precoAntigo}
                      onChange={(e) => setPrecoAntigo(e.target.value)}
                      placeholder="Ex: 289.90"
                      className="mt-1.5 w-full max-w-xs border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
                    />
                    <p className="mt-1.5 text-xs text-grafite-claro">
                      Vai aparecer riscado no site, com o preço atual em destaque e a tag "Oferta".
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">Descrição</label>
            <textarea
              required
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">
              Detalhes (separados por vírgula)
            </label>
            <input
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              placeholder="Folheado a ouro 18k, Aro ajustável, Antialérgico"
              className="mt-1.5 w-full border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
            />
          </div>

          {/* Imagens */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-grafite">Fotos do produto</label>

            {imagens.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {imagens.map((img, i) => (
                  <div key={i} className="group relative h-16 w-16 shrink-0 overflow-hidden border border-linha">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removerImagem(i)}
                      aria-label="Remover imagem"
                      className="absolute inset-0 flex items-center justify-center bg-tinta/60 text-branco opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 gap-2">
                <input
                  value={urlImagem}
                  onChange={(e) => setUrlImagem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      adicionarUrl()
                    }
                  }}
                  placeholder="Cole a URL de uma foto..."
                  className="flex-1 border border-linha px-3 py-2.5 text-sm text-tinta outline-none focus:border-tinta"
                />
                <button
                  type="button"
                  onClick={adicionarUrl}
                  className="flex items-center gap-1.5 border border-linha px-3 text-xs uppercase tracking-wider text-grafite hover:border-tinta hover:text-tinta"
                >
                  <Link2 size={14} />
                  Add
                </button>
              </div>

              <label className="flex cursor-pointer items-center justify-center gap-1.5 border border-dashed border-linha px-3 py-2.5 text-xs uppercase tracking-wider text-grafite hover:border-tinta hover:text-tinta">
                <Upload size={14} />
                {enviando ? 'Enviando...' : 'Anexar do computador'}
                <input
                  ref={inputArquivoRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onArquivosSelecionados}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-1.5 text-xs text-grafite-claro">
              Você pode colar o link de uma foto ou anexar direto do computador/celular. A primeira foto da
              lista é a que aparece na vitrine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={novo} onChange={(e) => setNovo(e.target.checked)} />
              Novo
            </label>
            <label className="flex items-center gap-2 text-sm text-grafite">
              <input type="checkbox" checked={estoque} onChange={(e) => setEstoque(e.target.checked)} />
              Em estoque
            </label>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="submit"
            disabled={enviando}
            className="flex-1 bg-tinta py-3 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onFechar}
            className="flex-1 border border-linha py-3 text-xs uppercase tracking-wider text-grafite hover:border-tinta hover:text-tinta"
          >
            Cancelar
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}
