// Centralized working hours data and component
export const workingHoursData = {
  weekdays: {
    days: 'Monday - Saturday:',
    hours: '10AM - 2PM, 5PM - 9:30PM'
  },
  weekends: {
    days: 'Sunday:',
    hours: 'By Appointment Only'
  }
};

// For detailed display (like footer)
export const detailedWorkingHours = [
  { day: 'Mon - Sat', hours: '10:00 AM - 2:00 PM, 5:00 PM - 9:30 PM' },
  { day: 'Sunday', hours: 'By Appointment Only' }
];

// Simple component for inline display
const WorkingHours = ({ format = 'simple', className = '', style = {}, windowWidth }) => {
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
  const isMobile = windowWidth && windowWidth < 768;

  return (
    <div className={className} style={style}>
      <div style={{ marginBottom: isMobile ? '0.75rem' : '0.5rem' }}>
        <div style={{
          display: isMobile ? 'block' : 'flex',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center'
        }}>
          <span style={{ fontWeight: '500', display: 'block' }}>{workingHoursData.weekdays.days}</span>
          <span style={{
            fontSize: isMobile ? '0.8em' : '1em',
            display: 'block',
            marginTop: isMobile ? '0.2rem' : '0',
            lineHeight: '1.3'
          }}>{workingHoursData.weekdays.hours}</span>
        </div>
      </div>
      <div>
        <div style={{
          display: isMobile ? 'block' : 'flex',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center'
        }}>
          <span style={{ fontWeight: '500', display: 'block' }}>{workingHoursData.weekends.days}</span>
          <span style={{
            fontSize: isMobile ? '0.85em' : '1em',
            display: 'block',
            marginTop: isMobile ? '0.2rem' : '0',
            lineHeight: '1.3'
          }}>{workingHoursData.weekends.hours}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;