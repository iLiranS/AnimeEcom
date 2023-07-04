'use client'
import { useUser , useClerk, SignInButton,} from "@clerk/nextjs";
import {BiUser} from 'react-icons/bi'
import { LiaBoxSolid} from "react-icons/lia";
import {useEffect, useState } from 'react';
import {PiSignOutBold} from 'react-icons/pi'
import {  useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";


const SignInBar = () => {
  const [isOpen,setIsOpen] = useState(false);
  const { isSignedIn, user, isLoaded} = useUser();
  const [isClient,setIsClient] = useState(false) // for hydration error
  const {signOut} = useClerk();
  const router = useRouter();
  useEffect(()=>{
    setIsClient(true);
  },[])




  const navigateAway =(path:string) =>{
    setIsOpen(false);
    router.push(path);
  }


  if (!isLoaded || !isClient) return <div className="h-full bg-gray-600 max-h-6 aspect-square rounded-full animate-pulse grid place-items-center relative"></div>
  return(
    <>
  
      {isSignedIn ?
        <div  className="h-full max-h-6 aspect-square rounded-full bg-mainBgDark dark:bg-mainBG grid place-items-center relative">
          <section onClick={()=>setIsOpen(p=>!p)}>
            <img src={user.imageUrl} alt="avatar" className="h-full  cursor-pointer w-full rounded-full"/> 
          </section>

          {isOpen &&
            <ul 
            className="absolute z-50  left-0  translate-y-full -translate-x-full md:-translate-x-1/2 lg:translate-x-0 text-sm -bottom-2 bg-mainBgDark dark:bg-mainBG rounded-md flex flex-col text-mainTextDark dark:text-mainText w-max">
              <li className="border-b-2 border-gray-700/30 pb-1 flex-flex-col p-2">
                <p>{user?.firstName}</p> 
                <p className="text-xs leading-none opacity-80">{user?.emailAddresses.toString()}</p> 
              </li>
              <li onClick={()=>navigateAway('/orders')} className="group relative flex items-center gap-2 mt-1 cursor-pointer font-semibold p-1 rounded-md m-1 mx-2 px-2 hover:bg-gray-500/30 "><LiaBoxSolid className="opacity-80  font-normal"/>  <p>Orders</p></li>
              <li onClick={()=>navigateAway('/saved')} className="group relative flex items-center gap-2 mt-1 cursor-pointer font-semibold p-1 rounded-md m-1 mx-2 px-2 hover:bg-gray-500/30 "><AiOutlineHeart className="opacity-80  font-normal" style={{strokeWidth:'3em'}}/>  <p>Saved</p></li>
              <li onClick={()=>navigateAway('/user-profile')} className="group relative flex items-center gap-2 cursor-pointer font-semibold p-1 rounded-md m-1 mx-2 px-2 hover:bg-gray-500/30 "><BiUser className="opacity-80  font-normal"/><p>Account</p></li>
              <li onClick={()=>signOut()} className="group relative flex items-center gap-2 cursor-pointer font-semibold p-1 rounded-md m-1 mx-2 px-2 hover:bg-gray-500/30 "><PiSignOutBold className="opacity-80  font-normal"/> Sign out</li>
            </ul>
          }
        </div>
        :
        <SignInButton>Sign in</SignInButton>
      }

    </>

  )



}

export default SignInBar