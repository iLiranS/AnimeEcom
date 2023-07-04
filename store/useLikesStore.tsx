import { create } from "zustand";
// currently works on localStorage because I dont want to add to database liked products for each user
// because it's a dummy project

interface likesModel{
    likedProducts:string[];
    addProduct:(id:string)=>void;
    removeProduct:(id:string)=>void;
}

let lastLikedLocal:string[] =[];

if (typeof window !== 'undefined') {
    const currentLikedProducts = JSON.parse(localStorage.getItem('likedProducts') ?? 'null');
    lastLikedLocal = currentLikedProducts ?? [];
}


const useLiksStore = create<likesModel>((set)=>({
    likedProducts:lastLikedLocal,
    addProduct:(id:string)=>set((state)=>{
        const updatedLikedProducts = [...state.likedProducts];
        if (updatedLikedProducts.length >=15) return ({likedProducts:updatedLikedProducts});
        if (!updatedLikedProducts.includes(id)) updatedLikedProducts.push(id);
        localStorage.setItem('likedProducts',JSON.stringify(updatedLikedProducts));
        return({likedProducts:updatedLikedProducts})
    }),
    removeProduct:(id:string)=>set((state)=>{
        const updatedLikedProducts = [...state.likedProducts];
        const indexOfId = updatedLikedProducts.indexOf(id);
        if (indexOfId >-1) {
            updatedLikedProducts.splice(indexOfId,1);
            localStorage.setItem('likedProducts',JSON.stringify(updatedLikedProducts));
        }
        return({likedProducts:updatedLikedProducts})
    })
}))

export default useLiksStore;