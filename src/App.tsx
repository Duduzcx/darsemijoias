import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { LojaProvider } from './store/LojaContext'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'
import { WhatsAppFloating } from './components/WhatsAppFloating'
import { Home } from './pages/Home'
import { CategoriaPage } from './pages/CategoriaPage'
import { ProductPage } from './pages/ProductPage'

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })))
const AdminGate = lazy(() => import('./pages/admin/AdminGate').then((m) => ({ default: m.AdminGate })))
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function SiteApp() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col md:pl-60">
      <Sidebar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/categoria/:slug"
              element={
                <PageTransition>
                  <CategoriaPage />
                </PageTransition>
              }
            />
            <Route
              path="/produto/:id"
              element={
                <PageTransition>
                  <ProductPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LojaProvider>
        <Routes>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="p-10 text-sm text-grafite">Carregando...</div>}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<div className="p-10 text-sm text-grafite">Carregando...</div>}>
                <AdminGate>
                  <AdminDashboard />
                </AdminGate>
              </Suspense>
            }
          />
          <Route path="/*" element={<SiteApp />} />
        </Routes>
      </LojaProvider>
    </BrowserRouter>
  )
}

export default App
