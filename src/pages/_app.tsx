import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Serif_JP } from 'next/font/google'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notoSerifJP.className}>
      <Component {...pageProps} />
    </main>
  )
} 