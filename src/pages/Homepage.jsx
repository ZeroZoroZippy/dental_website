import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Banner from '../sections/Banner';
import Services from '../sections/Services';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Banner />
      <Services />
    </div>
  );
};

export default Homepage;