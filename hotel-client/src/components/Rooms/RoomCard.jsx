import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function RoomCard({ room }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm shadow-ink/5 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg text-ink">{room.roomType}</h3>
        {room.description && <p className="max-w-md text-sm text-ink/55">{room.description}</p>}
        <span className="text-sm text-ink/55">Sleeps {room.capacity}</span>
        <span className="text-sm font-semibold text-ink">${room.pricePerNight.toFixed(2)} / night</span>
      </div>
      <Button as={Link} to={`/book/${room.id}`} variant="primary">
        Book Now
      </Button>
    </div>
  )
}
