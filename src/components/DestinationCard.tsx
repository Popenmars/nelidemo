import Link from 'next/link'
import Image from 'next/image'
import { Destination } from '../types/destination'
import styles from '../styles/DestinationCard.module.scss'

interface DestinationCardProps {
  dest: Destination
}

export default function DestinationCard({ dest }: DestinationCardProps) {
  return (
    <article className={styles.card}>
      <Image
        src={dest.image}
        alt={dest.title}
        className={styles.image}
        width={800}
        height={500}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{dest.title}</h2>
        <p className={styles.description}>{dest.description}</p>
        <Link href={`/destinations/${dest.id}`} className={styles.link}>
          View →
        </Link>
      </div>
    </article>
  )
}
