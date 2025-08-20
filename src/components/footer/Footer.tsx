'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState('')

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert('Thank you for subscribing to our health newsletter!')
    setEmail('')
  }

  const services = [
    { name: "Women's Health & Gynecology", icon: '👩‍⚕️' },
    { name: 'Pediatric & Child Care', icon: '👶' },
    { name: 'Chronic Disease Management', icon: '⚕️' },
    { name: 'Digestive Health', icon: '🍃' },
    { name: 'Mental Health & Wellness', icon: '🧠' },
    { name: 'Preventive Care & Immunity', icon: '🛡️' },
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonial' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Book Appointment', href: '#' },
  ]


  const achievements = [
    { icon: '❤️', number: '500+', label: 'Happy Families' },
    { icon: '🏆', number: '98%', label: 'Success Rate' },
    { icon: '🩺', number: '5+', label: 'Years Experience' },
    { icon: '🔒', number: '24/7', label: 'Support Available' },
  ]

  const healthTips = [
    { tip: 'Drink warm water in the morning', icon: '💧' },
    { tip: 'Practice deep breathing daily', icon: '🧘‍♀️' },
    { tip: 'Eat fresh fruits regularly', icon: '🍎' },
  ]

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Doctor & Clinic Information */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo & Clinic Name */}
              <div className="mb-6">
                <motion.div
                  className="flex items-center space-x-3 mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Family Homeo Clinic
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Natural Healing Care
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Doctor Information */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">👩‍⚕️</span>
                  <h4 className="text-lg font-semibold text-foreground">
                    Dr. Gajala Parween
                  </h4>
                </div>
                <p className="text-primary font-medium mb-2">BHMS(MU), DMT</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Specialist in Women's and Children's Diseases with 5+ years of
                  experience in homeopathic treatment and natural healing.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3 text-foreground/70 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-lg">📞</span>
                  <a href="tel:+919161687595" className="text-sm">
                    +91 91616 87595
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 text-foreground/70 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-lg">📧</span>
                  <a
                    href="mailto:familyhomeoclinic@gmail.com"
                    className="text-sm"
                  >
                    familyhomeoclinic@gmail.com
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-3 text-foreground/70"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-lg">📍</span>
                  <p className="text-sm leading-relaxed">
                    Labha, Zero mile se paschim
                    <br />
                    Dani hospital ke upr (Mojibur complex)
                    <br />
                    Katihar, Bihar 854116
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Our Services */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">🏥</span>
                <h4 className="text-lg font-semibold text-foreground">
                  Our Services
                </h4>
              </div>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    className="group"
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href="#services"
                      className="flex items-center space-x-3 text-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </span>
                      <span>{service.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                onClick={() =>
                  window.open(
                    'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20would%20like%20to%20know%20more%20about%20your%20services.',
                    '_blank'
                  )
                }
                className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm btn-hover-effect shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📋</span>
                <span>View All Services</span>
              </motion.button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">🔗</span>
                <h4 className="text-lg font-semibold text-foreground">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-3 mb-8">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="group"
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center space-x-3 text-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:bg-primary transition-colors duration-300"></span>
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Consultation Hours */}
              <div className="p-4 rounded-xl bg-muted border border-border">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">🕒</span>
                  <h5 className="font-semibold text-foreground">
                    Consultation Hours
                  </h5>
                </div>
                <div className="text-sm text-foreground/70 space-y-1">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 2:00 PM</p>
                  <p className="text-primary font-medium flex items-center space-x-1">
                    <span>🚨</span>
                    <span>Emergency: Call anytime</span>
                  </p>
                </div>
              </div>

              {/* Health Tips */}
              {/* <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">💡</span>
                  <h5 className="font-semibold text-foreground">Daily Health Tips</h5>
                </div>
                <div className="space-y-2">
                  {healthTips.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-foreground/70">
                      <span>{item.icon}</span>
                      <span>{item.tip}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </motion.div>

            {/* Newsletter & Social Media */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">🌟</span>
                <h4 className="text-lg font-semibold text-foreground">
                  Stay Connected
                </h4>
              </div>

              {/* Newsletter Subscription */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg">📬</span>
                  <p className="text-sm text-foreground/70">
                    Get health tips & updates
                  </p>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">
                      📧
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full pl-12 pr-4 py-3 bg-muted border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>📨</span>
                    <span>Subscribe</span>
                  </motion.button>
                </form>
              </div>

              {/* Social Media Links */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg">🌐</span>
                  <h5 className="font-semibold text-foreground">Follow Us</h5>
                </div>
                <div className="flex space-x-3">
                  {/* Facebook */}
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-blue-500 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-lg hover:bg-blue-600"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  {/* Instagram */}
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-lg hover:from-pink-600 hover:to-purple-600"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  {/* Twitter/X */}
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-black text-white transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-lg hover:bg-gray-800"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title="X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  {/* LinkedIn */}
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-blue-600 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-lg hover:bg-blue-700"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  {/* YouTube */}
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-red-500 text-white transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-lg hover:bg-red-600"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="text-xs font-bold text-primary">
                      {achievement.number}
                    </p>
                    <p className="text-xs text-foreground/70">
                      {achievement.label}
                    </p>
                  </motion.div>
                ))}
              </div> */}

              {/* WhatsApp Quick Contact */}
              <motion.button
                onClick={() =>
                  window.open(
                    'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20need%20urgent%20consultation.',
                    '_blank'
                  )
                }
                className="mt-6 w-full px-4 py-3 rounded-lg border-2 border-[#25D366] text-[#25D366] font-semibold text-sm relative z-10 overflow-hidden transition-all duration-300 flex items-center justify-center space-x-2 hover:text-white before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-[#25D366] before:transition-all before:duration-300 before:z-[-1] hover:before:left-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
                </svg>
                <span>WhatsApp Us</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-foreground/60">
                  © {new Date().getFullYear()} Family Homeo Clinic. All rights reserved.
                </p>
                <p className="text-xs text-foreground/50 mt-1 flex items-center justify-center md:justify-start space-x-1">
                  <span>Powered by</span>
                  <motion.a
                    href="https://github.com/BasharatJS?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Basharat@SoftwareEngineer
                  </motion.a>
                </p>
              </motion.div>

              {/* Rating & Emergency */}
              <motion.div
                className="flex items-center space-x-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                  <span className="text-yellow-400">⭐</span>
                  <span>4.9/5 Rating</span>
                </div>

                <motion.button
                  onClick={() =>
                    window.open(
                      'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20This%20is%20an%20emergency.%20I%20need%20immediate%20consultation.',
                      '_blank'
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm flex items-center space-x-2 hover:bg-red-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🚨</span>
                  <span>Emergency</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 flex items-center justify-center text-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⬆️
        </motion.button>
      )}
    </footer>
  )
}
