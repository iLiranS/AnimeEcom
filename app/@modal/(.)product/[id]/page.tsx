import { Product as ProductModel } from "@/models/models";
import Product from "@/src/components/Product/Product";
import Modal from "@/src/layout/Modal/Modal";
import { notFound } from "next/navigation";

// modal Page 
async function getProduct(id:string){
    const searchURL = new URLSearchParams({
        id
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${searchURL}`);
    if (response.status === 404 || !response.ok) return null;
    const product = await response.json();
    return product;
}


const page =async ({params}:{params:{id:string}}) => {
    const product:ProductModel = await getProduct(params.id);
        if(!product) return notFound();
    return (
        <Modal>
            <Product isInModal={true} initialProduct={product}/>
        </Modal>
    )
}

export default page