import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import styles from '../styles/Layout.module.scss'


interface LayoutProps {
  title?: string
  description?: string
  children: ReactNode
}

export default function Layout({
  title = 'Travel Demo',
  description = 'Demo site',
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              <h1>Travel Demo</h1>
            </Link>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>© 2025 Demo</footer>
      </div>
    </>
  )
}
