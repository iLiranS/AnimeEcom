import { Product as ProductModel } from "@/models/models";
import Product from "@/src/components/Product/Product";
import { notFound } from "next/navigation";
import { Metadata } from 'next'


type Props = {
    params: { id: string }
}

// export const dynamicParams = false;

// export async function generateStaticParams() {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?take=999`);
//     const data = await response.json();
//     console.log(data);
//     const products = data.products as ProductModel[]
//     return products.map((product) => ({
//         id: product.id,
//     }))
// }



// main Page (not modal)
async function getProduct(id:string){
    const searchURL = new URLSearchParams({
        id
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${searchURL}`);
    if (!response.ok) return null
    const product = await response.json();
    return product || null;
}
// metadata
export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = params.id;
    // fetch data
    const product:any = await getProduct(id);
    if (!product) return{
        title:'AnimeEcom - Not found'
    }
    const title = product.product.title
    return {
    title: `AnimeEcom - ${title} `,
    }
}





const page =async ({params}:{params:{id:string}}) => {
    const product:ProductModel = await getProduct(params.id);

    if(!product) return notFound();

    return (
        <Product initialProduct={product}/>
    )
}

export default page