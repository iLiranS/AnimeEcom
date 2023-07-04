'use client'
import React, { useEffect, useState } from 'react'

const Sizes:React.FC<{sizes:string[],updateSelectedSize:(size:string)=>void,selectedSize:string|null}> = ({sizes,selectedSize,updateSelectedSize}) => {

    const updateSelectedSizeHandler = (size:string) =>{
        updateSelectedSize(size);
    }



    const sizesItems = sizes.map((size,index) => 
        <li onClick={()=>updateSelectedSizeHandler(sizes[index])} key={index} 
        className={` cursor-pointer transition-all p-1 grid place-items-center rounded-full text-sm ${sizes[index]===selectedSize ? 'bg-orange-400 w-10' :'bg-gray-700/30 w-6'}`}>
            <p className='text-xs uppercase'>{size}</p>
        </li>) 


    return (
        <ul className='flex items-center gap-1 border-y-[1px] border-gray-700/30 py-1 w-full'>
            <li className='mr-2'>Size:</li>
            {sizesItems}
        </ul>
    )
}

export default Sizes