import { motion } from 'framer-motion';

// Image imports (replace with actual paths)
import backView from '../assets/bg_1.jpeg';
import frontView from '../assets/logo.jpg';

const Card = ({ title, content, imageSrc, imageAlt, footer, enableToggle = false }) => {
  // Conditionally render overlay only if there's content (matches screenshot's clean image)
  const hasOverlayContent = title || content || footer;

  return (
    <div
      // Removed mx-auto (handled by parent flex); kept responsive widths and aspect
      className="relative w-72 sm:w-[14rem] md:w-[14rem] lg:w-[21.15rem] h-auto aspect-[3/4] rounded-3xl"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full [transform-style:preserve-3d]"
        initial={{ scale: 0, rotateX: enableToggle ? 180 : 0, opacity: 0 }}
        animate={{ rotateX: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden">
          <img
            src={enableToggle ? frontView : imageSrc}
            alt={enableToggle ? "Portrait - front view" : imageAlt}
            className="w-full h-full object-cover"
          />
          {hasOverlayContent && (
            <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base md:text-lg">{content}</p>
              {footer && <div className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base">{footer}</div>}
            </div>
          )}
        </div>
        {enableToggle && (
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden">
            <img
              src={backView}
              alt="Portrait - back view"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Card;