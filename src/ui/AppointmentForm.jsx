import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';

const AppointmentForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        mobileNumber: initialData?.mobileNumber || '',
        serviceSelected: initialData?.serviceSelected || '',
        message: initialData?.message || ''
    });

    const [errors, setErrors] = useState({});

    const services = [
        'Preventive Care',
        'Restorative Dentistry',
        'Cosmetic Care',
        'Orthodontics',
        'Emergency Care',
        'Specialty Services'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
            newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.serviceSelected) {
            newErrors.serviceSelected = 'Please select a service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="p-6 space-y-4 text-left"
        >
            {/* First Name and Last Name on same line */}
            <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-quicksand-medium text-gray-700 mb-2 text-left">
                        First Name *
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.firstName ? 'border-red-300' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent font-quicksand text-left`}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1 font-quicksand text-left">{errors.firstName}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-quicksand-medium text-gray-700 mb-2 text-left">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.lastName ? 'border-red-300' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent font-quicksand text-left`}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1 font-quicksand text-left">{errors.lastName}</p>
                    )}
                </div>
            </div>

            {/* Mobile Number */}
            <div>
                <label className="block text-sm font-quicksand-medium text-gray-700 mb-2 text-left">
                    Mobile Number *
                </label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border ${
                        errors.mobileNumber ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent font-quicksand text-left`}
                    placeholder="Enter your mobile number"
                />
                {errors.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1 font-quicksand text-left">{errors.mobileNumber}</p>
                )}
            </div>

            {/* Service Selected */}
            <div>
                <label className="block text-sm font-quicksand-medium text-gray-700 mb-2 text-left">
                    Service Selected *
                </label>
                <select
                    name="serviceSelected"
                    value={formData.serviceSelected}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border ${
                        errors.serviceSelected ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent font-quicksand bg-white text-left`}
                >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>
                {errors.serviceSelected && (
                    <p className="text-red-500 text-sm mt-1 font-quicksand text-left">{errors.serviceSelected}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-quicksand-medium text-gray-700 mb-2 text-left">
                    Any Messages (Optional)
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent font-quicksand resize-none text-left"
                    placeholder="Any specific requirements or messages..."
                />
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#a9eaf7] hover:bg-[#95e0ed] text-gray-800 font-quicksand-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 mt-6"
            >
                Select Date & Time
                <MdArrowForward size={20} />
            </motion.button>
        </motion.form>
    );
};

export default AppointmentForm;