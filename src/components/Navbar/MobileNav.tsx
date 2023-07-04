import { Fragment, useState } from 'react'
import { Dialog , Transition } from '@headlessui/react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCaretDown,AiOutlineShop} from 'react-icons/ai'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { collection, collectionItem } from '@/models/models'

const MobileNav:React.FC<{changeURL:(url:string)=>void,collections:collection[]}> = ({changeURL,collections}) =>{ 
    let [isOpen, setIsOpen] = useState(false)


    const changeUrlHandler = (url:string) => {
        changeURL(url);
        setIsOpen(false);
    }
    const mappedAccordionItems = collections.map(collection =>
        <AccordionItem  key={collection.title} title={collection.title} items={collection.items} changeURL={changeUrlHandler}/>
        )


return (
<div className='block md:hidden z-20'>
   {!isOpen && <GiHamburgerMenu className='cursor-pointer' onClick={()=>setIsOpen(prev=>!prev)}/>}
    <Transition show={isOpen} as={Fragment}>
        <Dialog className='absolute top-0 h-full' onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 backdrop-blur-sm bg-mainBG/20 dark:bg-mainBgDark/20" />
            </Transition.Child>

            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-full"
            >
                <Dialog.Panel className='flex flex-col text-start h-full bg-mainBG dark:bg-mainBgDark w-80 max-w-full p-4  border-r-[1px] border-gray-700'>
                    <Dialog.Title  onClick={()=>setIsOpen(false)} className='flex justify-between'>
                        <Link onClick={()=>setIsOpen(false)} className='items-center flex gap-1' href={'/'}>
                            <p>AnimeEcom</p> 
                            <AiOutlineShop/>
                        </Link>
                        <p className='cursor-pointer opacity-80 hover:opacity-100'>✕</p>
                    </Dialog.Title>
                        <Accordion.Root className='pt-3 px-2 flex flex-col gap-4' type='single' defaultValue='0' collapsible>
                            {mappedAccordionItems}
                        </Accordion.Root>
                </Dialog.Panel>
            </Transition.Child>
        </Dialog>

    </Transition>
</div>
)
}

const AccordionItem:React.FC<{title:string,items:collectionItem[],changeURL:(url:string)=>void}> = ({title,items,changeURL}) =>{



const mappedItems = items.map(item => <p onClick={()=>{changeURL(item.searchURL)}} className='opacity-80 cursor-pointer hover:opacity-100' key={item.title}>{item.title}</p>)

return(

    <Accordion.Item value={title} className='border-gray-700  border-b-[1px] py-1 flex flex-col h-max transition-transform'>
        <Accordion.Trigger className={`flex w-full justify-between hover:underline cursor-pointer items-center AccordionTrigger`}>
            <p>{title}</p>
            <AiFillCaretDown className={`transition-transform text-sm  AccordionChevron `}/>
            </Accordion.Trigger>


        <Accordion.Content className={`pt-1 text-sm flex flex-col gap-1 pl-2  transition-all data-[state='open']:animate-scaleIn`}>
                {mappedItems}
        </Accordion.Content>



    </Accordion.Item>
)
}



export default MobileNav
