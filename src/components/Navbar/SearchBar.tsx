
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import {LiaSearchSolid} from 'react-icons/lia'
const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();


    const formSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        if (!inputRef.current) return;
        inputRef.current.focus();
        const value = inputRef.current.value.trim();
        if(value.length>0) router.push(`/search/${value}`);
    }
return (
    <form onSubmit={formSubmitHandler} className="softBorder w-max md:w-44 flex gap-1 items-center relative p-1
        focus-within:bg-mainBgDark/10 dark:focus-within:bg-mainBG/10 transition-colors">
        <input ref={inputRef} id='searchbar' 
        placeholder="Search products..." 
        type="search" 
        className="bg-transparent outline-none text-sm  w-0 md:w-full  focus:w-full"/>
        
        <label htmlFor='searchbar'>
            <button className='bg-transparent outline-none border-none flex items-center'>
            <LiaSearchSolid className='font-bold' />
            </button>
        </label>
    </form>
)
}

export default SearchBar