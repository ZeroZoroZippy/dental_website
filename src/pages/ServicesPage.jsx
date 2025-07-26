import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { MdArrowBack } from 'react-icons/md';
import { useBooking } from '../components/BookingProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import service images
import cosmetic_care from "../assets/cosmetic_care.png";
import emergency from "../assets/Emergency_Care.png";
import orthodontics from "../assets/Orthodontics.png";
import preventive_care from "../assets/preventive_care_1.png";
import restoration from "../assets/restorative_dentistry.png";
import speciality from "../assets/speciality_service.png";

const ServicesPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { openModal } = useBooking();
    const navigate = useNavigate();
    const lenisRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Get Lenis instance
    useEffect(() => {
        // Access the global Lenis instance if it exists
        const checkLenis = () => {
            if (window.lenis) {
                lenisRef.current = window.lenis;
            } else {
                // If no global instance, create a temporary one for this component
                lenisRef.current = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smooth: true,
                });
            }
        };
        
        checkLenis();
        
        // Check again after a short delay in case Lenis is still initializing
        const timeout = setTimeout(checkLenis, 100);
        
        return () => clearTimeout(timeout);
    }, []);

    // Handle hash navigation with Lenis
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            // Wait for component to render, then scroll to category using Lenis
            setTimeout(() => {
                const categoryElement = document.getElementById(hash);
                if (categoryElement) {
                    if (lenisRef.current) {
                        lenisRef.current.scrollTo(categoryElement, { 
                            offset: -100,
                            duration: 1.5
                        });
                    } else {
                        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }, 500);
        } else {
            // If no hash, scroll to top using Lenis
            setTimeout(() => {
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(0, { duration: 1.2 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    const isMobile = windowWidth < 768;

    const serviceCategories = [
        {
            id: 'preventive',
            title: 'Preventive Care',
            image: preventive_care,
            description: 'Maintain optimal oral health with our comprehensive preventive care services.',
            services: [
                { name: 'Dental Check up Consultation', price: '₹150', description: 'Comprehensive oral examination and consultation' },
                { name: 'Xray', price: '₹100', description: 'Digital X-rays for accurate diagnosis' },
                { name: 'Professional Teeth Cleaning', price: '₹600*', description: 'Deep cleaning to remove plaque and tartar' },
                { name: 'Fluoride/Varnish Treatment', price: '₹1000*', description: 'Protective fluoride application for cavity prevention' }
            ]
        },
        {
            id: 'restorative',
            title: 'Restorative Treatment',
            image: restoration,
            description: 'Restore your teeth\'s function and appearance with our advanced restorative treatments.',
            services: [
                { name: 'Tooth Filling', price: '₹500*', description: 'Tooth-colored fillings for cavities' },
                { name: 'Root Canal Treatment', price: '₹3000*', description: 'Save infected teeth with root canal therapy' },
                { name: 'Cap', price: '₹1000*', description: 'Custom crowns to restore damaged teeth' },
                { name: 'Bridge', price: '₹3000*', description: 'Replace missing teeth with fixed bridges' },
                { name: 'Complete Denture', price: '₹10000*', description: 'Full set of artificial teeth' },
                { name: 'Implants', price: '₹25000*', description: 'Permanent tooth replacement solution' }
            ]
        },
        {
            id: 'cosmetic',
            title: 'Cosmetic Treatment',
            image: cosmetic_care,
            description: 'Enhance your smile with our aesthetic dental treatments.',
            services: [
                { name: 'Dental Veneers', price: '₹9000*', description: 'Porcelain veneers for perfect smile' },
                { name: 'Teeth Whitening', price: '₹7000*', description: 'Professional whitening for brighter smile' },
                { name: 'Smile Makeover Consultation', price: '₹1000*', description: 'Complete smile transformation planning' }
            ]
        },
        {
            id: 'orthodontics',
            title: 'Orthodontic Treatment',
            image: orthodontics,
            description: 'Straighten your teeth and correct bite issues with modern orthodontic solutions.',
            services: [
                { name: 'Orthodontic Consultation', price: '₹500', description: 'Initial assessment and treatment planning' },
                { name: 'Retainers', price: '₹2000*', description: 'Maintain teeth position after treatment' },
                { name: 'Orthodontic Braces Treatment', price: '₹30000*', description: 'Traditional braces for effective teeth alignment' },
                { name: 'Transparent Aligner Treatment', price: '₹80000*', description: 'Nearly invisible aligners for adults' }
            ]
        },
        {
            id: 'surgical',
            title: 'Surgical Treatment',
            image: speciality,
            description: 'Specialized surgical treatments for complex dental conditions.',
            services: [
                { name: 'Tooth Extraction', price: '₹500*', description: 'Surgical removal of teeth' },
                { name: 'Curettage', price: '₹2000*', description: 'Gum tissue treatment' },
                { name: 'Periodontal Surgery', price: '₹8000*', description: 'Advanced gum disease treatment' }
            ]
        }
    ];

    const handleBookService = (categoryTitle, serviceName) => {
        const serviceString = `${categoryTitle} - ${serviceName}`;
        openModal({
            serviceSelected: serviceString
        });
    };

    return (
        <div id="services" className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header Section */}
            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                        style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: '500' }}
                    >
                        <MdArrowBack size={20} />
                        Back to Home
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1
                            className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4"
                            style={{ fontFamily: 'Unbounded, sans-serif' }}
                        >
                            Our Dental Services
                        </h1>
                        <p
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                            style={{ fontFamily: 'Quicksand, sans-serif' }}
                        >
                            Comprehensive dental care with transparent pricing. Choose from our wide range of
                            services and book your appointment instantly.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="space-y-16">
                    {serviceCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            id={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            {/* Category Header */}
                            <div className="flex flex-col md:flex-row gap-8 mb-8">
                                <div className="md:w-1/3">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-48 object-cover rounded-2xl"
                                    />
                                </div>
                                <div className="md:w-2/3">
                                    <h2
                                        className="text-3xl font-semibold text-gray-900 mb-4"
                                        style={{ fontFamily: 'Unbounded, sans-serif' }}
                                    >
                                        {category.title}
                                    </h2>
                                    <p
                                        className="text-gray-600 text-lg leading-relaxed"
                                        style={{ fontFamily: 'Quicksand, sans-serif' }}
                                    >
                                        {category.description}
                                    </p>
                                </div>
                            </div>

                            {/* Services List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.services.map((service, serviceIndex) => (
                                    <motion.div
                                        key={serviceIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (categoryIndex * 0.1) + (serviceIndex * 0.05) }}
                                        className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="mb-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3
                                                    className="text-lg text-gray-900 text-left flex-1"
                                                    style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: '600' }}
                                                >
                                                    {service.name}
                                                </h3>
                                                <span
                                                    className="text-2xl font-semibold text-blue-600 text-right ml-4"
                                                    style={{ fontFamily: 'Unbounded, sans-serif' }}
                                                >
                                                    {service.price}
                                                </span>
                                            </div>
                                            <p
                                                className="text-gray-600 text-sm mb-4 leading-relaxed text-left"
                                                style={{ fontFamily: 'Quicksand, sans-serif' }}
                                            >
                                                {service.description}
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleBookService(category.title, service.name)}
                                            className="w-full bg-[#a9eaf7] hover:bg-[#95e0ed] text-gray-800 py-3 px-4 rounded-3xl transition-colors duration-200"
                                            style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: '600' }}
                                        >
                                            Book Appointment
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServicesPage;