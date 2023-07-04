import {PiShoppingCartSimpleBold} from 'react-icons/pi'
import Link from 'next/link'
import useCartStore from '@/store/useCartStore'
import { useEffect, useState } from 'react';
import { cartItem } from '@/models/models';

const CartBar = () => {
  // to prevent hydration error set products in a use effect
  const [products,setProducts] = useState<cartItem[]>([]);
  const cartProducts = useCartStore((state)=>state.cart);

  useEffect(()=>{
    setProducts(cartProducts);
  },[cartProducts])
  return (
    <Link href={'/cart'} className='softBorder p-1 h-full relative items-center flex text-lg cursor-pointer
    hover:bg-mainText hover:bg-opacity-10 transition-colors'>
        <PiShoppingCartSimpleBold/>
        {products && products.length > 0 &&
          <div key={products.length} className=' animate-enterFromTop absolute -bottom-2 -right-2 text-xs h-4 grid place-items-center rounded-full aspect-square bg-mainBgDark dark:bg-mainBG text-mainTextDark dark:text-mainText'>
            {products.length}
          </div>
        }
    </Link>
  )
}

export default CartBar