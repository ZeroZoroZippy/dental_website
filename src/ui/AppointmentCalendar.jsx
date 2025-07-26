import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const AppointmentCalendar = ({ onDateTimeSelect, onBack, formData }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Generate available time slots with real-time logic
    const getAvailableTimeSlots = (selectedDate) => {
        // Monday to Saturday: 10am to 2pm, 5:00pm to 9:30pm
        const allTimeSlots = [
            '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
            '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '09:30 PM'
        ];

        // If no date is selected, return all slots
        if (!selectedDate) return allTimeSlots;

        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDateOnly = new Date(selectedDate);
        selectedDateOnly.setHours(0, 0, 0, 0);

        // Check if selected date is Sunday (0 = Sunday)
        if (selectedDateOnly.getDay() === 0) {
            return []; // No regular slots for Sunday - appointment only
        }

        // If selected date is not today, return all slots
        if (selectedDateOnly.getTime() !== today.getTime()) {
            return allTimeSlots;
        }

        // If selected date is today, filter out past hours
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        return allTimeSlots.filter(timeSlot => {
            const [time, period] = timeSlot.split(' ');
            const [hours, minutes] = time.split(':').map(Number);

            let hour24 = hours;
            if (period === 'PM' && hours !== 12) {
                hour24 += 12;
            } else if (period === 'AM' && hours === 12) {
                hour24 = 0;
            }

            // Add 1 hour buffer for booking (can't book within next hour)
            const slotTime = hour24 * 60 + minutes;
            const currentTime = currentHour * 60 + currentMinutes + 60; // +60 for 1 hour buffer

            return slotTime > currentTime;
        });
    };

    const timeSlots = getAvailableTimeSlots(selectedDate);

    // Get calendar days for current month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isAvailable = currentDate >= today;

            days.push({
                day,
                date: currentDate,
                isAvailable
            });
        }

        return days;
    };

    const days = getDaysInMonth(currentMonth);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleDateSelect = (dayObj) => {
        if (dayObj && dayObj.isAvailable) {
            setSelectedDate(dayObj.date);
            setSelectedTime(null); // Clear selected time when date changes
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleConfirmAppointment = () => {
        if (selectedDate && selectedTime) {
            const dateTimeString = `${selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} at ${selectedTime}`;

            onDateTimeSelect({
                date: selectedDate,
                time: selectedTime,
                dateTimeString
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
        >
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-6 text-left">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-quicksand-medium text-left"
                >
                    <MdArrowBack size={20} />
                    Back to Form
                </button>



                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <MdChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <h3 className="font-quicksand-semibold text-lg text-gray-800">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <MdChevronRight size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="mb-4">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-quicksand-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {days.map((dayObj, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateSelect(dayObj)}
                                disabled={!dayObj || !dayObj.isAvailable}
                                className={`
                                    h-10 w-full flex items-center justify-center text-sm font-quicksand rounded-lg transition-colors
                                    ${!dayObj ? 'invisible' : ''}
                                    ${dayObj && !dayObj.isAvailable ? 'text-gray-300 cursor-not-allowed' : ''}
                                    ${dayObj && dayObj.isAvailable && selectedDate?.getTime() === dayObj.date?.getTime()
                                        ? 'bg-[#a9eaf7] text-gray-800 font-semibold'
                                        : dayObj && dayObj.isAvailable
                                            ? 'hover:bg-gray-100 text-gray-700'
                                            : ''
                                    }
                                `}
                            >
                                {dayObj?.day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4 className="font-quicksand-semibold text-gray-800 mb-2 text-left text-sm">
                            Available Times for {selectedDate.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h4>

                        {/* * FIXED: Separated scroll and grid containers.
                          * Outer div handles the fixed height and scrolling.
                          * Inner div handles the grid layout, which can now grow freely and overflow the parent.
                        */}
                        {selectedDate.getDay() === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-gray-600 font-quicksand text-sm mb-3">
                                    Sunday appointments are available by special arrangement only.
                                </p>
                                <p className="text-gray-500 font-quicksand text-xs">
                                    Please call us at <span className="font-semibold">+91 9321765587</span> to schedule your Sunday appointment.
                                </p>
                            </div>
                        ) : timeSlots.length > 0 ? (
                            <div className="max-h-[120px] overflow-y-auto pr-2">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`
                                            py-1.5 px-2 rounded-lg text-xs font-quicksand transition-colors text-center
                                            ${selectedTime === time
                                                    ? 'bg-[#a9eaf7] text-gray-800 font-semibold'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                }
                                        `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-gray-500 font-quicksand text-sm">
                                    No available time slots for this date. Please select another date.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Sticky Footer for Confirm Button */}
            <div className="p-4 pt-3 border-t border-gray-100">
                <motion.button
                    onClick={handleConfirmAppointment}
                    disabled={!selectedDate || !selectedTime}
                    whileHover={{ scale: (!selectedDate || !selectedTime) ? 1 : 1.02 }}
                    whileTap={{ scale: (!selectedDate || !selectedTime) ? 1 : 0.98 }}
                    className="w-full bg-[#a9eaf7] text-gray-800 font-quicksand-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    Confirm Appointment
                    <MdArrowForward size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default AppointmentCalendar;