import { collection } from "@/models/models";
import {TbShirt} from 'react-icons/tb'
import {PiPantsBold,PiBaseballCapDuotone,PiSneakerBold} from 'react-icons/pi'
import  hxhIcon from '@/src/images/hunterxhunter-001.png'
import {GiSharpShuriken,GiBlackball,GiHoodie,GiShipWheel} from 'react-icons/gi'
import Image from "next/image"

export const hoodieIcon = <GiHoodie/>
export const shirtIcon = <TbShirt/>
export const pantsIcon = <PiPantsBold/>
export const hatIcon = <PiBaseballCapDuotone/>
export const shoesIcon = <PiSneakerBold/>

export const collections:collection[] = [
    {
        title:'Clothing',
        items:[
            {title:'All',description:'All clothing',searchURL:'/category/clothing'},
            {title:'Hoodies',description:'Cozy up in a hoodie',icon:hoodieIcon, searchURL:'/category/clothing/hoodies'},
            {title:'T-Shirts',description:'ready up for the summer',icon:shirtIcon,searchURL:'/category/clothing/shirts'},
            {title:'Pants',description:'shorts/joggers and more',icon:pantsIcon,searchURL:'/category/clothing/pants'},
            {title:'Hats',description:'for style or protection',icon:hatIcon,searchURL:'/category/clothing/hats'},
            {title:'Shoes',description:'Sneakers/Custom/Style',icon:shoesIcon,searchURL:'/category/clothing/shoes'},
        ]
    },
    {
        title:'Anime',
        items:[
            {title:'Dragon Ball',description:'Dragon ball collection',icon:<GiBlackball/>,searchURL:'/anime/dragonball'},
            {title:'Naruto',description:'Naruto collection',icon:<GiSharpShuriken/>,searchURL:'/anime/naruto'},
            {title:'One Piece',description:'One Piece collection',icon:<GiShipWheel/>,searchURL:'/anime/onepiece'},
            {title:'HxH',description:'Hunter×Hunter collection',icon:<Image className="h-2" src={hxhIcon} alt="hxhIcon"/>,searchURL:'/anime/hxh'}
        ]
    }
]
