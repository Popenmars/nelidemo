import Link from 'next/link'
export default function DestinationCard({ dest }: any) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      <img src={dest.image} alt={dest.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-medium">{dest.title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{dest.description}</p>
        <Link href={`/destinations/${dest.id}`} className="inline-block mt-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">View →</Link>
      </div>
    </article>
  )
}
