import React, { useEffect, useState } from 'react'
import axios from '../api'
import { FiStar, FiMapPin, FiClock, FiHeart, FiCheck } from 'react-icons/fi'

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

export default function About() {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ customerName: '', rating: 5, text: '' })
  const [submitted, setSubmitted] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  useEffect(() => {
    axios.get('/api/reviews/approved')
      .then(res => setReviews(res.data))
      .catch(() => {})
  }, [])

  const submitReview = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/reviews', form)
      setSubmitted(true)
      setForm({ customerName: '', rating: 5, text: '' })
    } catch {}
  }

  return (
    <main className="py-10 md:py-16">
      <div className="page-container">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="section-heading mb-3">About Heart & Brew</h1>
          <p className="section-subheading max-w-2xl mx-auto">
            A cozy cafe and restro in Vadodara, born from a love for good food, handcrafted drinks, and warm conversations.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="card bg-primary text-on-primary p-10">
            <FiHeart size={32} className="text-secondary mb-4" />
            <h2 className="font-display font-bold text-2xl mb-4">Our Story</h2>
            <p className="text-on-primary/70 leading-relaxed mb-4">
              Heart & Brew started with a simple idea — create a space where people can slow down, enjoy a good meal, and feel at home. From our signature mojitos to our handcrafted sandwiches, every item is made with care.
            </p>
            <p className="text-on-primary/70 leading-relaxed">
              Whether you're catching up with friends over coffee or celebrating a special occasion, we want every visit to feel like coming home.
            </p>
          </div>
          <div className="space-y-6">
            <div className="card flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <FiMapPin size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-primary">Location</h3>
                <p className="text-sm text-on-surface-variant mt-1">Heart & Brew, Vadodara, Gujarat, India</p>
              </div>
            </div>
            <div className="card flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <FiClock size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-primary">Hours</h3>
                <p className="text-sm text-on-surface-variant mt-1">Mon–Fri: 10 AM – 11 PM</p>
                <p className="text-sm text-on-surface-variant">Sat–Sun: 9 AM – 11 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Display */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="section-heading mb-2">What Our Guests Say</h2>
            <p className="section-subheading">Real reviews from real people.</p>
          </div>
          {reviews.length === 0 ? (
            <div className="card text-center py-10 text-on-surface-variant text-sm">No reviews yet. Be the first to share your experience!</div>
          ) : (
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
          )}
        </div>

        {/* Review Form */}
        <div className="max-w-lg mx-auto">
          <div className="card">
            <h3 className="font-display font-semibold text-lg text-primary mb-1">Leave a Review</h3>
            <p className="text-sm text-on-surface-variant mb-5">Share your experience with us.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-3">
                  <FiCheck size={24} className="text-tertiary" />
                </div>
                <p className="font-body font-semibold text-primary">Thank you!</p>
                <p className="text-sm text-on-surface-variant mt-1">Your review has been submitted and will appear after approval.</p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost text-secondary mt-4 text-sm">Submit another</button>
              </div>
            ) : (
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Your Name</label>
                  <input className="input-field" placeholder="John Doe" required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, rating: s })}
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-0.5"
                      >
                        <FiStar
                          size={24}
                          className={`transition-colors ${
                            s <= (hoveredStar || form.rating)
                              ? 'text-secondary fill-secondary'
                              : 'text-outline-variant'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm text-on-surface-variant ml-2">{ratingLabels[hoveredStar || form.rating]}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Your Review</label>
                  <textarea className="input-field resize-none" rows={4} placeholder="Tell us about your experience..." required value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary w-full">Submit Review</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
