import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Reservations from './pages/Reservations'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Routes>
        {/* Admin - no header/footer */}
        <Route path="/admin" element={<Admin />} />

        {/* Public pages with header/footer */}
        <Route path="*" element={
          <>
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/reservations" element={<Reservations />} />
              </Routes>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}
