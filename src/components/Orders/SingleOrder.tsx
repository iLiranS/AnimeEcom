// need to get id , date string , productOrder: {product,size,count}

import { Order, ProductOrder } from '@prisma/client';
import Link from 'next/link';
import React from 'react';




const SingleOrder:React.FC<{order:any}> = ({order}) => {

  const date = new Date (order.createdAt);
  let day:string|number = date.getDate(); if (day <10) day = '0'+day.toString();
  let month:string|number = date.getMonth()+1; if (month <10) month = '0'+month.toString();
  const year = date.getFullYear();
  const dateString = day+'-'+month+'-'+year;
  // updated at date
  const updatedDate = new Date (order.updatedAt);
  let updatedDay:string|number = updatedDate.getDate(); if (updatedDay <10) updatedDay = '0'+updatedDay.toString();
  let updatedMonth:string|number = updatedDate.getMonth()+1; if (updatedMonth <10) updatedMonth = '0'+updatedMonth.toString();
  const updatedYear = updatedDate.getFullYear();
  const updatedDateString = updatedDay+'-'+updatedMonth+'-'+updatedYear;

  const mappedProductsOrders = order.products.map((product:ProductOrder,index:number)=><SingleProductOrder product={product} key={index}/>)
  return (
    <li className='w-full h-max bg-mainBgDark/10 dark:bg-mainBG/10 rounded-md flex flex-col gap-2 p-2'>
      <section className='flex  flex-col md:flex-row  md:items-center md:justify-between'>
        <p><span className='text-sm opacity-80'>order id:</span> <span className='text-orange-400 font-bold text-sm'>{order.id}</span></p>
        <p className='opacity-80'>{dateString}</p>
      </section>

      <p><span className='text-sm opacity-80'>status:</span> 
        <span 
        className={`font-bold ${order.status==='pending' && 'text-cyan-600'} ${order.status==='shipping' && 'text-orange-400'} ${order.status==='complete' &&  'text-green-400'}`}>
          {order.status}
        </span>
      </p>
      <p><span className='text-sm opacity-80'>products:</span></p>

      <ul className=' items-start gap-2 grid grid-cols-[repeat(auto-fit,80px)] overflow-x-auto'>
        {mappedProductsOrders}
      </ul>

      <section className='md:items-center items-end flex justify-end gap-2 md:flex-row flex-col '>
        {order.status === 'complete' ? 
        <p className='text-sm'> <span className='opacity-80 text-xs'>delivered in </span>{updatedDateString}</p> 
        :
          <p className='border-2 border-mainBgDark/30 dark:border-mainBG/30 px-3 py-1  dark:hover:bg-mainBG/30 hover:bg-mainBG/30 transition-colors cursor-pointer'>Track order</p>
        }
        <p><span className='text-sm opacity-80'>Total:</span> <span className='font-bold'>${order.totalPrice}</span>  </p>
      </section>

    </li>
  )
}

const SingleProductOrder:React.FC<{product:any}> = ({product}) =>{

  return(
    <li className='flex flex-col h-max w-[80px] relative hover:text-orange-400'>
      <section className='relative w-full aspect-square'>
      <img className='aspect-square w-full' src={product.product.images[0]} alt={product.productId.title}/>
      <Link className='absolute top-0 left-0 w-full h-full' href={`/product/${product.productId}`}/>
      </section>
      <section className='flex items-center gap-1 text-sm w-full justify-evenly'>
        <p><span className='text-xs opacity-80'>Qty:</span>{product.count}</p>
        {product.size &&<p><span className='text-xs opacity-80'>Size:</span>{product.size.toUpperCase()}</p>}
      </section>
    </li>
  )
}

export default SingleOrder