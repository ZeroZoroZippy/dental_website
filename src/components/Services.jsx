import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import ServiceHoverCard from '../ui/ServiceHoverCard';

const Services = () => {
    const [expandedService, setExpandedService] = useState(null);
    const [hoveredService, setHoveredService] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const services = [
        {
            id: 1,
            title: "UI/UX DESIGN",
            description: "Creating intuitive and engaging user interfaces that provide seamless user experiences across all platforms and devices.",
            points: [
                "Wireframing and prototyping",
                "User Interface design for web and mobile apps",
                "Usability testing and user feedback analysis",
                "Interaction design and micro-animations"
            ]
        },
        {
            id: 2,
            title: "GRAPHIC DESIGN",
            description: "Developing visual concepts and creative solutions that communicate ideas effectively through typography, imagery, and layout.",
            points: [
                "Logo design and visual identity",
                "Print design and marketing materials",
                "Digital illustrations and graphics",
                "Typography and layout design"
            ]
        },
        {
            id: 3,
            title: "WEB DESIGN",
            description: "Building responsive and modern websites that combine aesthetic appeal with functional performance and user-friendly navigation.",
            points: [
                "Responsive web design",
                "Landing page optimization",
                "E-commerce website design",
                "Website redesign and modernization"
            ]
        },
        {
            id: 4,
            title: "BRANDING",
            description: "Crafting comprehensive brand identities that tell your story and create lasting connections with your target audience.",
            points: [
                "Brand strategy and positioning",
                "Visual identity systems",
                "Brand guidelines and style guides",
                "Brand application across touchpoints"
            ]
        }
    ];

    const toggleService = (serviceId) => {
        setExpandedService(expandedService === serviceId ? null : serviceId);
    };

    // Custom debounce for mouse move (limits to ~60fps)
    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const handleMouseMove = useCallback(debounce((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, 16), []);

    return (
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center py-8 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-40 items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div className="space-y-10 md:space-y-10 ml-2 md:ml-12 lg:ml-16">
                        <div className="space-y-4 md:space-y-4">
                            <motion.h2
                                className="special-gothic-condensed-one-regular text-5xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-medium text-gray-900 leading-none text-left whitespace-nowrap"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                WHAT I CAN DO FOR YOU
                            </motion.h2>

                            <motion.p
                                className="font-inter-light text-lg sm:text-xl md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md text-left"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.
                            </motion.p>
                        </div>

                        {/* Services List Container with unified hover detection */}
                        <div
                            className="space-y-0"
                            onMouseLeave={() => setHoveredService(null)}
                            onMouseMove={handleMouseMove}
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    className="border-b border-gray-200 pb-4 mb-4"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                >
                                    <button
                                        onClick={() => toggleService(service.id)}
                                        className="w-full flex items-center justify-between text-left group py-2"
                                    >
                                        <span
                                            className="special-gothic-condensed-one-regular text-3xl sm:text-4xl md:text-4xl font-semibold text-gray-600 group-hover:text-[#5E67E6] transition-all duration-300"
                                            style={{
                                                transform: 'perspective(5000px) rotateX(20deg)',
                                                transformStyle: 'preserve-3d'
                                            }}
                                        >
                                            {service.id}. {service.title}
                                        </span>
                                        <motion.svg
                                            className="w-6 h-6 text-gray-400 group-hover:text-[#5E67E6] transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{ rotate: expandedService === service.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedService === service.id ? "auto" : 0,
                                            opacity: expandedService === service.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 space-y-3">
                                            {service.points.map((point, pointIndex) => (
                                                <div key={pointIndex} className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5E67E6]/10 flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-[#5E67E6]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Card */}
                    <motion.div
                        className="relative flex justify-center items-center hidden md:block lg:ml-8"
                        initial={{ opacity: 0, scale: 0.9, rotateY: 0, rotateX: 0 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, rotateZ: -4 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            perspective: '1000px',
                            transformStyle: 'preserve-3d',
                            filter: 'drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.45))'
                        }}
                    >
                        <Card
                            imageSrc="/src/assets/bg_6.png"
                            imageAlt="Designer workspace with computer setup"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Service Hover Card */}
            <ServiceHoverCard
                hoveredService={hoveredService}
                mousePosition={mousePosition}
            />
        </section>
    );
};

export default Services;