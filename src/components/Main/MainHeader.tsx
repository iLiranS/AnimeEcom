import Link from 'next/link'

//TODO: Replace placehodlers in real fetching from database .
// also replace img with Next Image, will need to change config for sources.
const MainHeader = () => {
  return (
    <div className=' gap-4 w-[80vw] min-w-[320px] max-w-[1000px] aspect-[16/12] md:aspect-[16/10] lg:aspect-[16/7]  mx-auto grid grid-rows-[2fr,1fr] lg:grid-rows-1  lg:grid-cols-[3fr,1fr]'>
    
        <div className='relative grid grid-cols-[2fr,1fr] gap-4'>
        <section className='grid grid-rows-[1fr,1fr] gap-4'>
            <HeaderItem redirect='/anime/onepiece' title='One Piece' description='Once piece collection' image='https://images2.alphacoders.com/516/516664.jpg'/>
            <HeaderItem redirect='/' title='Deals' description={`Today's Deals`} image='https://i.pinimg.com/736x/d1/1d/06/d11d06f1c40bd8e91ee9448d354730fa.jpg'/>
        </section>
        <HeaderItem redirect='/anime/naruto' title='Naruto' description='New naruto collection ' image='https://flxt.tmsimg.com/assets/p9162074_b_v8_aa.jpg'/>
        </div>


        <section className='grid grid-cols-[1fr,1fr] lg:grid-cols-1 lg:grid-rows-[1fr,1fr] gap-4'>
            <HeaderItem redirect='/anime/dragonball' title='Dragon Ball' description='Brand new dragon ball hoodies!' image='https://images3.alphacoders.com/131/1314151.jpg'/>
            <HeaderItem redirect='/anime/hxh' title='HxH' description='our new collection of Hunter x Hunter ' image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f6bfdb1-7d63-46d9-af84-b16515705f46/dcf91jz-0aa8f0b2-50ea-4beb-8be0-4c9fc8986bf0.jpg/v1/fill/w_1024,h_573,q_75,strp/hunter_x_hunter_wallpaper_by_yvanwlo_dcf91jz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTczIiwicGF0aCI6IlwvZlwvNGY2YmZkYjEtN2Q2My00NmQ5LWFmODQtYjE2NTE1NzA1ZjQ2XC9kY2Y5MWp6LTBhYThmMGIyLTUwZWEtNGJlYi04YmUwLTRjOWZjODk4NmJmMC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Jw1InBKGB7fWls26z_XzJawi52ZJxDVt8Zhp2EvvtHA'/>
        </section>
    </div>
  )
}




const HeaderItem:React.FC<{title:string,description:string,image?:string,redirect:string}> = ({title,description,image,redirect}) =>{

    return(
        <div className={`relative rounded-md flex flex-col justify-end group cursor-pointer overflow-hidden`}>
            <section className={` bg-gradient-to-b from-transparent text-mainTextDark to-mainBgDark
            bg-opacity-75 flex h-max w-full   text-xs md:text-base md:backdrop-blur-[2px]  p-1 flex-col group-hover:backdrop-blur-sm transition-all duration-100`}>
                <p className='font-bold'>{title}</p>
                <p className='font-semibold leading-tight truncate'>{description}</p>
            </section>

            {image &&
            <img className='absolute top-0 w-full h-full -z-10 brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300 ease-out contrast-75' src={image} alt={title}/>
        }
        <Link className='absolute top-0 left-0 w-full h-full' href={redirect}/>
        </div>
    )
}

export default MainHeader