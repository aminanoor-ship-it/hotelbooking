import SectionHeading from '../ui/SectionHeading'
import {
  WifiIcon,
  PoolIcon,
  RestaurantIcon,
  ShuttleIcon,
  SpaIcon,
  ConciergeIcon,
} from './AmenityIcons'

const amenities = [
  { Icon: WifiIcon, label: 'Free WiFi' },
  { Icon: PoolIcon, label: 'Swimming Pool' },
  { Icon: RestaurantIcon, label: 'On-site Restaurant' },
  { Icon: ShuttleIcon, label: 'Airport Shuttle' },
  { Icon: SpaIcon, label: 'Spa & Wellness' },
  { Icon: ConciergeIcon, label: '24/7 Front Desk' },
]

export default function AmenitiesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionHeading
          eyebrow="Amenities"
          title="Services & amenities at every stay"
          align="center"
          className="mx-auto items-center text-center"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {amenities.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-sm shadow-ink/5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-forest">
                <Icon />
              </span>
              <span className="text-sm font-medium text-ink/70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
