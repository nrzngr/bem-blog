import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'] ,weight:["400","500","600","700"] })

export const metadata = {
  title: 'BEM UBSI KRW BLOG',
  description: 'Berita Acara Terbaru berisi rangkuman lengkap dari hasil pertemuan atau kegiatan terkini.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
