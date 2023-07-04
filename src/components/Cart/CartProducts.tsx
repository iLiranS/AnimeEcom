'use client'
import { Product, cartItem } from '@/models/models';
import useCartStore from '@/store/useCartStore';
import { getCartProducts } from '@/utils/functions';
import { useEffect, useMemo, useState } from 'react';
import CartProduct from './CartProduct';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import useThemeStore from '@/store/useThemeStore';
import { useRouter } from 'next/navigation'; 




const CartProducts = () => 
{
    const [cartProducts,setCartProducts] = useState<cartItem[]>([]);
    const [initialCartLoad,setInitialCartLoad] = useState(false); // for fetching effect to take action
    const theme = useThemeStore(state=>state.theme); // for toast theme
    const cartObj = useCartStore();
    const [products,setProducts] = useState<Product[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isCheckoutLoading,setIsCheckoutLoading] = useState(false);
    const {userId,isLoaded} = useAuth();
    const router = useRouter();

    // for hydration
    useEffect(()=>{
        setCartProducts(cartObj.cart); // isnt enough for initial fetch because it might change if count cahnges...
        setInitialCartLoad(true);
    },[cartObj.cart])

    // initial products fetching, no need to refetch because initial include all.
    useEffect(()=>{
            if(!initialCartLoad) return; // if did not load cart yet, return.

            const getProductsHandler = async() =>{
                setIsLoading(true);
                const idsArray = cartProducts.map(p => p.id);
                const res = await getCartProducts(idsArray) as Product[];
                setProducts(res);
                setIsLoading(false);
            }

        if (cartProducts.length>0){
            getProductsHandler();
        }
        
    },[initialCartLoad])

    const changeCountHandler = (index:number,amount:number) =>{
        cartObj.changeCount(index,amount);
    }

    const price = useMemo(()=>{
        let totalPrice = 0;
        cartProducts.forEach(cartItem => totalPrice+=cartItem.count*(products.find(p=>p.id===cartItem.id)?.price ?? 0) )
        return totalPrice;
    },[cartProducts,products])



    if (isLoading || !isLoaded) return( 
    <div className='flex flex-col gap-2 relative   w-[80vw] min-w-[300px] max-w-[500px] mx-auto py-4'>
        <div className='bg-gray-600 animate-pulse w-full h-24 rounded-md'/>
        <div className='bg-gray-600 animate-pulse w-full h-24 rounded-md'/>
        <div className='bg-gray-600 animate-pulse w-full h-24 rounded-md'/>
        <div className='bg-gray-600 animate-pulse w-full h-24 rounded-md'/>
    </div>)

if(cartProducts.length<1){
    return <p>Cart is empty...</p>
}


    const mappedProducts = cartProducts.map((cartProduct,index)=>
    {       
        if (!products || products.length<1) return <div key={index}>Cannot find product</div>
        const p = products.find(product => product.id === cartProduct.id) as Product;
        return <CartProduct updateCount={changeCountHandler} index={index} product={p} cartItem={cartProduct} key={index}/>
    }
    )

    const checkOutDemoHandler = async() =>{
        if (isCheckoutLoading) return;
        if (!userId) return;
        setIsCheckoutLoading(true);
        const fetchObject = {
            products:cartProducts,
            clerkId:userId,
            status:'pending',
            totalPrice:price
        }
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,{
                method:'POST',
                body:JSON.stringify(fetchObject),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if (!res.ok){
                throw new Error('Failed posting order, watch server logs')
            }
            // successfully added order
            const notify = () => toast('Successfully ordered!',{type:'success',theme:theme});
            cartObj.clearCart();
            notify();
            router.push('/orders');

            
        }
        catch(err){
            console.error(err);
        }
        setIsCheckoutLoading(false);
    }

    return (
        <div className='flex flex-col gap-2  relative  w-[80vw] min-w-[300px] max-w-[500px] mx-auto py-4'>
            <ul className='flex flex-col relative max-h-[500px] overflow-auto border-b-2 border-mainBgDark/30 dark:border-mainBG/30'>
                {mappedProducts}
            </ul>

            {price>0 &&  <p className='font-semibold'>Total Price: <span className='text-orange-400 font-bold'>${price.toFixed(2)}</span></p>}
            
            <section className='self-end'>
                {!isCheckoutLoading
                ?
                <p onClick={checkOutDemoHandler} className='bg-orange-400 hover:scale-105 transition-transform font-bold px-4 py-2  rounded-md cursor-pointer'>Checkout</p>
                :
                <p  className='bg-orange-400/20 font-bold px-4 py-2  rounded-md cursor-progress'>Loading...</p>
                }
            </section>
        </div>
    )
}

export default CartProducts