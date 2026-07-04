import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary/80">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-bold text-on-primary mb-3">Heart & Brew</h3>
            <p className="text-sm text-on-primary/60 leading-relaxed">
              A cozy cafe and restro serving handcrafted sandwiches, wood-fired pizzas, and refreshing mojitos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-on-primary/50 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/menu', label: 'Menu' },
                { to: '/reservations', label: 'Reserve a Table' },
                { to: '/about', label: 'About Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-on-primary/70 hover:text-on-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-on-primary/50 mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-on-primary/70">
              <li>Mon - Fri: 10:00 AM - 11:00 PM</li>
              <li>Sat - Sun: 9:00 AM - 11:00 PM</li>
              <li className="pt-2 text-on-primary/50">Happy Hours: 4 PM - 7 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-on-primary/50 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-on-primary/70">
              <li className="flex items-center gap-2">
                <FiMapPin size={14} className="shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={14} className="shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={14} className="shrink-0" />
                <span>hello@heartnbrew.in</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-colors">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-on-primary/20 transition-colors">
                <FiFacebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-on-primary/10 mt-10 pt-6 text-center text-xs text-on-primary/40">
          © {new Date().getFullYear()} Heart & Brew Cafe & Restro. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
