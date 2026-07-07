import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsAppFloating } from './components/WhatsAppFloating'
import { Home } from './pages/Home'
import { CategoriaPage } from './pages/CategoriaPage'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:slug" element={<CategoriaPage />} />
            <Route path="/produto/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <WhatsAppFloating />
    </BrowserRouter>
  )
}

export default App
