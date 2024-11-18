export const metadata = {
  title: 'Photo Extraction App',
  description: 'Extract and optimize keyframes from videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 