"use client"
import Link from "next/link";
import "./globals.css"
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="m-8">
        <nav 
        className="flex justify-between text-xl font-semibold border-2 border-solid border-white rounded-lg  mb-8">
          <Link href="/" className={pathname==="/" ? 'text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg' : 'text-gray-500 p-2'}>Home</Link>
          <Link href="/about" className={pathname==="/about" ? 'text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg' : 'text-gray-500 p-2'}>About</Link>
          <Link href="/services" className={pathname==="/services" ? 'text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg' : 'text-gray-500 p-2'}>Services</Link>
          <Link href="/blogs" className={pathname==="/blogs" ? 'text-blue-600 font-bold bg-white opacity-60 p-2 rounded-lg' : 'text-gray-500 p-2'}>Blogs</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
