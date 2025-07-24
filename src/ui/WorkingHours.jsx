// Centralized working hours data and component
export const workingHoursData = {
  weekdays: {
    days: 'Monday - Friday',
    hours: '9AM - 9PM'
  },
  weekends: {
    days: 'Saturday, Sunday', 
    hours: '10AM - 6PM'
  }
};

// For detailed display (like footer)
export const detailedWorkingHours = [
  { day: 'Mon - Fri', hours: '9:00 AM - 9:00 PM' },
  { day: 'Sat - Sun', hours: '10:00 AM - 6:00 PM' }
];

// Simple component for inline display
const WorkingHours = ({ format = 'simple', className = '', style = {} }) => {
  if (format === 'detailed') {
    return (
      <div className={className} style={style}>
        {detailedWorkingHours.map((schedule, index) => (
          <div key={index}>
            {schedule.day}: {schedule.hours}
          </div>
        ))}
      </div>
    );
  }

  // Simple format (default)
  return (
    <div className={className} style={style}>
      <div style={{ marginBottom: '0.25rem' }}>
        <span style={{ fontWeight: '500' }}>{workingHoursData.weekdays.days}</span>
        <span style={{ float: 'right' }}>{workingHoursData.weekdays.hours}</span>
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>{workingHoursData.weekends.days}</span>
        <span style={{ float: 'right' }}>{workingHoursData.weekends.hours}</span>
      </div>
    </div>
  );
};

export default WorkingHours;