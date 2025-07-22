// src/components/Navbar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Orb from './../ui/orb';
import logo from './../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection with direction awareness and debouncing (desktop only)
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    const handleScroll = () => {
      // Only apply scroll animation on desktop (md breakpoint and above)
      if (window.innerWidth < 768) {
        return;
      }

      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determine scroll direction
          if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
          } else if (currentScrollY < lastScrollY) {
            scrollDirection = 'up';
          }

          setIsScrolled(prev => {
            // If scrolling down and past threshold, collapse
            if (scrollDirection === 'down' && currentScrollY > 25) {
              return true;
            }
            // If scrolling up and below threshold, expand
            if (scrollDirection === 'up' && currentScrollY < 15) {
              return false;
            }
            // If already collapsed and scrolling up significantly, expand
            if (prev && scrollDirection === 'up' && lastScrollY - currentScrollY > 10) {
              return false;
            }
            // Maintain current state for small movements
            return prev;
          });

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      // Reset scroll state when switching to mobile
      if (window.innerWidth < 768) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blogs', href: '#blogs' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50, width: '66.666667%' }}
      animate={{
        opacity: 1,
        y: 0,
        width: window.innerWidth < 768
          ? (isOpen ? '90%' : '20rem')
          : (isOpen ? '80%' : (isScrolled ? '16rem' : '40rem')),
        backgroundColor: isScrolled && window.innerWidth >= 768 ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        width: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        backgroundColor: { duration: 0.4 }
      }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-lg backdrop-blur-md border border-white/30 shadow-md z-100 rounded-4xl"
    >
      <div className="mx-auto">
        <div className="flex items-center h-16 justify-between px-1">
          {/* Logo */}
          <div className="flex-shrink-0 ml-1">
            <a href="/" className="flex items-center">
              <div className="w-14 h-14 rounded-full relative">
                <Orb
                  hue={0}
                  hoverIntensity={0.2}
                  rotateOnHover={true}
                  forceHoverState={false}
                  opacity={1.0}
                  followCursor={false}
                />
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </a>
          </div>

          {/* Mobile Available for Work Indicator */}
          {!isOpen && (
            <div className="md:hidden flex-grow flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-white text-md font-light">Available for work</span>
                <motion.div
                  animate={{
                    scale: [1, 1, 1],
                    boxShadow: [
                      "0 0 0 0px rgba(94, 103, 230, 0)",
                      "0 0 0 6px rgba(94, 103, 230, 0.7)",
                      "0 0 0 0px rgba(94, 103, 230, 0)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-[#5E67E6] rounded-full"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation Container */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.div
                  key="nav-items"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center space-x-1"
                >
                  {navItems.filter(item => item.label !== 'Contact').map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
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
                      className="relative px-2 py-2 rounded-md text-base font-light overflow-hidden inline-block"
                    >
                      <motion.span
                        variants={{
                          rest: { y: 0 },
                          hover: { y: "-150%" }
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center text-white"
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
              ) : (
                <motion.div
                  key="available-indicator"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: -10,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  className="flex items-center justify-start space-x-2"
                  style={{ marginLeft: '2px' }}
                >
                  <span className="text-white text-md font-light">Available for work</span>
                  <motion.div
                    animate={{
                      scale: [1, 1, 1],
                      boxShadow: [
                        "0 0 0 0px rgba(56, 118, 255, 0)",
                        "0 0 0 6px rgba(56, 118, 255, 0.7)",
                        "0 0 0 0px rgba(56, 118, 255, 0)"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 bg-[#5E67E6] rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact and Mobile Menu Toggle */}
          <div className="flex items-center">
            {/* Desktop Contact Button */}
            <div className="hidden md:flex mr-4">
              <AnimatePresence mode="wait">
                {!isScrolled && (
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
                    exit={{
                      opacity: 0,
                      width: 0,
                      x: 10,
                      transition: {
                        duration: 0.35,
                        ease: [0.4, 0, 1, 1],
                        opacity: { duration: 0.2 },
                        width: { delay: 0.1, duration: 0.25 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.a
                      href="#contact"
                      className="relative overflow-hidden bg-white text-black px-8 py-2 rounded-4xl text-base font-light block whitespace-nowrap"
                      whileHover="hover"
                      initial="rest"
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#5E67E6] rounded-4xl"
                        variants={{
                          rest: { scaleX: 0 },
                          hover: { scaleX: 1 }
                        }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      <span className="relative z-10">Contact</span>
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden mr-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#5E67E6] rounded-4xl p-2 text-white focus:outline-none"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-black/10 backdrop-blur-md rounded-b-4xl px-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-8 py-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-[#5E67E6] text-base font-light text-center transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex justify-center pt-2">
                  <motion.a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="relative overflow-hidden bg-white text-black px-8 py-2 rounded-4xl text-base font-light"
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#5E67E6] rounded-4xl"
                      variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 }
                      }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <span className="relative z-10">Contact</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;