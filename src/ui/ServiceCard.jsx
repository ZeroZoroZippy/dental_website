import { motion } from 'framer-motion';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { useState } from 'react';

const ServiceCard = ({ windowWidth, title, checkPoints, image, delay = 1.2 }) => {
    const isMobile = windowWidth < 768;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                backgroundColor: '#ffffff',
                scale: 1
            }}
            transition={{ delay: delay, duration: 0.5 }}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '2rem',
                padding: '1rem',
                border: '1px solid #A3A3A3',
                marginTop: '0',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                width: isMobile ? '280px' : '100%',
                maxWidth: isMobile ? '220px' : '280px',
                minWidth: isMobile ? '220px' : 'auto',
                minHeight: isMobile ? '240px' : '260px', // Increased to accommodate image
                flex: isMobile ? '0 0 280px' : '1',
                scrollSnapAlign: isMobile ? 'start' : 'none'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
            }}>
                {/* Service Image */}
                <div style={{
                    width: isMobile ? '180px' : '240px',
                    height: isMobile ? '180px' : '210px',
                    borderRadius: '2rem',
                    margin: '0 auto 1.5rem',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5'
                }}>
                    {image ? (
                        <img 
                            src={image} 
                            alt={title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '2rem'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '2rem'
                        }} />
                    )}
                </div>

                <div style={{
                    textAlign: 'left',
                    flex: 1 // Take remaining space
                }}>
                    <h3 style={{
                        fontSize: windowWidth < 768 ? '1.1rem' : '1rem',
                        fontWeight: '600',
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#2d2d2d',
                        marginBottom: '0.8rem'
                    }}>
                        {title}
                    </h3>

                    {/* Checkbox Points */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}>
                        {checkPoints && checkPoints.map((point, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <IoMdCheckboxOutline style={{
                                    color: '#2d2d2d',
                                    fontSize: '18px',
                                    flexShrink: 0
                                }} />
                                <span style={{
                                    fontSize: windowWidth < 768 ? '0.85rem' : '0.9rem',
                                    lineHeight: '1.4',
                                    fontFamily: 'Quicksand, sans-serif',
                                    color: '#666'
                                }}>
                                    {point}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div
                        style={{
                            backgroundColor: isHovered ? '#a9eaf7' : '#ffffff',
                            borderRadius: '2rem',
                            padding: '0.5rem 1rem',
                            border: '1px solid #A3A3A3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span style={{
                            fontFamily: 'Quicksand, sans-serif',
                            fontSize: windowWidth < 768 ? '0.85rem' : '0.9rem',
                            fontWeight: '600',
                            color: '#2d2d2d'
                        }}>
                            Explore more
                        </span>
                        <div style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '50%',
                            backgroundColor: '#2d2d2d',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <MdArrowOutward style={{
                                color: '#ffffff',
                                fontSize: '0.8rem'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;