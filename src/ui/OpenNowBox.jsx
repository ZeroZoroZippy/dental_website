import { motion } from 'framer-motion';

const OpenNowBox = ({ windowWidth, delay = 1.0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '2rem',
                padding: windowWidth < 768 ? '0.75rem' : '1rem',
                border: '1px solid #A3A3A3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: '1',
                minHeight: windowWidth < 768 ? '50px' : '60px'
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#a9eaf7',
                    borderRadius: '50%'
                }}
            />
            <span style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: windowWidth < 768 ? '0.8rem' : '1rem',
                fontWeight: '600',
                color: '#2d2d2d'
            }}>
                Open Now
            </span>
        </motion.div>
    );
};

export default OpenNowBox;