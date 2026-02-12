import Link from 'next/link'
import React from 'react'

export default function Services() {
  return (
    <>
    <div className='text-2xl'>This is a Service Page</div>
    <div className='text-blue-500'>
      <Link href="/services/webdev">Web Development</Link> <br />
      <Link href="cp">Compitative Programing</Link> <br />
      <Link href="ml">Machine Learning</Link>
    </div>
    </>
  )
}
