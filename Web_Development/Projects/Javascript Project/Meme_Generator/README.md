# 😄 Meme Generator

A simple **Meme Generator** that fetches **wholesome memes** from an API and displays them dynamically. Built with **HTML**, **CSS**, and **JavaScript**.

---

## 🎯 Features

- Fetches memes from the **[Meme API](https://meme-api.com/gimme/wholesomememes)**  
- Displays the **meme image**, **title**, and **author**  
- Generate a new meme with a **single click**  
- Responsive card layout  

---

## 🖥️ Live Demo

![Meme Generator](http://meme-generator-htmlcssjs.netlify.app/)  

---

## 🚀 How It Works

1. The page loads with a default "Loading..." message.  
2. Clicking the **Generate Meme** button calls the `generatingImg()` function.  
3. The function fetches a random meme JSON object from the API.  
4. Updates the DOM with:  
   - `meme_img.src` → the meme image URL  
   - `meme_title.innerHTML` → the meme title  
   - `meme_author.innerHTML` → meme author  

---

## 📁 Project Structure

```
meme-generator/
│
├── index.html       # Main HTML file
├── style.css        # Styling for the page
├── index.js         # JavaScript for fetching and displaying memes
└── README.md        # Project documentation
```

---

## 💻 Technologies Used

- **HTML5** – Page structure  
- **CSS3** – Styling and responsive layout  
- **JavaScript (Vanilla)** – API fetch and DOM manipulation  

---

## ⚡ Usage

1. Open `index.html` in your browser.  
2. Click **Generate Meme** to display a random wholesome meme.  
3. Repeat as many times as you like!  

---

## ❤️ Author

Made with ❤️ by **Mushahid**
