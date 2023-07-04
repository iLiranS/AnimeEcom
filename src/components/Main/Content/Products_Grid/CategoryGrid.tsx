import { Product } from '@/models/models'
import React from 'react'
import InfiniteGrid from './InfiniteGrid';
import Sort from './Sort';

const CategoryGrid:React.FC<{products:Product[],title:string,isInfinite?:boolean,cursor:string,searchQuery:URLSearchParams,sort:string,canSort?:boolean}> = ({products,title,cursor,searchQuery,sort,canSort}) => {
    const serializedSearchQuery = searchQuery.toString();
return (
    <div className='flex flex-col gap-4 border-t-[1px] border-mainBgDark/20 dark:border-mainBG/20 pt-1'>
        <section className='flex justify-between items-center'>
            <p className='font-bold text-lg '>{title}</p>
            {canSort && <Sort sort={sort} />}
        </section>

    <InfiniteGrid key={sort} initialProducts={products} stringSearchQuery={serializedSearchQuery} cursor={cursor}/>
    </div>
)
}

export default CategoryGrid