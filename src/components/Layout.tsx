import Head from 'next/head'
import { ReactNode } from 'react'
export default function Layout({ title='Travel Demo', description='Demo site', children }: { title?: string; description?: string; children: ReactNode }) {
  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-semibold">Travel Demo</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">{children}</main>
      <footer className="text-center p-4 text-sm text-gray-500">© 2025 Demo</footer>
    </div>
  </>
}
