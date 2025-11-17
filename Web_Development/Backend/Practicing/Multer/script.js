const form = document.querySelector(".myform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const res = await fetch("http://localhost:4000", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
  console.log(data);
  } catch (error) {
    console.log(error);
  }
});
