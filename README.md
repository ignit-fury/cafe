<div align="center">

# ☕ Heart & Brew Cafe

### A Modern Digital Platform for Cafe & Restaurant

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](#-deployment) • [Report Bug](https://github.com/ignit-fury/cafe/issues) • [Request Feature](https://github.com/ignit-fury/cafe/issues)

</div>

---

## 📸 Overview

Heart & Brew Cafe is a full-stack MERN application that transforms a static cafe website into a dynamic digital platform. Customers can browse the menu, place orders, and make reservations — while admins manage everything through a powerful dashboard.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🍽️ **Menu Management** | Browse 18+ items across 8 categories with images, veg/non-veg tags |
| 🛒 **Online Ordering** | Add to cart, customize quantities, place orders for takeaway or dine-in |
| 📅 **Reservations** | Book tables with date, time, guest count, and occasion |
| ⭐ **Review System** | Submit and display customer reviews with star ratings |
| 🔐 **Admin Dashboard** | Full CRUD for menu, orders, reservations, and reviews |
| 📱 **Responsive Design** | Mobile-first UI that works on all devices |
| 🎨 **Custom Design System** | Earth-tone palette with Playfair Display & Montserrat typography |

---

## 🏗️ Tech Stack

```
├── Frontend (client/)
│   ├── React 18 + Vite
│   ├── Tailwind CSS + DaisyUI
│   ├── React Router v6
│   ├── Axios (HTTP client)
│   └── React Icons
│
├── Backend (server/)
│   ├── Express.js
│   ├── MongoDB + Mongoose
│   ├── JWT Authentication
│   ├── bcryptjs (password hashing)
│   └── CORS
│
└── Database
    └── MongoDB Atlas (free tier)
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ignit-fury/cafe.git
cd cafe

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Setup

Create `.env` in `server/`:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/heartbrew
JWT_SECRET=your-super-secret-key
```

### Seed Database

```bash
cd server
node scripts/seed.js
```

This creates:
- **Admin user:** `admin@heartnbrew.in` / `admin123`
- **18 menu items** with images across 8 categories

### Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
heart-brew-cafe/
├── DESIGN.md                    # Design system reference
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Header, Footer, ProtectedRoute
│   │   ├── pages/               # Home, Menu, About, Reservations, Admin, Login
│   │   ├── context/             # AuthContext for JWT management
│   │   ├── api.js               # Axios instance
│   │   ├── App.jsx              # Routes & layout
│   │   └── index.css            # Tailwind + custom utilities
│   ├── tailwind.config.js       # Design tokens
│   ├── postcss.config.js
│   └── vite.config.js           # Dev server + API proxy
│
├── server/                      # Express backend
│   ├── config/                  # MongoDB connection
│   ├── controllers/             # Auth, Menu, Order, Reservation, Review
│   ├── middleware/               # JWT auth middleware
│   ├── models/                  # User, MenuItem, Order, Reservation, Review
│   ├── routes/                  # API routes
│   ├── scripts/                 # Seed & utility scripts
│   ├── app.js                   # Entry point
│   └── .env                     # Environment variables
```

---

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/menu` | Get all menu items |
| `GET` | `/api/menu/:id` | Get single menu item |
| `POST` | `/api/orders` | Create new order |
| `POST` | `/api/reservations` | Create new reservation |
| `POST` | `/api/reviews` | Submit a review |
| `GET` | `/api/reviews/approved` | Get approved reviews |

### Protected Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Admin login |
| `POST/PUT/DELETE` | `/api/menu/:id` | CRUD menu items |
| `GET` | `/api/orders` | Get all orders |
| `PUT` | `/api/orders/:id` | Update order status |
| `GET` | `/api/reservations` | Get all reservations |
| `PUT` | `/api/reservations/:id` | Update reservation status |
| `GET` | `/api/reviews` | Get all reviews |
| `PUT` | `/api/reviews/:id/status` | Approve/reject review |
| `DELETE` | `/api/reviews/:id` | Delete review |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#33210d` | Deep coffee brown — headings, navigation |
| Secondary | `#944925` | Warm oak — buttons, active states |
| Tertiary | `#242516` | Dark green — veg indicators, accents |
| Surface | `#fff8f5` | Cream — background |
| Error | `#ba1a1a` | Error states |

**Typography:** Playfair Display (headings) + Montserrat (body)

---

## 🌐 Deployment

### Frontend — Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set Root Directory to `client`
4. Add env var: `VITE_API_URL` = your backend URL
5. Deploy

### Backend — Render

1. New Web Service on [render.com](https://render.com)
2. Select your repo
3. Root Directory: `server`
4. Build: `npm install` | Start: `node app.js`
5. Add env vars: `MONGODB_URI`, `JWT_SECRET`, `PORT=5001`
6. Deploy

### Database — MongoDB Atlas

1. Create free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Allow access from anywhere (`0.0.0.0/0`)
4. Connect → copy connection string

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for Heart & Brew Cafe**

[↑ Back to top](#-heart--brew-cafe)

</div>
