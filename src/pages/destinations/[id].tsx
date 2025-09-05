import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import Layout from '../../components/Layout'
import Image from 'next/image'
import styles from '../../styles/DestinationPage.module.scss'
import { Destination } from '../../types/destination'

interface DestinationPageProps {
    dest: Destination
}

interface RawDestination {
    $: { id: string }
    title: string[]
    image?: string[]
    images?: string[]
    description: string[]
}

export async function getStaticPaths() {
    const xml = fs.readFileSync(path.join(process.cwd(), 'src/data/destinations.xml'), 'utf8')
    const parsed = await xml2js.parseStringPromise(xml)

    const items = (parsed.destinations.destination as RawDestination[]).map((d) => ({
        id: d.$.id,
    }))

    return {
        paths: items.map((i) => ({ params: { id: String(i.id) } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const xml = fs.readFileSync(path.join(process.cwd(), 'src/data/destinations.xml'), 'utf8')
    const parsed = await xml2js.parseStringPromise(xml)

    const destinations = parsed.destinations.destination as RawDestination[]
    const item = destinations.find((d) => String(d.$.id) === params.id)

    if (!item) return { notFound: true }

    const image = item.image?.[0] || item.images?.[0] || ''

    const dest: Destination = {
        id: item.$.id,
        title: item.title[0],
        image,
        description: item.description[0],
    }

    return { props: { dest } }
}

export default function DestinationPage({ dest }: DestinationPageProps) {
    return (
        <Layout title={`${dest.title} — Travel Demo`} description={dest.description}>
            <article className={styles.article}>
                <h1 className={styles.title}>{dest.title}</h1>
                <div className={styles.imageWrapper}>
                    <Image
                        src={dest.image.startsWith('/') ? dest.image : `/images/${dest.image}`}
                        alt={dest.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <p className={styles.description}>{dest.description}</p>
            </article>
        </Layout>
    )
}
