import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Reservations from './pages/Reservations'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-surface">
        <Routes>
          {/* Login - no header/footer */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin - no header/footer */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

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
    </AuthProvider>
  )
}
