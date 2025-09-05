import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import Layout from '../components/Layout'
import DestinationCard from '../components/DestinationCard'
import { Destination } from '../types/destination'
import styles from '../styles/Home.module.scss'

interface HomeProps {
  items: Destination[]
}

interface RawDestination {
  $: { id: string }
  title: string[]
  image?: string[]
  images?: string[]
  description: string[]
}

export async function getStaticProps() {
  const xml = fs.readFileSync(path.join(process.cwd(), 'src/data/destinations.xml'), 'utf8')
  const parsed = await xml2js.parseStringPromise(xml)

  const items: Destination[] = (parsed.destinations.destination as RawDestination[]).map((d) => ({
    id: d.$.id,
    title: d.title[0],
    image: d.image?.[0] || d.images?.[0] || '',
    description: d.description[0],
  }))

  return { props: { items } }
}

export default function Home({ items }: HomeProps) {
  return (
    <Layout title="Travel Demo — Destinations" description="Explore sample travel destinations.">
      <section aria-labelledby="destinations" className={styles.section}>
        <h2 id="destinations" className={styles.heading}>Destinations</h2>
        <div className={styles.grid}>
          {items.map((it) => (
            <DestinationCard key={it.id} dest={it} />
          ))}
        </div>
      </section>
    </Layout>
  )
}
