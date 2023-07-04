'use client'
import { Product } from '@/models/models'
import React, { useState , useCallback } from 'react'
import Sizes from './Sizes'
import {PiShoppingCartSimpleBold} from 'react-icons/pi'
import Heart from './Heart'
import useCartStore from '@/store/useCartStore'
import { toast } from 'react-toastify'
import useThemeStore from '@/store/useThemeStore'

const ProductDetails:React.FC<{product:Product,isModal:boolean}> = ({product,isModal}) => {
  const addProduct = useCartStore((state)=>state.addProduct);
  const theme = useThemeStore(state=>state.theme);
  const setModal = useThemeStore(state=>state.setModal)
  const [selectedSize,setSelectedSize] = useState(product.sizes? product.sizes[0] : null);
  const notify = useCallback(()=> toast('Item added to cart!',{type:'success',theme:theme}),[theme])
  
  const updateSelectedSizeHandler = (size:string) => setSelectedSize(size);

  const addProductHandler = ()=>{
    if (selectedSize) addProduct(product.id,selectedSize);
    else addProduct(product.id);
    notify();
    setModal(false);
  }


  return (
    <div className={`flex flex-col ${isModal ? 'mt-2' :'gap-1 p-2 md:p-0'}`}>
        <section className='border-gray-700/30 border-b-[1px] py-2 relative'>
          <div className='flex items-center gap-2'>
        <p className='text-xl font-bold'>{product.title}</p>
        <Heart id={product.id}/>
          </div>
        <p className='text-xs opacity-80 leading-none'>{product.category},{product.subcategory},{product.anime}</p>
        </section>
        <p className={`${isModal ? 'truncate w-full ' :'my-2 w-full'} opacity-80`}>{product.description}</p>
        {product.sizes && <Sizes updateSelectedSize={updateSelectedSizeHandler} selectedSize={selectedSize} sizes={product.sizes}/>}
        <p className=' font-bold text-lg'>${product.price}</p>

        <section onClick={addProductHandler} className='flex  items-center gap-1 bg-orange-400 rounded-xl py-2 px-4 cursor-pointer hover:scale-105 transition-all w-max active:bg-orange-200'>
            <p >Add to Cart</p>
            <PiShoppingCartSimpleBold/>
        </section>
    </div>
  )
}

export default ProductDetails