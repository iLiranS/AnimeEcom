import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import {  Product } from '@/models/models';


const prisma = new PrismaClient()

export async function GET(request:Request) { 
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    if (!id){
        return NextResponse.json('invalid Id',{status:400});
    }

    try{
        const product = await prisma.product.findFirst({
            where:{
                id:id
            }
        })
        if (!product) return NextResponse.json({product:null},{status:404})
        return NextResponse.json({product},{status:200});
    }
    catch(error){
        return NextResponse.json(error,{status:500});
    }
}

export async function POST(request:Request) {
    const res:Product = await request.json();
    try{

        const product = await prisma.product.create({
            data:{
                title:res.title,
                description:res.description,
                images:res.images,
                price:res.price,
                sizes:res.sizes??[],
                category:res.category,
                anime:res.anime,
                subcategory:res.subcategory
            }
        })
        return NextResponse.json({product},{status:200})
    }
    catch(error){
        return NextResponse.error();
    }
}