const res = await fetch("http://localhost:4000", {
  method: "GET",
  credentials: "include",
});
const data = await res.json();

console.log(data);
