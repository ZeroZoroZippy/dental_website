import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Banner from '../sections/Banner';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Banner />
    </div>
  );
};

export default Homepage;