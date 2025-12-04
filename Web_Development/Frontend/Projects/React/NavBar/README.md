# 🌐 Responsive NavBar – React App

A **React Navigation Bar** project featuring dynamic routing, active link highlighting, and a reusable modal component for user sign-in.

---

## 🪄 Live Demo  
👉 **[View Live Demo](https://nav-bar-react-vite.netlify.app/)**  

---

## 🚀 Features

- ✅ Responsive navigation bar with **React Router**
- 🔹 Highlight active link using `NavLink`
- 🛎️ **Sign In Modal** with reusable `Modal` component
- 🏠 Separate **Home, About, and Contact pages**
- 💻 Styled using **Tailwind CSS**
- 🌀 Suspense fallback for lazy-loaded routes

---

## 📁 Project Structure

```
navbar-react/
│
├── App.jsx                     # Main App component with Header & Outlet
├── App.css                     # Global styles
│
├── Components/
│   ├── Header.jsx              # Navigation bar with links & sign-in modal
│   ├── Modal.jsx               # Reusable modal component
│
├── Pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
│
├── assets/
│   └── react.svg
│
├── main.jsx                    # Entry point
└── README.md
```

---

## 🛠️ Tech Stack

- **React**
- **React Router DOM**
- **Tailwind CSS**
- **React Portal** for modal rendering

---

## 🧠 How It Works

1. **Navigation**
   - `NavLink` highlights the active page automatically
   - Home, About, and Contact pages load dynamically using `<Outlet>` and `Suspense`

2. **Sign In Modal**
   - Triggered via the **Sign In** button in the Header
   - Modal uses **React Portal** to render above all content
   - Click outside modal or Cancel button closes it
   - Includes input fields for username and password, plus a Sign In button

3. **Routing**
   - Uses React Router DOM to navigate between pages
   - Suspense fallback ensures smooth lazy loading

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mushahid2120/Practice.git
```

### 2️⃣ Navigate to the NavBar project folder

```bash
cd Practice/Web_Development/Frontend/Projects/React/NavBar
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the dev server

```bash
npm run dev
```

---

## ⭐ Bonus Ideas

- Add **responsive hamburger menu** for mobile view
- Integrate **authentication logic** with backend
- Enhance modal with **form validation** and animations
