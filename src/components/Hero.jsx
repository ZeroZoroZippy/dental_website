import { motion } from 'framer-motion';
import Card from '../ui/Card';

// Profile image - same as AboutMe
import profileImage from '../assets/logo.jpg';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen md:h-screen flex items-center justify-center">
            {/* Mobile Layout - Vertical Stack */}
            <div className="md:hidden w-full px-4 flex flex-col items-center justify-center space-y-3 mt-15 -mb-10">
                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="special-gothic-condensed-one-regular text-2xl font-medium text-gray-600 tracking-wider uppercase text-center">
                        Yuvaan Vithlani
                    </p>
                </motion.div>

                {/* DIGITAL */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="special-gothic-condensed-one-regular text-5xl font-black text-gray-900 leading-none text-center -mt-2">
                        DIGITAL
                    </h1>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <Card enableToggle={true} />
                </motion.div>

                {/* DESIGNER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="special-gothic-condensed-one-regular text-5xl font-black text-gray-900 leading-none text-center">
                        DESIGNER
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-xs"
                >
                    <p className="font-inter-light text-md text-gray-600 leading-relaxed text-center">
                        I'm a India-based digital designer and Framer developer
                    </p>
                </motion.div>
            </div>

            {/* Desktop/Tablet - Empty container for positioning */}
            <div className="hidden md:block container mx-auto px-4"></div>

            {/* Desktop & Tablet Text Elements positioned around the card */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
                {/* Top Left - Name */}
                <motion.div
                    className="absolute top-[40vh] md:top-[35vh] lg:top-[40vh] left-[8vw] md:left-[12vw] lg:left-[16.5vw]"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="special-gothic-condensed-one-regular text-2xl md:text-2xl lg:text-3xl font-medium text-gray-600 tracking-wider uppercase">
                        Yuvaan Vithlani
                    </p>
                </motion.div>

                {/* Left Side - DIGITAL */}
                <motion.div
                    className="absolute top-[45vh] md:top-[40vh] lg:top-[45vh] left-[8vw] md:left-[12vw] lg:left-[15vw]"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="special-gothic-condensed-one-regular text-3xl md:text-5xl lg:text-6xl xl:text-9xl font-black text-gray-900 leading-none">
                        DIGITAL
                    </h1>
                </motion.div>

                {/* Right Side - DESIGNER (positioned diagonally for tablet) */}
                <motion.div
                    className="absolute top-[45vh] md:top-[65vh] lg:top-[45vh] right-[8vw] md:right-[8vw] lg:right-[9vw]"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="special-gothic-condensed-one-regular text-3xl md:text-5xl lg:text-6xl xl:text-9xl font-black text-gray-900 leading-none">
                        DESIGNER
                    </h1>
                </motion.div>

                {/* Right Side - Description (positioned below DESIGNER for diagonal flow) */}
                <motion.div
                    className="absolute top-[62vh] md:top-[75vh] lg:top-[62vh] right-[8vw] md:right-[8vw] lg:right-[9vw] max-w-xs md:max-w-sm"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="font-inter-light text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed text-right">
                        I'm a India-based digital designer and Framer developer
                    </p>
                </motion.div>
            </div>

            {/* Static Card for desktop & tablet */}
            <motion.div
                className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[25vh] md:top-[20vh] lg:top-[20vh]"
                style={{
                    zIndex: 50,
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.45))'
                }}
                initial={{ opacity: 0, scale: 0.8, rotateY: 0, rotateX: 0 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, rotateZ: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <Card enableToggle={true} />
            </motion.div>
        </section>
    );
};

export default Hero;