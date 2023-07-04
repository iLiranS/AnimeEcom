import { UserProfile } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
    title:'AnimeEcom - Profile',
    description:'User profile page'
}

const page = () => {
    return (
        <UserProfile path='/user-profile' routing='path'/>
    )
}

export default page