import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: "ankit@md.com", password: "12345" });
  const [error,setError]=useState('')
  const nav=useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch('http://127.0.0.1:4000/auth/login',{
    credentials: 'include',
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(form)
    })
    const data=await res.json()
    if(res.status===401)
      return setError(data.error)
    nav('/')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <div className="relative"><p className="absolute -top-3 text-red-700 text-sm">{error}</p></div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}