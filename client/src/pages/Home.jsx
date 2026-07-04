import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCoffee, FiShoppingBag, FiCalendar, FiStar } from 'react-icons/fi'
import axios from '../api'

const features = [
  { icon: FiCoffee, title: 'Handcrafted Drinks', desc: 'Artisanal coffees and signature mojitos brewed with love.' },
  { icon: FiShoppingBag, title: 'Fresh Food', desc: 'Sandwiches, wraps, burgers and pizzas made to order.' },
  { icon: FiCalendar, title: 'Reserve a Table', desc: 'Book your cozy corner for a perfect dining experience.' },
]

export default function Home() {
  const [favorites, setFavorites] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios.get('/api/menu?featured=true')
      .then(res => {
        if (res.data.length > 0) {
          setFavorites(res.data.slice(0, 4))
        } else {
          axios.get('/api/menu').then(r => setFavorites(r.data.slice(0, 4)))
        }
      })
      .catch(() => {})
    axios.get('/api/reviews/approved')
      .then(res => setReviews(res.data.slice(0, 4)))
      .catch(() => {})
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary grain-overlay overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-tertiary rounded-full blur-3xl" />
        </div>
        <div className="page-container relative z-10 py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block badge bg-secondary/20 text-secondary-fixed-dim mb-6 text-xs tracking-widest uppercase">
              Cafe & Restro
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-primary leading-tight mb-6">
              Where Every Sip Tells a Story
            </h1>
            <p className="text-lg text-on-primary/70 font-body leading-relaxed mb-8 max-w-lg">
              Nestled in the heart of Vadodara, Heart & Brew is your go-to spot for handcrafted coffee, gourmet sandwiches, and wood-fired pizzas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary bg-secondary text-on-secondary">
                Explore Menu <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/reservations" className="btn-secondary border-on-primary/20 text-on-primary hover:bg-on-primary hover:text-primary">
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Why Heart & Brew?</h2>
            <p className="section-subheading max-w-md mx-auto">A cozy atmosphere, handcrafted food, and warm service — all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card text-center group hover:-translate-y-1 transition-transform duration-200">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-primary mb-2">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading mb-2">Our Favorites</h2>
              <p className="section-subheading">A taste of what we offer.</p>
            </div>
            <Link to="/menu" className="hidden md:inline-flex btn-ghost text-secondary font-semibold">
              Full Menu <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {favorites.map((item) => (
              <Link to="/menu" key={item._id} className="card p-0 overflow-hidden group cursor-pointer">
                <div className="h-48 bg-surface-container overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiCoffee size={40} className="text-outline-variant group-hover:text-secondary transition-colors" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    <span className="text-xs text-outline capitalize">{item.category}</span>
                  </div>
                  <h3 className="font-body font-semibold text-primary mt-1">{item.name}</h3>
                  <div className="mt-1 font-body font-bold text-secondary">₹{item.price}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="btn-primary">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <div className="page-container">
            <div className="text-center mb-10">
              <h2 className="section-heading mb-2">Guest Reviews</h2>
              <p className="section-subheading">What people are saying about us.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.map((r) => (
                <div key={r._id} className="card">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }, (_, j) => (
                      <FiStar key={j} size={14} className={j < r.rating ? 'text-secondary fill-secondary' : 'text-outline-variant'} />
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">"{r.text}"</p>
                  <p className="text-xs font-body font-semibold text-primary">— {r.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary grain-overlay">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-on-secondary mb-4">
            Hungry? We've got you.
          </h2>
          <p className="text-on-secondary/70 max-w-md mx-auto mb-8">
            Order online for takeaway or reserve a table for the full experience.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="btn-primary bg-on-secondary text-secondary hover:bg-surface-container-lowest">
              Order Now
            </Link>
            <Link to="/reservations" className="btn-secondary border-on-secondary/30 text-on-secondary hover:bg-on-secondary hover:text-secondary">
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
