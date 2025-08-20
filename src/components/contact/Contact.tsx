'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  User,
  MessageSquare,
  Clock,
  Stethoscope,
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-muted rounded-2xl">
        <div className="text-foreground/60">Loading Map...</div>
      </div>
    ),
  }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
})

// Fix for default markers - only run on client side
const fixLeafletIcons = () => {
  if (typeof window !== 'undefined') {
    const L = require('leaflet')
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }
}

// Create custom homeo clinic marker icon
const createCustomIcon = () => {
  if (typeof window !== 'undefined') {
    const L = require('leaflet')
    return L.divIcon({
      className: 'custom-marker',
      html: `<svg width="30" height="44" viewBox="0 0 30 44" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 29 15 29s15-20.716 15-29C30 6.716 23.284 0 15 0z" 
              fill="#3b82f6" 
              filter="url(#shadow)"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
        <circle cx="15" cy="15" r="3" fill="#3b82f6"/>
      </svg>`,
      iconSize: [30, 44],
      iconAnchor: [15, 44],
      popupAnchor: [0, -44],
    })
  }
  return null
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [customIcon, setCustomIcon] = useState<any>(null)

  // Fix Leaflet icons on client side
  useEffect(() => {
    fixLeafletIcons()
    const icon = createCustomIcon()
    setCustomIcon(icon)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
    alert('Thank you for your message! We will get back to you soon.')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  ]

  // Coordinates for the clinic address in Katihar, Bihar
  const position = [25.5394, 87.5793] as [number, number]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-8 bg-muted border border-border"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Get Connected
            </span>
          </motion.div>

          <motion.h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Contact Us
          </motion.h2>

          <motion.p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Ready to experience compassionate homeopathic care? Get in touch
            with us for appointments, consultations, or any health concerns you
            may have.
          </motion.p>
        </motion.div>

        {/* First Row - Clinic Details & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Visit Our Clinic Card */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm rounded-2xl p-8 bg-background/80 border border-border transition-all duration-500 hover:shadow-2xl h-full">
              <h3 className="text-2xl font-bold mb-6 text-center text-primary">
                Visit Our Clinic
              </h3>

              {/* Contact Information */}
              <div className="space-y-4">
                <motion.div
                  className="p-4 rounded-xl bg-muted border border-border group hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        Address
                      </h4>
                      <p className="leading-relaxed text-foreground/70">
                        Labha, Zero mile se paschim
                        <br />
                        Dani hospital ke upr (Mojibur complex)
                        <br />
                        Katihar, Bihar 854116
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-xl bg-muted border border-border group hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        Phone Number
                      </h4>
                      <div className="space-y-1">
                        <a
                          href="tel:+919161687595"
                          className="transition-colors duration-300 hover:underline hover:text-primary block text-foreground/70"
                        >
                          +91 91616 87595
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-xl bg-muted border border-border group hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        Email Address
                      </h4>
                      <div className="space-y-1">
                        <a
                          href="mailto:familyhomeoclinic@gmail.com"
                          className="transition-colors duration-300 hover:underline hover:text-primary block text-foreground/70"
                        >
                          familyhomeoclinic@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-xl bg-muted border border-border group hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        Consultation Hours
                      </h4>
                      <div className="text-foreground/70">
                        <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                        <p>Sunday: 10:00 AM - 2:00 PM</p>
                        <p className="text-sm mt-1 font-medium text-primary">
                          Emergency: Call anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media Icons */}
              <div className="pt-6 text-center">
                <h4 className="font-semibold text-lg mb-4 text-foreground">
                  Follow Us
                </h4>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-3 rounded-lg bg-primary/10 text-primary transition-all duration-300 hover:scale-110"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Get In Touch Card */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm rounded-2xl p-8 bg-background/80 border border-border transition-all duration-500 hover:shadow-2xl h-full">
              <h3 className="text-2xl font-bold mb-6 text-center text-primary">
                Get In Touch
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/60" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-muted border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/60" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-muted border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/60" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-muted border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-foreground/60" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-muted border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>

              {/* Additional Info Below Form */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4 bg-primary/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Quick Response Guarantee
                    </span>
                  </motion.div>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    We typically respond within <strong>2-4 hours</strong>{' '}
                    during consultation hours. For emergency homeopathic care,
                    please call us directly.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="text-center p-3 rounded-lg bg-primary/5"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-primary flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Emergency Care
                    </p>
                    <p className="text-xs text-foreground/70">Call Anytime</p>
                  </motion.div>

                  <motion.div
                    className="text-center p-3 rounded-lg bg-primary/5"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-primary flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Free Consultation
                    </p>
                    <p className="text-xs text-foreground/70">First Visit</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row - Map */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Find Us Here
          </h3>
          <div className="relative h-[450px] rounded-2xl overflow-hidden border border-border">
            {typeof window !== 'undefined' && (
              <div style={{ height: '100%', width: '100%' }}>
                <MapContainer
                  // @ts-ignore
                  center={position}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-2xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {customIcon && (
                    <Marker
                      // @ts-ignore
                      position={position}
                      icon={customIcon}
                    >
                      <Popup maxWidth={250} className="custom-popup">
                        <div className="p-3 min-w-[240px]">
                          {/* Header */}
                          <div className="text-center mb-3 pb-2 border-b border-gray-200">
                            <div className="flex justify-center items-center mb-1">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                                <Stethoscope className="text-white w-3 h-3" />
                              </div>
                              <h4 className="text-base font-bold text-blue-600">
                                Family Homeo Clinic
                              </h4>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="mb-3">
                            <div className="flex items-start mb-1">
                              <span className="text-blue-500 mr-2 mt-0.5 text-sm">
                                📍
                              </span>
                              <div>
                                <p className="text-xs font-medium text-gray-800 leading-tight">
                                  Labha, Zero mile se paschim
                                  <br />
                                  Dani hospital ke upr (Mojibur complex)
                                  <br />
                                  Katihar, Bihar 854116
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center">
                              <span className="mr-2 text-sm">📧</span>
                              <a
                                href="mailto:familyhomeoclinic@gmail.com"
                                className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                              >
                                familyhomeoclinic@gmail.com
                              </a>
                            </div>

                            <div className="flex items-center">
                              <span className="mr-2 text-sm">📱</span>
                              <div className="text-xs text-gray-700">
                                <a
                                  href="tel:+919161687595"
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                >
                                  +91 91616 87595
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="text-center pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">
                              Dr. Gajala Parween - BHMS(MU), DMT
                            </p>
                            <div className="flex justify-center space-x-1">
                              <span className="text-yellow-400 text-xs">
                                ⭐
                              </span>
                              <span className="text-yellow-400 text-xs">
                                ⭐
                              </span>
                              <span className="text-yellow-400 text-xs">
                                ⭐
                              </span>
                              <span className="text-yellow-400 text-xs">
                                ⭐
                              </span>
                              <span className="text-yellow-400 text-xs">
                                ⭐
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Section with WhatsApp Buttons */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground/70 mb-6">
            Prefer direct communication? Reach us instantly!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => window.open('tel:+919161687595', '_self')}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg btn-hover-effect relative z-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Call Now
            </motion.button>

            <motion.button
              onClick={() =>
                window.open(
                  'https://wa.me/919161687595?text=Hello%20Dr.%20Gajala%20Parween,%20I%20would%20like%20to%20get%20in%20touch%20for%20homeopathic%20consultation.',
                  '_blank'
                )
              }
              className="px-8 py-4 rounded-lg border-2 border-[#25D366] text-[#25D366] font-semibold text-lg relative z-10 overflow-hidden transition-all duration-300 flex items-center space-x-2 hover:text-white before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-[#25D366] before:transition-all before:duration-300 before:z-[-1] hover:before:left-0"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
              </svg>
              <span>WhatsApp Us</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for custom popup styling */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(59, 130, 246, 0.2);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-top: none;
          border-right: none;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          font: inherit;
        }
      `}</style>
    </section>
  )
}
