import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { BaseUrl } from "../App";
import DOMPurify from "dompurify";
import Header from "../Component/Header";
import { useEffect } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BaseUrl}/auth`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.error) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const cleanName = DOMPurify.sanitize(form.name);
    const cleanEmail = DOMPurify.sanitize(form.email);
    const cleanOTP = DOMPurify.sanitize(form.otp);
    const res = await fetch(`${BaseUrl}/auth/singup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        password: form.password,
        otp: cleanOTP,
      }),
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
      const cleanEmail = DOMPurify.sanitize(form.email);
      const res = await fetch(`${BaseUrl}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if (res.status !== 200){
        setSendOtpValue(send)
        return setError((prevState) => ({ ...prevState, otp: error.otp }));}
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
    <>
      <Header showProfileIcon={false} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg
                className="w-9 h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join us and start managing your files
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-8 space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800"
                  placeholder="Enter your full name"
                  maxLength={50}
                  required
                />
                {error.name && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error.name}
                  </p>
                )}
              </div>

              {/* Email Field with OTP */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-32 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800"
                    placeholder="your.email@example.com"
                    required
                    ref={emailRef}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200"
                    onClick={(sendOtpValue==='Send OTP' || sendOtpValue==='Resend Otp') && handleClickOTP}
                  >
                    {sendOtpValue}
                  </button>
                </div>
                {error.email && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error.email}
                  </p>
                )}
              </div>

              {/* OTP Field (Conditional) */}
              {isEnterOtp && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-semibold text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800 tracking-widest text-center text-lg font-semibold"
                    placeholder="• • • •"
                    required
                  />
                  {error.otp && (
                    <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error.otp}
                    </p>
                  )}
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800"
                  placeholder="Create a strong password"
                  minLength={8}
                  maxLength={20}
                  required
                />
                {error.password && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isEnterOtp
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isEnterOtp}
              >
                {isEnterOtp ? "Create Account" : "Verify Email First"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleLoginWithGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  theme="filled_blue"
                />
              </div>
            </div>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
