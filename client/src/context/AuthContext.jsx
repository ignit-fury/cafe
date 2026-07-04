import React, { createContext, useState, useEffect } from 'react'
import axios from '../api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('hb_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [user])

  const login = (payload) => {
    setUser(payload)
    localStorage.setItem('hb_user', JSON.stringify(payload))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hb_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
