import { motion } from 'framer-motion';

const AboutCard = ({ windowWidth, title, description, delay = 1.2 }) => {
    const isMobile = windowWidth < 768;
    
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
            whileHover={{
                backgroundColor: '#a9eaf7',
                scale: 1.02,
                transition: { duration: 0.15 }
            }}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '2rem',
                padding: '1.5rem 1.5rem',
                border: '1px solid #A3A3A3',
                marginTop: '0',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                // Mobile-specific sizing
                width: isMobile ? '280px' : '100%',
                maxWidth: isMobile ? '280px' : '330px',
                minWidth: isMobile ? '280px' : 'auto',
                minHeight: isMobile ? '200px' : '230px',
                flex: isMobile ? '0 0 280px' : '1',
                cursor: 'pointer',
                // Ensure proper scroll snap on mobile
                scrollSnapAlign: isMobile ? 'start' : 'none'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
            }}>

                <div style={{
                    textAlign: 'left',
                    height: '40%'
                }}>
                    <h3 style={{
                        fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
                        fontWeight: '600',
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#2d2d2d',
                        marginBottom: '0.5rem'
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
                        lineHeight: '1.5',
                        fontFamily: 'Quicksand, sans-serif',
                        color: '#666',
                        margin: '0'
                    }}>
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutCard;