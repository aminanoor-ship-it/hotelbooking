import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import IconButton from '../ui/IconButton'
import Button from '../ui/Button'
import HotelCard from '../Hotels/HotelCard'
import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'
import ErrorState from '../ui/ErrorState'
import { ArrowIcon } from '../ui/Icons'
import { useHotels } from '../../hooks/useHotels'

export default function ServicesSection() {
  const { hotels, loading, error, refresh } = useHotels()
  const [start, setStart] = useState(0)
  const trackRef = useRef(null)
  const canPrev = start > 0
  const canNext = start + 3 < hotels.length

  const cardStep = useMemo(() => {
    if (typeof window === 'undefined') return 0

    const viewportWidth = window.innerWidth
    const gap = 24

    if (viewportWidth >= 768) {
      return (viewportWidth - 48 - gap * 2) / 3 + gap
    }

    return viewportWidth - 48 + gap
  }, [start])

  function slide(direction) {
    const nextStart = direction === 'next' ? Math.min(hotels.length - 3, start + 1) : Math.max(0, start - 1)
    if (nextStart === start) return

    setStart(nextStart)
    trackRef.current?.scrollTo({
      left: nextStart * cardStep,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!trackRef.current) return
    trackRef.current.scrollTo({ left: start * cardStep, behavior: 'smooth' })
  }, [cardStep, start])

  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Our Stays" title="Explore hotels you can book today" />
          {hotels.length > 3 && (
            <div className="flex gap-3">
              <IconButton variant="outline" onClick={() => slide('prev')} disabled={!canPrev}>
                <ArrowIcon direction="left" />
              </IconButton>
              <IconButton variant="dark" onClick={() => slide('next')} disabled={!canNext}>
                <ArrowIcon />
              </IconButton>
            </div>
          )}
        </div>

        {loading && <Spinner label="Loading hotels…" />}
        {!loading && error && <ErrorState onRetry={refresh} />}
        {!loading && !error && hotels.length === 0 && (
          <EmptyState title="No hotels available yet" description="Check back soon for new stays." />
        )}

        {!loading && !error && hotels.length > 0 && (
          <>
            <div ref={trackRef} className="flex gap-6 overflow-hidden scroll-smooth">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="w-full shrink-0 md:w-[calc((100%-3rem*2)/3)]">
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>
            <Button as={Link} to="/hotels" variant="secondary" icon={<ArrowIcon />} className="self-start">
              View all hotels
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
