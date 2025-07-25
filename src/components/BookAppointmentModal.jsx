import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import AppointmentForm from '../ui/AppointmentForm';
import AppointmentCalendar from '../ui/AppointmentCalendar';
import AppointmentThankYou from '../ui/AppointmentThankYou';

const BookAppointmentModal = ({ isOpen, onClose, prefilledData = {} }) => {
    const [currentStep, setCurrentStep] = useState('form'); // 'form', 'calendar', 'thankyou'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        serviceSelected: '',
        message: ''
    });
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    // Update form data when prefilled data changes
    useEffect(() => {
        if (prefilledData && Object.keys(prefilledData).length > 0) {
            setFormData(prev => ({
                ...prev,
                ...prefilledData
            }));
        }
    }, [prefilledData]);

    const handleFormSubmit = (data) => {
        setFormData(data);
        setCurrentStep('calendar');
    };

    const handleDateTimeSelect = (dateTime) => {
        setSelectedDateTime(dateTime);
        setCurrentStep('thankyou');
    };

    const handleClose = () => {
        setCurrentStep('form');
        setFormData({
            firstName: '',
            lastName: '',
            mobileNumber: '',
            serviceSelected: '',
            message: ''
        });
        setSelectedDateTime(null);
        onClose();
    };

    const handleBackToForm = () => {
        setCurrentStep('form');
    };

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            // Store the original values
            const originalOverflow = document.body.style.overflow;
            const originalPosition = document.body.style.position;
            const originalWidth = document.body.style.width;
            const originalHeight = document.body.style.height;

            // Add CSS class and inline styles for maximum compatibility
            document.body.classList.add('modal-open');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '120%';
            document.body.style.top = '0';
            document.body.style.left = '0';

            // Also prevent scroll on html element
            document.documentElement.style.overflow = 'hidden';

            // Cleanup function to restore scrolling when modal closes
            return () => {
                document.body.classList.remove('modal-open');
                document.body.style.overflow = originalOverflow;
                document.body.style.position = originalPosition;
                document.body.style.width = originalWidth;
                document.body.style.height = originalHeight;
                document.body.style.top = '';
                document.body.style.left = '';
                document.documentElement.style.overflow = '';
            };
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 modal-backdrop"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden relative modal-content border border-[#2d2d2d]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="font-quicksand-semibold text-xl text-gray-800">
                                    {currentStep === 'form' && 'Book Appointment'}
                                    {currentStep === 'calendar' && 'Select Date & Time'}
                                    {currentStep === 'thankyou' && 'Appointment Confirmed'}
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <IoClose size={24} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto max-h-[calc(95vh-100px)] md:max-h-[calc(90vh-100px)] pb-4">
                                {currentStep === 'form' && (
                                    <AppointmentForm
                                        onSubmit={handleFormSubmit}
                                        initialData={formData}
                                    />
                                )}

                                {currentStep === 'calendar' && (
                                    <AppointmentCalendar
                                        onDateTimeSelect={handleDateTimeSelect}
                                        onBack={handleBackToForm}
                                        formData={formData}
                                    />
                                )}

                                {currentStep === 'thankyou' && (
                                    <AppointmentThankYou
                                        formData={formData}
                                        selectedDateTime={selectedDateTime}
                                        onClose={handleClose}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookAppointmentModal;