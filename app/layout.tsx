import Navbar from '@/src/components/Navbar/Navbar'
import './globals.css'
import { Red_Hat_Display} from 'next/font/google'
import Footer from '@/src/components/Footer/Footer';
import { ClerkProvider } from '@clerk/nextjs'

const red_hat = Red_Hat_Display({subsets:['latin']});
export const metadata = {
  title: 'AnimeEcom',
  description: 'Anime Shopping Platform',
}

export default function RootLayout({
  children,modal
}: {
  children: React.ReactNode,
  modal:React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">

      <body className={`flex flex-col min-h-[100dvh]  ${red_hat.className} bg-mainBG text-mainText dark:bg-mainBgDark dark:text-mainTextDark`}>
        <header>
          <Navbar/>
        </header>

        <main className='pb-8 min-h-[calc(100dvh-32px-56px)]'>
          {children}
          {modal}
        </main>

        <footer className=' relative w-full bg-mainBG dark:bg-mainBgDark'>
          <Footer/>
        </footer>

      </body>
    </html>
    </ClerkProvider>
  )
}
