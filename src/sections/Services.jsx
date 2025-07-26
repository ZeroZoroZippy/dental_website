import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import ServiceCard from '../ui/ServiceCard';
import { MdArrowOutward } from "react-icons/md";
import cosmetic_care from "../assets/cosmetic_care.png"
import emergency from "../assets/Emergency_Care.png"
import orthodontics from "../assets/Orthodontics.png"
import preventive_care from "../assets/preventive_care_1.png"
import restoration from "../assets/restorative_dentistry.png"
import speciality from "../assets/speciality_service.png"

const Services = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const lenisRef = useRef(null);

    const handleExploreMore = (categoryTitle) => {
        // Create a mapping for category navigation
        const categoryMap = {
            'Preventive Care': 'preventive',
            'Restorative Dentistry': 'restorative',
            'Cosmetic Dentistry': 'cosmetic',
            'Specialty Services': 'specialty',
            'Orthodontics': 'orthodontics',
            'Emergency Care': 'emergency'
        };

        const categoryId = categoryMap[categoryTitle];
        navigate(`/services#${categoryId}`);

        // Use Lenis for smooth scrolling
        setTimeout(() => {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
                setTimeout(() => {
                    const categoryElement = document.getElementById(categoryId);
                    if (categoryElement && lenisRef.current) {
                        lenisRef.current.scrollTo(categoryElement, {
                            offset: -100,
                            duration: 1.5
                        });
                    }
                }, 300);
            } else {
                // Fallback to native scrolling
                window.scrollTo({ top: 0, behavior: 'instant' });
                setTimeout(() => {
                    const categoryElement = document.getElementById(categoryId);
                    if (categoryElement) {
                        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 200);
            }
        }, 100);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Get Lenis instance
    useEffect(() => {
        // Access the global Lenis instance if it exists
        const checkLenis = () => {
            if (window.lenis) {
                lenisRef.current = window.lenis;
            } else {
                // If no global instance, create a temporary one for this component
                lenisRef.current = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smooth: true,
                });
            }
        };

        checkLenis();

        // Check again after a short delay in case Lenis is still initializing
        const timeout = setTimeout(checkLenis, 100);

        return () => clearTimeout(timeout);
    }, []);

    const isMobile = windowWidth < 768;

    return (
        <div id="services-section" style={{
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
                    padding: '1rem 2rem',
                    position: 'relative',
                    zIndex: '1',
                    maxWidth: '1400px',
                    width: 'calc(100% - ' + (windowWidth < 768 ? '1rem' : '4rem') + ')',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '2rem',
                        padding: '0.5rem 1rem',
                        border: '1px solid #A3A3A3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        position: 'absolute',
                        top: windowWidth < 768 ? '1rem' : '1.5rem',
                        left: windowWidth < 768 ? '2rem' : '2rem',
                        zIndex: 2
                    }}
                >
                    <span style={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
                        fontWeight: '600',
                        color: '#2d2d2d'
                    }}>
                        Our Services
                    </span>
                </motion.div>

                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'flex-start',
                    gap: isMobile ? '1rem' : '24rem',
                    marginTop: isMobile ? '4rem' : '6rem',
                    marginBottom: '2rem'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            fontSize: windowWidth < 768 ? '2rem' : '3rem',
                            fontWeight: '600',
                            fontFamily: 'Unbounded, sans-serif',
                            lineHeight: '1.2',
                            margin: 0,
                            textAlign: 'left',
                            flex: isMobile ? '1' : '0 0 40%',
                            maxWidth: isMobile ? '100%' : '40%'
                        }}
                    >
                        Dental Services <br />
                        for Every Need
                    </motion.h2>

                    <div style={{
                        flex: isMobile ? '1' : '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            style={{
                                fontSize: windowWidth < 768 ? '1rem' : '1.125rem',
                                lineHeight: '1.5',
                                fontFamily: 'Quicksand, sans-serif',
                                textAlign: 'left',
                                margin: '0 0 3rem 0'
                            }}
                        >
                            We offer comprehensive dental services <br />
                            tailored to your needs, using advanced  <br />
                            technology to provide exceptional care <br />
                            in a comfortable environment.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => {
                                navigate('/services');
                                // Use Lenis for smooth scroll to top after navigation
                                setTimeout(() => {
                                    if (lenisRef.current) {
                                        lenisRef.current.scrollTo(0, { duration: 1.2 });
                                    } else {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }, 100);
                            }}
                            style={{
                                backgroundColor: '#2d2d2d',
                                color: '#ffffff',
                                fontFamily: 'Quicksand, sans-serif',
                                fontWeight: '300',
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '2rem',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'transform 0.3s ease',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                margin: 0
                            }}
                        >
                            Explore All Services
                            <div style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MdArrowOutward style={{ color: '#2d2d2d', fontSize: '1rem' }} />
                            </div>
                        </motion.button>
                    </div>
                </div>

                <div style={{
                    marginTop: '1rem',
                    position: 'relative',
                    marginLeft: isMobile ? '-1.25rem' : '0',
                    marginRight: isMobile ? '-1.25rem' : '0',
                    paddingLeft: isMobile ? '1.25rem' : '0',
                    paddingRight: isMobile ? '1.25rem' : '0'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        gap: isMobile ? '0.5rem' : '1.5rem',
                        justifyContent: 'flex-start',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        paddingBottom: '0.5rem',
                        paddingRight: isMobile ? '1.25rem' : '0'
                    }}
                        className="cards-container"
                    >
                        <ServiceCard
                            windowWidth={windowWidth}
                            title="Preventive Care"
                            image={preventive_care}
                            checkPoints={[
                                "Regular check-ups & cleanings",
                                "Oral health screenings",
                                "Preventive treatments"
                            ]}
                            delay={1.2}
                            onExploreMore={handleExploreMore}
                        />
                        <ServiceCard
                            windowWidth={windowWidth}
                            title="Restorative Dentistry"
                            image={restoration}
                            checkPoints={[
                                "Fillings & crowns",
                                "Bridges & implants",
                                "Tooth restoration"
                            ]}
                            delay={1.4}
                            onExploreMore={handleExploreMore}
                        />
                        <ServiceCard
                            windowWidth={windowWidth}
                            title="Cosmetic Treatment"
                            image={cosmetic_care}
                            checkPoints={[
                                "Teeth whitening",
                                "Veneers & bonding",
                                "Smile makeovers"
                            ]}
                            delay={1.6}
                            onExploreMore={handleExploreMore}
                        />
                        {/* <ServiceCard
                            windowWidth={windowWidth}
                            title="Specialty Services"
                            image={speciality}
                            checkPoints={[
                                "Root canal therapy",
                                "Tooth extractions",
                                "Periodontal treatments"
                            ]}
                            delay={1.8}
                            onExploreMore={handleExploreMore}
                        /> */}
                        <ServiceCard
                            windowWidth={windowWidth}
                            title="Orthodontics"
                            image={orthodontics}
                            checkPoints={[
                                "Braces & aligners",
                                "Bite correction",
                                "Retainers"
                            ]}
                            delay={2.0}
                            onExploreMore={handleExploreMore}
                        />
                        <ServiceCard
                            windowWidth={windowWidth}
                            title="Surgical Treatment"
                            image={emergency}
                            checkPoints={[
                                "Toothache relief",
                                "Broken tooth repair",
                                "Urgent extractions"
                            ]}
                            delay={2.2}
                            onExploreMore={handleExploreMore}
                        />
                    </div>
                </div>
            </motion.div>

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

export default Services;