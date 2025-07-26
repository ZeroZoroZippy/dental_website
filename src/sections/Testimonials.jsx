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
            name: "Riya Shetty",
            rating: 5,
            text: "I had over all a great experience at the clinic from the moment my treatment started Dr shrishti who did my treatment made sure that i was comfortable troughout the process and helped me understand what exactly happened and how i can prevent it happening in future kudos to Dr Shruti who has such a great team who made me feel everything was at ease will surely recommend to everyone",
            treatment: "General Treatment"
        },
        {
            id: 2,
            name: "Abhishek Dubey",
            location: "Regular Patient",
            rating: 5,
            text: "I had pain in my teeth so I visited Dr. Shruti's clinic for a root canal treatment and had a really good experience. I had seen some of her dental care videos on Instagram which made me feel like I should visit her clinic at least once and after that all I want to say is thank you☺️. Dr. Shruti was very professional, caring, and supportive throughout the treatment. Whatever questions I had she answered everything clearly which made me feel comfortable. I also want to thank her assistant Neha, who always called to check on my condition and followed up regularly. Sometimes even Dr. Shruti herself would call which really showed how much they care about their patients. Thank you both for making the whole process so smooth, stress free and amazing care☺️. I will visit her again in the future if I have any dental problems and I recommend her to anyone who has dental issue.",
            treatment: "Root Canal"
        },
        {
            id: 3,
            name: "Avi",
            location: "Family Patient",
            rating: 5,
            text: "I had a great experience at Sarvodaya Dental Clinic. Dr. Shruti Shetty was professional, friendly, and took the time to explain everything clearly. The office was exceptionally clean and well-maintained, which made me feel comfortable from the start. Highly recommend!",
            treatment: "General Consultation"
        },
        {
            id: 4,
            name: "Abhishek Rai",
            location: "Emergency Patient",
            rating: 5,
            text: "I had an amazing experience... The staff was incredibly friendly and professional making me feel at ease from the moment I walked in. Dr. Shruti was thorough gentle and explained everything clearly during my appointment... The clinic itself was spotless and equipped with the latest medical equipments. I especially appreciated how they prioritized my comfort during the procedure and took the time to answer all my questions. It is rare to find a dental doctor this caring and attentive! Highly recommend for anyone looking for top-notch dental care... I will be definitely be returning for future visits.😃",
            treatment: "Dental Procedure"
        },
        {
            id: 5,
            name: "R Siddhesh",
            location: "Cosmetic Patient",
            rating: 5,
            text: "I recently had a root canal treatment at Sarvodaya Dental Clinic, and I’m very pleased with the results. Dr. Shruti Shetty and the team provided excellent care throughout the process. From the consultation to the procedure and aftercare, everything was handled with professionalism and attention to detail. I’m really happy with how my treatment turned out, and the results speak for themselves! I’m sharing my before and after pictures as well to showcase the difference. Thank you, Dr.Shruti Shetty, for making this experience so positive! :)",
            treatment: "Root Canal"
        },
        {
            id: 6,
            name: "NEHA Don",
            location: "Restoration Patient",
            rating: 5,
            text: "I was struggling with severe tooth pain and didn’t know what to do. That’s when I found Sarvodaya Dental Clinic for a root canal treatment in Dahisar East near Rawalpada. Dr. Shruti Shetty was amazing! She quickly diagnosed the problem and started the treatment. During the procedure, she made sure I was comfortable and explained everything step by step in simple words. The root canal treatment was done so smoothly that I hardly felt any pain. After the root canal, I got a dental bridge treatment to fix the gap in my teeth. The results are fantastic & my pain is gone, and my teeth look and feel normal again. If you’re in pain and searching for root canal treatment near me, I recommend Dr. Shruti Shetty enough as She’s caring, skilled, and her clinic is clean and well-equipped. I’m so happy with my treatment and grateful to have found her!",
            treatment: "Root Canal & Bridge"
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
                            onClick={() => window.open('https://www.google.com/search?sca_esv=042353121bfc9fbf&sxsrf=AE3TifMDsMMgKTwXzbL3wcRVgGq-EajQcA:1753518716175&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E2Ldy-2fntoKT-niTA4sh-PI_Ecj1doA9PqqliAknDJGPEh76TdJtufKIr4--8-cvGCkUz76j5BrkrQsfz3qbdejg--qUjYJwOX-SjKvFko0324jplxRLp-PrEna8Z1XjoA7H48g4oKHB6fAVTFrnoRxxkOhPwq5D-yX-bLsoEZGKeXysQ%3D%3D&q=Sarvodaya+Dental+Clinic+%7C+Dentist+in+Dahisar+East,+Mumbai+%7C+Dr.+Shruti+Shetty+Reviews&sa=X&ved=2ahUKEwiy57yhjtqOAxVK4zgGHZTzAUsQ0bkNegQIIxAD&biw=1470&bih=831&dpr=2#lrd=0x3be7b19cbe1fad89:0xee4e9d247b7c2d98,3,,,,', '_blank')}
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