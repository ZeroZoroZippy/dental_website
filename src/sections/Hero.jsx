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

    // Image configuration - separate width and height for mobile
    const imageWidth = windowWidth < 768 ? '400px' : '100%'; // Keep original width
    const imageHeight = windowWidth < 768 ? '250px' : '570px'; // Reduced height for mobile

    return (
        <div style={{
            paddingTop: windowWidth < 768 ? '5.5rem' : '6.5rem',
            paddingBottom: windowWidth < 768 ? '1rem' : '0',
            position: 'relative',
            width: '100%',
            minHeight: windowWidth < 768 ? 'auto' : 'auto',
            overflow: 'hidden'
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
                    padding: windowWidth < 768 ? '1.5rem' : '1.25rem',
                    paddingBottom: windowWidth < 768 ? '2rem' : '1.25rem',
                    position: 'relative',
                    zIndex: '1',
                    maxWidth: '1400px',
                    width: 'calc(100% - ' + (windowWidth < 768 ? '1rem' : '4rem') + ')',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minHeight: windowWidth < 768 ? 'auto' : 'auto'
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: windowWidth < 768 ? 'column' : 'row',
                    height: '100%',
                    width: '100%'
                }}>
                    {/* TITLE AND DESCRIPTION - Order 1 on mobile, part of left section on desktop */}
                    <div style={{
                        flex: windowWidth < 768 ? 'none' : '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: windowWidth < 768 ? 'flex-start' : 'space-between',
                        alignItems: 'flex-start',
                        order: windowWidth < 768 ? '1' : '1',
                        padding: '0',
                        margin: '0',
                        marginBottom: windowWidth < 768 ? '0.5rem' : '0'
                    }}>
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
                                Your Perfect Smile Starts Here
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
                                Experience exceptional dental care at Sarvodaya Dental Clinic.<br />
                                Advanced treatments with a gentle touch in Dahisar East, Mumbai.
                            </motion.p>
                        </div>

                        {/* INFO CONTAINER - Only shown on desktop within left section */}
                        {windowWidth >= 768 && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                padding: '0',
                                margin: '0',
                                width: '100%'
                            }}>
                                <InfoBoxContainer />
                            </div>
                        )}
                    </div>

                    {/* HERO IMAGE - Order 2 on mobile, order 2 on desktop */}
                    <div style={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        order: windowWidth < 768 ? '2' : '2',
                        padding: '0',
                        margin: '0',
                        marginBottom: windowWidth < 768 ? '0' : '0'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            style={{
                                width: imageWidth, // Using separate width variable
                                height: imageHeight, // Using separate height variable
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

                {/* INFO CONTAINER - Separate section for mobile, Order 3 */}
                {windowWidth < 768 && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '0',
                        margin: '0',
                        marginTop: '0.5rem',
                        width: '100%',
                        order: '3'
                    }}>
                        <InfoBoxContainer />
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Hero;
