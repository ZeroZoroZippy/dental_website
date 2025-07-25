// Example of how to use the booking components in your pages
import { useBooking } from './BookingProvider';
import BookAppointmentButton from '../ui/BookAppointment';
import BookAppointmentBox from '../ui/BookAppointmentBox';

const ExampleUsage = () => {
    const { openModal } = useBooking();

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-quicksand-bold">Book Appointment Examples</h1>
            
            {/* Using the button component */}
            <div>
                <h2 className="text-lg font-quicksand-semibold mb-4">Button Style</h2>
                <BookAppointmentButton 
                    isMobile={false} 
                    onClick={openModal} 
                />
            </div>

            {/* Using the box component */}
            <div>
                <h2 className="text-lg font-quicksand-semibold mb-4">Box Style</h2>
                <div style={{ maxWidth: '300px' }}>
                    <BookAppointmentBox 
                        windowWidth={1200} 
                        onClick={openModal} 
                    />
                </div>
            </div>

            {/* Custom button example */}
            <div>
                <h2 className="text-lg font-quicksand-semibold mb-4">Custom Button</h2>
                <button 
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-quicksand-medium transition-colors"
                >
                    Schedule Your Visit
                </button>
            </div>
        </div>
    );
};

export default ExampleUsage;