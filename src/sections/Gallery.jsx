import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";
import GalleryCard from '../ui/GalleryCard';
import { useGallery } from '../hooks/useGallery';

const Gallery = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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

    // Use Firebase gallery hook
    const { items, loading, error } = useGallery();
    
    // Get first 6 items for homepage display
    const galleryItems = items.slice(0, 6);

    return (
        <div id="gallery" style={{
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
                            onClick={() => navigate('/gallery')}
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

                {/* Loading State */}
                {loading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        color: '#666',
                        fontFamily: 'Quicksand, sans-serif'
                    }}>
                        Loading gallery...
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        color: '#c33',
                        fontFamily: 'Quicksand, sans-serif'
                    }}>
                        Error loading gallery: {error}
                    </div>
                )}

                {/* Gallery Bento Grid */}
                {!loading && !error && galleryItems.length >= 6 && (
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
                                image={galleryItems[0].image}
                                delay={1.2}
                                gridArea={isMobile ? "1 / 1 / 3 / 3" : "1 / 1 / 3 / 3"}
                                size="large"
                            />
                            
                            {/* Medium item - spans 1x2 vertically */}
                            <GalleryCard
                                windowWidth={windowWidth}
                                category={galleryItems[1].category}
                                description={galleryItems[1].description}
                                image={galleryItems[1].image}
                                delay={1.3}
                                gridArea={isMobile ? "3 / 1 / 4 / 2" : "1 / 3 / 3 / 4"}
                                size={isMobile ? "small" : "medium"}
                            />
                            
                            {/* Small item */}
                            <GalleryCard
                                windowWidth={windowWidth}
                                category={galleryItems[2].category}
                                description={galleryItems[2].description}
                                image={galleryItems[2].image}
                                delay={1.4}
                                gridArea={isMobile ? "3 / 2 / 4 / 3" : "1 / 4 / 2 / 5"}
                                size="small"
                            />
                            
                            {/* Small item */}
                            <GalleryCard
                                windowWidth={windowWidth}
                                category={galleryItems[3].category}
                                description={galleryItems[3].description}
                                image={galleryItems[3].image}
                                delay={1.5}
                                gridArea={isMobile ? "4 / 1 / 5 / 2" : "2 / 4 / 3 / 5"}
                                size="small"
                            />
                            
                            {/* Medium horizontal item - spans 2x1 */}
                            <GalleryCard
                                windowWidth={windowWidth}
                                category={galleryItems[4].category}
                                description={galleryItems[4].description}
                                image={galleryItems[4].image}
                                delay={1.6}
                                gridArea={isMobile ? "4 / 2 / 5 / 3" : "3 / 1 / 4 / 3"}
                                size={isMobile ? "small" : "medium-horizontal"}
                            />
                            
                            {/* Medium item */}
                            <GalleryCard
                                windowWidth={windowWidth}
                                category={galleryItems[5].category}
                                description={galleryItems[5].description}
                                image={galleryItems[5].image}
                                delay={1.7}
                                gridArea={isMobile ? "5 / 1 / 6 / 3" : "3 / 3 / 4 / 5"}
                                size={isMobile ? "medium-horizontal" : "medium-horizontal"}
                            />
                        </div>
                    </div>
                )}
                
                {/* Fallback for insufficient items */}
                {!loading && !error && galleryItems.length < 6 && galleryItems.length > 0 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        color: '#666',
                        fontFamily: 'Quicksand, sans-serif'
                    }}>
                        Add more images to display the gallery grid (need at least 6 images)
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Gallery;