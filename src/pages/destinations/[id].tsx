import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import Layout from '../../components/Layout'
import Image from 'next/image'

export async function getStaticPaths() {
    const xml = fs.readFileSync(path.join(process.cwd(), 'src/data/destinations.xml'), 'utf8')
    const parsed = await xml2js.parseStringPromise(xml)
    const items = parsed.destinations.destination.map((d: any) => ({
        id: d.$.id
    }))
    return { paths: items.map(i => ({ params: { id: String(i.id) } })), fallback: false }
}

export async function getStaticProps({ params }: any) {
    const xml = fs.readFileSync(path.join(process.cwd(), 'src/data/destinations.xml'), 'utf8')
    const parsed = await xml2js.parseStringPromise(xml)
    const item = parsed.destinations.destination.find((d: any) => String(d.$.id) === String(params.id))
    if (!item) {
        return { notFound: true }
    }

    // ✅ Always normalize image field
    const image = item.image?.[0] || item.images?.[0] || ''

    const dest = { 
        id: item.$.id, 
        title: item.title[0], 
        images: image, 
        description: item.description[0] 
    }

    return { props: { dest } }
}

export default function DestinationPage({ dest }: any) {
    return (
        <Layout title={`${dest.title} — Travel Demo`} description={dest.description}>
            <article className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">{dest.title}</h1>
                <div className="w-full h-64 relative mb-4">
                    <Image 
                        src={dest.images.startsWith('/') ? dest.images : `/images/${dest.images}`} 
                        alt={dest.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                    />
                </div>
                <p className="text-gray-700">{dest.description}</p>
            </article>
        </Layout>
    )
}
