import { Product, cartItem } from "@/models/models";
import { create } from "zustand";
// currently works on localStorage because I dont want to add to database  products for each user
// because it's a dummy project


interface cartModel{
    cart:cartItem[];
    addProduct:(id:string,size?:string)=>void;
    changeCount:(index:number,amount:number)=>void;
    clearCart:()=>void;
}

let lastCartLocal:cartItem[] =[];

if (typeof window !== 'undefined') {
    const currentlocalCart = JSON.parse(localStorage.getItem('cart') ?? 'null');
    lastCartLocal = currentlocalCart ?? [];
}






const useCartStore = create<cartModel>((set) => ({
    cart:lastCartLocal,
    addProduct: (id,size) => set((state)=>{
        const updatedCart = [...state.cart];
            // check if id and size exists
            const exisitingItemIndex = state.cart.findIndex(item => item.id === id && item.size === size);
            if (exisitingItemIndex>-1){
                updatedCart[exisitingItemIndex].count+=1;
            }
            // id not exists, add new product
            else{
                updatedCart.push({id,size,count:1});
            }
        // update state cart
        localStorage.setItem('cart',JSON.stringify(updatedCart));
        return({cart:updatedCart});
    }) ,
    changeCount:(index,amount) => set((state)=>{
        // will handle reducing , increasing and removing items.
        const updatedCart = [...state.cart];
        updatedCart[index].count+=amount; // amount can be minus
        if (updatedCart[index].count <=0){
            // remove item
            updatedCart.splice(index,1);
        }
        localStorage.setItem('cart',JSON.stringify(updatedCart));
        return({cart:updatedCart});
    }),
    clearCart:()=>set(()=>{
        localStorage.removeItem('cart');
        return({cart:[]})
    })
}));


export default useCartStore;

