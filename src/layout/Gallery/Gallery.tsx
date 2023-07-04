'use client'

import { useState } from "react"

// rquires image srouces , need to be contained in height and width parent.

const Gallery:React.FC<{images:string[]}> = ({images}) => {
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
    const changeImageIndexHandler = (index:number) => setCurrentImageIndex(index);



    const imagesPreview = images.map((image,index) => 
    <li onClick={()=>{changeImageIndexHandler(index)}} key={index} 
    className={` w-10 aspect-square relative grid place-items-center p-2 cursor-pointer ${index===currentImageIndex ? 'border-2 border-mainBgDark' : 'border-transparent'}`}>
        <img src={image} alt={`image ${index}`} className='h-full w-full'/>
    </li>)

return (

        <div className='w-full aspect-square  relative bg-white'>

            <section className="relative w-full aspect-square rounded-md">
                <img src={images[currentImageIndex]} className="w-full h-full rounded-md"/>
            </section>

            <ol className="absolute bg-mainBgDark/10 rounded-md top-1 right-1 p-1  flex flex-col gap-1 items-center">
                {imagesPreview}
            </ol>
        </div>



)
}

export default Gallery