import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WhyChooseUsBox from '../ui/WhyChooseUsBox';
import AboutCard from '../ui/AboutCard';

const About = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth < 768;

    return (
        <div id="about" style={{
            paddingTop: windowWidth < 768 ? '0.5rem' : '0.5rem',
            position: 'relative',
            width: '100%'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    backgroundColor: '#ffffff',
                    margin: windowWidth < 768 ? '0.5rem' : '2rem',
                    marginTop: 0,
                    borderRadius: windowWidth < 768 ? '2rem' : '2rem',
                    padding: '1.25rem',
                    position: 'relative',
                    zIndex: '1',
                    maxWidth: '1400px',
                    width: 'calc(100% - ' + (windowWidth < 768 ? '1rem' : '4rem') + ')',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {/* Why Choose Us Box */}
                <WhyChooseUsBox windowWidth={windowWidth} />

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                        fontSize: windowWidth < 768 ? '1.5rem' : '2rem',
                        fontWeight: '600',
                        fontFamily: 'Unbounded, sans-serif',
                        lineHeight: '1.2',
                        marginTop: '4rem',
                        marginBottom: '1rem',
                        textAlign: 'left'
                    }}
                >
                    Excellence in Dental Care
                </motion.h2>

                <div style={{
                    display: 'flex',
                    flexDirection: windowWidth < 768 ? 'column' : 'row',
                    justifyContent: windowWidth < 768 ? 'flex-start' : 'space-between',
                    gap: windowWidth < 768 ? '1rem' : '0',
                    alignItems: 'flex-start'
                }}>
                    {/* Left side - First two paragraphs */}
                    <div style={{
                        flex: windowWidth < 768 ? '1' : '0 0 45%',
                        maxWidth: windowWidth < 768 ? '100%' : '45%'
                    }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            style={{
                                fontSize: windowWidth < 768 ? '1rem' : '1.125rem',
                                lineHeight: '1.6',
                                fontFamily: 'Quicksand, sans-serif',
                                textAlign: 'left',
                                marginBottom: '1.5rem'
                            }}
                        >
                            We are dedicated to providing exceptional dental care in a comfortable and welcoming environment.
                            Our experienced team uses the latest technology and techniques.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            style={{
                                fontSize: windowWidth < 768 ? '1rem' : '1.125rem',
                                lineHeight: '1.6',
                                fontFamily: 'Quicksand, sans-serif',
                                textAlign: 'left',
                                marginBottom: '1.5rem'
                            }}
                        >
                            From routine cleanings to advanced procedures, we ensure you receive the best possible
                            treatment for your oral health needs.
                        </motion.p>
                    </div>

                    {/* Right side - Third paragraph (extreme right) */}
                    <div style={{
                        flex: windowWidth < 768 ? '1' : '0 0 30%',
                        maxWidth: windowWidth < 768 ? '100%' : '30%'
                    }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            style={{
                                fontSize: windowWidth < 768 ? '1rem' : '1.125rem',
                                lineHeight: '1.6',
                                fontFamily: 'Quicksand, sans-serif',
                                textAlign: 'left'
                            }}
                        >
                            We're committed to helping you achieve and maintain optimal oral health while ensuring
                            your comfort throughout every visit.
                        </motion.p>
                    </div>
                </div>

                {/* About Cards - 4 cards horizontally with carousel on mobile */}
                <div style={{
                    marginTop: '2rem',
                    position: 'relative',
                    // Add negative margin to compensate for container padding on mobile
                    marginLeft: isMobile ? '-1.25rem' : '0',
                    marginRight: isMobile ? '-1.25rem' : '0',
                    paddingLeft: isMobile ? '1.25rem' : '0',
                    paddingRight: isMobile ? '1.25rem' : '0'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: isMobile ? 'nowrap' : 'wrap',
                        overflowX: isMobile ? 'auto' : 'visible',
                        gap: isMobile ? '1rem' : '1.5rem',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        scrollSnapType: isMobile ? 'x mandatory' : 'none',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        paddingBottom: isMobile ? '0.5rem' : '0',
                        paddingRight: isMobile ? '1.25rem' : '0'
                    }}
                    // Add CSS to hide scrollbar
                    className="cards-container"
                    >
                        <AboutCard
                            windowWidth={windowWidth}
                            title="Expert Team"
                            description="Highly qualified dentists with years of experience in comprehensive dental care."
                            delay={1.2}
                        />
                        <AboutCard
                            windowWidth={windowWidth}
                            title="Modern Technology"
                            description="State-of-the-art equipment and latest techniques for precise and comfortable treatment."
                            delay={1.4}
                        />
                        <AboutCard
                            windowWidth={windowWidth}
                            title="Comfortable Environment"
                            description="Relaxing atmosphere designed to make your dental visit as pleasant as possible."
                            delay={1.6}
                        />
                        <AboutCard
                            windowWidth={windowWidth}
                            title="Comprehensive Care"
                            description="Full range of dental services from routine cleanings to advanced procedures."
                            delay={1.8}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Add CSS styles */}
            <style jsx="true">{`
                .cards-container {
                    -webkit-overflow-scrolling: touch;
                }
                .cards-container::-webkit-scrollbar {
                    display: none;
                }
                .cards-container {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default About;