# Book Appointment Modal System

A comprehensive appointment booking system with a multi-step modal interface built with React, Framer Motion, and Tailwind CSS.

## Components Overview

### 1. BookAppointmentModal
The main modal component that orchestrates the booking flow with three steps:
- **Form Step**: Collects user information
- **Calendar Step**: Date and time selection
- **Thank You Step**: Confirmation message

### 2. AppointmentForm
Handles user information collection:
- First Name (required)
- Last Name (required)
- Mobile Number (required, validated)
- Service Selection (required, dropdown)
- Optional Message (textarea)

### 3. AppointmentCalendar
Interactive calendar with time slot selection:
- Month navigation
- Date selection (future dates only)
- Available time slots
- Appointment confirmation

### 4. AppointmentThankYou
Confirmation screen showing:
- Success message
- Complete appointment details
- Next steps information
- Close button

## Usage

### 1. Wrap your app with BookingProvider

```jsx
import { BookingProvider } from './components/BookingProvider';

function App() {
  return (
    <BookingProvider>
      <div className="App">
        {/* Your app content */}
      </div>
    </BookingProvider>
  );
}
```

### 2. Use the booking hook in components

```jsx
import { useBooking } from './components/BookingProvider';

const MyComponent = () => {
  const { openModal } = useBooking();

  return (
    <button onClick={openModal}>
      Book Appointment
    </button>
  );
};
```

### 3. Use existing booking components

```jsx
import { useBooking } from './components/BookingProvider';
import BookAppointmentButton from './ui/BookAppointment';
import BookAppointmentBox from './ui/BookAppointmentBox';

const MyPage = () => {
  const { openModal } = useBooking();

  return (
    <div>
      {/* Button style */}
      <BookAppointmentButton 
        isMobile={false} 
        onClick={openModal} 
      />

      {/* Box style */}
      <BookAppointmentBox 
        windowWidth={1200} 
        onClick={openModal} 
      />
    </div>
  );
};
```

## Features

### Form Validation
- Required field validation
- Mobile number format validation
- Real-time error display
- Error clearing on input

### Calendar Features
- Month navigation
- Disabled past dates
- Available time slots
- Visual feedback for selections
- Responsive grid layout

### Animations
- Smooth transitions between steps
- Framer Motion animations
- Hover and tap effects
- Loading states

### Accessibility
- Keyboard navigation
- Screen reader friendly
- Focus management
- ARIA labels

## Customization

### Styling
The components use Tailwind CSS classes and can be customized by:
- Modifying the color scheme (currently uses `#a9eaf7` accent color)
- Updating font families (currently uses Quicksand)
- Adjusting spacing and sizing
- Customizing animations

### Services List
Update the services array in `AppointmentForm.jsx`:

```jsx
const services = [
    'Your Service 1',
    'Your Service 2',
    // Add more services
];
```

### Time Slots
Modify the time slots in `AppointmentCalendar.jsx`:

```jsx
const timeSlots = [
    '09:00 AM', '09:30 AM',
    // Add your available times
];
```

### Validation Rules
Customize validation in `AppointmentForm.jsx`:

```jsx
const validateForm = () => {
    // Add your custom validation logic
};
```

## Dependencies

- React 19+
- Framer Motion
- React Icons
- Tailwind CSS

## File Structure

```
src/
├── components/
│   ├── BookAppointmentModal.jsx    # Main modal component
│   ├── BookingProvider.jsx         # Context provider
│   └── ExampleUsage.jsx           # Usage examples
├── ui/
│   ├── AppointmentForm.jsx        # Form step component
│   ├── AppointmentCalendar.jsx    # Calendar step component
│   ├── AppointmentThankYou.jsx    # Thank you step component
│   ├── BookAppointment.jsx        # Button component (updated)
│   └── BookAppointmentBox.jsx     # Box component (updated)
└── hooks/
    └── useBookingModal.js         # Modal state hook
```

## Integration Notes

1. The modal automatically handles state management between steps
2. Form data persists when navigating between form and calendar
3. The system is fully responsive and works on mobile devices
4. All animations are optimized for performance
5. The modal can be closed at any time and will reset state

## Future Enhancements

- Email notifications
- SMS confirmations
- Calendar integration (Google Calendar, Outlook)
- Recurring appointments
- Payment integration
- Admin dashboard for managing appointments
- Cancellation and rescheduling functionality