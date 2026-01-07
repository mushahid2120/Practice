import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { BaseUrl } from "../App";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "Mushahid",
    email: "md.mushahid@gmail.com",
    password: "12345",
    otp: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const navigate = useNavigate();
  const emailRef = useRef();
  const [sendOtpValue, setSendOtpValue] = useState("Send OTP");
  const [isEnterOtp, setIsEnterOtp] = useState(false);

  const handleChange = (e) => {
    if (
      e.target.name === "otp" &&
      e.target.value > 9999 &&
      /\d/.test(e.target.value)
    )
      return;
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error[e.target.name] !== "")
      setError((prevState) => ({ ...prevState, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof form);
    const res = await fetch(`${BaseUrl}/auth/singup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    const errorResponse = data.error;
    if (errorResponse)
      return setError((prevState) => ({ ...prevState, ...errorResponse }));
    console.log(data);
    if (res.status === 200) {
      setForm({ name: "", email: "", password: "" });
      navigate("/login");
    }
  };

  const handleClickOTP = async () => {
    try {
      setSendOtpValue("Sending..");
      if (!emailRef.current.reportValidity()) return;
      const res = await fetch(`${BaseUrl}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if (res.status !== 200)
        return setError((prevState) => ({ ...prevState, otp: error.otp }));
      setIsEnterOtp(true);
      setSendOtpValue(60);
      const IntId = setInterval(() => {
        setSendOtpValue((prevState) => {
          if (prevState === 0) {
            clearInterval(IntId);
            return "Resend Otp";
          }
          return prevState - 1;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithGoogle = async (response) => {
    try {
      const res = await fetch(`${BaseUrl}/auth/login-with-google`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (res.status === 200) {
        navigate("/");
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
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
            required
          />
          <p className="text-red-600 text-sm absolute w-full text-end">
            {error.name}
          </p>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex relative justify-between w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg   focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              ref={emailRef}
            />
            <button
              type="button"
              className="text-[13px] bg-blue-600 hover:bg-blue-800 absolute right-0 h-full px-2 whitespace-nowrap max-w-20 w-full border rounded-lg text-white font-semibold  "
              onClick={handleClickOTP}
            >
              {sendOtpValue}
            </button>
          </div>
          <p className="text-red-600 text-sm absolute w-full text-end">
            {error.email}
          </p>
        </div>

        {isEnterOtp && (
          <div className="relative flex whitespace-nowrap items-center mt-4">
            <label className="block text-sm font-medium pr-2">
              Enter OTP:{" "}
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g: 1234"
              required
            />
            <p className="text-red-600 -bottom-6 text-sm absolute w-full text-end">
              {error.otp}
            </p>
          </div>
        )}

        <div className="relative pb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
          <p className="text-red-600 text-sm absolute w-full text-end">
            {error.password}
          </p>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition ${
            isEnterOtp || "bg-blue-300 hover:bg-blue-300 cursor-default"
          }`}
          disabled={!isEnterOtp}
        >
          Submit
        </button>
        <div className="flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleLoginWithGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
            theme="filled_blue"
          />
        </div>
      </form>
    </div>
  );
}
