import { motion } from 'framer-motion';

const BookAppointmentBox = ({ windowWidth, delay = 0.9 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                backgroundColor: '#a9eaf7',
                borderRadius: windowWidth < 768 ? '2.5rem' : '3rem', // Increased from 1.5rem to 2.5rem
                padding: windowWidth < 768 ? '1.5rem' : '1.75rem',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: windowWidth < 768 ? '100px' : '200px',
                flex: windowWidth < 768 ? '1' : '1.5', // 1.5x width on desktop
            }}
        >
            <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: windowWidth < 768 ? '1.1rem' : '1.25rem',
                fontWeight: '600',
                color: '#2d2d2d',
                textAlign: 'center',
                margin: 0
            }}>
                Book an Appointment
            </h3>
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2rem',
                height: '2rem',
                backgroundColor: 'white',
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{ fontSize: '1rem', color: '#2d2d2d' }}>↗</span>
            </div>
        </motion.div>
    );
};

export default BookAppointmentBox;
