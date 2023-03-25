import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import Provider from './provider'

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
    <html lang="en" suppressHydrationWarning>
      <body className='min-h-screen dark:bg-darkTheme bg-whiteTheme'>
        <Provider>
          <nav className="sticky top-4 z-50">
          <Navbar/>
          </nav>
          <main className='mt-1 md:mt-2 lg:mt-3 flex-grow h-full bg-inherit'>
            {children}
          </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
