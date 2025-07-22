import Hero from '../components/Hero';
import Services from '../components/Services';
import AboutMe from '../components/AboutMe';

const TopSection = () => {
    return (
        <div className="relative">
            <Hero />

            {/* What Can I Do For You Section */}
            <section id="services" className="relative">
                <Services />
            </section>

            {/* About Me Section */}
            <section id="about" className="relative">
                <AboutMe />
            </section>
        </div>
    );
};

export default TopSection;