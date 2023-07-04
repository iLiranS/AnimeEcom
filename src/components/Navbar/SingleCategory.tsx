import { collectionItem } from '@/models/models'

const SingleCategory:React.FC<{item:collectionItem,changeURL:(url:string)=>void}> = ({item,changeURL}) => {
  return (
    <div onClick={()=>{changeURL(item.searchURL)}}
    className='relative grid gap-1 grid-cols-[4fr,1fr] items-center text-start cursor-pointer p-1 rounded-md
    hover:bg-mainBgDark/10 
    dark:hover:bg-mainBG/10'>
        <section className='flex flex-col'>
        <p>{item.title}</p>
          {item.description && <p className=' opacity-75 w-full overflow-hidden text-ellipsis line-clamp-1 text-xs'>{item.description}</p>}
        </section>
        <section className='flex h-full items-center justify-end text-xl opacity-90 relative'>
          {item.icon ?? ''}
        </section>
    </div>
  )
}

export default SingleCategory