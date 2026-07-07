import { Navigate } from 'react-router-dom'
import { isAdminAutenticado } from '../../config/admin'

export function AdminGate({ children }: { children: React.ReactNode }) {
  if (!isAdminAutenticado()) {
    return <Navigate to="/admin" replace />
  }
  return <>{children}</>
}
