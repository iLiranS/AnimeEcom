import GridLoading from '@/src/layout/Loading/GridLoading'

const loading = () => {
  return (
    <div
    className='relative flex justify-center w-[80vw] min-w-[320px] max-w-[1000px] mx-auto pt-7'>
    <GridLoading/>
    </div>
  )
}

export default loading