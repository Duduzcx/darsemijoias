import { useState } from 'react'

// Senha da área restrita. Troque este valor antes de divulgar o site.
// IMPORTANTE: esta é uma proteção simples (nível "não deixar qualquer um mexer"),
// não é segurança de verdade — o código roda no navegador, então alguém com
// conhecimento técnico consegue ver esse valor no código-fonte. Para produção
// com dados sensíveis de verdade, o certo é migrar para Supabase Auth (mesmo
// padrão já usado no painel da Neve na Nave).
export const ADMIN_PASSWORD = 'darsemijoias2026'

const SESSION_KEY = 'darsemijoias:admin-auth'

export function isAdminAutenticado() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function autenticarAdmin(senha: string) {
  const ok = senha === ADMIN_PASSWORD
  if (ok) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignora se sessionStorage não estiver disponível
    }
  }
  return ok
}

export function sairAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // ignora
  }
}

export function useAdminAuthState() {
  const [autenticado, setAutenticado] = useState(isAdminAutenticado)
  return { autenticado, setAutenticado }
}
