import React from 'react'

const ProductPreviewPlaceholder:React.FC<{index:number}> = ({index}) => {
  return (
    <div style={{animationDelay:`${index*100}ms`}} className={`  w-36 md:w-40 aspect-[5/6] rounded-md flex flex-col  relative gap-1 group opacity-0 bg-gray-600  animate-pulse`}>
    </div>
  )
}

export default ProductPreviewPlaceholder