import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdArrowBack, MdArrowForward } from "react-icons/md";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryCard from '../ui/GalleryCard';
import { getGalleryItems } from '../utils/galleryStorage';

const GalleryPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isMobile = windowWidth < 768;

    // Load gallery items from storage
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const items = await getGalleryItems();
                setGalleryItems(items.sort((a, b) => a.order - b.order));
            } catch (error) {
                console.error('Error loading gallery items:', error);
                setGalleryItems([]);
            }
        };

        loadItems();

        // Listen for storage changes (when CMS updates items)
        const handleStorageChange = () => {
            loadItems();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for custom events from the same tab
        window.addEventListener('galleryUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('galleryUpdated', handleStorageChange);
        };
    }, []);

    const categories = ['All', 'Facility', 'Treatment', 'Cosmetic', 'Emergency'];

    const filteredItems = selectedCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    const navigateImage = (direction) => {
        const newIndex = direction === 'next'
            ? (currentImageIndex + 1) % filteredItems.length
            : (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;

        setCurrentImageIndex(newIndex);
        setSelectedImage(filteredItems[newIndex]);
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedImage) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') navigateImage('prev');
                if (e.key === 'ArrowRight') navigateImage('next');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, currentImageIndex]);

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    paddingTop: '8rem',
                    paddingBottom: '4rem',
                    backgroundColor: '#f4f5f7'
                }}
            >
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: isMobile ? '0 1rem' : '0 2rem',
                    textAlign: 'center'
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{
                            fontSize: isMobile ? '2.5rem' : '4rem',
                            fontWeight: '600',
                            fontFamily: 'Unbounded, sans-serif',
                            lineHeight: '1.1',
                            marginBottom: '1rem',
                            color: '#2d2d2d'
                        }}
                    >
                        Our Gallery
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{
                            fontSize: isMobile ? '1.1rem' : '1.25rem',
                            fontFamily: 'Quicksand, sans-serif',
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}
                    >
                        Explore our modern facility and see examples of our quality dental work.
                        From routine care to complex procedures, we deliver exceptional results.
                    </motion.p>
                </div>
            </motion.div>

            {/* Main Gallery Content */}
            <div style={{
                backgroundColor: '#ffffff',
                margin: isMobile ? '0.5rem' : '2rem',
                borderRadius: '2rem',
                padding: isMobile ? '2rem 1rem' : '3rem 2rem',
                maxWidth: '1400px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '3rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                backgroundColor: selectedCategory === category ? '#2d2d2d' : 'transparent',
                                color: selectedCategory === category ? '#ffffff' : '#2d2d2d',
                                border: `2px solid ${selectedCategory === category ? '#2d2d2d' : '#e0e0e0'}`,
                                borderRadius: '2rem',
                                padding: '0.75rem 1.5rem',
                                fontFamily: 'Quicksand, sans-serif',
                                fontWeight: '500',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile
                                ? 'repeat(auto-fit, minmax(280px, 1fr))'
                                : 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: isMobile ? '1rem' : '1.5rem',
                            marginBottom: '2rem'
                        }}
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={() => openLightbox(item, index)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    cursor: 'pointer',
                                    height: 'fit-content'
                                }}
                            >
                                <GalleryCard
                                    windowWidth={windowWidth}
                                    category={item.category}
                                    description={item.description}
                                    image={item.image}
                                    delay={index * 0.1}
                                    size={index === 0 ? "large" : index % 3 === 1 ? "medium" : "small"}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            zIndex: 999999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={closeLightbox}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                zIndex: 1000001
                            }}
                        >
                            <MdClose style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                        </motion.button>

                        {/* Navigation Buttons */}
                        {filteredItems.length > 1 && (
                            <>
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('prev');
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: '2rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '3rem',
                                        height: '3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        zIndex: 1000001
                                    }}
                                >
                                    <MdArrowBack style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                                </motion.button>

                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('next');
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '2rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '3rem',
                                        height: '3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        zIndex: 1000001
                                    }}
                                >
                                    <MdArrowForward style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                                </motion.button>
                            </>
                        )}

                        {/* Image Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '80vh',
                                    objectFit: 'contain',
                                    borderRadius: '1rem'
                                }}
                            />

                            {/* Image Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    marginTop: '1rem',
                                    textAlign: 'center',
                                    color: '#ffffff'
                                }}
                            >
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontFamily: 'Quicksand, sans-serif',
                                    fontWeight: '600',
                                    margin: '0 0 0.5rem 0'
                                }}>
                                    {selectedImage.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    fontFamily: 'Quicksand, sans-serif',
                                    opacity: 0.8,
                                    margin: 0
                                }}>
                                    {selectedImage.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default GalleryPage;