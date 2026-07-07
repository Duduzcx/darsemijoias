import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { autenticarAdmin } from '../../config/admin'
import { SITE } from '../../config/site'

export function AdminLogin() {
  const navigate = useNavigate()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (autenticarAdmin(senha)) {
      navigate('/admin/dashboard')
    } else {
      setErro(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-branco-osso px-5">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-branco p-8"
      >
        <div className="flex items-center gap-2 text-tinta">
          <Lock size={18} />
          <span className="font-display text-lg tracking-wide">Área restrita</span>
        </div>
        <p className="mt-2 text-sm text-grafite">{SITE.nome} — acesso da administração</p>

        <label className="mt-6 block text-xs uppercase tracking-wider text-grafite">Senha</label>
        <input
          type="password"
          autoFocus
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value)
            setErro(false)
          }}
          className="mt-2 w-full border border-linha bg-branco px-4 py-3 text-sm text-tinta outline-none focus:border-tinta"
        />

        {erro && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-red-600"
          >
            Senha incorreta.
          </motion.p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-tinta py-3 text-xs uppercase tracking-wider text-branco transition-opacity hover:opacity-80"
        >
          Entrar
        </button>

        <Link to="/" className="mt-5 block text-center text-xs text-grafite hover:text-tinta">
          ← Voltar para o site
        </Link>
      </motion.form>
    </div>
  )
}
