'use client'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import React, { useCallback, useEffect, useState } from 'react';
import useLiksStore from '@/store/useLikesStore';
import { toast } from 'react-toastify';
import useThemeStore from '@/store/useThemeStore';


const Heart:React.FC<{id:string}> = ({id}) => {
    const likeObj = useLiksStore();
    const [isLiked,setIsLiked] = useState(false); // default as no updated after first mount.
    const theme = useThemeStore((state)=>state.theme)
    const notify = useCallback(() => toast('Maximum of 15 liked products',{type:'error',theme:theme}),[theme]);

    // initial value set.
    useEffect(()=>{
        if (likeObj.likedProducts.length<1) return
        setIsLiked(likeObj.likedProducts.includes(id));
    },[likeObj.likedProducts,id])

        const addLikeHandler = () =>{
            if (likeObj.likedProducts.length>=15){
                // toast
                notify();

            }
            likeObj.addProduct(id);
        }
        const removeLikeHandler = () =>likeObj.removeProduct(id);


    return (
        <div onClick={()=>{isLiked ? removeLikeHandler() : addLikeHandler()}} 
        className='relative grid place-items-center select-none cursor-pointer'>
            {isLiked ? 
            <AiFillHeart  className='text-orange-400 animate-fadeIn'/> :
            <AiOutlineHeart style={{strokeWidth:'3em'}} className={`animate-fadeIn `} />}
        </div>
    )
}

export default React.memo(Heart);
