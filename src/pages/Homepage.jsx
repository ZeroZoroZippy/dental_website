import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Banner from '../sections/Banner';
import Services from '../sections/Services';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Banner />
      <Services />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Homepage;