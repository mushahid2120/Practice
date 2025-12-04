# 🔐 Password Generator – React App

A **Password Generator** built with **React** that allows users to create strong, unique passwords with customizable options for length, capital letters, numbers, and symbols.

---



---

## 🚀 Features

- Generate **strong and unique passwords**  
- Adjust **password length** (5–12 characters)  
- Include **capital letters, numbers, and symbols**  
- **Copy password** to clipboard with visual feedback  
- **Regenerate** password instantly with a click  
- Modern, responsive UI with **Tailwind CSS**  

---

## 📁 Project Structure

```
password-generator-react/
│
├── App.jsx                    # Main App component
├── App.css                    # Global styling
│
├── Components/                # (If any separate components used)
│
├── index.html
└── README.md
```

---

## 🛠️ Tech Stack

- **React** – UI library  
- **Tailwind CSS** – Styling and layout  
- **React Icons** – Copy and regenerate icons  

---

## 🧠 How It Works

1. **Generate Password**
   - Uses a combination of lowercase letters, and optionally capital letters, numbers, and symbols.
   - Password is generated randomly based on selected options and length.

2. **Regenerate Password**
   - Click the **refresh icon** button to create a new password with the same options.

3. **Copy Password**
   - Click the **copy icon** to copy the password to the clipboard.
   - Visual feedback is shown using a check icon for 5 seconds.

4. **Customize Options**
   - Use **slider** to set password length (5–12 characters)  
   - Checkboxes to include **Capital Letters, Numbers, and Symbols**

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mushahid2120/Practice.git
```

### 2️⃣ Navigate to the project folder

```bash
cd Practice/Web_Development/Frontend/Projects/React/PasswordGenerator
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

- Add **copy success notification** with animation  
- Allow **longer password lengths**  
- Include **password strength indicator**  
- Implement **dark/light theme toggle**
