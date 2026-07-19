import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PartnerStrip from '../components/PartnerStrip'
import ServicesSection from '../components/Services/ServicesSection'
import DestinationsSection from '../components/Destinations/DestinationsSection'
import AmenitiesSection from '../components/Amenities/AmenitiesSection'
import FeaturesSection from '../components/Features/FeaturesSection'
import AboutSection from '../components/About/AboutSection'
import StatsSection from '../components/Stats/StatsSection'
import ProcessSection from '../components/Process/ProcessSection'
import OffersSection from '../components/Offers/OffersSection'
import ProjectsShowcase from '../components/Showcase/ProjectsShowcase'
import CtaSection from '../components/Cta/CtaSection'
import Footer from '../components/Footer/Footer'

export default function Home() {
  const sections = [
    { key: 'hero', element: <Hero /> },
    { key: 'partners', element: <PartnerStrip /> },
    { key: 'services', element: <ServicesSection /> },
    { key: 'destinations', element: <DestinationsSection /> },
    { key: 'amenities', element: <AmenitiesSection /> },
    { key: 'features', element: <FeaturesSection /> },
    { key: 'about', element: <AboutSection /> },
    { key: 'stats', element: <StatsSection /> },
    { key: 'process', element: <ProcessSection /> },
    { key: 'offers', element: <OffersSection /> },
    { key: 'showcase', element: <ProjectsShowcase /> },
    { key: 'cta', element: <CtaSection /> },
    { key: 'footer', element: <Footer /> },
  ]

  return (
    <div className="home-page min-h-screen bg-cream">
      <Navbar />
      {sections.map(({ key, element }, index) => (
        <div key={key} className="page-reveal" style={{ '--reveal-delay': `${index * 95}ms` }}>
          {element}
        </div>
      ))}
    </div>
  )
}
