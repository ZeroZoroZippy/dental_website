import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'framer-motion';

// Import service-specific images
import uiuxImage from '../assets/bg_1.jpeg';
import graphicImage from '../assets/bg_2.jpeg';
import webImage from '../assets/bg_3.jpeg';
import brandingImage from '../assets/bg_4.jpeg';

const ServiceHoverCard = ({ hoveredService, mousePosition }) => {
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();
    const springConfig = { stiffness: 300, damping: 30 }; // Tunable for responsiveness

    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    // Map service IDs to their respective images
    const serviceImages = {
        1: { src: uiuxImage, alt: "UI/UX Design workspace" },
        2: { src: graphicImage, alt: "Graphic Design tools" },
        3: { src: webImage, alt: "Web Development setup" },
        4: { src: brandingImage, alt: "Branding materials" }
    };

    useEffect(() => {
        if (mousePosition) {
            // Calculate raw position with offsets
            let newX = mousePosition.x - 40;
            let newY = mousePosition.y - 60;

            // Clamp to viewport boundaries (adjust card dimensions if needed)
            const cardWidth = 160; // Scaled w-80 (320/2)
            const cardHeight = 96; // Scaled h-48 (192/2)
            newX = Math.max(10, Math.min(newX, window.innerWidth - cardWidth - 10)); // 10px padding
            newY = Math.max(10, Math.min(newY, window.innerHeight - cardHeight - 10));

            setCardPosition({ x: newX, y: newY });

            // Apply to springs unless motion is reduced
            if (!shouldReduceMotion) {
                x.set(newX);
                y.set(newY);
            }
        }
    }, [mousePosition, x, y, shouldReduceMotion]);

    const isVisible = hoveredService && serviceImages[hoveredService];
    const currentImage = isVisible ? serviceImages[hoveredService] : null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed pointer-events-none z-50 hidden md:block"
                    style={{
                        left: shouldReduceMotion ? cardPosition.x : x,
                        top: shouldReduceMotion ? cardPosition.y : y,
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.2 }
                    }}
                >
                    <div className="transform scale-50">
                        <div className="w-80 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={hoveredService}
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    className="w-full h-full object-cover absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceHoverCard;