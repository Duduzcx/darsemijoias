import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function ProductGallery({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [ativa, setAtiva] = useState(0)

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-neve">
        <AnimatePresence mode="wait">
          <motion.img
            key={imagens[ativa]}
            src={imagens[ativa]}
            alt={nome}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {imagens.length > 1 && (
        <div className="mt-3 flex gap-3">
          {imagens.map((img, i) => (
            <motion.button
              key={img + i}
              onClick={() => setAtiva(i)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Ver imagem ${i + 1} de ${nome}`}
              className={`h-20 w-20 shrink-0 overflow-hidden border transition-colors ${
                ativa === i ? 'border-tinta' : 'border-linha hover:border-grafite'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
