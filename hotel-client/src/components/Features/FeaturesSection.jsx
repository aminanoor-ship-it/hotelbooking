import SectionHeading from '../ui/SectionHeading'
import FeatureCard from './FeatureCard'
import { features } from '../../data/content'

export default function FeaturesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="What makes Horizon Stays different"
          align="center"
          className="mx-auto items-center text-center"
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
