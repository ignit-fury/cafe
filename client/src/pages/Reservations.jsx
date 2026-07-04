import React, { useState } from 'react'
import axios from '../api'
import { FiCheck, FiCalendar, FiClock, FiUsers, FiPhone, FiUser } from 'react-icons/fi'

const occasions = ['Birthday', 'Anniversary', 'Casual Dining', 'Business Meeting', 'Date Night', 'Other']
const timeSlots = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

export default function Reservations() {
  const [form, setForm] = useState({ customerName: '', phone: '', date: '', time: '19:00', partySize: 2, occasion: 'Casual Dining', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post('/api/reservations', form)
      setSubmitted(true)
    } catch {
      setError('Failed to submit reservation. Please try again.')
    }
  }

  if (submitted) {
    return (
      <main className="py-16 md:py-24">
        <div className="page-container max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
            <FiCheck size={32} className="text-tertiary" />
          </div>
          <h1 className="section-heading mb-3">Reservation Confirmed!</h1>
          <p className="section-subheading mb-8">We've received your booking request. We'll confirm via phone shortly.</p>
          <button onClick={() => { setSubmitted(false); setForm({ customerName: '', phone: '', date: '', time: '19:00', partySize: 2, occasion: 'Casual Dining', notes: '' }) }} className="btn-secondary">
            Make Another Reservation
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="py-10 md:py-16">
      <div className="page-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="section-heading mb-2">Reserve a Table</h1>
            <p className="section-subheading">Book your cozy corner at Heart & Brew.</p>
          </div>

          <form onSubmit={submit} className="card space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <FiUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input className="input-field pl-10" placeholder="John Doe" required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Phone</label>
                <div className="relative">
                  <FiPhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input className="input-field pl-10" placeholder="+91 98765 43210" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <FiCalendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input type="date" className="input-field pl-10" min={today} required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Time</label>
                <div className="relative">
                  <FiClock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <select className="input-field pl-10" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{parseInt(t) > 12 ? `${parseInt(t) - 12}:${t.slice(3)} PM` : `${t} AM`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Guests</label>
                <div className="relative">
                  <FiUsers size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <select className="input-field pl-10" value={form.partySize} onChange={e => setForm({ ...form, partySize: Number(e.target.value) })}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Occasion</label>
              <select className="input-field" value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })}>
                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Special Requests</label>
              <textarea className="input-field resize-none" rows={3} placeholder="Any dietary requirements or special requests..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>

            {error && <p className="text-sm text-error">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
