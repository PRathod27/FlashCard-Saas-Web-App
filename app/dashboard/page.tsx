'use client'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <nav className="pt-5 bg-violet-800">
    <div className="container mx-auto p-1.3 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <a href="#" className="text-white font-bold ml-4">My Website</a>
      </div>
      <div className="hidden flex-start md:flex space-x-20  mr-37">
        <a href="#" className="text-white font-semibold text-lg hover:text-black">Home</a>
        <a href="#" className="text-white font-semibold text-lg hover:text-black">About</a>
        <a href="#" className="text-white font-semibold text-lg hover:text-black">Contact</a>
      </div>
      <Link href="/signup" passHref  className="bg-orange-300 text-black font-bold p-2 rounded hover:bg-inherit hover:text-black">
       Signup</Link> 
    </div>   

  </nav>
  )
}

export default page