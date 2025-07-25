import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TbDental } from "react-icons/tb";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { detailedWorkingHours } from '../ui/WorkingHours';

const Footer = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth < 768;

    const quickLinks = [
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
    ];

    const services = [
        'Preventive Care',
        'Cosmetic Dentistry',
        'Orthodontics',
        'Emergency Care',
        'Restorative Dentistry',
        'Specialty Services'
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: '#', label: 'Facebook' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
        { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer
            style={{
                backgroundColor: '#2d2d2d',
                marginTop: isMobile ? '0.5rem' : '2rem'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: isMobile ? '3rem 1rem 2rem' : '4rem 2rem 2rem',
                }}
            >
                {/* Main Footer Content */}
                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'} mb-8`}>

                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className={isMobile ? 'text-center' : 'text-left'}
                    >
                        <div className="flex items-center mb-4" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <div className="w-12 h-12 rounded-full bg-[#1FC8EA]/20 flex items-center justify-center mr-3">
                                <TbDental className="w-7 h-7 text-[#1FC8EA]" />
                            </div>
                            <h3 className="text-white text-xl font-unbounded-semibold">DentalCare</h3>
                        </div>
                        <p className="text-gray-300 font-quicksand-light text-sm leading-relaxed mb-4">
                            Providing exceptional dental care with a gentle touch. Your smile is our priority, and your comfort is our commitment.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-3" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, backgroundColor: '#1FC8EA' }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white hover:text-white"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={isMobile ? 'text-center' : 'text-left'}
                    >
                        <h4 className="text-white text-lg font-quicksand-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5, color: '#1FC8EA' }}
                                        transition={{ duration: 0.2 }}
                                        className="text-gray-300 hover:text-[#1FC8EA] font-quicksand-light text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={isMobile ? 'text-center' : 'text-left'}
                    >
                        <h4 className="text-white text-lg font-quicksand-semibold mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={service}>
                                    <motion.span
                                        whileHover={{ x: 5, color: '#1FC8EA' }}
                                        transition={{ duration: 0.2 }}
                                        className="text-gray-300 hover:text-[#1FC8EA] font-quicksand-light text-sm cursor-pointer transition-colors duration-200"
                                    >
                                        {service}
                                    </motion.span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className={isMobile ? 'text-center' : 'text-left'}
                    >
                        <h4 className="text-white text-lg font-quicksand-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-center" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <FaPhone className="w-4 h-4 text-[#1FC8EA] mr-3 flex-shrink-0" />
                                <span className="text-gray-300 font-quicksand-light text-sm">(555) 123-4567</span>
                            </div>
                            <div className="flex items-center" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <FaEnvelope className="w-4 h-4 text-[#1FC8EA] mr-3 flex-shrink-0" />
                                <span className="text-gray-300 font-quicksand-light text-sm">[email]@dentalcare.com</span>
                            </div>
                            <div className="flex items-start" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <FaMapMarkerAlt className="w-4 h-4 text-[#1FC8EA] mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-quicksand-light text-sm">
                                    123 Dental Street<br />
                                    Healthcare City, HC 12345
                                </span>
                            </div>
                            <div className="flex items-start" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <FaClock className="w-4 h-4 text-[#1FC8EA] mr-3 flex-shrink-0 mt-0.5" />
                                <div className="text-gray-300 font-quicksand-light text-sm">
                                    {detailedWorkingHours.map((schedule, index) => (
                                        <div key={index}>{schedule.day}: {schedule.hours}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-600 pt-6"
                >
                    <div className={`flex ${isMobile ? 'flex-col space-y-4 text-center' : 'flex-row justify-between items-center'}`}>
                        <p className="text-gray-400 font-quicksand-light text-sm">
                            © 2025 DentalCare. All rights reserved.
                        </p>
                        <div className={`flex ${isMobile ? 'justify-center' : ''} space-x-6`}>
                            <motion.a
                                href="#"
                                whileHover={{ color: '#1FC8EA' }}
                                className="text-gray-400 hover:text-[#1FC8EA] font-quicksand-light text-sm transition-colors duration-200"
                            >
                                Privacy Policy
                            </motion.a>
                            <motion.a
                                href="#"
                                whileHover={{ color: '#1FC8EA' }}
                                className="text-gray-400 hover:text-[#1FC8EA] font-quicksand-light text-sm transition-colors duration-200"
                            >
                                Terms of Service
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

                {/* Made by Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-4 pt-4 border-t border-gray-700"
                >
                    <motion.p
                        whileHover={{ scale: 1.05, color: '#1FC8EA' }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-500 font-quicksand-light text-md cursor-default"
                    >
                        Made with ✨ by <span className="text-[#1FC8EA] font-quicksand-medium">Yuvaan V.</span>
                    </motion.p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;