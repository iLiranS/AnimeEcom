'use client'
import { Product } from '@/models/models';
import useLiksStore from '@/store/useLikesStore';
import React, { useEffect, useState } from 'react'
import InfiniteGrid from '../Main/Content/Products_Grid/InfiniteGrid';
import { getCartProducts } from '@/utils/functions';

const SavedItems = () => {
    const likeObj = useLiksStore();
    const [likedProducts,setLikedProducts] = useState<Product[]>([]);
    const [isLoading,setIsLoading] = useState(true);



    useEffect(()=>{
        if (likeObj.likedProducts.length>0){
            // fetch and set loading to false
            const getLikedProducts =async () => {
                const res = await getCartProducts(likeObj.likedProducts);
                setLikedProducts(res);
                setIsLoading(false);
            }
            getLikedProducts();
        }
    },[likeObj.likedProducts])

    if (isLoading){
        return <div>Loading...</div>
    }
    if (likedProducts.length<1){
        return <div>No Liked Products...</div>
    }

return (
    <div className="w-[80vw] min-w-[320px] max-w-[1000px] mx-auto flex flex-col gap-2 relative pt-8">
        <p className='font-bold'>Liked Products:</p>
        <InfiniteGrid infinite={false} stringSearchQuery='' cursor='' initialProducts={likedProducts}/>
    </div>
)
}

export default SavedItems