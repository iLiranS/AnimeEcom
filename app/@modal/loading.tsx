import Modal from "@/src/layout/Modal/Modal";

const loading = () => {
    const mappedEmpties = Array(9).fill('').map((x,i) => <section className='h-full rounded-xl w-full animate-pulse bg-gray-500' style={{animationDelay:`${i*100}ms`}} key={i}></section>);
  return (
    <Modal>

    <div className=' flex flex-col gap-2 h-full w-full py-4'>

        <div className='w-[300px] aspect-square animate-pulse mx-auto rounded-xl bg-gray-500'/>

        <div className='grid p-2 gap-2 grid-cols-3 grid-rows-3 h-full w-full place-items-center rounded-xl'>
            {mappedEmpties}
        </div>
    </div>
    </Modal>
  )

}

export default loading