# 🎉 Birthday Reminder App

A simple and clean **Birthday Reminder App** built using **React**.  
It displays a list of people having birthdays today, allows you to clear the list, and shows the total count dynamically.

---

## 🪄 Live Preview

👉 **[View Demo]([#](https://birthday-parcel.netlify.app/))**  

---

## 🚀 Features

- Shows a list of birthdays for the day  
- Dynamic counter showing the number of birthdays  
- Clean and responsive UI  
- "Clear All" button to reset the list  
- Component-based structure (React)  

---

## 🧩 Tech Stack

- **React (useState)**  
- **JavaScript (ES6)**  
- **CSS3**  
- **Vite / CRA** (depending on your setup)

---

## 📁 Project Structure

```
birthday-reminder/
│
├── App.jsx                # Main component
├── List.jsx               # Renders list of birthday entries
├── data.js                # Birthday data (name, age, image)
├── style.css              # Styling
├── index.html
└── README.md              # Documentation
```

---

## 🧠 How It Works

- The app loads birthday data from `data.js`.
- `App.jsx` stores the people list and count using `useState`.
- The `<List />` component receives the birthday data as props and renders each person.
- Clicking **Clear All** sets the list to empty and updates the count to `0`.

---

## 💡 How to Use

1. Clone the repository  
2. Run `npm install`  
3. Start the project with `npm run dev`  
4. Modify `data.js` to add or remove birthdays  

---

## 🛠️ Example Code Snippets

### **App.jsx**
```jsx
import List from "./List"
import { useState } from "react"
import data from "./data.js"
import './style.css'

export default function App(){
    const [people,setPeople]=useState(data)
    const [peopleCount,setPeopleCount]=useState(10)

    const handleClear=(e)=>{
        setPeople(null)
        setPeopleCount("0")
    }

    return (
        <main className="container">
            <h2 className="heading" >{peopleCount} Birthdays Today</h2>
            <List data={people}/>
            <button onClick={handleClear}>Clear All</button>
        </main>
    )
}
```

### **List.jsx**
```jsx
import React from "react";

export default function List({ data }) {
  if(data===null)
    return ''
  return data.map((person) => {
    return (
      <div className="person" key={person.name}>
        <div className="img-container">
          <img src={person.image} alt={person.image + "image"} />
        </div>
        <div className="text-container">
          <h1 className="person-name">{person.name}</h1>
          <p className="person-age">{person.age} years</p>
        </div>
      </div>
    );
  });
}
```

---

## 📸 Screenshots (Optional)

_Add screenshots here if needed_

---

## 📜 License

This project is open-source and available under the **MIT License**.
