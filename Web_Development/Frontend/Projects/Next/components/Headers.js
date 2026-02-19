"use client"
import { useTheme } from "@/context/ThemeProvider";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { MdDarkMode,MdLightMode  } from "react-icons/md";

export default function Headers() {
  const {isDark,toggleTheme}=useTheme()
  const pathname = usePathname();
  return (
    <nav className="flex justify-between text-xl font-semibold border-2 border-solid rounded-lg  mb-8">
      <Link
        href="/"
        className={
          pathname === "/"
            ? "text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg"
            : "text-gray-500 p-2"
        }
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about"
            ? "text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg"
            : "text-gray-500 p-2"
        }
      >
        About
      </Link>
      <Link
        href="/services"
        className={
          pathname === "/services"
            ? "text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg"
            : "text-gray-500 p-2"
        }
      >
        Services
      </Link>
      <Link
        href="/blogs"
        className={
          pathname === "/blogs"
            ? "text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg"
            : "text-gray-500 p-2"
        }
      >
        Blogs
      </Link>
      <div onClick={toggleTheme} className="flex justify-center items-center cursor-pointer">
      {
        isDark ?(<MdLightMode color="white" size={30}/>):(<MdDarkMode color="black"/>)
      }
      </div>
    </nav>
  );
}
