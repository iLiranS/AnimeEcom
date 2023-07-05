'use client'
import useThemeStore from '@/store/useThemeStore'
import React from 'react'
import {BiSun} from 'react-icons/bi'
import {PiMoonLight} from 'react-icons/pi'
import {AiFillGithub} from 'react-icons/ai'

const Footer = () => {
    const themeObj = useThemeStore();
return (
        <ul className=' flex justify-center w-full  border-t-[1px] items-center gap-4 border-mainBgDark/30 dark:border-mainBG/30 h-8'>
            <li className='text-xs'>
                ©2023 iLiranS. All rights Reserved
            </li>
            <li>
                <a href='https://github.com/iLiranS/AnimeEcom' target='_blank'><AiFillGithub/></a> 
            </li>
            <li onClick={themeObj.toggleTheme} 
            className={`${themeObj.theme === 'dark' ? 'rotate-0' : '-rotate-90'}  select-none items-center transition-all cursor-pointer`}>
                {themeObj.theme==='dark' ? <BiSun/> : <PiMoonLight/>}
            </li>
        </ul>
)
}

export default Footer