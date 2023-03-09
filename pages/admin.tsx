import { Button } from 'antd'
import { create } from 'domain'
import Link from 'next/link'
import React from 'react'
import Admin from '../components/blogs/Admin'
import { CreateBlogs } from '../components/blogs/CreateBlogs'

function admin() {
    
  return (
    <>
        <Admin />
        <Link href="/create">Create Blog</Link>
    </>
        

  )
}

export default admin