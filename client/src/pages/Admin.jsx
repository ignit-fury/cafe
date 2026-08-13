import React, { useEffect, useState } from 'react'
import axios from '../api'
import { FiGrid, FiCoffee, FiShoppingBag, FiCalendar, FiStar, FiPlus, FiTrash2, FiEdit2, FiX, FiCheck, FiClock, FiRefreshCw } from 'react-icons/fi'

const tabs = [
  { key: 'overview', label: 'Overview', icon: FiGrid },
  { key: 'menu', label: 'Menu', icon: FiCoffee },
  { key: 'orders', label: 'Orders', icon: FiShoppingBag },
  { key: 'reservations', label: 'Reservations', icon: FiCalendar },
  { key: 'reviews', label: 'Reviews', icon: FiStar },
]

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Preparing: 'bg-blue-100 text-blue-800',
  Ready: 'bg-green-100 text-green-800',
  Completed: 'bg-green-100 text-green-800',
  Confirmed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  Delivered: 'bg-purple-100 text-purple-800',
}

const emptyMenuItem = { name: '', description: '', price: '', category: 'sandwiches', isVeg: false, image: '', isAvailable: true, featured: false }

export default function Admin() {
  const [tab, setTab] = useState('overview')
  const [menuItems, setMenuItems] = useState([])
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [menuForm, setMenuForm] = useState({ ...emptyMenuItem })
  const [editingId, setEditingId] = useState(null)
  const [showMenuForm, setShowMenuForm] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [m, o, r, rev] = await Promise.all([
        axios.get('/api/menu'),
        axios.get('/api/orders').catch(() => ({ data: [] })),
        axios.get('/api/reservations').catch(() => ({ data: [] })),
        axios.get('/api/reviews').catch(() => ({ data: [] })),
      ])
      setMenuItems(m.data)
      setOrders(o.data)
      setReservations(r.data)
      setReviews(rev.data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleLogout = () => { logout(); navigate('/') }

  // Menu CRUD
  const saveMenuItem = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...menuForm, price: Number(menuForm.price) }
      if (editingId) {
        await axios.put(`/api/menu/${editingId}`, payload)
      } else {
        await axios.post('/api/menu', payload)
      }
      setShowMenuForm(false)
      setEditingId(null)
      setMenuForm({ ...emptyMenuItem })
      fetchData()
    } catch {}
  }

  const deleteMenuItem = async (id) => {
    if (!confirm('Delete this menu item?')) return
    await axios.delete(`/api/menu/${id}`)
    fetchData()
  }

  const editMenuItem = (item) => {
    setMenuForm({ ...item, price: item.price })
    setEditingId(item._id)
    setShowMenuForm(true)
  }

  // Order status
  const updateOrderStatus = async (id, status) => {
    await axios.put(`/api/orders/${id}`, { status })
    fetchData()
  }

  // Reservation status
  const updateReservationStatus = async (id, status) => {
    await axios.put(`/api/reservations/${id}`, { status })
    fetchData()
  }

  // Review management
  const updateReviewStatus = async (id, status) => {
    await axios.put(`/api/reviews/${id}/status`, { status })
    fetchData()
  }

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return
    await axios.delete(`/api/reviews/${id}`)
    fetchData()
  }

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((s, o) => s + (o.total || 0), 0),
    totalReservations: reservations.length,
    totalMenuItems: menuItems.length,
  }

  return (
    <main className="py-6 md:py-10">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-on-surface-variant">Manage your cafe</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-all whitespace-nowrap
                ${tab === key ? 'bg-primary text-on-primary shadow-soft-1' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">Loading...</div>
        ) : (
          <>
            {/* Overview */}
            {tab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Orders', value: stats.totalOrders, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: 'bg-green-50 text-green-700' },
                    { label: 'Reservations', value: stats.totalReservations, color: 'bg-purple-50 text-purple-700' },
                    { label: 'Menu Items', value: stats.totalMenuItems, color: 'bg-orange-50 text-orange-700' },
                  ].map(({ label, value, color }, i) => (
                    <div key={i} className="card">
                      <p className="text-xs font-body font-semibold text-on-surface-variant uppercase tracking-wider">{label}</p>
                      <p className={`text-2xl font-display font-bold mt-2 ${color.split(' ')[1]}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <div className="card">
                    <h3 className="font-display font-semibold text-primary mb-4">Recent Orders</h3>
                    {orders.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">No orders yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {orders.slice(0, 5).map(o => (
                          <div key={o._id} className="flex items-center justify-between py-2 border-b border-outline-variant/20 last:border-0">
                            <div>
                              <p className="text-sm font-medium">{o.orderNumber}</p>
                              <p className="text-xs text-outline">{o.customerName}</p>
                            </div>
                            <div className="text-right">
                              <span className={`badge-status text-xs ${statusColors[o.status] || 'bg-gray-100 text-gray-800'}`}>{o.status}</span>
                              <p className="text-xs text-outline mt-0.5">₹{o.total}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Reservations */}
                  <div className="card">
                    <h3 className="font-display font-semibold text-primary mb-4">Upcoming Reservations</h3>
                    {reservations.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">No reservations yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {reservations.slice(0, 5).map(r => (
                          <div key={r._id} className="flex items-center justify-between py-2 border-b border-outline-variant/20 last:border-0">
                            <div>
                              <p className="text-sm font-medium">{r.customerName}</p>
                              <p className="text-xs text-outline">{r.date?.split('T')[0]} at {r.time} · {r.partySize} guests</p>
                            </div>
                            <span className={`badge-status text-xs ${statusColors[r.status] || 'bg-gray-100 text-gray-800'}`}>{r.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Menu Management */}
            {tab === 'menu' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-primary">Menu Items ({menuItems.length})</h2>
                  <button onClick={() => { setMenuForm({ ...emptyMenuItem }); setEditingId(null); setShowMenuForm(true) }} className="btn-primary text-sm">
                    <FiPlus size={16} className="mr-1" /> Add Item
                  </button>
                </div>

                {showMenuForm && (
                  <div className="card mb-6 border border-outline-variant/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-body font-semibold text-primary">{editingId ? 'Edit Item' : 'Add New Item'}</h3>
                      <button onClick={() => { setShowMenuForm(false); setEditingId(null) }} className="p-1 hover:bg-surface-container rounded-lg"><FiX size={18} /></button>
                    </div>
                    <form onSubmit={saveMenuItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input className="input-field" placeholder="Item name" required value={menuForm.name} onChange={e => setMenuForm({ ...menuForm, name: e.target.value })} />
                      <input className="input-field" type="number" placeholder="Price" required value={menuForm.price} onChange={e => setMenuForm({ ...menuForm, price: e.target.value })} />
                      <select className="input-field" value={menuForm.category} onChange={e => setMenuForm({ ...menuForm, category: e.target.value })}>
                        {['sandwiches','wraps','fries','burgers','pizza','pasta','mojitos','frappe','other'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={menuForm.isVeg} onChange={e => setMenuForm({ ...menuForm, isVeg: e.target.checked })} className="checkbox checkbox-sm" /> Veg
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={menuForm.featured} onChange={e => setMenuForm({ ...menuForm, featured: e.target.checked })} className="checkbox checkbox-sm" /> Featured
                        </label>
                      </div>
                      <input className="input-field sm:col-span-2" placeholder="Image URL (optional)" value={menuForm.image} onChange={e => setMenuForm({ ...menuForm, image: e.target.value })} />
                      <textarea className="input-field sm:col-span-2 resize-none" rows={2} placeholder="Description" required value={menuForm.description} onChange={e => setMenuForm({ ...menuForm, description: e.target.value })} />
                      <div className="sm:col-span-2 flex gap-2">
                        <button type="submit" className="btn-primary text-sm">{editingId ? 'Update' : 'Add'} Item</button>
                        <button type="button" onClick={() => { setShowMenuForm(false); setEditingId(null) }} className="btn-ghost text-sm">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-3">
                  {menuItems.map(item => (
                    <div key={item._id} className="card flex items-center gap-4 py-3 px-4">
                      <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <FiCoffee size={20} className="text-outline-variant" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-body font-semibold text-sm text-primary truncate">{item.name}</p>
                          <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'}>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                        </div>
                        <p className="text-xs text-outline capitalize">{item.category}</p>
                      </div>
                      <p className="font-body font-bold text-secondary text-sm">₹{item.price}</p>
                      <div className="flex gap-1">
                        <button onClick={() => editMenuItem(item)} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><FiEdit2 size={16} /></button>
                        <button onClick={() => deleteMenuItem(item._id)} className="p-2 rounded-lg hover:bg-red-50 text-error"><FiTrash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Management */}
            {tab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-primary">Orders ({orders.length})</h2>
                  <button onClick={fetchData} className="btn-ghost text-sm"><FiRefreshCw size={14} className="mr-1" /> Refresh</button>
                </div>
                {orders.length === 0 ? (
                  <div className="card text-center py-10 text-on-surface-variant text-sm">No orders yet.</div>
                ) : (
                  <div className="space-y-3">
                    {orders.map(o => (
                      <div key={o._id} className="card py-4 px-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-body font-semibold text-primary">{o.orderNumber}</p>
                            <p className="text-xs text-outline">{o.customerName} · {o.phone} · {o.deliveryType}</p>
                          </div>
                          <p className="font-body font-bold text-secondary">₹{o.total}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {o.items?.map((it, i) => (
                            <span key={i} className="text-xs bg-surface-container px-2 py-1 rounded">{it.name} × {it.quantity}</span>
                          ))}
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                          {(o.status === 'Completed' || o.status === 'Cancelled') ? (
                            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold ${statusColors[o.status]}`}>
                              <FiCheck size={14} /> {o.status}
                            </span>
                          ) : (
                            <>
                              <span className="text-xs text-outline">Status:</span>
                              {['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map(s => (
                                <button
                                  key={s}
                                  onClick={() => updateOrderStatus(o._id, s)}
                                  className={`text-xs px-2 py-1 rounded-full transition-colors ${o.status === s ? statusColors[s] : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reservations Management */}
            {tab === 'reservations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-primary">Reservations ({reservations.length})</h2>
                  <button onClick={fetchData} className="btn-ghost text-sm"><FiRefreshCw size={14} className="mr-1" /> Refresh</button>
                </div>
                {reservations.length === 0 ? (
                  <div className="card text-center py-10 text-on-surface-variant text-sm">No reservations yet.</div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map(r => (
                      <div key={r._id} className="card py-4 px-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-body font-semibold text-primary">{r.customerName}</p>
                            <p className="text-xs text-outline">{r.phone}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{r.date?.split('T')[0]}</p>
                            <p className="text-xs text-outline">{r.time} · {r.partySize} guests</p>
                          </div>
                        </div>
                        {r.occasion && <p className="text-xs text-outline mb-3">Occasion: {r.occasion}</p>}
                        <div className="flex items-center flex-wrap gap-2">
                          {(r.status === 'Completed' || r.status === 'Cancelled') ? (
                            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold ${statusColors[r.status]}`}>
                              <FiCheck size={14} /> {r.status}
                            </span>
                          ) : (
                            <>
                              <span className="text-xs text-outline">Status:</span>
                              {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                                <button
                                  key={s}
                                  onClick={() => updateReservationStatus(r._id, s)}
                                  className={`text-xs px-2 py-1 rounded-full transition-colors ${r.status === s ? statusColors[s] : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Management */}
            {tab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-primary">Reviews ({reviews.length})</h2>
                  <button onClick={fetchData} className="btn-ghost text-sm"><FiRefreshCw size={14} className="mr-1" /> Refresh</button>
                </div>
                {reviews.length === 0 ? (
                  <div className="card text-center py-10 text-on-surface-variant text-sm">No reviews yet.</div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map(rev => (
                      <div key={rev._id} className="card py-4 px-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-body font-semibold text-primary">{rev.customerName}</p>
                            <div className="flex gap-0.5 mt-1">
                              {Array.from({ length: 5 }, (_, j) => (
                                <FiStar key={j} size={12} className={j < rev.rating ? 'text-secondary fill-secondary' : 'text-outline-variant'} />
                              ))}
                            </div>
                          </div>
                          <span className={`badge-status text-xs ${statusColors[rev.status] || 'bg-gray-100 text-gray-800'}`}>{rev.status}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant mb-3">"{rev.text}"</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-outline">Action:</span>
                          {['Approved', 'Rejected'].map(s => (
                            <button
                              key={s}
                              onClick={() => updateReviewStatus(rev._id, s)}
                              className={`text-xs px-2 py-1 rounded-full transition-colors ${rev.status === s ? statusColors[s] : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                            >
                              {s}
                            </button>
                          ))}
                          <button onClick={() => deleteReview(rev._id)} className="text-xs px-2 py-1 rounded-full bg-red-50 text-error hover:bg-red-100 transition-colors ml-auto">
                            <FiTrash2 size={12} className="inline mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
