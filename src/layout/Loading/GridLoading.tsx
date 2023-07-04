import ProductPreviewPlaceholder from '@/src/components/Main/Content/Product_preview/ProductPreviewPlaceholder'
import React from 'react'

const GridLoading = () => {
    const mappedPreviews = Array(5).fill('')
    const map = mappedPreviews.map((item,index) => <ProductPreviewPlaceholder index={index} key={index}/>)
    return (
      <div 
      className='grid w-full  relative gap-4 grid-cols-[repeat(auto-fit,136px)]  md:grid-cols-[repeat(auto-fit,160px)] justify-center '>
        {map}
      </div>
    )
}

export default GridLoading