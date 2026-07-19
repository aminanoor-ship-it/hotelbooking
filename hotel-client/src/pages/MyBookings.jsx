import Navbar from '../components/Navbar'
import SectionHeading from '../components/ui/SectionHeading'
import BookingCard from '../components/Bookings/BookingCard'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import { useMyBookings } from '../hooks/useMyBookings'

export default function MyBookings() {
  const { bookings, loading, error, refresh } = useMyBookings()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <SectionHeading eyebrow="Your Trips" title="My Bookings" />

          {loading && <Spinner label="Loading your bookings…" />}
          {!loading && error && <ErrorState onRetry={refresh} />}
          {!loading && !error && bookings.length === 0 && (
            <EmptyState title="No bookings yet" description="Browse our hotels and book your first stay." />
          )}

          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onChanged={refresh} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
