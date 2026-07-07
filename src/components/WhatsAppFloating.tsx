import { MessageCircle } from 'lucide-react'
import { linkWhatsApp } from '../config/site'

export function WhatsAppFloating() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ouro text-obsidian shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  )
}
