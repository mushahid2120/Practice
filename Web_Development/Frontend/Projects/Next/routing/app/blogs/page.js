import Link from "next/link";
import React from "react";

export const revalidate = 5;


export default function Blogs() {
  return (
    <>
      <div>Time : {new Date().toLocaleString()}</div>
      <div className="text-2xl">This is a Blogs Page</div>
      <ul className="text-blue-500">
        <li>
          <Link href="/blogs/1">Blog 1</Link>
        </li>
        <li>
          <Link href="/blogs/2">Blog 2</Link>
        </li>
        <li>
          <Link href="/blogs/3">Blog 3</Link>
        </li>
      </ul>
    </>
  );
}
