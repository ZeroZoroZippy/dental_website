import { motion } from 'framer-motion';

const WhyChooseUsBox = ({ windowWidth }) => {
    return (
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
                left: windowWidth < 768 ? '1rem' : '1.5rem',
                zIndex: 2
            }}
        >
            <span style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
                fontWeight: '600',
                color: '#2d2d2d'
            }}>
                Why Choose Us
            </span>
        </motion.div>
    );
};

export default WhyChooseUsBox;