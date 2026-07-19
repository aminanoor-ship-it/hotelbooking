import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import SectionHeading from '../ui/SectionHeading'
import { ArrowIcon } from '../ui/Icons'
import { showcase } from '../../data/content'

export default function ProjectsShowcase() {
  const slides = showcase.slides
  const [current, setCurrent] = useState(0)

  const goTo = (index) => setCurrent((index + slides.length) % slides.length)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="bg-forest px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={showcase.eyebrow} title={showcase.title} tone="light" />
          <div className="flex flex-col gap-3">
            <p className="max-w-sm text-sm text-cream/60">{showcase.description}</p>
            <Button as={Link} to="/hotels" variant="light" icon={<ArrowIcon />} className="self-start">
              Browse all stays
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative w-full shrink-0">
                <img src={slide.src} alt={slide.alt} className="h-[420px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 font-display text-xl text-white">{slide.caption}</span>
              </div>
            ))}
          </div>

          <IconButton
            variant="light"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <ArrowIcon direction="left" />
          </IconButton>
          <IconButton
            variant="light"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <ArrowIcon />
          </IconButton>

          <div className="absolute bottom-6 right-6 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
