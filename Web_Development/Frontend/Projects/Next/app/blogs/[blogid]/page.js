import { notFound } from 'next/navigation'
import React from 'react'

export  function generateStaticParams(){
  return [{blogid: '1'},{blogid:'2'},{blogid:'3'},{blogid: '4'},{blogid: '5'}]
}

// export const  dynamicParams=false;
export const dynamic = "force-dynamic";


export default async function Blog({params}) {
    const {blogid}=await params
    console.log("Blog Id:",blogid)

    if(blogid==='test')
      notFound()
    
    const randomNumber=Math.random()*10
    console.log(randomNumber)
    if(blogid==='error'){
      if(randomNumber<=8)
        throw new Error ('this is An error page')
    }
      
  return (
    <>
    <div>This is blogId: {blogid}</div>
    
    </>
  )
}
