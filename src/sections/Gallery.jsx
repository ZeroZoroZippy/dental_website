import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdArrowOutward } from "react-icons/md";
import GalleryCard from '../ui/GalleryCard';

// Import images for gallery
import hero from '../assets/hero.jpeg';
import preventiveCare from '../assets/preventive_care_1.png';
import cosmeticCare from '../assets/cosmetic_care.png';
import orthodontics from '../assets/Orthodontics.png';
import restoration from '../assets/restorative_dentistry.png';
import emergency from '../assets/Emergency_Care.png';

const Gallery = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);

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

    // Gallery items data
    const galleryItems = [
        {
            id: 1,
            image: hero,
            title: "Modern Dental Office",
            category: "Facility",
            description: "Our state-of-the-art facility designed for comfort and advanced care"
        },
        {
            id: 2,
            image: preventiveCare,
            title: "Preventive Care",
            category: "Treatment",
            description: "Regular cleanings and checkups"
        },
        {
            id: 3,
            image: cosmeticCare,
            title: "Smile Makeovers",
            category: "Cosmetic",
            description: "Beautiful results"
        },
        {
            id: 4,
            image: orthodontics,
            title: "Orthodontics",
            category: "Treatment",
            description: "Straight teeth solutions"
        },
        {
            id: 5,
            image: restoration,
            title: "Restorative Work",
            category: "Treatment",
            description: "Expert dental restoration and repair services"
        },
        {
            id: 6,
            image: emergency,
            title: "Emergency Care",
            category: "Emergency",
            description: "Immediate dental care when you need it most"
        }
    ];

    return (
        <div style={{
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
                {/* Section Badge */}
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
                        Gallery
                    </span>
                </motion.div>

                {/* Header Section */}
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
                        See Our Work <br />
                        in Action
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
                            Explore our modern facility and see <br />
                            examples of our quality dental work. <br />
                            From routine care to complex procedures, <br />
                            we deliver exceptional results.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
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
                            View Full Gallery
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

                {/* Gallery Bento Grid */}
                <div style={{
                    marginTop: '1rem',
                    position: 'relative',
                    marginLeft: isMobile ? '-1.25rem' : '0',
                    marginRight: isMobile ? '-1.25rem' : '0',
                    paddingLeft: isMobile ? '1.25rem' : '0',
                    paddingRight: isMobile ? '1.25rem' : '0'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gridTemplateRows: isMobile ? 'repeat(4, 150px)' : 'repeat(3, 200px)',
                        gap: isMobile ? '0.75rem' : '1rem',
                        paddingBottom: '0.5rem',
                        paddingRight: isMobile ? '1.25rem' : '0'
                    }}>
                        {/* Large featured item - spans 2x2 */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[0].category}
                            description={galleryItems[0].description}
                            delay={1.2}
                            gridArea={isMobile ? "1 / 1 / 3 / 3" : "1 / 1 / 3 / 3"}
                            size="large"
                        />
                        
                        {/* Medium item - spans 1x2 vertically */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[1].category}
                            description={galleryItems[1].description}
                            delay={1.3}
                            gridArea={isMobile ? "3 / 1 / 4 / 2" : "1 / 3 / 3 / 4"}
                            size={isMobile ? "small" : "medium"}
                        />
                        
                        {/* Small item */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[2].category}
                            description={galleryItems[2].description}
                            delay={1.4}
                            gridArea={isMobile ? "3 / 2 / 4 / 3" : "1 / 4 / 2 / 5"}
                            size="small"
                        />
                        
                        {/* Small item */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[3].category}
                            description={galleryItems[3].description}
                            delay={1.5}
                            gridArea={isMobile ? "4 / 1 / 5 / 2" : "2 / 4 / 3 / 5"}
                            size="small"
                        />
                        
                        {/* Medium horizontal item - spans 2x1 */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[4].category}
                            description={galleryItems[4].description}
                            delay={1.6}
                            gridArea={isMobile ? "4 / 2 / 5 / 3" : "3 / 1 / 4 / 3"}
                            size={isMobile ? "small" : "medium-horizontal"}
                        />
                        
                        {/* Medium item */}
                        <GalleryCard
                            windowWidth={windowWidth}
                            category={galleryItems[5].category}
                            description={galleryItems[5].description}
                            delay={1.7}
                            gridArea={isMobile ? "5 / 1 / 6 / 3" : "3 / 3 / 4 / 5"}
                            size={isMobile ? "medium-horizontal" : "medium-horizontal"}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Gallery;