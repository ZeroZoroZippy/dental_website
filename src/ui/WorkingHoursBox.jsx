import { motion } from 'framer-motion';

const WorkingHoursBox = ({ windowWidth, delay = 0.8 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                backgroundColor: '#f4f5f7',
                borderRadius: '2rem',
                padding: windowWidth < 768 ? '1.25rem' : '1.5rem',
                paddingBottom: windowWidth < 768 ? '1.5rem' : '1.75rem',
                flex: '1',
                border: '1px solid #f0f0f0',
                height: windowWidth < 768 ? '100%' : 'auto',
                minHeight: windowWidth < 768 ? 'auto' : '120px'
            }}
        >
            <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                textAlign: 'left',
                fontSize: windowWidth < 768 ? '1rem' : '1.15rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#333'
            }}>
                Working Hours
            </h3>
            <div style={{ 
                fontFamily: 'Quicksand, sans-serif', 
                fontSize: windowWidth < 768 ? '0.85rem' : '0.8rem', 
                textAlign: 'left', 
                color: '#666' 
            }}>
                <div style={{ marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '500' }}>Monday - Friday</span>
                    <span style={{ float: 'right' }}>9AM - 9PM</span>
                </div>
                <div>
                    <span style={{ fontWeight: '500' }}>Saturday, Sunday</span>
                    <span style={{ float: 'right' }}>10AM - 6PM</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkingHoursBox;