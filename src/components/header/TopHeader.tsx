'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TopHeaderProps {
  onOpenModal: () => void
}

export default function TopHeader({ onOpenModal }: TopHeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openModal = () => {
    onOpenModal()
    setIsMobileMenuOpen(false) // Close mobile menu when opening modal
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const scrollToSection = (sectionId: string) => {
    console.log('Attempting to scroll to:', sectionId)
    
    // Close mobile menu first
    setIsMobileMenuOpen(false)
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId)
      console.log('Found element:', element)
      
      if (element) {
        // For mobile, use a simpler approach first
        const yOffset = -150 // Offset for fixed header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        
        console.log('Element rect:', element.getBoundingClientRect())
        console.log('Page Y offset:', window.pageYOffset)
        console.log('Final scroll position:', y)
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
      } else {
        console.log('Element not found with ID:', sectionId)
        // Try alternative approach
        const fallbackElement = document.querySelector(`#${sectionId}`)
        console.log('Fallback element:', fallbackElement)
      }
    })
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
      className="px-4 py-4 md:px-6 bg-background border-b border-border"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2 md:space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
            <span className="text-xl md:text-2xl">🩺</span>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Family Homeo Clinic</h1>
            <p className="text-xs md:text-sm text-foreground/60">Natural Healing Care</p>
          </div>
        </motion.div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 md:p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </motion.button>

          {/* Book Appointment Button - Hidden on small mobile, shown as abbreviated on medium mobile */}
          <motion.button
            onClick={openModal}
            className="hidden sm:flex px-3 md:px-6 py-2 md:py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium btn-hover-effect relative z-10 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden md:inline">Book Appointment</span>
            <span className="md:hidden">Book</span>
          </motion.button>

          {/* Doctor's Login Button - Hidden on mobile */}
          <motion.button
            onClick={() => window.open('/doctor', '_blank')}
            className="hidden lg:flex px-4 md:px-6 py-2 md:py-3 rounded-lg border border-border text-foreground font-medium btn-hover-effect relative z-10 hover:border-primary text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Doctor's Login
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden bg-background border-b border-border"
        initial={{ height: 0 }}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Navigation Items */}
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Button clicked for:', item.id)
                scrollToSection(item.id)
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                x: isMobileMenuOpen ? 0 : -20 
              }}
              transition={{ delay: isMobileMenuOpen ? 0.1 + (index * 0.1) : 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.name}
            </motion.button>
          ))}

          {/* Divider */}
          <div className="border-t border-border my-4"></div>

          {/* Action Buttons */}
          <motion.button
            onClick={openModal}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              y: isMobileMenuOpen ? 0 : 20 
            }}
            transition={{ delay: isMobileMenuOpen ? 0.4 : 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Appointment
          </motion.button>

          <motion.button
            onClick={() => {
              window.open('/doctor', '_blank')
              setIsMobileMenuOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg border border-border text-foreground font-semibold text-center hover:border-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              y: isMobileMenuOpen ? 0 : 20 
            }}
            transition={{ delay: isMobileMenuOpen ? 0.5 : 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Doctor's Login
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}