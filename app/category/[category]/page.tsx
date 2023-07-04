import { Product } from '@/models/models';
import SearchedContent from '@/src/components/Main/Content/SearchedContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'



export const generateMetadata = ({params}:{params:{category:string}}) =>{
    return{
        title:`AnimeEcom - ${params.category}`,
        description:`Discover ${params.category} items`
    }
}



// specific category page || should generate static params for each category.
export async function getProducts(searchQuery:URLSearchParams){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${searchQuery}`);
        if (response.status!=200 || !response.ok){
            throw new Error('something went wrong');
        }
        const responseObject = await response.json();
        return responseObject;
    }
    catch(err){
        return {error:err};
    }
}

const page =async ({params,searchParams}:{params: { category: string}, searchParams: { [key: string]: string | string[] | undefined }}) => {
    const isParams = Object.keys(searchParams).length>0
    const sortParams = searchParams.sort ? searchParams.sort as string : '';

    const searchURL = new URLSearchParams({
        category:params.category,
        sort:isParams?sortParams:''

    })
    const res = await getProducts(searchURL); // {products,cursor}
    if (res.error) return notFound();
    const products:Product[] = res.products;
    const cursor:string = res.cursor; // id of latest product.
    if (!products || products.length<1) return notFound();
    return (
        <div className="w-[80vw] min-w-[320px] max-w-[1000px] mx-auto flex flex-col relative">
            <SearchedContent sort={sortParams} searchQuery={searchURL} cursor={cursor} products={products} searchValue={`${params.category}`}/>
        
        </div>
    )
}

export default page