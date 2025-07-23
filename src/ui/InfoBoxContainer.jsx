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
            {/* Mobile Bento Layout */}
            {windowWidth < 768 ? (
                <>
                    {/* Top: Book Appointment (full width) */}
                    <div style={{
                        width: '100%'
                    }}>
                        <BookAppointmentBox windowWidth={windowWidth} delay={0.6} />
                    </div>

                    {/* Bottom: Working Hours (left) + Open Now (right) */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        width: '100%',
                        height: '130px' // Fixed height to ensure both boxes are same height
                    }}>
                        {/* Working Hours - wider due to more content */}
                        <div style={{
                            flex: '2',
                            minWidth: '0' // Allow flex shrinking
                        }}>
                            <WorkingHoursBox windowWidth={windowWidth} delay={0.8} />
                        </div>

                        {/* Open Now - narrower, content-based width */}
                        <div style={{
                            flex: '1',
                            minWidth: '0' // Allow flex shrinking
                        }}>
                            <OpenNowBox windowWidth={windowWidth} delay={1.0} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Desktop Layout - Left side container for Working Hours and Open Now */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        flex: '1',
                        minWidth: '200px'
                    }}>
                        <WorkingHoursBox windowWidth={windowWidth} delay={0.8} />
                        <OpenNowBox windowWidth={windowWidth} delay={1.0} />
                    </div>

                    {/* Desktop: Book Appointment on right side */}
                    <div style={{
                        flex: '1.5',
                        minWidth: '250px'
                    }}>
                        <BookAppointmentBox windowWidth={windowWidth} delay={0.9} />
                    </div>
                </>
            )}
        </div>
    );
};

export default InfoBoxContainer;