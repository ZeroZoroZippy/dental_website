// Updated Banner.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import banner_desktop from '../assets/banner_desktop.png';
import banner_mobile from '../assets/banner_mobile.png';
import BookAppointmentButton from '../ui/BookAppointment'; // Adjust path as needed

const Banner = ({ height = '350px', mobileHeight = '750px', children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const backgroundImage = windowWidth < 768 ? `url(${banner_mobile})` : `url(${banner_desktop})`;

    const isMobile = windowWidth < 768;

    const bannerHeight = isMobile ? mobileHeight : height;

    return (
        <div style={{
            paddingTop: isMobile ? '0.5rem' : '0.5rem',
            position: 'relative',
            width: '100%'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    backgroundColor: 'transparent',
                    backgroundImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: isMobile ? '0.5rem' : '2rem',
                    marginTop: 0,
                    borderRadius: isMobile ? '2rem' : '2rem',
                    padding: '1.25rem',
                    position: 'relative',
                    zIndex: '1',
                    maxWidth: '1400px',
                    width: `calc(100% - ${isMobile ? '1rem' : '4rem'})`,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: bannerHeight
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    maxWidth: isMobile ? '100%' : '50%',
                    height: '100%'
                }}>
                    <div style={{
                        flex: '1',
                        textAlign: isMobile ? 'center' : 'left',
                        ...(isMobile && {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        })
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            style={{
                                fontSize: isMobile ? '1.75rem' : '2rem',
                                fontWeight: '600',
                                fontFamily: 'Unbounded, sans-serif',
                                lineHeight: '1.2',
                                marginBottom: '0.75rem',
                                textAlign: isMobile ? 'center' : 'left'
                            }}
                        >
                            Book Your <br/>
                            Appointment <br/>
                            in a Few Minutes
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            style={{
                                fontSize: isMobile ? '1rem' : '1.125rem',
                                lineHeight: '1.6',
                                fontFamily: 'Quicksand, sans-serif',
                                textAlign: isMobile ? 'center' : 'left',
                                marginBottom: '2.5rem'
                            }}
                        >
                            Ready to achieve a healthier, brighter smile? <br/>
                            Schedule your visit with us today!
                        </motion.p>

                        <BookAppointmentButton isMobile={isMobile} />
                    </div>
                </div>
                {children}
            </motion.div>
        </div>
    );
};

export default Banner;