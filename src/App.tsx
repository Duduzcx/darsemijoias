import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'
import { WhatsAppFloating } from './components/WhatsAppFloating'
import { Home } from './pages/Home'
import { CategoriaPage } from './pages/CategoriaPage'
import { ProductPage } from './pages/ProductPage'

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

function AnimatedRoutes() {
  const location = useLocation()
  return (
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
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col md:pl-60">
        <Sidebar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <WhatsAppFloating />
    </BrowserRouter>
  )
}

export default App
