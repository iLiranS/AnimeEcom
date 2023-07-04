'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {BsChevronDown} from 'react-icons/bs'
import {AiOutlineShop} from 'react-icons/ai'
import SingleCategory from './SingleCategory';
import SearchBar from './SearchBar';
import CartBar from './CartBar';
import SignInBar from './SignInBar';
import MobileNav from './MobileNav';
import { collections } from '@/store/data';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
    const router = useRouter();

    const searchHandler = (searchURL:string) =>{
        router.push(searchURL); 
    }


    const mappedCollectionItems = collections.map(collection => 
        <NavigationMenu.Item key={collection.title}>
            <NavigationMenu.Trigger className='flex flex-col group'>
                <NavigationItemTitle title={collection.title}/>
                <NavigationMenu.Content className='navContent'>
                    {collection.items.map(item => 
                        <SingleCategory key={item.title} item={item} changeURL={searchHandler} />)}
                </NavigationMenu.Content>
            </NavigationMenu.Trigger>
        </NavigationMenu.Item>)



return (
    <NavigationMenu.Root className=' p-2 h-14 flex justify-evenly items-center border-b-[1px] border-mainBgDark/30 dark:border-mainBG/30 z-40'>

        <MobileNav collections={collections} changeURL={searchHandler} />
        
        <NavigationMenu.List className=' gap-4 hidden md:flex'>
        <NavigationMenu.Item className='items-center flex'>
            <Link className='items-center flex gap-1' href={'/'}>
                <p>AnimeEcom</p> <AiOutlineShop/>
            </Link>
        </NavigationMenu.Item>
            {mappedCollectionItems}
        </NavigationMenu.List>

        <ToastContainer autoClose={3000}/>

        <NavigationMenu.List className='flex gap-4'>
            <NavigationMenu.Item className='flex items-center gap-2'>
                <SearchBar/>
                <CartBar/>
                <SignInBar/>
            </NavigationMenu.Item>
        </NavigationMenu.List>


    </NavigationMenu.Root>
)
}

const NavigationItemTitle:React.FC<{title:string}> = ({title}) =>{
return(
    <section className='flex items-center gap-1 p-2 rounded-md group-data-[state=open]:bg-mainText group-data-[state=open]:bg-opacity-10 '>
    <p>{title}</p>
    <BsChevronDown className='text-sm group-data-[state=open]:-rotate-180 transition-transform'/>
</section>
)
}



export default Navbar