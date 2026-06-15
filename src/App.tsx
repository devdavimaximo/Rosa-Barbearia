import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import About from './components/About'
import Team from './components/Team'
import Diferenciais from './components/Diferenciais'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Location from './components/Location'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'

export const WHATSAPP_URL = 'https://wa.me/555192651639'
export const APPBARBER_URL = 'https://sites.appbarber.com.br/rosabarbearia-l4so'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Team />
        <Diferenciais />
        <Gallery />
        <Testimonials />
        <Location />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
