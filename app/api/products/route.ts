import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()


// allowed searchParams : [take,cursor,anime,category,subcategory,search,sort]
export async function GET(request:Request) { 
    try{
    const { searchParams } = new URL(request.url)
    const takeInitial = searchParams.get('take') || '15';
    const cursor = searchParams.get('cursor') || null;
    const take = parseInt(takeInitial); // auto 15
    const anime = searchParams.get('anime') || null;
    const category = searchParams.get('category') || null;
    const subcategory = searchParams.get('subcategory') || null;
    const search = searchParams.get('search') || null;
    const sort = searchParams.get('sort'); // supports asc and desc

        let products;
            products = await prisma.product.findMany({
                where:{
                    ...(category ? {category: category} : {}),
                    ...(anime ? {anime: anime} : {}),
                    ...(subcategory ? {subcategory: subcategory} : {}),
                    ...(search ? {
                        OR: [ // insensitive for lower-upper match
                            {
                                title: {contains:search,mode:'insensitive'}
                            },
                            {
                                description:{contains:search,mode:'insensitive'}
                            },
                            {
                                anime:{contains:search,mode:'insensitive'}
                            }
                        ]
                    } : {}),
                },
                take: take,
                ...(cursor? {
                    cursor:{
                        id:cursor
                    },
                    skip: 1,
                }:{}),
                ...(sort 
                ? {orderBy:{
                    price: sort==='asc' ? 'asc' : 'desc'
                }}
                : {})
            })
        

        
        let myCursor = null;
        if (products.length > 0) {
            const lastProductInResults = products[products.length - 1];
            myCursor = lastProductInResults.id;
        }
        return NextResponse.json({products:products,cursor:myCursor},{status:200});
    }
    catch(error){
        console.error(error);
        return NextResponse.json({response:error},{status:500});
    }
}

export async function POST(request:Request){ 
    const res = await request.json(); // [id,id,id]
    try{

        const products = await prisma.product.findMany({
            where:{
                id:{
                    in:res
                }
            }
        })
        return NextResponse.json(products);
    }
    catch(err){
        return NextResponse.json({err:err},{status:500});
    }
}