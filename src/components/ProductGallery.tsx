import { useState } from 'react'

export function ProductGallery({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [ativa, setAtiva] = useState(0)

  return (
    <div>
      <div className="aspect-square overflow-hidden bg-neve">
        <img
          src={imagens[ativa]}
          alt={nome}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>

      {imagens.length > 1 && (
        <div className="mt-3 flex gap-3">
          {imagens.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setAtiva(i)}
              aria-label={`Ver imagem ${i + 1} de ${nome}`}
              className={`h-20 w-20 shrink-0 overflow-hidden border transition-colors ${
                ativa === i ? 'border-tinta' : 'border-linha hover:border-grafite'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
