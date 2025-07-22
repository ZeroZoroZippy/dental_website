import { motion } from 'framer-motion';
import Card from '../ui/Card';

// Placeholder profile image - replace with actual image path
import profileImage from '../assets/logo.jpg';

const AboutMe = () => {
    const stats = [
        { number: '12', label: 'Years of Experience', color: 'text-blue-500' },
        { number: '270', label: 'Completed Projects', color: 'text-blue-500' },
        { number: '50+', label: 'Clients on Worldwide', color: 'text-blue-500' }
    ];

    const socialIcons = [
        { name: 'X', icon: '𝕏', href: '#' },
        { name: 'Instagram', icon: '📷', href: '#' },
        { name: 'Behance', icon: '🎨', href: '#' },
        { name: 'Dribbble', icon: '🏀', href: '#' }
    ];

    return (
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center py-8 md:py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-48 items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div className="space-y-8 md:space-y-10 ml-0 md:ml-12 lg:ml-16 basis-full lg:basis-3/5">
                        <div className="space-y-1 md:space-y-2">
                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="special-gothic-condensed-one-regular text-5xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-medium text-gray-900 leading-none text-left whitespace-nowrap"
                            >
                                ABOUT ME
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="font-inter-light text-lg sm:text-xl md:text-base lg:text-lg text-gray-600 leading-relaxed text-left"
                            >
                                Hi, I'm Duncan — a digital designer and Framer developer
                                passionate about crafting meaningful and impactful digital
                                experiences.
                            </motion.p>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="flex gap-4 md:flex-col md:gap-2 text-left">
                                    <div className={`special-gothic-condensed-one-regular text-6xl md:text-7xl font-medium ${stat.color} leading-none`}>
                                        {stat.number}
                                    </div>
                                    <div className="text-base sm:text-lg text-gray-600 leading-tight whitespace-nowrap mt-8.5 md:mt-0">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
                        >
                            <div className="text-left">
                                <p className="text-base sm:text-lg">
                                    <span className="font-medium text-gray-800">Call Today : </span>
                                    <span className="font-light text-gray-600">+1 (555) 123-4567</span>
                                </p>
                            </div>
                            <div className="text-left">
                                <p className="text-base sm:text-lg">
                                    <span className="font-medium text-gray-800">Email : </span>
                                    <span className="font-light text-gray-600">designer@example.com</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="flex space-x-4"
                        >
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                                    aria-label={social.name}
                                >
                                    <span className="text-lg">{social.icon}</span>
                                </a>
                            ))}
                        </motion.div>

                        {/* My Story Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="flex justify-start"
                        >
                            <button className="special-gothic-condensed-one-regular relative w-full md:w-auto px-12 py-2 bg-blue-500 md:bg-transparent border-2 border-blue-500 text-white md:text-blue-500 text-2xl rounded-full font-medium overflow-hidden transition-colors duration-300 group">
                                <span className="relative z-10 transition-colors duration-300 md:group-hover:text-white">
                                    MY STORY
                                </span>
                                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 scale-y-0 origin-bottom-left transition-transform duration-300 ease-out md:group-hover:scale-x-100 md:group-hover:scale-y-100 rounded-full"></div>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Content - Profile Image using Card component */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 0, rotateX: 0 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, rotateZ: 4 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center items-center hidden md:block lg:ml-8 basis-full lg:basis-2/5"
                        style={{
                            perspective: '1000px',
                            transformStyle: 'preserve-3d',
                            filter: 'drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.45))'
                        }}
                    >
                        <Card
                            imageSrc={profileImage}
                            imageAlt="Duncan - Digital Designer and Developer"
                            enableToggle={false}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;