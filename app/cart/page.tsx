import CartProducts from '@/src/components/Cart/CartProducts'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
  title:'AnimeEcom - Cart',
  description:'Cart page of AnimeEcom'
}

const page = () => {
  return (
    <CartProducts/>
  )
}

export default page