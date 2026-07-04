import React, { useEffect, useState, useContext } from 'react'
import axios from '../api'
import { FiMinus, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const categories = ['all', 'sandwiches', 'wraps', 'fries', 'burgers', 'pizza', 'pasta', 'mojitos', 'frappe']

export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [orderForm, setOrderForm] = useState({ customerName: '', phone: '', deliveryType: 'Takeaway' })
  const [orderMsg, setOrderMsg] = useState('')
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/menu')
      .then(res => setItems(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory)

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c._id === item._id)
      if (exists) return prev.map(c => c._id === item._id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (_id, delta) => {
    setCart(prev => prev.map(c => c._id === _id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0)

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!cart.length) return
    try {
      await axios.post('/api/orders', {
        ...orderForm,
        items: cart.map(c => ({ itemId: c._id, name: c.name, price: c.price, quantity: c.qty })),
        total,
      })
      setOrderMsg('Order placed successfully!')
      setCart([])
      setShowCart(false)
      setOrderForm({ customerName: '', phone: '', deliveryType: 'Takeaway' })
    } catch {
      setOrderMsg('Failed to place order.')
    }
  }

  return (
    <main className="py-10 md:py-16">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-heading mb-1">Our Menu</h1>
            <p className="section-subheading">Freshly made, full of flavor.</p>
          </div>
          <button onClick={() => setShowCart(true)} className="relative btn-primary">
            <FiShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-on-secondary text-xs font-bold rounded-full flex items-center justify-center">
                {cart.reduce((s, c) => s + c.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all
                ${activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-soft-1'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">Loading menu...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">No items found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => {
              const inCart = cart.find(c => c._id === item._id)
              return (
                <div key={item._id} className="card p-0 overflow-hidden group">
                  <div className="relative h-48 bg-surface-container overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                    )}
                    <span className={`absolute top-3 left-3 ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-body font-semibold text-primary truncate">{item.name}</h3>
                        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{item.description}</p>
                      </div>
                      <span className="font-body font-bold text-secondary whitespace-nowrap">₹{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-outline capitalize">{item.category}</span>
                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item._id, -1)} className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors">
                            <FiMinus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center">{inCart.qty}</span>
                          <button onClick={() => updateQty(item._id, 1)} className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:brightness-90 transition-colors">
                            <FiPlus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="btn-primary text-xs px-3 py-1.5">
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {orderMsg && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-3 rounded-xl shadow-soft-2 text-sm font-medium z-50">
            {orderMsg}
            <button onClick={() => setOrderMsg('')} className="ml-3 opacity-60 hover:opacity-100"><FiX size={14} /></button>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-soft-3 overflow-y-auto">
            <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-primary">Your Order</h2>
              <button onClick={() => setShowCart(false)} className="p-1 rounded-lg hover:bg-surface-container"><FiX size={20} /></button>
            </div>

            {cart.length === 0 ? (
              <div className="p-10 text-center text-on-surface-variant text-sm">Your cart is empty.</div>
            ) : (
              <form onSubmit={placeOrder} className="p-6 space-y-6">
                <div className="space-y-3">
                  {cart.map(c => (
                    <div key={c._id} className="flex items-center justify-between py-2 border-b border-outline-variant/20">
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-outline">₹{c.price} × {c.qty}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <button type="button" onClick={() => updateQty(c._id, -1)} className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center"><FiMinus size={12} /></button>
                        <span className="text-sm font-semibold w-4 text-center">{c.qty}</span>
                        <button type="button" onClick={() => updateQty(c._id, 1)} className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center"><FiPlus size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline-variant/30 pt-4 flex justify-between font-body font-bold text-primary">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="space-y-3">
                  <input className="input-field" placeholder="Your Name" required value={orderForm.customerName} onChange={e => setOrderForm({ ...orderForm, customerName: e.target.value })} />
                  <input className="input-field" placeholder="Phone Number" required value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} />
                  <select className="input-field" value={orderForm.deliveryType} onChange={e => setOrderForm({ ...orderForm, deliveryType: e.target.value })}>
                    <option>Takeaway</option>
                    <option>Dine-in</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full">Place Order</button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
