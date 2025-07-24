import { motion } from 'framer-motion';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const TestimonialCard = ({ 
    windowWidth, 
    name, 
    location, 
    rating, 
    text, 
    treatment, 
    delay = 1.2 
}) => {
    const isMobile = windowWidth < 768;
    
    // Generate star rating
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                style={{
                    color: index < rating ? '#FFD700' : '#E5E5E5',
                    fontSize: '0.9rem'
                }}
            />
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: 0,
                backgroundColor: '#f4f5f7',
                scale: 1
            }}
            transition={{ delay: delay, duration: 0.5 }}
            whileHover={{
                backgroundColor: '#f8f9fa',
                scale: 1.02,
                transition: { duration: 0.15 }
            }}
            style={{
                backgroundColor: '#f4f5f7',
                borderRadius: '2rem',
                padding: '1.5rem',
                border: '1px solid #f4f5f7',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                width: isMobile ? '300px' : '350px',
                maxWidth: isMobile ? '300px' : '350px',
                minWidth: isMobile ? '300px' : '350px',
                minHeight: '280px',
                flex: isMobile ? '0 0 300px' : '0 0 350px',
                cursor: 'pointer',
                scrollSnapAlign: isMobile ? 'start' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            {/* Treatment Badge */}
            <div style={{
                backgroundColor: '#a9eaf7',
                borderRadius: '1rem',
                padding: '0.25rem 0.75rem',
                alignSelf: 'flex-start',
                marginBottom: '1rem'
            }}>
                <span style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    fontFamily: 'Quicksand, sans-serif',
                    color: '#2d2d2d'
                }}>
                    {treatment}
                </span>
            </div>

            {/* Review Text */}
            <div style={{ flex: 1, marginBottom: '1.5rem' }}>
                <p style={{
                    fontSize: windowWidth < 768 ? '0.95rem' : '1rem',
                    lineHeight: '1.6',
                    fontFamily: 'Quicksand, sans-serif',
                    color: '#2d2d2d',
                    margin: '0',
                    fontStyle: 'italic'
                }}>
                    "{text}"
                </p>
            </div>

            {/* Patient Info and Rating */}
            <div>
                {/* Star Rating */}
                <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    marginBottom: '0.75rem',
                    justifyContent: 'center'
                }}>
                    {renderStars()}
                </div>

                {/* Patient Details */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <h4 style={{
                        fontSize: windowWidth < 768 ? '1rem' : '1.1rem',
                        fontWeight: '600',
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#2d2d2d',
                        margin: '0 0 0.25rem 0'
                    }}>
                        {name}
                    </h4>
                    <FaUserCircle style={{ fontSize: '50px', color: '#666' }} />
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard;