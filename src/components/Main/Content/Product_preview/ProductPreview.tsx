import { Product } from '@/models/models'
import {BiShoppingBag} from 'react-icons/bi'
import {GiClick} from 'react-icons/gi'
import Link from 'next/link'
import Heart from '@/src/components/Product/Heart'
import { hoodieIcon,shoesIcon,shirtIcon,hatIcon,pantsIcon } from '@/store/data'

const ProductPreview:React.FC<{product:Product}> = ({product}) => {
  let icon;
  switch(product.subcategory){
    
    case 'hoodies':
      icon = hoodieIcon;
      break;
  
    case 'shoes':
      icon=shoesIcon;
      break;

    case 'shirts':
      icon = shirtIcon;
      break;
    
    case 'hats':
      icon = hatIcon;
      break;

    default:
      icon = pantsIcon;
  
  }

  return (
    <div className=' xs:w-32 s:w-36 md:w-40  rounded-md flex flex-col relative gap-1 group'>


      <section  className='relative aspect-[5/6] w-full overflow-hidden rounded-lg bg-white cursor-pointer'>
        <img loading='lazy' className='h-full w-full rounded-lg group-hover:scale-105 transition-transform ease-in' src={product.images[0]} alt={product.title}/>

        <Link className='absolute top-0 h-full w-full' href={`/product/${product.id}`}/>

      </section>

      <section className='flex flex-col px-1 text-sm leading-tight'>
        <div className='flex justify-between gap-1'>
          <Link className='truncate' href={`/product/${product.id}`}>
            <p className='font-semibold truncate hover:text-orange-400 text-xs'>{product.title}</p>
          </Link>
          <p className='font-bold'>${product.price}</p>
        </div>
      </section>


      <section className='absolute grid place-items-center font-extrabold -top-2 -left-2 p-2 rounded-full bg-mainBG dark:bg-mainBgDark'>{icon}</section>
      <section className='absolute grid place-items-center font-extrabold -top-2 -right-2 p-2 rounded-full text-orange-400 bg-mainBG dark:bg-mainBgDark'><Heart id={product.id}/></section>


    </div>
  )
}

export default ProductPreview