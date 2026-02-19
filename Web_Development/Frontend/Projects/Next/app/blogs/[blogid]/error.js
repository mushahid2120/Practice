"use client"

import { useRouter } from "next/navigation"
import { startTransition } from "react"

export default function error({error,reset}) {
    const router=useRouter()
  return (
    <div>
        <div>Something Went Wrong</div>
        <button
            onClick={()=>{
                startTransition(()=>{
                  router.refresh()
                  reset()
                })
            }}>
            Try Again
        </button>
     </div>
  )
}
