'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {ImCheckmark as CheckIcon} from 'react-icons/im'
import {BsChevronContract as ChevronUpDownIcon} from 'react-icons/bs'
import { usePathname, useRouter } from 'next/navigation'

const people = [
  { name: 'Newest' },
  { name: 'Price low to high' },
  { name: 'Price high to low' },
]

const Sort:React.FC<{sort:string}> = ({sort}) =>{
  const [selected, setSelected] = useState(people[0])
  const [initialLoad,setInitialLoad] = useState(false);
  const router = useRouter();
  const path = usePathname(); // it returns without current query.

  useEffect(()=>{
    switch(sort){
      case 'desc':
        setSelected(people[2])
        break;
      case 'asc':
        setSelected(people[1])
        break;
      default:
        setSelected(people[0])
    }
    setInitialLoad(true);
  },[sort])


  useEffect(()=>{
    if (!initialLoad) return;
    let sortResult='';
    switch(selected.name){
        case 'Price low to high':
            sortResult='asc';
            break;
        case 'Price high to low':
            sortResult='desc';
            break;
        default:
            sortResult=''
    }
    if(sortResult.length===0) router.replace(path);
    if(sortResult.length>0)router.replace(`${path}?sort=${sortResult}`)
  },[selected,router,path])

  return (
    <div className="w-40">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 ">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-mainBgDark/10 dark:bg-mainBG/20 py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 text-sm softBorder max-h-60 w-full overflow-auto rounded-md bg-mainBG dark:bg-mainBgDark py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2  pl-10 pr-4 ${
                      active ? 'bg-gray-500/10 text-orange-400' : 'text-mainText dark:text-mainTextDark'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
export default Sort;
