import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 items-start p-4 w-screen h-screen'>
        <div className='aspect-square w-[320px] md:w-[500px] self-center md:self-start  max-w-[100vw]  animate-pulse bg-gray-700 rounded-xl'></div>
        <section className='flex flex-col gap-4 w-full'>
          <div  className='w-full h-12 animate-pulse bg-gray-700 rounded-xl'></div>
          <div style={{animationDelay:'100ms'}} className='w-full h-12 animate-pulse bg-gray-700 rounded-xl'></div>
          <div style={{animationDelay:'200ms'}} className='w-full h-12 animate-pulse bg-gray-700 rounded-xl'></div>
          <div style={{animationDelay:'300ms'}} className='w-full h-12 animate-pulse bg-gray-700 rounded-xl'></div>
          <div style={{animationDelay:'400ms'}} className='w-full h-12 animate-pulse bg-gray-700 rounded-xl'></div>
        </section>
    </div>
  )
}

export default loading