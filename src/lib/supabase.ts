import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Enquanto os dados reais não estão no Supabase, o site usa o mock em src/data/produtos.ts.
// Quando migrar, basta preencher as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
// no arquivo .env e trocar as chamadas de PRODUTOS pelas queries abaixo.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const supabaseConfigurado = Boolean(supabase)
