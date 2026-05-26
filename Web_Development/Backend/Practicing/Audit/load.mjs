import { setTimeout } from "timers/promises";

// for (let i = 0; i < 20; i++) {
//   await fetch("http://localhost:4000/cpu-usage");
//   await fetch("http://localhost:4000/system-cpu");
//   await fetch("http://localhost:4000/user-cpu");
//   await fetch("http://localhost:4000/");
//   await fetch("http://localhost:4000/unstable");
// }

for (let i = 0; i < 10; i++) {
  await fetch("http://localhost:4000/");
  await fetch("http://localhost:4000/posts", {
    method: "POST",
  });
  await fetch("http://localhost:4000/failed", { method: "POST" });
}
