import { createContext, useContext, useState } from 'react';
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
    const { isModalOpen, openModal: openModalBase, closeModal } = useBookingModal();
    const [prefilledData, setPrefilledData] = useState({});

    const openModal = (initialData = {}) => {
        setPrefilledData(initialData);
        openModalBase();
    };

    const handleCloseModal = () => {
        setPrefilledData({});
        closeModal();
    };

    return (
        <BookingContext.Provider value={{ openModal }}>
            {children}
            <BookAppointmentModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                prefilledData={prefilledData}
            />
        </BookingContext.Provider>
    );
};