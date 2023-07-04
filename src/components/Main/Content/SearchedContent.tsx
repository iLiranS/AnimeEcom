import { Product } from '@/models/models'
import React from 'react'
import CategoryGrid from './Products_Grid/CategoryGrid'

const SearchedContent:React.FC<{products:Product[],searchValue:string,cursor:string,searchQuery:URLSearchParams,sort:string,canSort?:boolean}> = ({products,searchValue,cursor,searchQuery,sort,canSort=true}) => {
  return (
    <div className='flex flex-col'>
        <CategoryGrid canSort={canSort} sort={sort} searchQuery={searchQuery} cursor={cursor} isInfinite={true} products={products} title={searchValue}/>
    </div>
  )
}

export default SearchedContent