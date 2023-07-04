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

export async function getCartProducts(idArray:string[]) {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,{
            method:'POST',
            body:JSON.stringify(idArray),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if (!response.ok){
            throw new Error('failed fetching');
        }
        const products = await response.json();
        return products;
    }
    catch(err){
        
        return err;
    }
    
}
