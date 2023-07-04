import SingleOrder from "@/src/components/Orders/SingleOrder";
import { Order } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { auth } from '@clerk/nextjs';
import { Metadata } from "next";


export const metadata:Metadata={
    title:'AnimeEcom - Orders',
    description:'View your orders'
}

const getOrders = async(clerkId:string) =>{
    const searchParams = new URLSearchParams({
        clerkid:clerkId
    })
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders?${searchParams}`);
        if (!response.ok) throw new Error('something went wrong');
        const orders = await response.json();
        return orders;
    }
    catch(err){
        return err;
    }
    
}


const page = async() => {
    // const user = await currentUser();
    const { userId } = auth();
    if (!userId) return notFound();
    const orders:Order[] = await getOrders(userId);
    const mappedOrders = orders.length > 0? orders.map((order,index) => <SingleOrder order={order} key={index}/> ) : null 
    return (
        <ul className="flex flex-col gap-2  relative  w-[80vw] min-w-[300px] max-w-[500px] mx-auto py-4">
            <li className="text-start font-bold">Order List :</li>
            {orders.length >0 ? mappedOrders : <p>No orders yet.</p>}
        </ul>
    )
}

export default page