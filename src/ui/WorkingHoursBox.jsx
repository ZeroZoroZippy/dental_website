import { motion } from 'framer-motion';
import WorkingHours from './WorkingHours';

const WorkingHoursBox = ({ windowWidth, delay = 0.8 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                backgroundColor: '#f4f5f7',
                borderRadius: '2rem',
                padding: windowWidth < 768 ? '1.5rem' : '1.75rem',
                paddingBottom: windowWidth < 768 ? '1.75rem' : '2rem',
                flex: '1',
                border: '1px solid #f0f0f0',
                height: windowWidth < 768 ? '100%' : 'auto',
                minHeight: windowWidth < 768 ? '180px' : '180px'
            }}
        >
            <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                textAlign: 'left',
                fontSize: windowWidth < 768 ? '1.1rem' : '1.2rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#333'
            }}>
                Working Hours
            </h3>
            <WorkingHours 
                windowWidth={windowWidth}
                style={{ 
                    fontFamily: 'Quicksand, sans-serif', 
                    fontSize: windowWidth < 768 ? '0.9rem' : '0.85rem', 
                    textAlign: 'left', 
                    color: '#666' 
                }}
            />
        </motion.div>
    );
};

export default WorkingHoursBox;