import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import Layout from '../components/Layout'
import DestinationCard from '../components/DestinationCard'
export async function getStaticProps() {
  const xml = fs.readFileSync(path.join(process.cwd(),'src/data/destinations.xml'),'utf8')
  const parsed = await xml2js.parseStringPromise(xml)
  const items = parsed.destinations.destination.map((d:any)=>({id:d.$.id,title:d.title[0],images:d.images[0],description:d.description[0]}))
  return { props: { items } }
}
export default function Home({ items }: any) {
  return (
    <Layout title="Travel Demo — Destinations" description="Explore sample travel destinations.">
      <section aria-labelledby="destinations">
        <h2 id="destinations" className="text-2xl font-bold mb-4">Destinations</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it:any)=><DestinationCard key={it.id} dest={it} />)}
        </div>
      </section>
    </Layout>
  )
}
