'use client'
import { Dialog } from '@headlessui/react'
import { useCallback, useState, Fragment, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {GiCancel,GiClick} from 'react-icons/gi'
import { Transition } from '@headlessui/react'
import useThemeStore from '@/store/useThemeStore'


const Modal =({children,className}:{children:React.ReactNode,className?:string})=> {
    const router = useRouter();
    const {modal,setModal} = useThemeStore();
    const [initialLoad,setInitialLoad] = useState(false); // for preventing second effect to activate on first mount

    useEffect(()=>{
        setModal(true);
        setInitialLoad(true);
        // no need for cleanup?
    },[setModal])
    
    const onDismiss = useCallback(() => {
        setTimeout(() => {
            router.back()
        }, 300);
    }, [router])
    
    
        useEffect(()=>{
            if (!modal && initialLoad) onDismiss();
        },[modal,onDismiss,initialLoad])

    return (
<Transition as={Fragment} show={modal}>
        <Dialog className='fixed inset-0' onClose={()=>setModal(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed  top-0 left-0 w-screen h-[100dvh] backdrop-blur-sm bg-mainBG/20 dark:bg-mainBgDark/20" />
            </Transition.Child>

            <Transition.Child
                as={Fragment}
                enter="ease-in duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
            >
                <Dialog.Panel 
                className='flex animate-enterFromBottom  flex-col rounded-t-lg absolute bottom-0 left-1/2 -translate-x-1/2 overflow-auto h-[600px]  w-[100vw] max-w-[500px]  bg-mainBG dark:bg-mainBgDark  p-4  border-2  border-gray-700/30'>
                    <Dialog.Title  className='flex justify-between border-b-2 border-gray-700/50'>
                        <section onClick={()=>location.reload()} className='flex items-center gap-1 text-orange-400 cursor-pointer'>
                        <p >View more</p>
                        <GiClick/>
                        </section>
                        <GiCancel onClick={()=>onDismiss()} className='cursor-pointer opacity-80 hover:opacity-100'>✕</GiCancel>
                    </Dialog.Title>
                {children}
                </Dialog.Panel>
            </Transition.Child>
        </Dialog>

    </Transition>
    )
}
export default Modal;