import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api'
import { AuthContext } from '../context/AuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', form)
      login({ token: res.data.token, user: res.data.user })
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-16 md:py-24">
      <div className="page-container max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-on-primary font-display font-bold text-xl">H&B</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">Admin Login</h1>
          <p className="text-sm text-on-surface-variant mt-1">Sign in to manage your cafe.</p>
        </div>

        <form onSubmit={submit} className="card space-y-4">
          <div>
            <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input type="email" className="input-field pl-10" placeholder="admin@heartnbrew.in" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <FiLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input type={showPass ? 'text' : 'password'} className="input-field pl-10 pr-10" placeholder="••••••••" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
