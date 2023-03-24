import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import clsx from 'clsx'

export const metadata = {
  title: 'Next.js + Tailwind components, tips and tricks by Felix.',
  description: 'A collection of components, tips and tricks for Next.js and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(
        'bg-gray-100 h-screen',
        'flex flex-col justify-between',
        'px-2 py-1 md:px-4 md:py-2 lg:px-8 lg:py-4',
        `text-sm`,
      )}>
        <Navbar/>
        <main className='mt-1 md:mt-2 lg:mt-3 flex-grow h-full'>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
