import SavedItems from "@/src/components/Saved/SavedItems"
import { Metadata } from "next"

export const metadata:Metadata={
    title:'AnimeEcom - Saved Items',
    description:'Favorite items'
}

const page = () => {
    return (
        <SavedItems/>
    )
}

export default page