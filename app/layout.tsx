import './globals.css'
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
            <main className=''>
              {children}
            </main>
        </Provider>
      </body>
    </html>
  )
}
