import { useState, useEffect } from 'react';
import BookAppointmentBox from './BookAppointmentBox';
import WorkingHoursBox from './WorkingHoursBox';
import OpenNowBox from './OpenNowBox';

const InfoBoxContainer = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: windowWidth < 768 ? 'column' : 'row',
            gap: windowWidth < 768 ? '1rem' : '1rem',
            marginTop: '2rem',
            width: '100%',
            maxWidth: windowWidth < 768 ? '100%' : '100%'
        }}>
            {/* Mobile: Book Appointment first */}
            {windowWidth < 768 && (
                <div style={{
                    flex: '1',
                    minWidth: '100%'
                }}>
                    <BookAppointmentBox windowWidth={windowWidth} delay={0.6} />
                </div>
            )}

            {/* Left side container for Working Hours and Open Now */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                flex: windowWidth < 768 ? '1' : '1',
                minWidth: windowWidth < 768 ? '100%' : '200px'
            }}>
                <WorkingHoursBox windowWidth={windowWidth} delay={windowWidth < 768 ? 0.8 : 0.8} />
                <OpenNowBox windowWidth={windowWidth} delay={windowWidth < 768 ? 1.0 : 1.0} />
            </div>

            {/* Desktop: Book Appointment on right side */}
            {windowWidth >= 768 && (
                <div style={{
                    flex: '1.5',
                    minWidth: '250px'
                }}>
                    <BookAppointmentBox windowWidth={windowWidth} delay={0.9} />
                </div>
            )}
        </div>
    );
};

export default InfoBoxContainer;