'use client'

import { motion } from 'framer-motion'

export default function NavItemsHeader() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Get the actual header height dynamically
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 128
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Why Choose Us', id: 'why-choose-us' },
    { name: 'Services', id: 'services' },
    { name: 'Testimonial', id: 'testimonial' },
    { name: 'Contact Us', id: 'contact' }
  ]

  return (
    <motion.div 
      className="hidden md:block border-t border-border bg-gradient-to-r from-primary to-secondary backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="px-4 py-4 md:px-6">
        <nav className="max-w-7xl mx-auto">
          <ul className="flex items-center justify-center space-x-4 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className="text-white font-semibold text-lg relative px-4 py-3 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}