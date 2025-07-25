import { motion } from 'framer-motion';
import { MdCheckCircle, MdClose } from 'react-icons/md';

const AppointmentThankYou = ({ formData, selectedDateTime, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="p-6 text-center"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="flex justify-center mb-6"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <MdCheckCircle size={48} className="text-green-500" />
                </div>
            </motion.div>

            {/* Thank You Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
            >
                <h3 className="font-quicksand-bold text-2xl text-gray-800 mb-2">
                    Thank You!
                </h3>
                <p className="font-quicksand text-gray-600 mb-4">
                    Your appointment has been successfully scheduled.
                </p>
            </motion.div>

            {/* Appointment Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-[#a9eaf7] bg-opacity-30 rounded-2xl p-4 mb-6 text-left"
            >
                <h4 className="font-quicksand-semibold text-gray-800 mb-3">Appointment Details</h4>
                
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-quicksand-medium text-gray-600">Patient:</span>
                        <span className="font-quicksand text-gray-800">
                            {formData.firstName} {formData.lastName}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-quicksand-medium text-gray-600">Mobile:</span>
                        <span className="font-quicksand text-gray-800 text-right">{formData.mobileNumber}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="font-quicksand-medium text-gray-600">Service:</span>
                        <span className="font-quicksand text-gray-800 text-right">{formData.serviceSelected}</span>
                    
                    <div className="flex justify-between">
                        <span className="font-quicksand-medium text-gray-600">Date & Time:</span>
                        <span className="font-quicksand text-gray-800 text-right">{selectedDateTime.dateTimeString}</span>
                    </div>
                    
                    {formData.message && (
                        <div className="pt-2 border-t border-gray-200">
                            <span className="font-quicksand-medium text-gray-600">Message:</span>
                            <p className="font-quicksand text-gray-800 mt-1 text-right">{formData.message}</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-4 mb-6"
            >
                <h4 className="font-quicksand-semibold text-gray-800 mb-2">What's Next?</h4>
                <ul className="text-sm font-quicksand text-gray-600 space-y-1 text-left">
                    <li>• You will receive a confirmation SMS shortly</li>
                    <li>• Please arrive 15 minutes before your appointment</li>
                    <li>• Call us if you need to reschedule or cancel</li>
                </ul>
            </motion.div>

            {/* Close Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-quicksand-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
                Close
                <MdClose size={20} />
            </motion.button>
        </motion.div>
    );
};

export default AppointmentThankYou;