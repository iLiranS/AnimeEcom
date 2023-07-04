import { Product } from '@/models/models'
import Gallery from '@/src/layout/Gallery/Gallery';
import React from 'react'
import Sizes from './Sizes';
import ProductDetails from './ProductDetails';

const Product:React.FC<{initialProduct:any,isInModal?:boolean,}> = ({initialProduct,isInModal=false}) => {
    const product:Product = initialProduct.product;

 

    return (
    <div className={`${isInModal ? 'flex flex-col ' : 'grid grid-flow-row  md:grid-flow-col md:grid-cols-[max-content,auto] md:gap-8 md:px-16 md:py-8'}`}>
        <div className={` ${isInModal ? 'w-[300px] ' : 'w-screen sm:w-full lg:w-[500px] md:sticky md:top-8'}  aspect-square mx-auto max-w-[500px]`}>
            <Gallery images={product.images}/>
        </div>

        <div className='max-w-[800px]'>
            <ProductDetails  isModal={isInModal} product={product}/>
        </div>


    
        </div>


    
    )
}

export default Product