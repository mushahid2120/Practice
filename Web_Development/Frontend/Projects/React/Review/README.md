# 📝 Reviews Slider – React App

A **Reviews Slider** built with **React** that allows users to navigate through multiple reviews of people, with options to go forward, backward, or get a random review.

---

## 🪄 Live Demo  
👉 **[View Live Demo](https://review-react-vite.netlify.app/)** 

---

## 🚀 Features

- Navigate **left and right** through reviews  
- **Surprise Me** button to view a random review  
- Displays **person image, name, job title, and description**  
- Responsive UI with clean and modern layout  
- Smooth slide animations using CSS  

---

## 📁 Project Structure

```
reviews-slider-react/
│
├── App.jsx                     # Main App component
├── style.css                   # Styling for slider and components
├── data.js                     # Array of review objects
│
├── Components/
│   └── Person.jsx              # Component to display individual review
│
├── index.html
└── README.md
```

---

## 🛠️ Tech Stack

- **React** – UI library  
- **CSS** – Styling and layout  
- **Font Awesome** – Quote icon  

---

## 🧠 How It Works

1. **Navigate Reviews**
   - Click **left/right arrows** to view previous or next review.
   - Index wraps around when reaching the start or end.

2. **Surprise Me**
   - Click the **Surprise Me** button to randomly pick a review.

3. **Display Review**
   - Each review displays:
     - Person's **photo**
     - **Name** (capitalized)
     - **Job title** (uppercase)
     - **Review text**

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mushahid2120/Practice.git
```

### 2️⃣ Navigate to the project folder

```bash
cd Practice/Web_Development/Frontend/Projects/React/Review
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the development server

```bash
npm run dev
```

---

## ⭐ Bonus Ideas

- Add **slide animation** with smooth transitions  
- Include **autoplay** to automatically cycle through reviews  
- Add **pagination dots** to indicate current review  
- Enhance styling with **Tailwind CSS or animations**
