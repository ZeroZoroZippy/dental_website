import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import hero from '../assets/hero.jpeg';
import InfoBoxContainer from '../ui/InfoBoxContainer';

const Hero = () => {
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

    // Image placeholder configuration - maintain square shape
    const imageSize = windowWidth < 768 ? '400px' : '570px';

    return (
        <div style={{
            paddingTop: windowWidth < 768 ? '5.5rem' : '6.5rem',
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
                    padding: '1.25rem', // Main container padding as requested
                    position: 'relative',
                    zIndex: '1',
                    maxWidth: '1400px',
                    width: 'calc(100% - ' + (windowWidth < 768 ? '1rem' : '4rem') + ')',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: windowWidth < 768 ? 'column' : 'row',
                    height: '100%',
                    width: '100%'
                }}>
                    {/* LEFT SECTION - Text Content */}
                    <div style={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        order: windowWidth < 768 ? '2' : '1',
                        padding: '0', // No padding as requested
                        margin: '0'   // No margin as requested
                    }}>
                        {/* TOP PART - Title and Description */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '0',
                            margin: '0'
                        }}>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                style={{
                                    fontSize: windowWidth < 768 ? '2.25rem' : '4rem',
                                    fontWeight: '700',
                                    fontFamily: 'Unbounded, sans-serif',
                                    lineHeight: '1.1',
                                    textAlign: 'left',
                                    marginBottom: '1rem'
                                }}
                            >
                                Your Perfect Smile Starts here
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                style={{
                                    fontSize: windowWidth < 768 ? '1rem' : '1.125rem',
                                    lineHeight: '1.6',
                                    fontFamily: 'Quicksand, sans-serif',
                                    textAlign: 'left'
                                }}
                            >
                                Advanced dental care with a gental touch.<br />
                                Book your Appointment today.
                            </motion.p>
                        </div>

                        {/* BOTTOM PART - Info Container */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: '0',
                            margin: '0',
                            width: '100%'
                        }}>
                            <InfoBoxContainer />
                        </div>
                    </div>

                    {/* RIGHT SECTION - Hero Image */}
                    <div style={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        order: windowWidth < 768 ? '1' : '2',
                        padding: '0', // No padding as requested
                        margin: '0',   // No margin as requested
                        marginBottom: windowWidth < 768 ? '2rem' : '0' // Gap between containers on mobile
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            style={{
                                width: windowWidth < 768 ? imageSize : '100%',
                                height: windowWidth < 768 ? imageSize : '570px',
                                borderRadius: '2.5rem',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                                maxWidth: '670px'
                            }}
                        >
                            <img
                                src={hero}
                                alt="Hero"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;