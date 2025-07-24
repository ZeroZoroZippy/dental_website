import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '../ui/TestimonialCard';
import { MdArrowOutward } from "react-icons/md";

const Testimonials = () => {
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

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "Downtown Patient",
            rating: 5,
            text: "Dr. Smith and the team made my dental anxiety disappear. The modern facility and gentle approach made all the difference. Highly recommend!",
            treatment: "Cosmetic Dentistry"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Regular Patient",
            rating: 5,
            text: "Outstanding service from start to finish. The staff is professional, friendly, and the results exceeded my expectations. My smile has never looked better.",
            treatment: "Orthodontics"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            location: "Family Patient",
            rating: 5,
            text: "We've been coming here for years with our whole family. The team is amazing with kids and adults alike. Always professional and caring.",
            treatment: "Preventive Care"
        },
        {
            id: 4,
            name: "David Thompson",
            location: "Emergency Patient",
            rating: 5,
            text: "Had a dental emergency and they saw me the same day. Quick, professional, and pain-free treatment. Couldn't ask for better care.",
            treatment: "Emergency Care"
        },
        {
            id: 5,
            name: "Lisa Park",
            location: "Cosmetic Patient",
            rating: 5,
            text: "The teeth whitening results are incredible! The process was comfortable and the staff explained everything clearly. Worth every penny.",
            treatment: "Cosmetic Dentistry"
        },
        {
            id: 6,
            name: "Robert Wilson",
            location: "Restoration Patient",
            rating: 5,
            text: "Needed extensive restoration work and they made it seamless. The technology they use is impressive and the results look completely natural.",
            treatment: "Restorative Dentistry"
        }
    ];

    return (
        <div id="testimonials" style={{
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
                        Patient Reviews
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
                        What Our <br />
                        Patients Say
                    </motion.h2>

                    <div style={{
                        flex: isMobile ? '1' : '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            style={{
                                fontSize: windowWidth < 768 ? '1.1rem' : '1.25rem',
                                fontWeight: '600',
                                fontFamily: 'Unbounded, sans-serif',
                                color: '#2d2d2d',
                                textAlign: 'left',
                                margin: '0 0 1rem 0'
                            }}
                        >
                            Smiles That Speak for Themselves
                        </motion.h4>
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
                            Here's what our happy patients have to say
                            about their experiences with us.
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
                            Give a review
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

                {/* Testimonials Cards */}
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
                        gap: isMobile ? '1rem' : '1.5rem',
                        justifyContent: 'flex-start',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        paddingBottom: '0.5rem',
                        paddingRight: isMobile ? '1.25rem' : '0'
                    }}
                        className="testimonials-container"
                    >
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={testimonial.id}
                                windowWidth={windowWidth}
                                name={testimonial.name}
                                location={testimonial.location}
                                rating={testimonial.rating}
                                text={testimonial.text}
                                treatment={testimonial.treatment}
                                delay={1.2 + (index * 0.2)}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Hide scrollbar styles */}
            <style jsx="true">{`
                .testimonials-container {
                    -webkit-overflow-scrolling: touch;
                }
                .testimonials-container::-webkit-scrollbar {
                    display: none;
                }
                .testimonials-container {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Testimonials;