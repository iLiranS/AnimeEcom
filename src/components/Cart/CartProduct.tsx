import { Product, cartItem } from '@/models/models'
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from 'react-icons/ai'
import Link from 'next/link'
import React from 'react'

const CartProduct:React.FC<{product:Product,cartItem:cartItem,index:number,updateCount:(index:number,amount:number)=>void}> = ({product,cartItem,index,updateCount}) => {
    const changeCountHandler = (amount:number) =>{
        updateCount(index,amount);
    }
    return(
        <li className='flex justify-between h-24  w-full  gap-4 border-b-2 border-mainBgDark/30 dark:border-mainBG/30
            font-semibold'>
            <div className='flex gap-2'>

                <section className='h-full aspect-square rounded-md overflow-hidden relative p-2'>
                    <img src={product.images[0]} className='h-full w-full rounded-md' />
                </section>

                <section className='flex flex-col'>
                    <Link href={`/product/${product.id}`} className='font-bold text-lg truncate text-orange-400'>{product.title}</Link>
                    {cartItem.size &&  <section className='text-sm leading-tight items-center flex gap-1'>size: <span className='text-orange-400 uppercase font-bold'>{cartItem.size}</span> </section>}
                    <p className='font-bold text-lg'>${product.price}</p>
                </section>
            </div>

            <div className='grid select-none w-20 grid-cols-[1fr,2fr,1fr] justify-center items-cneter gap-2 self-center mr-2'>
                <AiOutlineMinusCircle onClick={()=>changeCountHandler(-1)} className='hover:text-orange-400 cursor-pointer'/>
                <p  className='leading-tight font-semibold text-center'><span className='text-xs'>Qty</span>:{cartItem.count}</p>
                <AiOutlinePlusCircle onClick={()=>changeCountHandler(1)} className='hover:text-orange-400 cursor-pointer'/>
            </div>

        </li>
        )
}

export default CartProduct