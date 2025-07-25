import { createContext, useContext } from 'react';
import { useBookingModal } from '../hooks/useBookingModal';
import BookAppointmentModal from './BookAppointmentModal';

const BookingContext = createContext();

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};

export const BookingProvider = ({ children }) => {
    const { isModalOpen, openModal, closeModal } = useBookingModal();

    return (
        <BookingContext.Provider value={{ openModal }}>
            {children}
            <BookAppointmentModal isOpen={isModalOpen} onClose={closeModal} />
        </BookingContext.Provider>
    );
};