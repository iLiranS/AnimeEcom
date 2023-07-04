import { ReactNode } from "react"


export type collectionItem={
    title:string,
    description:string,
    icon?:ReactNode,
    searchURL:string
}
export interface collection{
    title:string,
    items:collectionItem[],
}





export interface Product { 
    id:string,
    title: string,
    description: string, 
    images:string[],
    sizes?:string[],
    price:number,
    category:string,
    anime:string,
    subcategory:string
}


export interface ItemOrder{
    id:string
    amount:number
    size?:number
}

export interface AddProduct extends Omit<Product, 'id'> {
    id?: string;
}

export type cartItem= {
    id:string,
    size?:string,
    count:number
}