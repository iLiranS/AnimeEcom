import { Product } from "@/models/models";
import SearchedContent from "@/src/components/Main/Content/SearchedContent";
import MainHeader from "@/src/components/Main/MainHeader"
import { notFound } from "next/navigation";


async function getProducts(searchQuery:URLSearchParams){
  try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
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


const page = async() => {
  const defaultSearchParams = new URLSearchParams();
  const result = await getProducts(defaultSearchParams); // {products,myCursor}
  const products = result.products as Product[];
  const cursor = result.cursor as string;
  if (!result || !products || products.length<1) return notFound();
  return (
    <div className="pt-2 flex flex-col gap-2">
      <MainHeader/>
      
      <div className="w-[80vw] min-w-[320px] max-w-[1000px] mx-auto flex flex-col relative">
      <SearchedContent canSort={false} sort="" searchQuery={defaultSearchParams} products={products} cursor={cursor} searchValue="Featured"/>
      </div>
      
    </div>
  )
}

export default page