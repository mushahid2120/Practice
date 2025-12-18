import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error,setError]=useState({name: '',email: '',password: ''})
  const navigate=useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if(error[e.target.name]!=='')
      setError((prevState)=>({...prevState,[e.target.name]:''}))
  };

  console.log(error)

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(typeof form)
    const res=await fetch('http://127.0.0.1:4000/auth/singup',{
        credentials: 'include',
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
    })
    const data = await res.json()
    const error=data.error
    if(error)
        return setError((prevState)=>({...prevState,...error}))
      return 
    setForm({ name: "", email: "", password: "" })
    if(data.message==="User Created"){
        navigate('/')
    }
        
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Name</label>
            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          <p className="text-red-600 text-sm absolute w-full text-end">{error.name}</p>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <p className="text-red-600 text-sm absolute w-full text-end">{error.email}</p>
        </div>

        <div className="relative pb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <p className="text-red-600 text-sm absolute w-full text-end">{error.password}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
