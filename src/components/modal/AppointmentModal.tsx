'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Calendar, Clock, User, Phone, Mail, MessageSquare, Stethoscope, CheckCircle } from 'lucide-react'
import { addAppointment } from '@/lib/firebaseServices'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const services = [
    "Women's Health & Gynecology",
    'Pediatric & Child Care',
    'Chronic Disease Management',
    'Digestive Health',
    'Mental Health & Wellness',
    'Preventive Care & Immunity',
    'General Consultation'
  ]

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      // Save to Firebase
      const appointmentId = await addAppointment({
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message
      })

      console.log('Appointment saved with ID:', appointmentId)
      
      // Show success message
      setSubmitSuccess(true)
      setIsSubmitting(false)
      
      // Reset form and close modal after showing success message
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          service: '',
          date: '',
          time: '',
          message: ''
        })
        onClose()
      }, 3000)

    } catch (error: any) {
      console.error('Error saving appointment:', error)
      setSubmitError(error.message || 'Failed to save appointment. Please try again.')
      setIsSubmitting(false)
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl border border-border"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border rounded-t-3xl">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Make an Appointment
                  </h2>
                  <p className="text-foreground/70 mt-1">
                    Schedule your visit with our dental experts
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full bg-muted hover:bg-border transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Personal Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-foreground/50" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-foreground/50" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Appointment Details Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Stethoscope className="w-5 h-5 text-secondary mr-2" />
                  <h3 className="text-xl font-semibold text-foreground">Appointment Details</h3>
                </div>

                <div className="space-y-4">
                  {/* Select Service */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    >
                      <option value="">Choose a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-foreground/50" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-foreground/50" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-5 h-5 text-accent mr-2" />
                  <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your dental concerns or any specific requirements..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                  />
                </div>
              </motion.div>

              {/* Success/Error Messages */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg mb-4"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Appointment scheduled successfully! We'll contact you soon to confirm.</span>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4"
                >
                  <span className="text-red-800">{submitError}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed btn-hover-effect"
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </div>
                  ) : (
                    'Schedule Appointment'
                  )}
                </motion.button>

                <p className="text-sm text-foreground/60 text-center mt-3">
                  We'll call you within 24 hours to confirm your appointment
                </p>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}