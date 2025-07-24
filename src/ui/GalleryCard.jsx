import { useState } from 'react';
import { motion } from 'framer-motion';

const GalleryCard = ({ windowWidth, category, description, delay, gridArea, size = "small", image }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = windowWidth < 768;

    // Generate placeholder colors based on category
    const getPlaceholderColor = (category) => {
        const colors = {
            'Facility': '#E8F4FD',
            'Treatment': '#F0F9FF',
            'Emergency': '#FEF2F2',
            'Cosmetic': '#F9FAFB'
        };
        return colors[category] || '#F3F4F6';
    };

    // Get text size based on card size
    const getTextSizes = () => {
        if (size === 'large') {
            return {
                title: isMobile ? '1.1rem' : '1.4rem',
                description: isMobile ? '0.85rem' : '1rem',
                category: isMobile ? '0.75rem' : '0.85rem'
            };
        } else if (size === 'medium' || size === 'medium-horizontal') {
            return {
                title: isMobile ? '0.95rem' : '1.2rem',
                description: isMobile ? '0.8rem' : '0.95rem',
                category: isMobile ? '0.7rem' : '0.8rem'
            };
        } else {
            return {
                title: isMobile ? '0.85rem' : '1rem',
                description: isMobile ? '0.75rem' : '0.85rem',
                category: isMobile ? '0.65rem' : '0.75rem'
            };
        }
    };

    const textSizes = getTextSizes();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '2rem',
                overflow: 'hidden',
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isHovered && !isMobile ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered && !isMobile
                    ? '0 12px 24px rgba(0, 0, 0, 0.1)'
                    : '0 4px 8px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                gridArea: gridArea,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Image Container */}
            <div style={{
                position: 'relative',
                width: '100%',
                flex: '1',
                overflow: 'hidden',
                backgroundColor: getPlaceholderColor(category),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: size === 'large' ? '200px' : '120px'
            }}>
                {/* Actual Image */}
                {image ? (
                    <img
                        src={image}
                        alt={`${category} image`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                
                {/* Fallback Placeholder Content */}
                <div style={{
                    display: image ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                    opacity: 0.4,
                    position: image ? 'absolute' : 'static',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}>
                    <div style={{
                        width: size === 'large' ? '60px' : size === 'tall' ? '50px' : '40px',
                        height: size === 'large' ? '60px' : size === 'tall' ? '50px' : '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(45, 45, 45, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{
                            fontSize: size === 'large' ? '1.8rem' : size === 'tall' ? '1.3rem' : '1rem',
                            color: '#666'
                        }}>
                            📷
                        </span>
                    </div>
                </div>

                {/* Category Badge */}
                <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '1rem',
                    padding: '0.25rem 0.75rem',
                    fontSize: textSizes.category,
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: '600',
                    color: '#2d2d2d'
                }}>
                    {category}
                </div>

                {/* Hover Overlay */}
                {isHovered && !isMobile && size === 'large' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to top, rgba(45, 45, 45, 0.8), transparent)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '1rem'
                        }}
                    >
                        <p style={{
                            color: '#ffffff',
                            fontSize: textSizes.description,
                            fontFamily: 'Quicksand, sans-serif',
                            margin: 0,
                            lineHeight: '1.4'
                        }}>
                            {description}
                        </p>
                    </motion.div>
                )}
            </div>


        </motion.div>
    );
};

export default GalleryCard;