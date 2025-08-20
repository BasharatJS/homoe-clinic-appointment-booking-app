'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import AppointmentModal from '@/components/modal/AppointmentModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-background"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Expert Homeopathic Care for Women & Children
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dr. Gajala Parween
        </motion.h2>

        {/* Qualification */}
        <motion.p
          className="text-lg md:text-xl text-foreground/80 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          BHMS(MU), DMT
        </motion.p>

        {/* Specialty */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-foreground font-medium mb-2">
            Specialist in Women's and Children's Diseases
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg text-foreground/70">
            <span>📞</span>
            <span>9161687595</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Experience compassionate homeopathic care with personalized treatment
          plans. We specialize in natural healing methods for women's health,
          pediatric care, and comprehensive family wellness solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={openModal}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg btn-hover-effect relative z-10 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Book Consultation
          </motion.button>

          <motion.button
            onClick={() =>
              window.open(
                'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20would%20like%20to%20book%20an%20appointment%20for%20consultation.',
                '_blank'
              )
            }
            className="px-8 py-4 rounded-lg border-2 border-[#25D366] text-[#25D366] font-semibold text-lg relative z-10 overflow-hidden transition-all duration-300 flex items-center space-x-2 hover:text-white before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-[#25D366] before:transition-all before:duration-300 before:z-[-1] hover:before:left-0"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
            </svg>
            <span>Book on WhatsApp</span>
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
