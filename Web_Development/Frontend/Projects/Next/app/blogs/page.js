import Comments from "@/components/Comments";
import Loading from "@/components/Loading";
import Likes from "@/components/Likes"
import Views from "@/components/Likes"
import Link from "next/link";
import React, { Suspense } from "react";

export const revalidate = 5;
export const dynamic= "force-dynamic"

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

      <div>
        <Suspense fallback={<Loading>comments</Loading>}>
          <Comments/>
        </Suspense >
        <Suspense fallback={<Loading>likes</Loading>}>
          <Likes/>
        </Suspense>
        <Suspense fallback={<Loading>views</Loading>}>
          <Views/>
        </Suspense>
      </div>
    </>
  );
}
