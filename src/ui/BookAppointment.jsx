// BookAppointmentButton.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdArrowOutward } from "react-icons/md";

const BookAppointmentButton = ({ isMobile, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                fontFamily: 'Unbounded, sans-serif',
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
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
        >
            Book Appointment
            <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <MdArrowOutward style={{ color: '#ffffff', fontSize: '1rem' }} />
            </div>
        </motion.button>
    );
};

export default BookAppointmentButton;