'use client'
import { Product } from "@/models/models";
import { getProducts } from "@/utils/functions";
import React, { useEffect, useState, useRef , useCallback } from "react";
import ProductPreview from "../Product_preview/ProductPreview";
import GridLoading from "@/src/layout/Loading/GridLoading";
import ProductPreviewPlaceholder from "../Product_preview/ProductPreviewPlaceholder";


// this are the products shown on top of based ones (based are server rendered), so this starts from the 16th product.
const InfiniteGrid:React.FC<{stringSearchQuery:string,cursor:string,initialProducts:Product[],infinite?:boolean}> = ({stringSearchQuery,cursor,initialProducts,infinite=true}) => {

    const [products,setProducts] = useState<Product[]>(initialProducts);
    const [hasNewProducts,setHasNewProducts] = useState(initialProducts.length>14);
    const [cursorId,setCursorId] = useState(cursor);
    const [error,setError] = useState<any>(null);
    const [isLoading,setIsLoading] = useState(false);
    const lastElementRef = useRef<HTMLDivElement>(null);


    const getMoreProductsHandler = useCallback(async () => {
        if(isLoading) return;
        setError(null);
        setIsLoading(true);
        // update new search with updated cursor
        const searchQuery = new URLSearchParams(stringSearchQuery);
        const updatedSearchParams = new URLSearchParams(searchQuery.toString());
        updatedSearchParams.set('cursor', cursorId);
        const res = await getProducts(updatedSearchParams);
        if (res.error){
            setError(error);
            console.error(error);
            return;
        }
        const products:Product[] = res.products;
        const newCursor:string|null = res.cursor; // id of latest product. can be null if no more items.
        if (products.length <1 || !newCursor){
            // no more products
            setHasNewProducts(false);
            setError(null);
            setIsLoading(false);
            return;
        }
        // valid new items
        setCursorId(newCursor);
        // just in case check if not already added
        setProducts(prev => { 
            if(prev.at(-1)?.id === products.at(-1)?.id) {return prev;}
            return[...prev,...products]});
        setIsLoading(false);
        if (products.length<15) setHasNewProducts(false) // meaning no more.
        
    },[cursorId,stringSearchQuery])

    useEffect(()=>{
        if (!infinite) return; // in liked page no need, saves performance and headache.
        if(initialProducts.length < 15 || !lastElementRef.current || !hasNewProducts) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNewProducts && !isLoading) {
                    getMoreProductsHandler();
                }
            },
            { threshold: 1 }
        );
        if (lastElementRef.current) {
            observer.observe(lastElementRef.current);
        }

        return () => {
            if (lastElementRef.current) {
                observer.unobserve(lastElementRef.current);
            }
        };
    },[lastElementRef,getMoreProductsHandler])

    const mappedProducts = products.map((product) => <ProductPreview key={product.title} product={product}/>);
    const loadingProductsPlaceHolder  = Array(5).fill('').map((item,index) => 
        <ProductPreviewPlaceholder index={index} key={index}/>)


return (
    <div className='grid max-w-full relative gap-4 md:gap-5 grid-cols-[repeat(auto-fit,136px)] md:grid-cols-[repeat(auto-fit,160px)] justify-center'>
        {mappedProducts}
        {isLoading && loadingProductsPlaceHolder}
        {error && <p className="text-red-400 font-semibold">ERROR</p>}
        <div className="absolute bottom-0" ref={lastElementRef}></div>
    </div>
)
}

export default InfiniteGrid