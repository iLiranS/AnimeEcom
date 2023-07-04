import { getAuth } from "@clerk/nextjs/server";
import {  PrismaClient, Product } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(request:Request) {
    // should get clerkId , status? , products[]
    //  products[] = array of ProductOrder = {productId , count , size}
    const requestData = await request.json();
    const { clerkId, status,totalPrice } = requestData;
    const products:{count:number,id:string,size:string}[] = requestData.products;
    try{
        const user = await prisma.user.findUnique({
            where:{
                clerkId:clerkId
            }
        });
        // if there is no user, create one with the clerk id.
        if (!user){
            const newUser = await prisma.user.create({
                data:{
                    clerkId:clerkId
                }
            });
            if (!newUser) throw new Error('failed finding and creating new user');
        }

        const order = await prisma.order.create({
            data:{
                owner:{
                    connect:{
                        clerkId:clerkId
                    }
                },
                status: status || 'pending',
                products:{
                    create:products.map(product =>({
                        product:{
                            connect:{
                                id:product.id
                            },
                        },
                        count:product.count,
                        size:product.size,
                    }))
                },
                totalPrice:totalPrice

            },
            include:{
                owner:true,
                products:true
            }
        })
        return NextResponse.json(order,{status:200});
    }
    catch(error){
        return NextResponse.json(error,{status:500});
    }
}

export async function GET(req:Request){
    const { searchParams } = new URL(req.url)
    const clerkId = searchParams.get('clerkid');
    if (!clerkId) return NextResponse.json('no id given',{status:500})
    try{
        const orders = await prisma.order.findMany({
            where:{
                ownerId:clerkId
            },
            include:{
                products:{
                    include:{
                        product:true
                    }
                }
            }
        })
        return NextResponse.json(orders);
    }
    catch(err){
        return NextResponse.json(err,{status:500});
    }

}