// src/components/Navbar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { TbDental } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // We've removed the scroll detection effect to keep the navbar intact

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: windowWidth < 768 
          ? (isOpen ? '90%' : '20rem') // Decreased from 20rem to 16rem
          : (isOpen ? '80%' : 'auto')
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        backgroundColor: { duration: 0.4 },
        width: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } // Smoother width transition
      }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md border border-gray-200 shadow-md z-100 rounded-4xl ${windowWidth < 768
        ? 'min-w-[16rem]' // Updated to match new default width
        : 'min-w-[40rem] max-w-[80%]'
        }`}
    >
      <div className="mx-auto">
        <div className="flex items-center h-16 justify-between px-1">
          {/* Logo */}
          <div className="flex-shrink-0 ml-3">
            <a href="/" className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#1FC8EA]/20 flex items-center justify-center">
                <TbDental className="w-7 h-7 text-black" />
              </div>
            </a>
          </div>

          {/* Mobile space filler */}
          {!isOpen && (
            <div className="md:hidden flex-grow"></div>
          )}

          {/* Desktop Navigation Container */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <motion.div
              key="nav-items"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center space-x-3 px-2"
            >
              {navItems.filter(item => item.label !== 'Contact').map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  initial="rest"
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                  whileHover="hover"
                  className="relative px-3 py-2 rounded-md text-base font-light overflow-hidden inline-block"
                >
                  <motion.span
                    variants={{
                      rest: { y: 0 },
                      hover: { y: "-150%" }
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center text-black"
                  >
                    {item.label}
                  </motion.span>
                  <motion.span
                    variants={{
                      rest: { y: "150%" },
                      hover: { y: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center text-[#5E67E6]"
                  >
                    {item.label}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Contact and Mobile Menu Toggle */}
          <div className="flex items-center">
            {/* Desktop Contact Button */}
            <div className="hidden md:flex mr-4">
              <motion.div
                key="contact-button"
                initial={{ opacity: 0, width: 0, x: 10 }}
                animate={{
                  opacity: 1,
                  width: 'auto',
                  x: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { delay: 0.05 },
                    x: { delay: 0.1 }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.a
                  href="#contact"
                  className="bg-[#2d2d2d] text-white px-8 py-2 rounded-4xl text-base font-light block whitespace-nowrap"
                >
                  <span>Book Appointment</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden mr-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#a9eaf7] rounded-4xl p-2 text-black focus:outline-none"
              >
                {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3, delay: 0.1 },
                  height: { duration: 0.5 },
                  scale: { duration: 0.4, delay: 0.1 }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                scale: 0.95,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.6, 1]
                }
              }}
              className="md:hidden bg-black/5 backdrop-blur-sm rounded-b-4xl px-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-8 py-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: 0.2 + (index * 0.1),
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                    className="text-black hover:text-[#5E67E6] text-base font-light text-center transition-colors duration-200"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div 
                  className="flex justify-center pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 0.6,
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                >
                  <motion.a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#2d2d2d] text-white px-8 py-2 rounded-4xl text-base font-light"
                  >
                    <span>Book Appointment</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
